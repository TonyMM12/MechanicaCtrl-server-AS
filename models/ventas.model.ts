import {Schema, model, Document} from 'mongoose'

const ventaSchema = new Schema({
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: [true,'Faltan campos por completar']  
    },
    fecha:{
        type: Date,           
    },
    detalle:[{
        producto:{
            type: Schema.Types.ObjectId,
            ref: 'Inventario',
            required: [true,'Faltan campos por completar']  
        },
        cantidad:{
            type: Number, 
            required: [true, 'Se requiere la cantidad'],
            default: 1         
        },
        precio:{
            type: Number, 
            required: [true, 'Se requiere un precio']          
        },
        subtotal:{
            type: Number,
            required: [true, 'Se requiere un subtotal']      
        },    
      }],
    total:{
        type: Number,
        required: [true, 'Se requiere un numero de contacto']      
    },    
});

ventaSchema.pre<IVenta>('save', function(next){
    this.fecha = new Date();
    next();
});

interface IVenta extends Document{
    cliente: String;
    detalle: String[];
    fecha: Date;
    total: number;
}

export const Venta = model<IVenta>('Venta', ventaSchema);