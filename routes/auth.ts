import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos';
import { login } from '../controllers/auth';

export const routerAuth = Router();
        

routerAuth.post(
	'/login',
	[
		// #swagger.tags = ['Login']
		check('email')
		.notEmpty().withMessage('El Email es obligatorio')
			.isEmail().withMessage('El email no es válido'),
			check('clave')
			.notEmpty().withMessage('la clave no puede estar vacía'),
		validarCampos
	],
	login
);
