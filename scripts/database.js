async function loadSpecies() {
  const response = await fetch('data/species.json');
  const speciesData = await response.json();

  // Sort alphabetically
  speciesData.sort((a, b) => a.name.localeCompare(b.name));

  const container = document.getElementById('speciesList');
  let currentLetter = '';

  speciesData.forEach(species => {
    const firstLetter = species.name[0].toUpperCase();

    if (firstLetter !== currentLetter) {
      currentLetter = firstLetter;
      const header = document.createElement('h2');
      header.textContent = currentLetter;
      container.appendChild(header);
    }

    const link = document.createElement('a');
    link.href = species.url;
    link.textContent = species.name;
    link.classList.add('species-link');

    const entry = document.createElement('p');
    entry.appendChild(link);
    container.appendChild(entry);
  });
}

function filterSpecies() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const links = document.querySelectorAll('#speciesList p');
  links.forEach(link => {
    const text = link.textContent.toLowerCase();
    link.style.display = text.includes(search) ? '' : 'none';
  });
}

loadSpecies();
