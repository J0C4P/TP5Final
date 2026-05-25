import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    nombre: {
        comun: String,
        oficial: String
    },
    capital: [String],
    fronteras: [String],
    subregion: String,
    poblacion: Number,
    area: Number,
    gini: [Number],
    bandera: String,
    zonahoraria: String,
    creador: {
        type: String,
        default: "Capdevila, José"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Country = mongoose.model('Country', countrySchema, 'Grupo-29');
