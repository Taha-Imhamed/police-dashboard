// navigation.js

// Function to navigate to a specific page
function navigateTo(page) {
    window.location.href = `/${page}`;
  }
  
  // Function to check if the user is logged in
  function isLoggedIn() {
    const authToken = localStorage.getItem("authToken");
    return !!authToken; // Returns true if authToken exists
  }
  
  // Function to redirect users based on their role
  function redirectToDashboard(role) {
    switch (role) {
      case "admin":
        navigateTo("admin.html");
        break;
      case "dispatcher":
        navigateTo("dispatch.html");
        break;
      case "patrol-officer":
        navigateTo("officer_profile.html");
        break;
      default:
        navigateTo("dashboard.html"); // Default dashboard for unauthorized users
    }
  }
  
  // Function to log out the user
  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigateTo("login.html");
  }