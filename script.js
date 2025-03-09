document.addEventListener('DOMContentLoaded', () => {
    const roulette = document.getElementById('roulette');
    const spinButton = document.getElementById('spinButton');
    const selectedLevel = document.getElementById('selectedLevel');
    let levels = [];

    // Función para obtener los niveles desde la API de Pointercrate
    async function fetchLevels() {
        try {
            const response = await fetch('https://pointercrate.com/api/v2/demons/listed');
            const data = await response.json();
            levels = data.map(demon => demon.name);
        } catch (error) {
            console.error('Error al obtener los niveles:', error);
            roulette.textContent = "Error al cargar niveles";
        }
    }

    // Función para seleccionar un nivel al azar
    function spinRoulette() {
        if (levels.length === 0) {
            roulette.textContent = "Cargando...";
            return;
        }
        const randomIndex = Math.floor(Math.random() * levels.length);
        const selected = levels[randomIndex];
        roulette.textContent = selected;
        selectedLevel.textContent = `Nivel seleccionado: ${selected}`;
    }

    spinButton.addEventListener('click', spinRoulette);

    // Obtener los niveles al cargar la página
    fetchLevels();
});

