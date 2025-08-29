document.getElementById("signupForm").addEventListener("submit", function(e){
  e.preventDefault();

  let name = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let phone = document.getElementById("signupPhone").value;
  let password = document.getElementById("signupPassword").value;
  let confirm = document.getElementById("signupConfirm").value;

  // Password match check
  if(password !== confirm){
    alert("❌ Passwords do not match!");
    return;
  }

  // Save user details in localStorage
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("phone", phone);
  localStorage.setItem("password", password);

  alert("✅ Signup successful! Please login.");
  window.location.href = "login.html";
});
