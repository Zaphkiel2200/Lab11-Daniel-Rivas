class Agente {
    constructor(data) {
        this.nombre = data.displayName;
        this.rol = data.role?.displayName || 'Sin rol';
        this.imagen = data.fullPortrait;
        this.habilidades = data.abilities
            .filter(ability => ability.displayName)
            .map(ability => ability.displayName);
    }

    crearHTML() {
        return `
            <div class="agent-card">
                <img src="${this.imagen}" alt="${this.nombre}" class="agent-image">
                <div class="agent-info">
                    <h2 class="agent-name">${this.nombre}</h2>
                    <p class="agent-role">${this.rol}</p>
                    <ul class="agent-abilities">
                        ${this.habilidades.map(habilidad => `<li>${habilidad}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
}

class AgentesApp {
    constructor() {
        this.agentes = [];
        this.contenedor = document.getElementById('agentsContainer');
        this.inputBusqueda = document.getElementById('searchInput');
        this.init();
    }

    async init() {
        try {
            await this.obtenerAgentes();
            this.configurarBuscador();
            this.renderizarAgentes(this.agentes);
        } catch (error) {
            console.error('Error al inicializar la aplicación:', error);
            this.mostrarError();
        }
    }

    async obtenerAgentes() {
        try {
            const response = await fetch('https://valorant-api.com/v1/agents');
            const data = await response.json();
            
            // Filtrar agentes duplicados y crear instancias de Agente
            this.agentes = data.data
                .filter(agent => agent.isPlayableCharacter)
                .map(agent => new Agente(agent));
        } catch (error) {
            throw new Error('Error al obtener los agentes: ' + error.message);
        }
    }

    configurarBuscador() {
        this.inputBusqueda.addEventListener('input', () => {
            const busqueda = this.inputBusqueda.value.toLowerCase();
            const agentesFiltrados = this.agentes.filter(agente => 
                agente.nombre.toLowerCase().includes(busqueda)
            );
            this.renderizarAgentes(agentesFiltrados);
        });
    }

    renderizarAgentes(agentes) {
        this.contenedor.innerHTML = agentes.length 
            ? agentes.map(agente => agente.crearHTML()).join('')
            : '<p style="text-align: center; grid-column: 1/-1;">No se encontraron agentes</p>';
    }

    mostrarError() {
        this.contenedor.innerHTML = `
            <p style="text-align: center; grid-column: 1/-1; color: #ff4655;">
                Hubo un error al cargar los agentes. Por favor, intenta más tarde.
            </p>
        `;
    }
}

                                // Inicializar la aplicación cuando el DOM esté cargado ._.'
document.addEventListener('DOMContentLoaded', () => {
    new AgentesApp();
});