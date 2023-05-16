import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario';
import { generarJWT } from '../helpers/generarJwt';

export const login = async (req: Request, res: Response) => {
	const { email, clave } = req.body;

	try {
		// Verificamos si el email existe
		const usuario = await Usuario.findOne({ email });
		if (!usuario) {
			return res.status(400).json({
				msg: 'El Usuario o la Clave no son correctos - email'
			});
		}

		// Verificamos la contraseña
		const claveValida = bcryptjs.compareSync(clave, usuario.clave);
		if (!claveValida) {
			return res.status(400).json({
				msg: 'El Usuario o  la Clave no son correctos - clave'
			});
		}

		// Generamos el JWT
		const token = await generarJWT(usuario.id, usuario.nombre, usuario.rol);

		res.status(200).json({
			usuario,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: `Se ha producido un error: ${error}`
		});
	}
};

