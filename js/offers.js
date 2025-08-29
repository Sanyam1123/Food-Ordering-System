// Login/Logout UI toggle and logout function
function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', function(){

    // Show/Hide login/logout based on login status
    var loginBtn = document.getElementById("loginBtn");
    var logoutBtn = document.getElementById("logoutBtn");
    if (loginBtn && logoutBtn){
        if(localStorage.getItem("loggedIn") === "true"){
            loginBtn.style.display = "none";
            logoutBtn.style.display = "block";
        } else {
            loginBtn.style.display = "block";
            logoutBtn.style.display = "none";
        }
    }

    // Initialize Owl Carousel (ensure jQuery + owlcarousel JS are loaded)
    if (window.jQuery && $.fn && $.fn.owlCarousel) {
        $(".offers-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            margin: 25,
            dots: false,
            loop: true,
            nav : true,
            navText : [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            responsive: {
                0:{ items:1 },
                576:{ items:2 },
                992:{ items:3 }
            }
        });
    }

    // ==========================
    // Grab Deal -> Add to Cart
    // ==========================
    const grabButtons = document.querySelectorAll(".card .btn.btn-primary");

    grabButtons.forEach(btn => {
        btn.addEventListener("click", function(e){
            e.preventDefault();

            // Get offer details from card safely
            const card = btn.closest(".card");
            const titleElement = card.querySelector(".card-title");
            const title = titleElement ? titleElement.innerText.trim() : "Special Offer";
            const descElement = card.querySelector(".card-text");
            const desc = descElement ? descElement.innerText.trim() : "";
            const imgElement = card.querySelector("img");
            const img = imgElement ? imgElement.getAttribute("src") : "";

            // ✅ Get price (check hidden span in offers.html)
            let priceElement = card.querySelector(".offer-price"); 
            let price = priceElement ? parseFloat(priceElement.innerText.replace(/[₹,]/g, '').trim()) : 199;
            if (isNaN(price)) price = 199; // fallback to 199

            // ✅ Cart item structure (always clean values)
            const item = {
                title: title,
                description: desc,
                img: img,
                price: Number(price),         // ensure number
                quantity: 1                   // always start with 1
            };

            // Fetch existing cart
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // If same item exists, increase quantity
            const existing = cart.find(c => c.title === item.title);
            if(existing){
                existing.quantity = parseInt(existing.quantity) + 1;
            } else {
                cart.push(item);
            }

            // Save back to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Update cart count
            updateCartCount();

            // Show popup modal
            let modal = new bootstrap.Modal(document.getElementById('cartModal'));
            modal.show();
        });
    });

    // Update cart count function
    function updateCartCount(){
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let count = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
        let cartCountElement = document.getElementById("cart-count");
        if(cartCountElement){
            cartCountElement.innerText = count;
        }
    }

    // Call once on load
    updateCartCount();
});
