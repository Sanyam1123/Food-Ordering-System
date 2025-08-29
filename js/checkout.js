const paymentForm = document.getElementById("paymentForm");
const successMessage = document.getElementById("successMessage");

paymentForm.addEventListener("submit", function(e) {
  e.preventDefault(); // Page reload hone se rokta hai
  paymentForm.style.display = "none"; // Form ko hide kar diya
  successMessage.style.display = "block"; // Success message dikha diya
});
