document.addEventListener("DOMContentLoaded", () => {
    const pendingTasksList = document.getElementById("pending-tasks");
  
    // Fetch pending tasks from the backend
    fetch("/api/tasks?status=pending")
      .then((response) => response.json())
      .then((tasks) => {
        tasks.forEach((task) => {
          const li = document.createElement("li");
          li.textContent = `${task.description} (Assigned to Officer ${task.officer_id})`;
          pendingTasksList.appendChild(li);
        });
      });
  
    // Handle task assignment form submission
    document.getElementById("task-form").addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const officerId = document.getElementById("officer-id").value;
      const taskDescription = document.getElementById("task-description").value;
  
      try {
        await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ officer_id: officerId, description: taskDescription }),
        });
  
        alert("Task assigned successfully!");
        window.location.reload(); // Refresh the page to update the task list
      } catch (error) {
        alert("Failed to assign task. Please try again.");
      }
    });
  
    // Back button functionality
    document.getElementById("back-btn").addEventListener("click", () => {
      window.location.href = "/dashboard.html";
    });
  });