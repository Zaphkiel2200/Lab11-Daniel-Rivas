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
