import {Schema, model, Document} from 'mongoose'

const detalleSchema = new Schema({
    producto:{
        type: Schema.Types.ObjectId,
        ref: 'Inventario',
        required: [true,'Faltan campos por completar']  
    },
    cantidad:{
        type: Number, 
        required: [true, 'Se requiere un numero de contacto'],
        default: 1         
    },
    precio:{
        type: Number, 
        required: [true, 'Se requiere un numero de contacto']          
    },
    subtotal:{
        type: Number,
        required: [true, 'Se requiere un numero de contacto']      
    },    
});

interface IDetalle extends Document{  
    producto: String;
    cantidad: Number;
    precio: Number;
    subtotal: Number;
}

export const Detalle = model<IDetalle>('Detalle', detalleSchema);