document.addEventListener("DOMContentLoaded", () => {
    const weaponDetailsSection = document.getElementById("weapon-details");
  
    // Handle weapon verification form submission
    document.getElementById("weapon-search-form").addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const serialNumber = document.getElementById("serial-number").value;
  
      try {
        const response = await fetch(`/api/weapons/${serialNumber}`);
        if (response.ok) {
          const weapon = await response.json();
          document.getElementById("weapon-status").textContent = `Status: ${weapon.status}`;
          document.getElementById("owner-name").textContent = `Owner Name: ${weapon.owner_name}`;
        } else {
          alert("Weapon not found.");
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