// product-page.js

document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".js-add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const img = button.dataset.img;

      // Cart localStorage se lao
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check agar item already cart mein hai
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id, name, price, img, qty: 1 });
      }

      // Save back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Cart count update karo
      updateCartCount();

      alert(`${name} added to cart ✅`);
    });
  });

  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) cartCountEl.textContent = count;
  }

  // Page load pe bhi cart count update ho
  updateCartCount();
});
