import mongoose, { Schema, Types } from 'mongoose';
import { ICategoria } from '../interfaces/categoria';

const categoriaSchema = new Schema<ICategoria>({
	nombre: { type: String, required: [true, 'El nombre de la categoría es obligatorio'], unique: true },
	general: { type: Boolean, default: false, required: [true, 'Es necesario saber si es una categoría general o no.'] },
	idUsuario: [{ type: Schema.Types.ObjectId, ref: 'Usuarios' }],
	subcategoria: [{
		id: {type: Types.ObjectId, default: new Types.ObjectId()},
		nombre: {type: String, required: [true, 'El nombre de la subcategoría es obligatorio'], unique: true},
		idUsuario: [{ type: Schema.Types.ObjectId, ref: 'Usuarios' }],
			  }]
}, { collection: 'Categorias' });
export const Categoria = mongoose.model('Categorias', categoriaSchema);