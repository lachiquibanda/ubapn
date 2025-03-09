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
    
    // Simulación de giro con animación
    roulette.style.transform = `rotate(${360 * 5}deg)`; // 5 vueltas antes de detenerse

    setTimeout(() => {
        roulette.textContent = selected;
        selectedLevel.textContent = `Nivel seleccionado: ${selected}`;
        
        // Agregar el nombre a la lista de la derecha
        const listItem = document.createElement('li');
        listItem.textContent = selected;
        document.getElementById('levelList').appendChild(listItem);
    }, 2000); // Coincide con la duración de la animación
}

