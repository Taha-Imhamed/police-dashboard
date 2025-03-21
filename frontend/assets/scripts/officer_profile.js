document.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/login.html";
      return;
    }
  
    const officerName = document.getElementById("officer-name");
    const officerRank = document.getElementById("officer-rank");
    const officerStatus = document.getElementById("officer-status");
  
    fetch("/api/profile", {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        officerName.textContent = data.name;
        officerRank.textContent = data.rank;
        officerStatus.textContent = data.status;
      })
      .catch(() => (window.location.href = "/login.html"));
  
    document.getElementById("back-btn").addEventListener("click", () => {
      window.location.href = "/dashboard.html";
    });
  });