import dns from 'node:dns/promises';
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import mongoose from 'mongoose';

//Función conectar a base de datos
export async function connectDataBase(){
    try{
        await mongoose.connect('mongodb+srv://grupo-29:grupo-29@cluster0.blryo.mongodb.net/NodeMod3Cohorte5');
        console.log("Conectado correctamente a la base de datos");
    }catch(error){
        console.log("Error al acceder a la base de datos: ", error);
        process.exit(1);
    }
}