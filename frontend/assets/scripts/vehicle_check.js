document.addEventListener("DOMContentLoaded", () => {
    const vehicleDetailsSection = document.getElementById("vehicle-details");
  
    // Handle vehicle search form submission
    document.getElementById("vehicle-search-form").addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const plateNumber = document.getElementById("plate-number").value;
  
      try {
        const response = await fetch(`/api/vehicles/${plateNumber}`);
        if (response.ok) {
          const vehicle = await response.json();
          document.getElementById("owner-name").textContent = `Owner Name: ${vehicle.owner_name}`;
          document.getElementById("status").textContent = `Status: ${vehicle.status}`;
        } else {
          alert("Vehicle not found.");
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    });
  
    // Back button functionality
    document.getElementById("back-btn").addEventListener("click", () => {
      window.location.href = "/dashboard.html";
    });
  });