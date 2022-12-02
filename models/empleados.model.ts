import {Schema, model, Document} from 'mongoose'

const empleadoSchema = new Schema({
    nombre:{
        type: String,
        unique: true ,
        required: [true,'El nombre es necesario ']
    },
    sexo:{
        type: String,    
        required: [true,'EL sexo es necesario ']
    },
    telefono:{
        type: Number,    
        required: [true,'El telefono es necesario ']
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
    municipio:{
        type: String,    
        default: '' 
    },
    estado:{
        type: String,    
        default: '' 
    },
    cp:{
        type: Number,    
        default: null
    },
    experiencia:{
        type: Number,    
        default: null 
    },
    puesto:{
        type: String,    
        required: [true,'El puesto es necesario ']
    },
    nacimiento:{
        type: Date, 
        format: "%G-%m-%d",       
        required: [true,'La fecha de nacimiento es necesaria ']
        
    },
    incorporacion:{
        type: Date,   
        required: [true,'La fecha de incorporacion es necesaria ']
    },
    nss:{
        type: String,        
        default: ''     
    },
    rfc:{
        type: String,
        default: ''       
    },
});

interface IEmpleado extends Document{
    nombre: string;
    sexo: string;
    telefono: number;
    email: string;
    domicilio: string;
    colonia: string;
    municipio: string;
    estado: string;
    cp: number;
    experiencia: Number;
    puesto: string;
    nacimiento: Date;
    incorporacion: Date;
    nss: string;
    rfc: string;
}

export const Empleado = model<IEmpleado>('Empleado', empleadoSchema);