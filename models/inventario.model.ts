import {Schema, model, Document} from 'mongoose'

const inventarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true,'Faltan campos por completar']
    },
    marca:{
      type: String,
      default: ''  
    },
    modelo:{
      type: String,
      default: ''
    },
    ubicacion:{
      type: String,
      required: [true,'Faltan campos por completar']
    },
    costo:{
      type: Number,
      required: [true,'Faltan campos por completar'] 
    },
    precio:{
        type: Number,
        required: [true,'Faltan campos por completar']
    },
    descripcion:{
        type: String,
        default: ''
    },
    unidades:{
        type: Number,
        default: 0
    },
    tipo:{
        type: String,
        required: [true,'Faltan campos por completar']
    },
    
});


interface IInventario extends Document{    
    nombre: String;
    marca: String;
    modelo: String;    
    ubicacion: String;
    costo: Number;
    precio: Number;
    descripcion: String;
    unidades: Number;
    tipo: String;
}

export const Inventario = model<IInventario>('Inventario', inventarioSchema);