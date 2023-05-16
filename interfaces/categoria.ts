import { Types } from 'mongoose';
export interface ICategoria {
	_id?: Types.ObjectId;
nombre: string;
general: boolean;
idUsuario?: Types.ObjectId[];
subcategoria?: ISubcategoria[];
}
interface ISubcategoria {
	id?: Types.ObjectId;
	nombre: string;
		idUsuario?: Types.ObjectId[];
}