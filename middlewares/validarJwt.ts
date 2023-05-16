import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			msg: 'No hay token en la petición'
		});
	}

	try {
		jwt.verify(token, process.env.SECRETPRIVATEKEY || '');
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: 'Token no válido'
		});
	}
};
