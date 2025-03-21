document.addEventListener("DOMContentLoaded", () => {
    const inventoryList = document.getElementById("inventory-items");
  
    // Fetch current inventory from the backend
    fetch("/api/inventory")
      .then((response) => response.json())
      .then((items) => {
        items.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `${item.name} - Quantity: ${item.quantity}`;
          inventoryList.appendChild(li);
        });
      });
  
    // Handle adding a new inventory item
    document.getElementById("add-item-form").addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const itemName = document.getElementById("item-name").value;
      const quantity = document.getElementById("quantity").value;
  
      try {
        await fetch("/api/inventory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: itemName, quantity }),
        });
  
        alert("Item added successfully!");
        window.location.reload(); // Refresh the page to update the inventory list
      } catch (error) {
        alert("Failed to add item. Please try again.");
      }
    });
  
    // Back button functionality
    document.getElementById("back-btn").addEventListener("click", () => {
      window.location.href = "/dashboard.html";
    });
  });