// scripts.js

// Fake data for demonstration purposes (to be replaced with real backend data later)
const fakeWeaponData = [
    {
      citizenId: "123456789",
      citizenName: "Taha Imhamed",
      weaponType: "Handgun",
      serialNumber: "1122334455",
      purchaseDate: "2023-01-15",
      weaponModel: "Glock 19",
      additionalInfo: "Registered under legal ownership."
    },
    {
      citizenId: "987654321",
      citizenName: "John Doe",
      weaponType: "Rifle",
      serialNumber: "5544332211",
      purchaseDate: "2022-06-10",
      weaponModel: "AR-15",
      additionalInfo: "Used for hunting purposes."
    }
  ];
  
  // DOM Elements
  const registerWeaponFormSection = document.getElementById("register-weapon-form-section");
  const viewWeaponsSection = document.getElementById("view-weapons-section");
  const registerWeaponBtn = document.getElementById("register-weapon-btn");
  const viewWeaponsBtn = document.getElementById("view-weapons-btn");
  const backBtn = document.getElementById("back-btn");
  const weaponsTableBody = document.querySelector("#weapons-table tbody");
  
  // Event Listeners
  document.addEventListener("DOMContentLoaded", () => {
    // Show/hide sections based on button clicks
    registerWeaponBtn.addEventListener("click", () => {
      hideAllSections();
      registerWeaponFormSection.classList.remove("hidden");
      animateEntrance(registerWeaponFormSection);
    });
  
    viewWeaponsBtn.addEventListener("click", () => {
      hideAllSections();
      viewWeaponsSection.classList.remove("hidden");
      populateWeaponsTable(fakeWeaponData); // Populate table with fake data
      animateEntrance(viewWeaponsSection);
    });
  
    backBtn.addEventListener("click", () => {
      hideAllSections();
      animateEntrance(document.querySelector(".main"));
    });
  
    // Handle search functionality in the "View Weapons" section
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search by Name, ID, or Serial Number";
    searchInput.className = "search-input";
    searchInput.style.marginBottom = "1rem";
    searchInput.style.padding = "0.5rem";
    searchInput.style.width = "100%";
    searchInput.style.borderRadius = "5px";
    searchInput.style.border = "1px solid #ADD8E6";
    searchInput.style.background = "rgba(255, 255, 255, 0.1)";
    searchInput.style.color = "#fff";
  
    viewWeaponsSection.insertBefore(searchInput, weaponsTableBody);
  
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filteredData = fakeWeaponData.filter(
        (weapon) =>
          weapon.citizenName.toLowerCase().includes(query) ||
          weapon.citizenId.includes(query) ||
          weapon.serialNumber.includes(query)
      );
      populateWeaponsTable(filteredData);
    });
  });
  
  // Helper Functions
  function hideAllSections() {
    registerWeaponFormSection.classList.add("hidden");
    viewWeaponsSection.classList.add("hidden");
  }
  
  function animateEntrance(element) {
    element.style.animation = "fadeIn 0.5s ease-in-out, slideIn 0.5s ease-in-out";
    setTimeout(() => {
      element.style.animation = "";
    }, 500);
  }
  
  function populateWeaponsTable(data) {
    weaponsTableBody.innerHTML = ""; // Clear existing rows
  
    if (data.length === 0) {
      const noResultsRow = document.createElement("tr");
      const noResultsCell = document.createElement("td");
      noResultsCell.colSpan = 5;
      noResultsCell.textContent = "No matching records found.";
      noResultsCell.style.textAlign = "center";
      noResultsCell.style.color = "#FF4500";
      noResultsRow.appendChild(noResultsCell);
      weaponsTableBody.appendChild(noResultsRow);
      return;
    }
  
    data.forEach((weapon) => {
      const row = document.createElement("tr");
  
      const citizenIdCell = document.createElement("td");
      citizenIdCell.textContent = weapon.citizenId;
  
      const citizenNameCell = document.createElement("td");
      citizenNameCell.textContent = weapon.citizenName;
  
      const weaponTypeCell = document.createElement("td");
      weaponTypeCell.textContent = weapon.weaponType;
  
      const serialNumberCell = document.createElement("td");
      serialNumberCell.textContent = weapon.serialNumber;
  
      const purchaseDateCell = document.createElement("td");
      purchaseDateCell.textContent = weapon.purchaseDate;
  
      row.appendChild(citizenIdCell);
      row.appendChild(citizenNameCell);
      row.appendChild(weaponTypeCell);
      row.appendChild(serialNumberCell);
      row.appendChild(purchaseDateCell);
  
      weaponsTableBody.appendChild(row);
    });
  }