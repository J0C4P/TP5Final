import { Country } from '../models/Country.mjs';
import CRepository from './repository.mjs';

const API_ENDPOINT = 'https://restcountries.com/v3.1/region/america';

//Definición metodos de clase
class CountryRepository extends CRepository {
    async obtenerPaisesAPI(){
        try {
            //Obtener data del endpoint
            const response = await fetch(API_ENDPOINT);
            
            if (!response.ok) {
                throw new Error(`Solicitud a la API falló con el estado ${response.status}`);
            }
            
            const data = await response.json();
            
            //Filtro y mapeo de datos de paises
            const countries = [];
            for (const country of data) {
                //Filtro lenguaje español
                if (country.languages && !country.languages['spa']) {
                    continue;
                }
                //Mapeo de datos
                const countryData = {
                    nombre: {
                        comun:   country.translations?.spa?.common  || country.name?.common  || '',
                        oficial: country.translations?.spa?.official || country.name?.official || ''
                    },
                    capital: country.capital || [],
                    fronteras: country.borders || [],
                    subregion: country.subregion || '',
                    poblacion: country.population || 0,
                    area: country.area || 0,
                    gini: country.gini ? Object.values(country.gini) : null,
                    bandera: country.flag || '',
                    zonahoraria: country.timezones ? country.timezones[0] : '',
                    creador: 'Capdevila, José'
                };
                countries.push(new Country(countryData));
                console.log(`Procesado país: ${countryData.nombre.comun},${countryData.gini}`);
            }
            console.log(`Se han obtenido ${countries.length} paises del endpoint`);
            //--//
            //Guardadar de paises en la base de datos
            //await Country.insertMany(countries);
            //--// 
            return countries;
        } catch (error) {
            console.error('Error al acceder a los paises del endpoint: ', error);
            throw error;
        }
    }
    async obtenerPaisesMONDO(){
        try {
            const countries = await Country.find();
            console.log(`Se han obtenido ${countries.length} objetos de la base de datos`);
            return countries;
        }
        catch (error) {
            console.error('Error al acceder a los paises de mondoDB: ', error);
            throw error;
        }
    }

    async crearPais(paisData){
        const newCountry = new Country(paisData);
        return await newCountry.save();
    }

    async obtenerPaisId(id){
        return await Country.findById(id);
    }
    async editarPais(id, paisData){
        return await Country.findByIdAndUpdate(id, paisData, { returnDocument: 'after' });
    }
    
    async eliminarPais(id){
        return await Country.findByIdAndDelete(id);
    }
}

export default new CountryRepository();
