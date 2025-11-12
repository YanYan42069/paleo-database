// --- Get the species name from the URL (example: ?name=allosaurus-fragilis)
const params = new URLSearchParams(window.location.search);
const speciesName = params.get('name');

const container = document.getElementById("speciesContent");

// --- Fetch JSON data
fetch("../data/species-data.json")
  .then(response => response.json())
  .then(data => {
    const species = data.find(s => s.id === speciesName);

    if (!species) {
      container.innerHTML = `<p>Species not found.</p>`;
      return;
    }

    // --- Build the page dynamically
    container.innerHTML = `
      <h1><em>${species.name}</em></h1>
      <p><strong>Meaning:</strong> "${species.meaning}"</p>
      <p><strong>Described by:</strong> ${species.describedBy}</p>

      <div class="image-container">
        <img src="../images/${species.image}" alt="${species.name}">
        <p><em>${species.caption}</em></p>
      </div>

      <div class="info-section">
        <h2>Quick Facts</h2>
        <div class="info-grid">
          <div><strong>Formation:</strong></div><div>${species.formation}</div>
          <div><strong>Period:</strong></div><div>${species.period}</div>
          <div><strong>Location:</strong></div><div>${species.location}</div>
          <div><strong>Estimated Length:</strong></div><div>${species.length}</div>
          <div><strong>Estimated Weight:</strong></div><div>${species.weight}</div>
        </div>
      </div>

      <div class="info-section">
        <h2>Description</h2>
        <p>${species.description}</p>
      </div>

      <div class="info-section">
        <h2>Specimens & Discoveries</h2>
        <p>${species.discovery}</p>
      </div>

      <a href="../database.html" class="back-link">← Back to Database</a>
    `;
  })
  .catch(err => {
    console.error(err);
    container.innerHTML = `<p>Error loading data.</p>`;
  });
