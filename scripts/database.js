let allSpecies = [];
let filteredSpecies = [];
let currentPage = 1;
const itemsPerPage = 100;

async function loadSpecies() {
    const response = await fetch("data/species.json");
    allSpecies = await response.json();
    filteredSpecies = allSpecies; // default: show everything
    renderPage();
}

function filterByLetter(letter) {
    currentPage = 1;

    if (letter === "ALL") {
        filteredSpecies = allSpecies;
    } else {
        filteredSpecies = allSpecies.filter(s => s.name.startsWith(letter));
    }

    renderPage();
}

function renderPage() {
    const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = filteredSpecies.slice(startIndex, startIndex + itemsPerPage);

    const listContainer = document.getElementById("speciesList");
    listContainer.innerHTML = "";

    pageItems.forEach(s => {
        const item = document.createElement("div");
        item.classList.add("species-item");
        item.innerHTML = `<a href="${s.url}">${s.name}</a>`;
        listContainer.appendChild(item);
    });

    renderPaginationControls(totalPages);
}

function renderPaginationControls(totalPages) {
    const container = document.getElementById("pagination");
    container.innerHTML = "";

    if (currentPage > 1) {
        let prev = document.createElement("button");
        prev.textContent = "← Previous";
        prev.onclick = () => { currentPage--; renderPage(); };
        container.appendChild(prev);
    }

    for (let i = 1; i <= totalPages; i++) {
        let btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active-page");
        btn.onclick = () => { currentPage = i; renderPage(); };
        container.appendChild(btn);
    }

    if (currentPage < totalPages) {
        let next = document.createElement("button");
        next.textContent = "Next →";
        next.onclick = () => { currentPage++; renderPage(); };
        container.appendChild(next);
    }
}

loadSpecies();
