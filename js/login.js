// =======================
// DEMO USERS
// =======================
const demoUsers = {
  admin: {
    username: "admin",
    password: "admin123",
    role: "Admin",
  },
  encoder: {
    username: "encoder",
    password: "encoder123",
    role: "Encoder",
  },
};

// =======================
// ELEMENTS
// =======================
const tabs = document.querySelectorAll(".tabs button");
const btn = document.querySelector(".btn");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// =======================
// TAB SWITCHING
// =======================
let activeRole = "Encoder";

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove(
        "bg-white",
        "shadow-sm",
        "text-[#1a1a2e]",
        "font-semibold",
      );
      t.classList.add("text-gray-500", "font-medium");
    });

    tab.classList.add(
      "bg-white",
      "shadow-sm",
      "text-[#1a1a2e]",
      "font-semibold",
    );

    activeRole = tab.textContent.trim();
    btn.textContent = "Sign In as " + activeRole;
  });
});

// =======================
// LOGIN
// =======================
btn.addEventListener("click", function () {
  const username = usernameInput.value;
  const password = passwordInput.value;

  let user = null;

  if (activeRole === "Admin") {
    if (
      username === demoUsers.admin.username &&
      password === demoUsers.admin.password
    ) {
      user = demoUsers.admin;
    }
  }

  if (activeRole === "Encoder") {
    if (
      username === demoUsers.encoder.username &&
      password === demoUsers.encoder.password
    ) {
      user = demoUsers.encoder;
    }
  }

  if (user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));

    window.location.href =
      user.role === "Admin" ? "admin.html" : "encoder.html";
  } else {
    alert("Invalid credentials for " + activeRole);
  }
});
