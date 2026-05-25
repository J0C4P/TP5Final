import dns from 'node:dns/promises';
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import mongoose from 'mongoose';

//Función conectar a base de datos
export async function connectDataBase(){
    try{
        const url = process.env.MONGO_URL || 'mongodb+srv://grupo-29:grupo-29@cluster0.blryo.mongodb.net/NodeMod3Cohorte5'
        await mongoose.connect(url);
        console.log("Conectado correctamente a la base de datos");
    }catch(error){
        console.log("Error al acceder a la base de datos: ", error);
        process.exit(1);
    }
}