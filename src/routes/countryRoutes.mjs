//Dependencias
import {
    obtenerPaisesAPIController, obtenerPaisesMONDOController, 
    createCountryController, addCountryController,
    editCountryController, updateCountryController,
    deleteCountryController
} from '../controllers/countryController.mjs';
import express from 'express';
import {body, param, validationResult} from 'express-validator';

//Configurar el router
const router = express.Router();

//Validaciones
const validationCreateCountry = [
    body('nombre.oficial').trim()
        .notEmpty().withMessage('El nombre oficial es obligatorio')
        .isString().withMessage('El nombre oficial debe ser una cadena de texto')
        .isLength({min:3,max:90}).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres'),
    body('nombre.comun').trim()
        .isString().withMessage('El nombre común debe ser una cadena de texto')
        .isLength({min:3,max:90}).withMessage('El nombre común debe tener entre 3 y 90 caracteres'),
    body('capital').trim()
        .notEmpty().withMessage('La capital es obligatoria')    
        .isString().withMessage('La capital debe ser una cadena de texto')
        .isLength({min:3,max:90}).withMessage('El nombre de la capital debe tener entre 3 y 90 caracteres'),
    body('fronteras')
        .isArray({min:1}).withMessage('Debe proporcionar al menos un país limítrofe'),
    body('fronteras.*').trim()
        .optional({checkFalsy:true})
        .isString().withMessage('Cada país limítrofe debe ser una cadena de texto')
        .isLength({min:3,max:3}).withMessage('Cada país limítrofe debe ser una abreviación de 3 caracteres')
        ,
    body('area').trim()
        .notEmpty().withMessage('El área es obligatoria')
        .isFloat({gt:0}).withMessage('El área debe ser un número positivo'),
    body('poblacion').trim()
        .notEmpty().withMessage('La población es obligatoria')
        .isInt({gt:0}).withMessage('La población debe ser un número entero positivo'),
    body('subregion').trim()
        .notEmpty().withMessage('La subregión es obligatoria')
        .isString().withMessage('La subregión debe ser una cadena de texto')
        .isLength({min:3,max:90}).withMessage('La subregión debe tener entre 3 y 90 caracteres'),
    body('zonahoraria').trim()
        .optional()
        .isString().withMessage('La zona horaria debe ser una cadena de texto')
]  
const validationEditCountry = [
    body('nombre.oficial').trim()
        .notEmpty().withMessage('El nombre oficial es obligatorio')
        .isString().withMessage('El nombre oficial debe ser una cadena de texto')
        .isLength({min:3,max:90}).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres'),
    body('nombre.comun').trim()
        .isString().withMessage('El nombre común debe ser una cadena de texto')
        .isLength({min:3,max:90}).withMessage('El nombre común debe tener entre 3 y 90 caracteres'),
    body('capital').trim()
        .notEmpty().withMessage('La capital es obligatoria')    
        .isString().withMessage('La capital debe ser una cadena de texto')
        .isLength({min:3,max:90}).withMessage('El nombre de la capital debe tener entre 3 y 90 caracteres'),
    body('fronteras')
        .isArray({min:1}).withMessage('Debe proporcionar al menos un país limítrofe'),
    body('fronteras.*').trim()
        .optional({checkFalsy:true})
        .isString().withMessage('Cada país limítrofe debe ser una cadena de texto')
        .isLength({min:3,max:3}).withMessage('Cada país limítrofe debe ser una abreviación de 3 caracteres')
        ,
    body('area').trim()
        .notEmpty().withMessage('El área es obligatoria')
        .isFloat({gt:0}).withMessage('El área debe ser un número positivo'),
    body('poblacion').trim()
        .notEmpty().withMessage('La población es obligatoria')
        .isInt({gt:0}).withMessage('La población debe ser un número entero positivo'),
    body('subregion').trim()
        .notEmpty().withMessage('La subregión es obligatoria')
        .isString().withMessage('La subregión debe ser una cadena de texto')
        .isLength({min:3,max:90}).withMessage('La subregión debe tener entre 3 y 90 caracteres'),
    body('zonahoraria').trim()
        .optional()
        .isString().withMessage('La zona horaria debe ser una cadena de texto')
]


const validateCreateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //Mapear Errores para mostrar en la vista
        const errorMap = {};
        errors.array().forEach(error => {
            if (!errorMap[error.path]) {
                errorMap[error.path] = error.msg;
            }
            if (error.path.startsWith('fronteras') && !errorMap['fronterasItem']) {
                errorMap['fronterasItem'] = error.msg;
            }
        });
        //Redireccionar a vista de creación con errores y datos antiguos
        console.log(req.body);
        return res.render('addCountry', {
            errors: errorMap,
            oldData: req.body
        });
    }
    next();
};
const validateEditRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Errores de validación: ', errors.array());
        //Mapear Errores para mostrar en la vista
        const errorMap = {};
        errors.array().forEach(error => {
            if (!errorMap[error.path]) {
                errorMap[error.path] = error.msg;
            }
            if (error.path.startsWith('fronteras') && !errorMap['fronterasItem']) {
                errorMap['fronterasItem'] = error.msg;
            }
        });
        //Redireccionar a vista de edición con errores y datos antiguos
        console.log(req.body);
        return res.render('editCountry', {
            errors: errorMap,
            oldData: req.body
        });       
    }
    console.log('Validación exitosa, datos válidos: ', req.body);
    next();
};

//Rutas
//Ruta principal - Obtener países
router.get('/', obtenerPaisesMONDOController);
//Páginas estáticas
router.get('/about', (req, res) => {
    res.render('about', { title: 'Acerca de' });
});
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contacto' });
});
//Obtener países desde la base de datos o API
router.get('/mondo', obtenerPaisesMONDOController);
router.get('/API', obtenerPaisesAPIController);
//Formulario Crear País
router.get('/create', createCountryController);
router.post('/create', validationCreateCountry, validateCreateRequest, addCountryController);
//Formulario Editar País
router.get('/edit/:id', editCountryController);
router.put('/edit/:id', validationEditCountry, validateEditRequest, updateCountryController);
//Eliminar País
router.delete('/eliminar/:id', deleteCountryController);

/*
>>Pendientes<<
>Rutas:
>> get /countries/editar/:id - Formulario editar país existente
>> put /countries/editar/:id - Actualizar un país existente

>Busqueda y filtado por nombre, capital,población(rango), subregión.
>Gini (?)
>Exportar filtrado a CSV

*/

export default router;