function renderChart(pokemonId) {
    const selectedPokemon = loadedPokemon.find(pokemon => pokemon.id === pokemonId);

    if (selectedPokemon) {
        const ctx = document.getElementById('myChart');
        
        // Hole die Stats des ausgewählten Pokémon
        const stats = selectedPokemon.stats.map(stat => stat.base_stat);
        
        // Erstelle das Diagramm mit den Stats des ausgewählten Pokémon
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: statsname,
                datasets: [{
                    label: 'Pokemon Stats',
                    data: stats,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 120, // Setze den maximalen Wert der Y-Achse auf 100
                        suggestedMin: 0, // Optional: Kann auf 0 gesetzt werden, um sicherzustellen, dass die Y-Achse bei 0 beginnt
                        suggestedMax: 100 // Optional: Kann auf 100 gesetzt werden, um den maximalen Wert festzulegen
                    }
                }
            }
        });
    }
}