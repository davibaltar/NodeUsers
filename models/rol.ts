// Insertar esto en la base de datos
// db.Roles.insertMany([{rol:"administrador"},{rol:"usuario"}])
import mongoose, { Schema } from 'mongoose';
import { IRol } from '../interfaces/rol';

const rolSchema = new Schema<IRol>({
	rol: {
		type: String,
	required: [true, 'El rol es obligatorio']
	}
}, { collection: 'Roles' });

export const Rol = mongoose.model('Roles', rolSchema);