let loadedPokemon = [];
let pokestats = [];
let statsname = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
let currentPokemonIndex = 0; // Startpunkt für das Laden der Pokémon
let loadStop = 20; // Anzahl der Pokémon, die pro Laden geladen werden sollen

async function loadPokemon() {
    // Berechne den Start- und Endpunkt basierend auf loadStop
    const startIndex = currentPokemonIndex + 1;
    const endIndex = currentPokemonIndex + loadStop;

    for (let i = startIndex; i <= endIndex; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        loadedPokemon.push(currentPokemon);
        const stats = currentPokemon.stats.map(stat => stat.base_stat);
        pokestats.push(stats);
    }
    renderPokeInfo();
    console.log(loadedPokemon);
    console.log(pokestats);
}


function setBackgroundColor(typeName) {
    switch (typeName) {
        case 'fire':
            return '#FF605C';
        case 'water':
            return 'blue';
            case 'grass':
                return '#00CA4e';
                case 'bug':
                return 'lightgreen';
        default:
            return '#FFBD44'; 
    }
}

function renderPokeInfo() {
    let pokemonContainer = document.getElementById('pokemon');
    pokemonContainer.innerHTML = '';

    loadedPokemon.forEach(poke => {
        const typeName = poke.types[0].type.name;
        const bgColor = setBackgroundColor(typeName);
        pokemonContainer.innerHTML += renderPokemonCard(poke, bgColor);
    });}


function searchPokemon() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const pokemonContainer = document.getElementById('pokemon');
    pokemonContainer.innerHTML = '';

    const matchingPokemon = loadedPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));

    matchingPokemon.forEach(poke => {
        const typeName = poke.types[0].type.name;
        const bgColor = setBackgroundColor(typeName);
        pokemonContainer.innerHTML += renderPokemonCard(poke, bgColor);
    });
}


function renderPokemonCard(poke, bgColor) {
    return `
    <div onclick="showContainer(${poke.id})" class="pokemoncard" id="${poke.id}" data-id="${poke.id}" style="background-color: ${bgColor};">
        <h1>#${poke.id} ${poke.name}</h1>
        <img class="PokePic" src="${poke.sprites.front_default}">
        <h2>${poke.types[0].type.name}</h2>
    </div>
    `;
}

function showContainer(pokemonId) {
    // Finde das ausgewählte Pokemon anhand seiner ID in loadedPokemon
    const selectedPokemon = loadedPokemon.find(pokemon => pokemon.id === pokemonId);

    if (selectedPokemon) {
        // Zeige die ausgewählten Pokemon-Informationen im Container an
        const containerpokeinfo = document.getElementById("containerpoke");
        containerpokeinfo.classList.remove('d-none');
        
        // Rufe die Hintergrundfarbe für den ausgewählten Pokémon-Typ auf
        const typeName = selectedPokemon.types[0].type.name;
        const bgColor = setBackgroundColor(typeName);

        // Setze die Hintergrundfarbe im CSS-Stil
        containerpokeinfo.style.backgroundColor = bgColor;

        containerpokeinfo.innerHTML = renderPokemonDetails(selectedPokemon);
        
        const containerpoke = document.getElementById('pokemon');
        containerpoke.classList.add('d-none');

        currentPokemonIndex = loadedPokemon.findIndex(pokemon => pokemon.id === pokemonId);

        renderChart(pokemonId);
        shownoButton();


        
        
    }
}

function renderPokemonDetails(pokemon, bgColor) {
    // Die Hintergrundfarbe wird nun im showContainer gesetzt, nicht mehr hier.
    return `
    <div>
        <div class="close-container" onclick="closebtn()" style="background-color: ${bgColor};">
        <div class="leftright"></div>
        <div class="rightleft"></div>
        <label class="close"></label>
        </div>
        <h1>${pokemon.id}. ${pokemon.name}</h1>
        <button onclick="showPreviousPokemon()"><</button>
        <img class="PokePic" src="${pokemon.sprites.front_default}">
        <button onclick="showNextPokemon()">></button>
        <h2>${pokemon.types[0].type.name}</h2>
        <p>Height: ${pokemon.height} decimetres</p>
        <p>Weight: ${pokemon.weight} hectograms</p>
        <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <div>
  <canvas id="myChart"></canvas>
</div>
    </div>`;
}

function closebtn() {
    let containerpokeinfo =  document.getElementById("containerpoke");
   containerpokeinfo.classList.add('d-none')
   let containerpoke = document.getElementById('pokemon');
   containerpoke.classList.remove('d-none');
   let btn = document.getElementById('loadbtn');
   btn.classList.remove('d-none');
}

function showNextPokemon() {
    if (currentPokemonIndex < loadedPokemon.length - 1) {
        currentPokemonIndex++;
        showContainer(loadedPokemon[currentPokemonIndex].id);
    }
}

function showPreviousPokemon() {
    if (currentPokemonIndex > 0) {
        currentPokemonIndex--;
        showContainer(loadedPokemon[currentPokemonIndex].id);
    }
}

function addLoad() {
    currentPokemonIndex += loadStop; // Erhöhe den Startpunkt für das Laden der neuen Pokémon
    loadPokemon(); // Lade die nächsten 20 Pokémon
}

function shownoButton() {
   let button =  document.getElementById('loadbtn');
   button.classList.add('d-none');
}

