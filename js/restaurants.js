$(".restaurant-carousel").owlCarousel({
  autoplay: true,
  smartSpeed: 1000,
  margin: 25,
  dots: false,
  loop: true,
  nav: true,
  navText: [
    '<i class="fa fa-angle-left"></i>',
    '<i class="fa fa-angle-right"></i>'
  ],
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    992: { items: 3 }
  }
});


// Logout function
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// Show/Hide login/logout
window.onload = function () {
  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
  } else {
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
  }
};
