/* ===========================
   Food Ordering System (FOS)
   Single-source JS utilities
   Keys in localStorage:
   - fos.user        -> {name,email,phone}
   - fos.session     -> {email, at}
   - fos.cart        -> [{id,name,price,img,qty}]
   - fos.orders      -> [{id,time,items,totals,payment}]
   =========================== */
(function(){
  const storageKey = (k) => `fos.${k}`;
  const read  = (k, d=null) => { try{ return JSON.parse(localStorage.getItem(storageKey(k))) ?? d; }catch(e){ return d; } };
  const write = (k, v) => localStorage.setItem(storageKey(k), JSON.stringify(v));
  const remove= (k) => localStorage.removeItem(storageKey(k));

  const session = {
    isLoggedIn: () => !!read("session"),
    login: (email) => write("session", { email, at: Date.now() }),
    logout: () => remove("session"),
    user: () => read("user"),
  };

  const user = {
    save: (obj) => write("user", obj),
    get: () => read("user", {}),
  };

  const cart = {
    get: () => read("cart", []),
    save: (items) => write("cart", items),
    add: (item) => {
      const items = cart.get();
      const i = items.findIndex(x => x.id === item.id);
      if (i > -1) items[i].qty += item.qty || 1;
      else items.push({ id: item.id, name: item.name, price: +item.price, img: item.img || "", qty: item.qty || 1 });
      cart.save(items);
      ui.updateCartBadge();
    },
    remove: (id) => { cart.save(cart.get().filter(x => x.id !== id)); ui.updateCartBadge(); },
    updateQty: (id, qty) => {
      qty = Math.max(1, parseInt(qty || 1, 10));
      const items = cart.get();
      const it = items.find(x => x.id === id);
      if (it) { it.qty = qty; cart.save(items); ui.updateCartBadge(); }
    },
    clear: () => { cart.save([]); ui.updateCartBadge(); },
    count: () => cart.get().reduce((s,i)=>s+i.qty,0),
    totals: () => {
      const items = cart.get();
      const subtotal = items.reduce((s,i)=> s + i.price * i.qty, 0);
      const delivery = items.length ? 40 : 0;
      const tax = +(subtotal * 0.05).toFixed(2); // 5% GST example
      const total = +(subtotal + delivery + tax).toFixed(2);
      return { subtotal:+subtotal.toFixed(2), tax, delivery, total };
    }
  };

  const orders = {
    all: () => read("orders", []),
    place: (payment) => {
      const items = cart.get();
      if (!items.length) throw new Error("Cart is empty.");
      const totals = cart.totals();
      const id = "OD" + Date.now().toString().slice(-8);
      const order = { id, time: new Date().toISOString(), items, totals, payment };
      const list = orders.all();
      list.unshift(order);
      write("orders", list);
      cart.clear();
      return order;
    }
  };

  const ui = {
    money: (n) => `₹${(+n).toFixed(2)}`,
    updateCartBadge: () => {
      const el = document.getElementById("cart-count");
      if (el) el.textContent = cart.count();
    },
    toggleAuthButtons: () => {
      const logged = session.isLoggedIn();
      const loginBtn = document.getElementById("loginBtn");
      const logoutBtn = document.getElementById("logoutBtn");
      if (loginBtn) loginBtn.style.display = logged ? "none" : "block";
      if (logoutBtn) logoutBtn.style.display = logged ? "block" : "none";
    },
  };

  const onReady = (fn) => document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn)
    : fn();

  // Export
  window.FOS = { storage:{read,write,remove}, session, user, cart, orders, ui, onReady };
  // Init
  onReady(() => { ui.updateCartBadge(); ui.toggleAuthButtons(); });

})();