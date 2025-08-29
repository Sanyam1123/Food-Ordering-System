// Logout function
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// Show/Hide login/logout based on login status
window.onload = function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
    } else {
        document.getElementById("loginBtn").style.display = "block";
        document.getElementById("logoutBtn").style.display = "none";
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}


// Initialize testimonial carousel
$(document).ready(function () {
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      menuItems.forEach(item => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
