document.addEventListener("DOMContentLoaded", () => {
    const activeCasesList = document.getElementById("active-cases");
  
    // Fetch active cases from the backend
    fetch("/api/cases?status=active")
      .then((response) => response.json())
      .then((cases) => {
        cases.forEach((caseItem) => {
          const li = document.createElement("li");
          li.textContent = `${caseItem.title}: ${caseItem.description}`;
          activeCasesList.appendChild(li);
        });
      });
  
    // Handle case creation form submission
    document.getElementById("case-form").addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const title = document.getElementById("case-title").value;
      const description = document.getElementById("case-description").value;
  
      try {
        await fetch("/api/cases", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        });
  
        alert("Case created successfully!");
        window.location.reload(); // Refresh the page to update the case list
      } catch (error) {
        alert("Failed to create case. Please try again.");
      }
    });
  
    // Back button functionality
    document.getElementById("back-btn").addEventListener("click", () => {
      window.location.href = "/dashboard.html";
    });
  });