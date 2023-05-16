import { Categoria } from '../models/categoria';
import { Rol } from '../models/rol';
import { Usuario } from '../models/usuario';

export const emailExiste = async (email = '') => {
	try {
		const existeEmail = await Usuario.findOne({ email });
		if (existeEmail) {
			throw new Error(`El email: ${email}, ya está registrado, no puedes usarlo.`);
		}
	}
	catch (error) {
		throw new Error(`Error en la validación del email: ${error}`);
	}
};

export const RolValido = async (rol = '') => {
	try {
		const existeRol = await Rol.findOne({ rol });
		if (!existeRol) {
			throw new Error(`El rol ${rol} no está registrado en la Base de Datos, por tanto, no puede usarse`);
		}
	} catch (error) {
		throw new Error(`Error en la validación del rol: ${error}`);
	}
};

export const existeUsuarioPorId = async (id = '') => {
	try {
		const existeUsuario = await Usuario.findById(id);
		if (!existeUsuario) {
			throw new Error(`El id ${id} no existe, por tanto, no existe el usuario `);
		}
	} catch (error) {
		throw new Error(`Error en la validación del id: ${error}`);
	}
};


// export const existeImagenPorId = async (id: string) => {
	
// 	const existeImagen = await Imagen.findById(id);
// 	if (!existeImagen) {
// 	  throw new Error(`El id ${id} no existe`);
// 	}
//   };
  