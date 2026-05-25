class CRepository {
    //Declaración métodos abstractos
    obtenerPaisesAPI() {
        throw new Error("Método 'obtenerPaisesAPI()' no implementado");
    }
    obtenerPaisesMONDO() {
        throw new Error("Método 'obtenerPaisesMONDO()' no implementado");
    }
    crearPais(paisData) {
        throw new Error("Método 'crearPais()' no implementado");
    }
    obtenerPaisId(id) {
        throw new Error("Método 'obtenerPaisId()' no implementado");
    }
    editarPais(id, paisData) {
        throw new Error("Método 'editarPais()' no implementado");
    }
    eliminarPais(id) {
        throw new Error("Método 'eliminarPais()' no implementado");
    }
}

export default CRepository;