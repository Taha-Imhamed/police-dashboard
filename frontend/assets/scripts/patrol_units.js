document.addEventListener("DOMContentLoaded", () => {
    const unitStatusList = document.getElementById("unit-status-list");
  
    // Fetch patrol unit status from the backend
    fetch("/api/patrol-units")
      .then((response) => response.json())
      .then((units) => {
        units.forEach((unit) => {
          const li = document.createElement("li");
          li.textContent = `Unit ID: ${unit.id}, Name: ${unit.name}, Officers: ${unit.officers.length}`;
          unitStatusList.appendChild(li);
        });
      });
  
    // Handle creating a new patrol unit
    document.getElementById("create-unit-form").addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const unitName = document.getElementById("unit-name").value;
  
      try {
        await fetch("/api/patrol-units", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: unitName }),
        });
  
        alert("Patrol unit created successfully!");
        window.location.reload(); // Refresh the page to update the unit list
      } catch (error) {
        alert("Failed to create patrol unit. Please try again.");
      }
    });
  
    // Handle assigning an officer to a patrol unit
    document.getElementById("assign-officer-form").addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const unitId = document.getElementById("unit-id").value;
      const officerId = document.getElementById("officer-id").value;
  
      try {
        await fetch("/api/patrol-units/assign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ unit_id: unitId, officer_id: officerId }),
        });
  
        alert("Officer assigned to patrol unit successfully!");
        window.location.reload(); // Refresh the page to update the unit list
      } catch (error) {
        alert("Failed to assign officer. Please try again.");
      }
    });
  
    // Back button functionality
    document.getElementById("back-btn").addEventListener("click", () => {
      window.location.href = "/dashboard.html";
    });
  });