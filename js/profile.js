// profile.js

// Example: Toggle edit mode for profile info
const editBtn = document.getElementById("edit-profile-btn");
const saveBtn = document.getElementById("save-profile-btn");
const profileFields = document.querySelectorAll(".profile-field");

if (editBtn && saveBtn && profileFields) {
  editBtn.addEventListener("click", () => {
    profileFields.forEach(field => field.removeAttribute("readonly"));
    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
  });

  saveBtn.addEventListener("click", () => {
    profileFields.forEach(field => field.setAttribute("readonly", true));
    saveBtn.style.display = "none";
    editBtn.style.display = "inline-block";
    
    // Optionally, send data to server
    console.log("Profile data saved!");
  });
}

// Example: Change background dynamically
const bgSelector = document.getElementById("bg-selector");
const body = document.body;

if (bgSelector) {
  bgSelector.addEventListener("change", (e) => {
    body.style.backgroundImage = `url('${e.target.value}')`;
  });
}

// Example: Show/hide sections
const toggleBtns = document.querySelectorAll(".toggle-section");
toggleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const section = document.getElementById(btn.dataset.target);
    if (section) {
      section.classList.toggle("hidden");
    }
  });
});
