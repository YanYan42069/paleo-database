const SPECIES_PER_PAGE = 100;
const COLUMNS = 4;
const PER_COLUMN = SPECIES_PER_PAGE / COLUMNS;

async function loadSpecies() {
    const response = await fetch("data/species.json");
    const species = await response.json();

    // Sort alphabetically by name
    species.sort((a, b) => a.name.localeCompare(b.name));

    return species;
}

function renderPage(species, page) {
    const start = (page - 1) * SPECIES_PER_PAGE;
    const pageSpecies = species.slice(start, start + SPECIES_PER_PAGE);

    const container = document.getElementById("speciesContainer");
    container.innerHTML = "";

    // Create columns
    const columns = [];
    for (let i = 0; i < COLUMNS; i++) {
        const div = document.createElement("div");
        div.className = "column";
        columns.push(div);
    }

    // Fill columns sequentially (top→down column 1, then column 2)
    let currentColumn = 0;
    let prevLetter = "";

    pageSpecies.forEach((s, index) => {
        const letter = s.name.charAt(0).toUpperCase();

        // Insert letter label if this is the first species OR letter changed
        if (letter !== prevLetter) {
            const label = document.createElement("div");
            label.className = "letter-label";
            label.textContent = letter;
            columns[currentColumn].appendChild(label);
            prevLetter = letter;
        }

        // Create species entry
        const link = document.createElement("a");
        link.href = s.url;
        link.textContent = s.name;
        link.className = "species-link";

        columns[currentColumn].appendChild(link);

        // Move to next column after PER_COLUMN species
        if ((index + 1) % PER_COLUMN === 0) {
            currentColumn++;
        }
    });

    // Append all columns to container
    columns.forEach(col => container.appendChild(col));

    renderPagination(species, page);
}

function renderPagination(species, currentPage) {
    const totalPages = Math.ceil(species.length / SPECIES_PER_PAGE);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = (i === currentPage) ? "active-page" : "";
        btn.onclick = () => renderPage(species, i);
        pagination.appendChild(btn);
    }
}

loadSpecies().then(species => renderPage(species, 1));
// 🔍 FILTER FUNCTION
function filterSpeciesList(allSpecies) {
    const input = document.getElementById("searchInput");
    const query = input.value.toLowerCase();

    const filtered = allSpecies.filter(s =>
        s.name.toLowerCase().includes(query)
    );

    renderPage(filtered, 1); // Always reset to page 1 on search
}

// 🔧 Hook search bar listener after species load
document.addEventListener("DOMContentLoaded", async () => {
    const species = await loadSpecies();

    // Initial render
    renderPage(species, 1);

    // Search listener
    document.getElementById("searchInput").addEventListener("keyup", () => {
        filterSpeciesList(species);
    });
});

