function renderChart(pokemonId) {
    const selectedPokemon = loadedPokemon.find(pokemon => pokemon.id === pokemonId);

    if (selectedPokemon) {
        const ctx = document.getElementById('myChart');
        
        // Hole die Stats des ausgewählten Pokémon
        const stats = selectedPokemon.stats.map(stat => stat.base_stat);
        
        // Erstelle das Diagramm mit den Stats des ausgewählten Pokémon
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: statsname,
                datasets: [{
                    label: 'Pokemon Stats',
                    data: stats,
                    borderWidth: 1,
                    borderColor: 'black', // Setze die Balkenfarbe auf Schwarz
                    backgroundColor: 'black', // Setze die Hintergrundfarbe der Balken auf Schwarz
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 150, // Setze den maximalen Wert der Y-Achse auf 100
                        suggestedMin: 0, // Optional: Kann auf 0 gesetzt werden, um sicherzustellen, dass die Y-Achse bei 0 beginnt
                        suggestedMax: 100 // Optional: Kann auf 100 gesetzt werden, um den maximalen Wert festzulegen
                    },
                    x: {
                        ticks: {
                            fontColor: 'black' // Setze die Farbe der X-Achsenticks auf Schwarz
                        }
                    }
                }
            }
        });
    }
}
