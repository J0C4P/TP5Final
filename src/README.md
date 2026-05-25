# Gestión de Países Hispanohablantes en América

Una aplicación web moderna, interactiva y responsiva desarrollada con **Node.js**, **Express** y **MongoDB**, diseñada para gestionar la información de los países de habla hispana obtenidos de una API puública en el continente americano.

---

## Objetivos del Proyecto

El propósito de este proyecto es construir una aplicación web integral que permita:
1. **Consumir datos externos** desde una API pública para popular la base de datos de manera automatizada.
2. **Procesar y limpiar** la información obtenida, filtrando exclusivamente los países del continente americano cuya lengua oficial sea el español (`"spa"`).
3. **Persistir la información** en una base de datos no relacional (MongoDB).
4. **Implementar un sistema CRUD completo** (Crear, Leer, Actualizar, Eliminar) para administrar los países, con una interfaz web dinámica y robusta.
5. **Validar** por backend los envios de formularios

---

## Tecnologías Usadas


El proyecto está estructurado bajo el patrón de arquitectura **MVC (Modelo-Vista-Controlador)**:

* **Backend**: Node.js (con soporte nativo para ES Modules `.mjs`) & Express v5.
* **Base de Datos**: MongoDB Atlas & Mongoose (ODM para el modelado de datos).
* **Motor de Plantillas**: EJS (Embedded JavaScript templates) estructurado con un layout unificado mediante `express-ejs-layouts`.
* **Consumo de API**: Native Fetch API (aprovechando las capacidades modernas de Node.js).
* **Validación**: `express-validator` para la sanitización y validación de datos en el servidor.
* **Frontend**: Tailwind CSS para un diseño limpio, minimalista, moderno y adaptativo.

---

## Instalación y Ejecución

Sigue estos sencillos pasos para poner en marcha el proyecto en tu entorno local:

### 1. Clonar el repositorio
Clonar/Descargar codigo fuente desde GitHUB, ó Abre una terminal y clona el proyecto usando Git:
```bash
git clone https://github.com/J0C4P/TP5Final.git
cd TP5Final/src
```

### 2. Instalar las dependencias
Instala los paquetes necesarios definidos en el `package.json`:
```bash
npm install
```

### 3. (Opcional/Consideración Especial) Configurar las Variables de Entorno 
Crea un archivo `.env` en la raíz del directorio `src` para configurar las variables de entorno necesarias:
```env
MONGO_URL=your_mongodb_connection_string
```

### 4. Iniciar el servidor
Inicia la aplicación ejecutando:
```bash
node app.mjs
```
Una vez iniciado, abre tu navegador e ingresa a: http://localhost:3000

---

## Consideraciones Especiales

### Variables de Entorno y Conexión
* **Puerto**: El servidor web escucha en el puerto configurado por la variable de entorno `PORT`, con un fallback al puerto `3000`.
* **MongoDB**: La conexión se realiza a través de Mongoose a un clúster de MongoDB Atlas. Para proteger las credenciales en producción, se recomienda configurar la URI de conexión mediante la variable de entorno `MONGO_URL`.

### Consumo y Limpieza de API
* Los datos iniciales son consumidos desde la API pública **REST Countries** (endpoint: `https://restcountries.com/v3.1/region/america`).
* **Filtro de Idioma**: Durante la sincronización, el repositorio descarta automáticamente cualquier país que no contenga el código de idioma `"spa"` (español) dentro de sus lenguajes oficiales.
* **Limpieza previa**: Los datos se mapean y depuran antes de almacenarse en la base de datos, garantizando que solo la información requerida y formateada de manera homogénea sea persistida.

### Normalización de Datos
* **Índice de Gini**: El coeficiente de Gini en la API original se devuelve en un formato de objeto con llaves variables según el año de medición (ej. `{"2019": 48.8}`). Para normalizarlo, el repositorio extrae dinámicamente los valores numéricos mediante `Object.values(country.gini)` y los almacena en MongoDB dentro de un array de números (`[Number]`), permitiendo realizar cálculos y promedios fácilmente.
* **Nombres de Países (Fallback)**: Para asegurar que el nombre esté siempre en español, el sistema busca primero la traducción en español en `translations.spa.common` y `translations.spa.official`. Si no están disponibles, aplica un fallback automático hacia los nombres originales del país (`name.common` y `name.official`).

---
## Autor

* Capdevila, José
