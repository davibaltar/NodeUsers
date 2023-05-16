import { Router } from 'express';
import { check } from 'express-validator';
import { existeImagenPorId, existeUsuarioPorId } from '../helpers/dbValidators';
import { validarCampos } from '../middlewares/validarCampos';
import * as categoriasController from '../controllers/categorias';
import { validarJWT } from '../middlewares/validarJwt';

export const routerCategorias = Router();


routerCategorias.get(
	'/:idUsuario',
	[
		// #swagger.tags = ['Categorías']
		check('idUsuario')
		.isMongoId().withMessage(':param no es un id de  mongo válido')
		.custom(existeUsuarioPorId)],
	categoriasController.getCategorias
);

routerCategorias.post(
	'/',
	[
		// #swagger.tags = ['Categorías']
		validarJWT,
		check('nombre')
			.notEmpty().withMessage('El nombre de la imagen es obligatorio'),
		check('nombreArchivo')
			.notEmpty().withMessage('El nombre del archivo es obligatorio'),
		check('descripcion')
		.optional()
			.isLength({ min: 10 }).withMessage('La descripción debe tener mínimo 10 caracteres'),
		check('usuario')
			.notEmpty().withMessage('El id de usuario es obligatorio'),
		validarCampos
	],
	categoriasController.insertCategoria
	);

routerCategorias.delete(
	'/:id',
	[
		// #swagger.tags = ['Categorías']
		validarJWT,
		check('id')
			.isMongoId().withMessage(':param no es un id de  mongo válido')
			.custom(existeImagenPorId),
		validarCampos],
	categoriasController.deleteCategoria
);
