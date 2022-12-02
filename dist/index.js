"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const clientes_1 = __importDefault(require("./routes/clientes"));
const empleados_1 = __importDefault(require("./routes/empleados"));
const autos_1 = __importDefault(require("./routes/autos"));
const ventas_1 = __importDefault(require("./routes/ventas"));
const pagos_1 = __importDefault(require("./routes/pagos"));
const servicios_1 = __importDefault(require("./routes/servicios"));
const detalleServicios_1 = __importDefault(require("./routes/detalleServicios"));
const productos_1 = __importDefault(require("./routes/productos"));
const herramientas_1 = __importDefault(require("./routes/herramientas"));
const compras_1 = __importDefault(require("./routes/compras"));
const detalle_1 = __importDefault(require("./routes/detalle"));
const inventarios_1 = __importDefault(require("./routes/inventarios"));
const server = new server_1.default();
//express
server.app.use(express_1.default.urlencoded({ extended: true }));
server.app.use(express_1.default.json());
//configuracion de CORS
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//rutas de la app
server.app.use('/user', usuarios_1.default);
server.app.use('/clientes', clientes_1.default);
server.app.use('/empleados', empleados_1.default);
server.app.use('/autos', autos_1.default);
server.app.use('/ventas', ventas_1.default);
server.app.use('/pagos', pagos_1.default);
server.app.use('/servicios', servicios_1.default);
server.app.use('/detalleServicio', detalleServicios_1.default);
server.app.use('/productos', productos_1.default);
server.app.use('/herramientas', herramientas_1.default);
server.app.use('/compras', compras_1.default);
server.app.use('/detalles', detalle_1.default);
server.app.use('/inventarios', inventarios_1.default);
//conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/mechanicalCtrlBD', {}, (err) => {
    if (err)
        throw err;
    console.log('Base de datos Online');
});
//levantar express
server.start(() => {
    console.log('Servidor corriendo en el puerto ' + server.port);
});
