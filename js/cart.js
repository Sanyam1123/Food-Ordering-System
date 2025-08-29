// Logout function
function logout() {
  // Remove login status from local storage
  localStorage.removeItem("loggedIn");
  // Redirect user to login page
  window.location.href = "login.html";
}

// Show/Hide login or logout buttons based on login status
window.onload = function () {
  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
  } else {
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
  }
};

// ✅ Update cart count in navbar
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
  document.getElementById("cart-count").textContent = count;
}

document.addEventListener("DOMContentLoaded", () => {
  const cartBody = document.getElementById("cart-body");
  const emptyMsg = document.getElementById("cart-empty");

  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const deliveryEl = document.getElementById("delivery");
  const totalEl = document.getElementById("total");

  const clearCartBtn = document.getElementById("clear-cart");

  // ✅ Load cart into table
  function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Empty cart case
    if (cart.length === 0) {
      cartBody.innerHTML = "";
      emptyMsg.style.display = "block";
      updateTotals();
      return;
    }

    emptyMsg.style.display = "none";
    cartBody.innerHTML = "";

    cart.forEach((item, index) => {
      let qty = parseInt(item.quantity) || 1;
      let price = parseFloat(item.price) || 0;
      let total = price * qty;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.img}" alt="${item.title}" width="50"></td>
        <td>${item.title}</td>
        <td>₹${price.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-outline-secondary minus" data-index="${index}">-</button>
          <span class="mx-2">${qty}</span>
          <button class="btn btn-sm btn-outline-secondary plus" data-index="${index}">+</button>
        </td>
        <td>₹${total.toFixed(2)}</td>
        <td><button class="btn btn-sm btn-danger remove" data-index="${index}">x</button></td>
      `;
      cartBody.appendChild(row);
    });

    updateTotals();
    attachEvents();
  }

  // ✅ Attach plus/minus/remove events
  function attachEvents() {
    document.querySelectorAll(".plus").forEach(btn =>
      btn.addEventListener("click", () => changeQty(btn.dataset.index, 1))
    );
    document.querySelectorAll(".minus").forEach(btn =>
      btn.addEventListener("click", () => changeQty(btn.dataset.index, -1))
    );
    document.querySelectorAll(".remove").forEach(btn =>
      btn.addEventListener("click", () => removeItem(btn.dataset.index))
    );
  }

  // ✅ Change quantity
  function changeQty(index, delta) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let qty = parseInt(cart[index].quantity) || 1;
    qty += delta;

    if (qty <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = qty;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
  }

  // ✅ Remove item
  function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
  }

  // ✅ Totals calculation
  function updateTotals() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = cart.reduce((sum, item) => {
      let qty = parseInt(item.quantity) || 1;
      let price = parseFloat(item.price) || 0;
      return sum + (price * qty);
    }, 0);

    let tax = subtotal * 0.05;
    let delivery = subtotal > 0 ? 40 : 0;
    let total = subtotal + tax + delivery;

    subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    taxEl.textContent = `₹${tax.toFixed(2)}`;
    deliveryEl.textContent = `₹${delivery.toFixed(2)}`;
    totalEl.textContent = `₹${total.toFixed(2)}`;
  }

  // ✅ Clear cart button
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      loadCart();
      updateCartCount();
    });
  }

  // First load
  loadCart();
  updateCartCount();
});
