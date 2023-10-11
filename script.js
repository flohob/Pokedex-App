let loadedPokemon = [];
let pokestats = [];
let statsname = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
let currentPokemonIndex = 0;
let loadStop = 20;

async function loadPokemon() {
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
}

console.log(loadedPokemon);


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


function showContainer(pokemonId) {
    const selectedPokemon = loadedPokemon.find(pokemon => pokemon.id === pokemonId);

    if (!selectedPokemon) return;

    const containerpokeinfo = document.getElementById("containerpoke");
    const typeName = selectedPokemon.types[0].type.name;
    const bgColor = setBackgroundColor(typeName);

    containerpokeinfo.classList.remove('d-none');
    containerpokeinfo.style.backgroundColor = bgColor;
    containerpokeinfo.innerHTML = renderPokemonDetails(selectedPokemon);

    document.getElementById('pokemon').classList.add('d-none');

    currentPokemonIndex = selectedPokemon;

    renderChart(pokemonId);
    shownoButton();
}

function closebtn() {
    let containerpokeinfo =  document.getElementById("containerpoke");
   containerpokeinfo.classList.add('d-none');
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
    currentPokemonIndex += loadStop; 
    loadPokemon();
}

function shownoButton() {
   let button =  document.getElementById('loadbtn');
   button.classList.add('d-none');
}

function showStats() {
    let stats = document.getElementById('pokeinfoCon');
    let chat = document.getElementById('pokeChart');

    stats.classList.add('d-none');
    chat.classList.remove('d-none');
}

function showInfo() {
    let stats = document.getElementById('pokeinfoCon');
    let chat = document.getElementById('pokeChart');

    stats.classList.remove('d-none');
    chat.classList.add('d-none');
}
