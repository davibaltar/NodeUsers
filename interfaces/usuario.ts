import { Types } from 'mongoose';

export interface IUsuario {
	_id?: Types.ObjectId;
	nombre: string;
	email: string;
	clave: string;
	rol: string
}