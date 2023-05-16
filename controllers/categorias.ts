import { Request, Response } from 'express';
import { Categoria } from '../models/categoria';
import { Usuario } from '../models/usuario';

export const insertCategoria = async (req: Request, res: Response) => {
	try {
		const categoria = new Categoria(req.body);
		await categoria.save();
		res.status(201).json({
			categoria
		});
	}
	catch (error) {
		res.status(500).json({ msg: `Internal server error ${error}` });
	}
};

export const deleteCategoria = async (req: Request, res: Response) => {
	const { id, idUsuario } = req.params;
	if (!id) return res.status(404).json({ msg: 'Se requiere el id de la categoría para poder eliminarla' });
	if (!idUsuario) return res.status(404).json({ msg: 'Se requiere el id del usuario para poder eliminar una categoría.' });
	try {
		const usuario = await Usuario.findById(idUsuario);
		const categoria = await Categoria.findById(id);
		if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado.' });
		if (!categoria) return res.status(404).json({ msg: 'Categoría no encontrada.' });
		if (usuario.rol === 'administrador' && categoria.general) {
			await Categoria.updateOne({ _id: id }, { general: false });
			return res.status(200).json({ msg: `La categoria ${categoria.nombre} ya no es una categoría general.` });
		}
		if (!categoria.general && categoria.idUsuario?.map(id => id._id.toString()).includes(idUsuario)) {
			Categoria.findByIdAndDelete(id);
			return res.status(200).json({ msg: `Categoría ${categoria.nombre} eliminada.` });
		}
	} catch (error) {
		res.status(500).json({ msg: `Internal server error ${error}` });
	}
};


// obtener categorías
export const getCategorias = async (req: Request, res: Response) => {
	const { idUsuario} = req.params;
	if (!idUsuario) return res.status(404).json({ msg: 'Se requiere el id del usuario para mostrar las categorías.' });
	try {
		const categorias = await Categoria.find({$or: [{general: true},{idUsuario: idUsuario}]});
		if (!categorias) {
			return res.status(404).json({ msg: 'No se han encontrado categorías .' });
		}
		res.status(200).json(categorias);
	}
	catch (error) {
		res.status(500).json({ msg: `Internal server error ${error}` });
	}
};