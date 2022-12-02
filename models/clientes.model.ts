import {Schema, model, Document} from 'mongoose'

const clienteSchema = new Schema({
    nombre:{
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
    },    
    telefono:{
        type: Number,
        required: [true, 'Se requiere un numero de contacto']      
    },
    email:{
        type: String,
        default: ''       
    },
    domicilio:{
        type: String,
        default: ''        
    },
    colonia:{
        type: String,
        default: ''
    },
    estado:{
        type: String,
        default: ''
    },
    municipio:{
        type: String,
        default: ''
    },
    cp:{
        type: Number,
        default: 0  
    }
});

interface ICliente extends Document{
    nombre: String;    
    telefono: Number;
    email: String;
    domicilio: String;
    colonia: String;
    estado: String;
    municipio: String;
    cp: Number;
}

export const Cliente = model<ICliente>('Cliente', clienteSchema);