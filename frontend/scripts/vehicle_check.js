// Simulated fake data for the license plate "cd1628a"
const fakeVehicleData = {
    "cd1628a": {
      ownerName: "John Doe",
      color: "Red",
      engine: "V8",
      horsepower: "450 HP",
      insurance: "Valid until 2024-12-31",
      warrants: "None"
    }
  };
  
  // Function to handle form submission
  document.getElementById("vehicle-search-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing the page
  
    // Get the entered plate number
    const plateNumber = document.getElementById("plate-number").value.trim().toLowerCase();
  
    // Check if the plate number exists in the fake data
    if (fakeVehicleData[plateNumber]) {
      const vehicle = fakeVehicleData[plateNumber];
  
      // Update the vehicle details section with the fetched data
      document.getElementById("owner-name").textContent = `Owner Name: ${vehicle.ownerName}`;
      document.getElementById("color").textContent = `Color: ${vehicle.color}`;
      document.getElementById("engine").textContent = `Engine: ${vehicle.engine}`;
      document.getElementById("horsepower").textContent = `Horsepower: ${vehicle.horsepower}`;
      document.getElementById("insurance").textContent = `Insurance: ${vehicle.insurance}`;
      document.getElementById("warrants").textContent = `Warrants: ${vehicle.warrants}`;
    } else {
      // Display "No data found" if the plate number is not recognized
      document.getElementById("owner-name").textContent = "Owner Name: No data found";
      document.getElementById("color").textContent = "Color: No data found";
      document.getElementById("engine").textContent = "Engine: No data found";
      document.getElementById("horsepower").textContent = "Horsepower: No data found";
      document.getElementById("insurance").textContent = "Insurance: No data found";
      document.getElementById("warrants").textContent = "Warrants: No data found";
    }
  });
  
  // Example logout function (you can replace this with actual logout logic)
  function logout() {
    alert("Logging out...");
    // Redirect to login page or perform other actions
  }