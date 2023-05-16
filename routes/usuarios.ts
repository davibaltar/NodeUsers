import { Router } from 'express';
import *as dbValidators from '../helpers/dbValidators';
import *as usuariosController from '../controllers/usuarios';
import { check } from 'express-validator';
import { esAdministrador, validarJWT, validarCampos } from '../middlewares';
// La función `check` es una función de `express-validator` que permite definir reglas de validación para los campos de una solicitud.
// Ttoma dos parámetros: el nombre del campo a validar y un mensaje de error personalizado si la validación falla. A continuación, se pueden encadenar diferentes métodos para aplicar diferentes reglas de validación. 
// https://express-validator.github.io/docs/api/validation-chain/

export const routerUsuarios = Router();

// check va almacenando los errores para que el validationResult concluya el proceso de revisión. Este validationResult lo tenemos en validarCampos
// Si hay errores, validarCampos devolverá un error. Si no los hay, ejecutará el resto del controller (insertUsuario o updateUsuario)


routerUsuarios.get('/',[
	// #swagger.tags = ['Usuarios']
], usuariosController.getUsuarios);

		routerUsuarios.post('/',
			[
				// #swagger.tags = ['Usuarios']
				// validarJWT,
				// esAdministrador,
				check('nombre')
					.notEmpty().withMessage('El nombre es obligatorio'),
				check('clave')
					.notEmpty().withMessage('la clave no puede estar vacía')
					.isLength({ min: 6 }).withMessage('La clave debe tener mínimo 6 caracteres')
					.matches(/[A-Z]/).withMessage('La clave debe tener al menos una letra mayúscula'),
				check('email')
					.notEmpty().withMessage('El Email es obligatorio')
					.isEmail().withMessage('El email no es válido')
					.custom(dbValidators.emailExiste),
				check('rol')
					.notEmpty().withMessage('El rol es obligatorio')
					.custom(dbValidators.RolValido),
				validarCampos
			],
			usuariosController.insertUsuario
		);

routerUsuarios.put(
	'/:id',
	[
		// #swagger.tags = ['Usuarios']
		validarJWT,
		esAdministrador,
		check('id')
			.isMongoId().withMessage(':param no es un id de  mongo válido')
			.notEmpty().withMessage('El id es obligatorio para actualizar un usuario'),
		check('id').custom(dbValidators.existeUsuarioPorId),
		check('nombre')
			.optional()
			.notEmpty().withMessage('El nombre es obligatorio'),
		check('clave')
			.optional()
			.notEmpty().withMessage('la clave no puede estar vacía')
			.isLength({ min: 6 }).withMessage('La clave debe tener mínimo 6 caracteres')
			.matches(/[A-Z]/).withMessage('La clave debe tener al menos una letra mayúscula'),
		validarCampos
	],
	usuariosController.updateUsuario
);

routerUsuarios.delete(
	'/:id',
	[
		// #swagger.tags = ['Usuarios']
		validarJWT,
		esAdministrador,
		check('id')
			.isMongoId().withMessage(':param no es un id de  mongo válido')
			.notEmpty().withMessage('El id es obligatorio para actualizar un usuario'),
		validarCampos],
	usuariosController.deleteUsuario
);
