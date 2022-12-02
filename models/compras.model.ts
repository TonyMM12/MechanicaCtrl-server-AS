import {Schema, model, Document} from 'mongoose'

const compraSchema = new Schema({
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
        required: [true, 'Se requiere un total']      
    },    
});

compraSchema.pre<ICompra>('save', function(next){
    this.fecha = new Date();
    next();
});

interface ICompra extends Document{
    detalle: String[];
    fecha: Date;
    total: number;
}

export const Compra = model<ICompra>('Compra', compraSchema);