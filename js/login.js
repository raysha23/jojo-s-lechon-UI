//File Path: js/login.js
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

// TAB SWITCHING
const tabs = document.querySelectorAll(".tabs button");
const btn = document.querySelector(".btn");

tabs.forEach((t) => {
  t.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.remove("active"));
    t.classList.add("active");
    btn.textContent = "Sign In as " + t.textContent;
  });
});

// LOGIN
btn.addEventListener("click", function () {
  const activeRole = document.querySelector(".tabs button.active").textContent;

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

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
