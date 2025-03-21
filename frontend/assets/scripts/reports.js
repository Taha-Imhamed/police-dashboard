document.addEventListener("DOMContentLoaded", () => {
    const uploadedReportsList = document.getElementById("uploaded-reports");
  
    // Fetch uploaded reports from the backend
    fetch("/api/reports")
      .then((response) => response.json())
      .then((reports) => {
        reports.forEach((report) => {
          const li = document.createElement("li");
          li.textContent = `Case ID: ${report.case_id} - Uploaded at: ${report.uploaded_at}`;
          uploadedReportsList.appendChild(li);
        });
      });
  
    // Handle report upload form submission
    document.getElementById("upload-report-form").addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const caseId = document.getElementById("case-id").value;
      const reportFile = document.getElementById("report-file").files[0];
  
      const formData = new FormData();
      formData.append("case_id", caseId);
      formData.append("report_file", reportFile);
  
      try {
        await fetch("/api/reports", {
          method: "POST",
          body: formData,
        });
  
        alert("Report uploaded successfully!");
        window.location.reload(); // Refresh the page to update the report list
      } catch (error) {
        alert("Failed to upload report. Please try again.");
      }
    });
  
    // Back button functionality
    document.getElementById("back-btn").addEventListener("click", () => {
      window.location.href = "/dashboard.html";
    });
  });