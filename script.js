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
            populateRoulette();
        } catch (error) {
            console.error('Error al obtener los niveles:', error);
        }
    }

    // Función para agregar los niveles a la ruleta
    function populateRoulette() {
        const angleStep = 360 / levels.length;
        levels.forEach((level, index) => {
            const levelElement = document.createElement('div');
            levelElement.className = 'level';
            levelElement.style.transform = `rotate(${index * angleStep}deg)`;
            levelElement.innerHTML = `<span style="transform: rotate(-${index * angleStep}deg)">${level}</span>`;
            roulette.appendChild(levelElement);
        });
    }

    // Función para girar la ruleta y seleccionar un nivel al azar
    function spinRoulette() {
        const randomIndex = Math.floor(Math.random() * levels.length);
        const selected = levels[randomIndex];
        const rotation = (randomIndex * (360 / levels.length)) + (360 * 5); // 5 vueltas completas
        roulette.style.transition = 'transform 4s ease-out';
        roulette.style.transform = `rotate(-${rotation}deg)`;
        setTimeout(() => {
            selectedLevel.textContent = `Nivel seleccionado: ${selected}`;
        }, 4000); // Coincide con la duración de la animación
    }

    spinButton.addEventListener('click', spinRoulette);

    // Obtener los niveles al cargar la página
    fetchLevels();
});
