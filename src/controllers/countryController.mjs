import {obtenerPaisesAPI, obtenerPaisesMONDO,
    crearPais,
    obtenerPaisId,editarPais,
    eliminarPais
} from '../services/countryService.mjs';

//Obtener Paises
export async function obtenerPaisesAPIController(req, res) {
    try {
        const countries = await obtenerPaisesAPI();
        //Renderizar en dashboard.ejs
        res.status(200).render('dashboard', { title:'DashBoard(API)', countries: countries });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los países' });
    }
}
export async function obtenerPaisesMONDOController(req, res) {
    try {
        const countries = await obtenerPaisesMONDO();
        //Renderizar en dashboard.ejs
        res.status(200).render('dashboard', { title:'DashBoard', countries: countries });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los países' })
    }
}

//Crear País
export async function createCountryController(req, res) {
    try {
        const errors = {};
        res.render('addCountry', { title:'Crear País', errors:{}, oldData:{} });
    } catch (error) {
        res.status(500).send({ error: 'Error al mostrar el formulario de creación' });
    }
}   
export async function addCountryController(req, res) {
    try {
        const paisData = req.body;
        await crearPais(paisData);
        res.redirect('/countries');
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el país' });
    }
}
//Editar País
export async function editCountryController(req, res) {
    try {
        const { id } = req.params;
        const country = await obtenerPaisId(id);
        console.log('Datos del país a editar:', country);
        res.render('editCountry', { title:'Editar País', errors:{}, oldData: country });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener el país' });
    }
}
export async function updateCountryController(req, res) {
    try {
        const { id } = req.params;
        const paisData = req.body;
        await editarPais(id, paisData);
        res.status(200).json({ message: 'País actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el país' });
    }
}
//Eliminar País
export async function deleteCountryController(req, res) {
    try {
        const  { id } = req.params;
        const deletedCountry = await eliminarPais(id);
        res.status(200).json({ message: `País eliminado.`, data: deletedCountry });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el país' });
    }
}
