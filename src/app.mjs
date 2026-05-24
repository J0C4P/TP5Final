//Dependencias
import countryRoutes from './routes/countryRoutes.mjs';
//Funciones
import {obtenerPaisesMONDOController} from './controllers/countryController.mjs';
import {connectDataBase} from './config/dbConfig.mjs';
//Express
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';

const app = express();
app.use(express.static(path.resolve('./public')));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Configurar botones del link
const navbarLinks = [
    { text: 'Países', icon:'/icons/globe-dash.svg', href: '/countries' },
    { text: 'Crear País', icon:'/icons/globe-plus.svg', href: '/countries/create' },
    { text: 'Info', icon:'/icons/info.svg', href: '/countries/about' },
    { text: 'Contacto', icon:'/icons/contact.svg', href: '/countries/contact' }
];
app.use((req, res, next) => {
    res.locals.navbarLinks = navbarLinks;
    next();
});

const PORT = process.env.PORT || 3000;

//Conectar a la base de datos
await connectDataBase();

//Configuración de EJS
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.set('views', path.resolve('./views'));

//Rutas
app.use('/countries', countryRoutes);
//Ruta Principal
app.get('/', obtenerPaisesMONDOController);

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});