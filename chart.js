function renderChart(pokemonId) {
    const selectedPokemon = loadedPokemon.find(pokemon => pokemon.id === pokemonId);

    if (selectedPokemon) {
        const ctx = document.getElementById('myChart');
        
        
        const stats = selectedPokemon.stats.map(stat => stat.base_stat);
        
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: statsname,
                datasets: [{
                    label: 'Pokemon Stats',
                    data: stats,
                    borderWidth: 1,
                    borderColor: 'black', 
                    backgroundColor: 'black', 
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 120, 
                        suggestedMin: 0, 
                        suggestedMax: 100 
                    },
                    x: {
                        ticks: {
                            fontColor: 'black' 
                        }
                    }
                }
            }
        });
    }
}
