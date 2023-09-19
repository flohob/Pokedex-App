function renderPokemonCard(poke, bgColor) {
    return `
    <div onclick="showContainer(${poke.id})" class="pokemoncard" id="${poke.id}" data-id="${poke.id}" style="background-color: ${bgColor};">
        <h1>#${poke.id} ${poke.name}</h1>
        <img class="PokePic" src="${poke.sprites.other.home.front_default}">
        <h2>${poke.types[0].type.name}</h2>
    </div>
    `;
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
        <div class="nextPokebtn">
        <img src="pre.png" class="nextPokebtn" onclick="showPreviousPokemon()"></button>
        <img class="PokePic" src="${pokemon.sprites.other.home.front_default}">
        <img src="next.png" class="nextPokebtn" onclick="showNextPokemon()"></button>
        </div>
        <div class="pokemenucon">
        <h2 class="stats" onclick="showStats()">Stats</h2>
        <h2 class="info" onclick="showInfo()">Info</h2>
        </div>
        <div id="pokeinfoCon">
        <p>Type: ${pokemon.types[0].type.name}</p>
        <p>Height: ${pokemon.height} decimetres</p>
        <p>Weight: ${pokemon.weight} hectograms</p>
        <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        </div>
        <div id="pokeChart" class="d-none">
  <canvas id="myChart"></canvas>
</div>
    </div>`
    
}

