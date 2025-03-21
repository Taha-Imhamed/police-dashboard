document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
  
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token); // Save token
        localStorage.setItem("userRole", data.role); // Save user role
        redirectToDashboard(data.role); // Redirect based on role
      } else {
        errorMessage.textContent = "Invalid username or password.";
      }
    } catch (error) {
      errorMessage.textContent = "An error occurred. Please try again.";
    }
  });
  
  // Redirect to dashboard based on role
  function redirectToDashboard(role) {
    switch (role) {
      case "admin":
        window.location.href = "/admin.html";
        break;
      case "dispatcher":
        window.location.href = "/dispatch.html";
        break;
      case "patrol-officer":
        window.location.href = "/officer_profile.html";
        break;
      default:
        window.location.href = "/dashboard.html"; // Default dashboard
    }
  }