document.getElementById('citizen-search-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const citizenIdOrName = document.getElementById('citizen-id').value.trim();
  if (!citizenIdOrName) {
    alert('Please enter a valid Citizen ID or Name.');
    return;
  }

  try {
    const response = await fetch(`/api/citizens?query=${encodeURIComponent(citizenIdOrName)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch citizen details.');
    }

    const data = await response.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    displayCitizenDetails(data);
  } catch (error) {
    console.error(error);
    alert('An error occurred while fetching citizen details.');
  }
});

function displayCitizenDetails(citizen) {
  document.getElementById('citizen-name').textContent = `Name: ${citizen.name || 'Not Available'}`;
  document.getElementById('citizen-dob').textContent = `Date of Birth: ${citizen.dob || 'Not Available'}`;
  document.getElementById('criminal-record').textContent = `Criminal Record: ${citizen.criminalRecord || 'None'}`;
}

function logout() {
  alert('Logging out...');
  // Simulate logout by redirecting to login page
  window.location.href = '/login';
}