import { Schema, model, Document } from "mongoose";

const pagoSchema = new Schema({
  empleado: {
    type: Schema.Types.ObjectId,
    ref: "Empleado",
    required: [true, "Faltan campos por completar"],
  },
  dias: {
    type: Number,
    required: [true, "Faltan campos por completar"],
  },
  horas: {
    type: Number,
    required: [true, "Faltan campos por completar"],
  },
  extras: {
    type: Number,
    required: [true, "Faltan campos por completar"],
  },
  inicio: {
    type: Date,
    required: [true, "Faltan campos por completar"],
  },
  fin: {
    type: Date,
    required: [true, "Faltan campos por completar"],
  },
  impuestos: {
    type: Number,
    default: null,
  },
  ss: {
    type: Number,
    default: null,
  },
  subtotal: {
    type: Number,
    required: [true, "Faltan campos por completar"],
  },
  total: {
    type: Number,
    required: [true, "Faltan campos por completar"],
  },
  fecha:{
    type: Date, 
  },
  status:{
    type: String,
    required: [true,'Faltan campos por completar'] 
  },
});

pagoSchema.pre<IPago>('save', function(next){
  this.fecha = new Date();
  next();
});

interface IPago extends Document {
    empleado: String;
    dias: Number;
    horas: Number;
    extras: Number;
    inicio: Date;
    fin: Date;
    impuestos: Number;
    ss: Number;
    subtotal: Number;
    total: Number;
    fecha: Date;
    estatus: String;
}

export const Pago = model<IPago>("Pago", pagoSchema);
