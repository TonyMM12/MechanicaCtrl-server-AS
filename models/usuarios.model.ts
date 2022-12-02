import {Schema, model, Document} from 'mongoose'
import bcrypt from 'bcrypt';


const usuariosSchema = new Schema({
    nombre:{
        type: String,
        required:[true,'El email es necesario'] 
    },
    email:{
        type: String,
        unique: true,
        required:[true,'El email es necesario']
    },
    password:{
        type:String,
        required:[true,'La contraseña es necesaria']
    }
   
});

usuariosSchema.method('compararContraseña', function(password: string=''):boolean{
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;
    }
});

interface IUsuario extends Document{
    nombre:String;
    email:String;
    password:String;

    compararContraseña(password:string):boolean;
}

export const Usuario = model<IUsuario>('Usuario', usuariosSchema);