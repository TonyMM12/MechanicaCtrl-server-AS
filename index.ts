import Server from "./classes/server";
import mongoose from 'mongoose';
import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'

import userRoutes from './routes/usuarios';
import clienteRoutes from './routes/clientes';
import empleadoRoutes from './routes/empleados';
import autoRoutes from "./routes/autos";
import ventaRoutes from "./routes/ventas";
import pagoRoutes from "./routes/pagos";
import servicioRoutes from './routes/servicios';
import detalleServicioRoutes from "./routes/detalleServicios";
import productoRoutes from "./routes/productos";
import herramientaRoutes from "./routes/herramientas";
import compraRoutes from './routes/compras';
import detalleRoutes from "./routes/detalle";
import inventarioRoutes from './routes/inventarios';


const server = new Server();

//express
server.app.use(express.urlencoded({extended: true}));
server.app.use(express.json());

//configuracion de CORS
server.app.use(cors({origin: true, credentials: true}));


//rutas de la app
server.app.use('/user', userRoutes);
server.app.use('/clientes', clienteRoutes);
server.app.use('/empleados', empleadoRoutes);
server.app.use('/autos', autoRoutes);
server.app.use('/ventas', ventaRoutes);
server.app.use('/pagos', pagoRoutes);
server.app.use('/servicios', servicioRoutes);
server.app.use('/detalleServicio', detalleServicioRoutes);
server.app.use('/productos', productoRoutes);
server.app.use('/herramientas', herramientaRoutes);
server.app.use('/compras', compraRoutes);
server.app.use('/detalles', detalleRoutes);
server.app.use('/inventarios', inventarioRoutes);

//conectar DB
mongoose.connect('mongodb://localhost:27017/mechanicalCtrlBD',{},(err)=>{
    if(err) throw err;
    console.log('Base de datos Online');    
});

//levantar express
server.start(()=>{
    console.log('Servidor corriendo en el puerto ' + server.port + ' server'+server);    
});


