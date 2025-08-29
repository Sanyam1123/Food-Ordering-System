// Logout function
function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// Show/Hide login/logout based on login status
window.onload = function(){
    if(localStorage.getItem("loggedIn") === "true"){
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
    } else {
        document.getElementById("loginBtn").style.display = "block";
        document.getElementById("logoutBtn").style.display = "none";
    }
}

// Handle Contact Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(e){
        e.preventDefault();

        // Collect form data
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        const contactData = {
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
        messages.push(contactData);
        localStorage.setItem("contactMessages", JSON.stringify(messages));

        // Show Bootstrap modal instead of alert
        let successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();

        // Reset form
        form.reset();
    });
});
