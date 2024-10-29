class Agente {
    constructor(data) {
        this.nombre = data.displayName;
        this.rol = data.role?.displayName || 'Sin rol';
        this.imagen = data.fullPortrait;
        this.habilidades = data.abilities
            .filter(ability => ability.displayName)
            .map(ability => ability.displayName);
    }
