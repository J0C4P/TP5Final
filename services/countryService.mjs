import CountryRepository from '../repositories/countryRepository.mjs';

export async function obtenerPaisesAPI(){
    return await CountryRepository.obtenerPaisesAPI();
}
export async function obtenerPaisesMONDO(){
    return await CountryRepository.obtenerPaisesMONDO();
}

export async function crearPais(paisData){
    return await CountryRepository.crearPais(paisData);
}

export async function obtenerPaisId(id){
    return await CountryRepository.obtenerPaisId(id);
}
export async function editarPais(id, paisData){
    return await CountryRepository.editarPais(id, paisData);
}

export async function eliminarPais(id){
    return await CountryRepository.eliminarPais(id);
}
