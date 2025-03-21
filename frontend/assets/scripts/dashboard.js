document.addEventListener("DOMContentLoaded", () => {
    const activeCasesCount = document.getElementById("active-cases-count");
    const onDutyCount = document.getElementById("on-duty-count");
    const pendingTasksCount = document.getElementById("pending-tasks-count");
    const taskList = document.getElementById("task-list");
  
    // Simulated API calls to fetch data
    fetch("/api/cases")
      .then((response) => response.json())
      .then((data) => {
        activeCasesCount.textContent = data.activeCases.length;
      });
  
    fetch("/api/officers")
      .then((response) => response.json())
      .then((data) => {
        onDutyCount.textContent = data.filter((officer) => officer.status === "on-duty").length;
      });
  
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        pendingTasksCount.textContent = data.filter((task) => task.status === "pending").length;
  
        // Populate task list
        data.forEach((task) => {
          const li = document.createElement("li");
          li.textContent = `${task.title} (${task.status})`;
          taskList.appendChild(li);
        });
      });
  
    // Logout button functionality
    document.getElementById("logout-btn").addEventListener("click", () => {
      fetch("/logout", { method: "POST" }).then(() => (window.location.href = "/login.html"));
    });
  });