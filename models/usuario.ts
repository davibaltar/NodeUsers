import mongoose, { Schema } from 'mongoose';
import { IUsuario } from '../interfaces/usuario';

const usuarioSchema = new Schema<IUsuario>({
	nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
	email: { type: String, required: [true, 'El email es obligatorio'], unique: true },
	clave: { type: String, required: [true, 'La clave es obligatoria'] },
	rol: { type: String, required: [true, 'El rol es obligatorio'], enum: ['administrador', 'usuario'] }
}, { collection: 'Usuarios' });
export const Usuario = mongoose.model('Usuarios', usuarioSchema);