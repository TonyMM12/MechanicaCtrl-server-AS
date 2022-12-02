import {Schema, model, Document} from 'mongoose'

const autoSchema = new Schema({
    cliente:{
      type: Schema.Types.ObjectId,
      ref: 'Cliente',
      required: [true,'Faltan campos por completar']  
    },
    placa:{
      type: String,
      unique: true,
      default: ''
    },
    marca:{
      type: String,
      required: [true,'Faltan campos por completar']  
    },
    modelo:{
      type: String,
      required: [true,'Faltan campos por completar']  
    },
    color:{
      type: String,
      default: ''
    },
    anio:{
      type: Number,
      required: [true,'Faltan campos por completar']  
    },
    transmicion:{
      type: String,
      default: ''
    },
    identificadorUnico:{
      type: String,
      default: ''  
    },
});

interface IAuto extends Document{
    cliente: string;
    placa: string;
    marca: string;
    modelo: string;
    color: string;
    anio: number;
    transmicion: string;
    identificadorUnico: string;
}

export const Auto = model<IAuto>('Auto', autoSchema);