import {Schema, model, Document} from 'mongoose'

const detalleServicioSchema = new Schema({
    producto:{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        //required: [true,'Faltan campos por completar']
    },
    cantidad:{
      type: Number,
      required: [true,'Faltan campos por completar']  
    },
    costo:{
      type: Number,
      required: [true,'Faltan campos por completar']
    },
    subtotal:{
      type: Number,
      required: [true,'Faltan campos por completar']
    },
    area:{
      type: String,
      default: ''  
    },
    mecanico:{
        type: Schema.Types.ObjectId,
        ref: 'Empleado',
        //required: [true,'Faltan campos por completar']
    }
});


interface IDetalleServicio extends Document{    
    producto: String;
    cantidad: Number;
    costo: Number;
    subtotal: Number;
    area: String;
    mecanico: String;
}

export const DetalleServicio = model<IDetalleServicio>('DetalleServicio', detalleServicioSchema);