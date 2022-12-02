import {Schema, model, Document} from 'mongoose'

const servicioSchema = new Schema({
    auto:{
      type: Schema.Types.ObjectId,
      ref: 'Auto',
      required: [true,'Faltan campos por completar']  
    },
    tipo:{
      type: String,     
      required: [true,'Faltan campos por completar']  
    },
    llegada:{
      type: Date,   
    },
    salida:{
      type: Date,
      default: ''
    },
    problema:{
      type: String,
      default: ''
    },
    avance:{
      type: String,
      default: ''  
    },
    detalle:[{
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
    }],
    garantia:{
      type: Number,
      default: 0  
    },
    gasto:{
      type: Number,
      default: 0  
    },
    total:{
      type: Number,
      default: 0  
    },
    estatus:{
        type: String,
        required: [true,'Faltan campos por completar']
      },
});

servicioSchema.pre<IServicio>('save', function(next){
    this.llegada = new Date();
    next();
});

interface IServicio extends Document{
    auto: String;
    tipo: String;
    llegada: Date;
    salida: Date;
    problema: String;
    avance: String;
    detalle: String[];
    garantia: Number;
    total: Number;
    estatus: String;
}

export const Servicio = model<IServicio>('Servicio', servicioSchema);