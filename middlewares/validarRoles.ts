import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario';

export const esAdministrador = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('x-token') || '';

	try {
		const { id } = jwt.verify(token, process.env.SECRETPRIVATEKEY || '') as jwt.JwtPayload;

		// // Leemos el usuario que corresponde al id
		const usuario = await Usuario.findById(id);

		if (!usuario) {
			return res.status(401).json({
				msg: 'Token no válido - usuario inexistente'
			});
		}

		const { rol, nombre } = usuario;

		// Verificamos si es administrador
		if (rol !== 'administrador') {
			return res.status(401).json({
				msg: `${nombre} no es administrador - No puede realizar la acción `
			});
		}
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: `Token no válido. ${error}`
		});
	}

};

