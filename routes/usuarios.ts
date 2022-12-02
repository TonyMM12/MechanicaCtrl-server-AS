import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuarios.model';
import bcrypt from 'bcrypt'
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();



//iniciar sesion
userRoutes.post('/login',(req: Request, res: Response)=>{
    const body = req.body;
    Usuario.findOne({email:body.email},(err: any, userDB: any)=>{
        if(err)throw err;
        if(!userDB){
            return res.json({
                ok: false,
                mensjae: 'Usuario y constraseña no son correctos'
            });
        }
        if (userDB.compararContraseña(body.password)){
            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }else{
            return res.json({
                ok: false,
                mensjae: 'Usuario y constraseña no son correctos***'
            });
        }
    });

    
});


//crear usuario
userRoutes.post('/create',(req: Request, res: Response)=>{
    const user = {          
        nombre: req.body.nombre ,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10)
    };
    
    Usuario.create(user).then(userDB =>{
        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email
        });
        res.json({
            ok: true,
            token: tokenUser
        });        
    }).catch(err=>{
        res.json({
            ok: false,
            err
        });
    });

    
});

//Actualizar usuario
userRoutes.post('/update',verificaToken,(req: any, res: Response)=>{
    const user={
        nombre: req.body.nombre||req.usuario.nombre,
        email: req.body.email||req.usuario.email,
        password: req.body.password||req.usuario.password        
    }
    Usuario.findByIdAndUpdate(req.usuario._id,user,{new:true},(err,userDB) =>{
        if(!err){
        if(!userDB){
            return res.json({
                ok:false,
                mensaje: 'No existe el usuario'
            });
        }
        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email
        });
        res.json({
            ok: true,
            token: tokenUser
        });
        }else{
            res.json({
                ok: false,
                mensaje: 'No se pudo actualizar ya que hay un problema con el campo que desea actualizar'
            }); 
        }           
    });
    
});

export default userRoutes;