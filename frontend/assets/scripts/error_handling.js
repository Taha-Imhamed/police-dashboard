// Error handling utility
function handleError(error) {
    console.error("An error occurred:", error);
    alert("An unexpected error occurred. Please try again.");
  }
  
  // Example usage in any script:
  fetch("/api/example")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .catch(handleError);