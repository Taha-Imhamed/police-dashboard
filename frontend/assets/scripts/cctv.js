document.addEventListener("DOMContentLoaded", () => {
    const liveFeed = document.getElementById("live-feed");
  
    // Simulate fetching live feed URL from the backend
    fetch("/api/cctv/live-feed")
      .then((response) => response.json())
      .then((data) => {
        liveFeed.src = data.feed_url;
      });
  
    // Handle camera controls
    document.getElementById("zoom-in").addEventListener("click", () => {
      fetch("/api/cctv/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "zoom_in" }),
      });
    });
  
    document.getElementById("zoom-out").addEventListener("click", () => {
      fetch("/api/cctv/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "zoom_out" }),
      });
    });
  
    document.getElementById("pan-left").addEventListener("click", () => {
      fetch("/api/cctv/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pan_left" }),
      });
    });
  
    document.getElementById("pan-right").addEventListener("click", () => {
      fetch("/api/cctv/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pan_right" }),
      });
    });
  
    // Back button functionality
    document.getElementById("back-btn").addEventListener("click", () => {
      window.location.href = "/dashboard.html";
    });
  });