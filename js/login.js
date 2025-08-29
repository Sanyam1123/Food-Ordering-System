document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Dummy credentials
    const dummyEmail = "sanyam22@gmail.com";
    const dummyPassword = "sanyam";

    if (email === dummyEmail && password === dummyPassword) {
        alert("Login successful!");
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password!");
    }
});
