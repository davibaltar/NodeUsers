import { Request, Response } from 'express';
// En caso de no tenerlo instalar
// npm install bcryptjs
// npm install --save-dev @types/bcryptjs

import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario';

// obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {
	try {
		const usuarios = await Usuario.find({});
		res.status(200).json({
			usuarios
		});
	}
	catch (error) {
		res.status(500).json({ msg: `Internal server error ${error}` });
	}
};

//insertar un nuevo usuario encriptando la contraseña
export const insertUsuario = async (req: Request, res: Response) => {
	const { email } = req.body;
	try {
		const existeEmail = await Usuario.findOne({ email: email });
		if (existeEmail) {
			return res.status(400).json({ msg: `Ya existe un usuario con el Email ${email}` });
		}
		const usuario = new Usuario(req.body);
		// En la primera línea, se genera una sal aleatoria utilizando la función `genSaltSync()` de la librería `bcryptjs`. La sal es un valor aleatorio que se utiliza para añadir más seguridad a la encriptación de la contraseña.
		// En la segunda línea, se utiliza la función `hashSync()` de la librería `bcryptjs` para encriptar la contraseña del usuario utilizando la sal generada anteriormente. La función genera un hash a partir de la contraseña y la sal, y este hash es el valor que se almacenará en la base de datos en lugar de la contraseña original.
		// De esta manera, si un atacante logra acceder a la base de datos, no podrá obtener las contraseñas de los usuarios, ya que solo tendrá acceso a los hashes encriptados.
		const salt = bcryptjs.genSaltSync();
		usuario.clave = bcryptjs.hashSync(usuario.clave, salt);
		await usuario.save();
		res.status(201).json({
			msg: 'Usuario creado correctamente',
			usuario
		});
	}
	catch (error) {
		res.status(500).json({ msg: `Internal server error ${error}` });
	}
};




// actualizar un usuario, solo nombre y contraseña
// se crea una interfaz para los datos que se van a actualizar. Nombre o clave
interface iUpdateUsuario {
	nombre?: string;
	clave?: string;
  }
  
export const updateUsuario = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { body } = req;
	try {
		// Verificar si el usuario existe
		const usuario = await Usuario.findById(id);
		if (!usuario) {
			return res.status(404).json({ msg: 'El usuario no existe' });
		}

		// Verificar si los campos a actualizar son válidos
		const camposPermitidos = ['nombre', 'clave'];
		const esValido = Object.keys(body).every((campo) => camposPermitidos.includes(campo));
		if (!esValido) {
			return res.status(400).json({ msg: 'Solo se pueden actualizar nombre y clave' });
		}

		// Actualizar el usuario
		const datosActualizados: iUpdateUsuario = {};
		if (body.nombre) datosActualizados.nombre = body.nombre;
		if  (body.clave) {
			const salt = bcryptjs.genSaltSync();
			datosActualizados.clave = bcryptjs.hashSync(body.clave, salt);
		}
		const usuarioActualizado = await Usuario.findByIdAndUpdate(id, datosActualizados, { new: true });

		return res.json(usuarioActualizado);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: `Hubo un error al actualizar el usuario: ${error}` });
	}
};

// Eliminar usuario
export const deleteUsuario = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const usuario = await Usuario.findByIdAndDelete(id);

		if (!usuario) {
			return res.status(404).json({
				msg: `El usuario con ${id} no existe`
			});
		}

		res.status(200).json({ msg: 'El usuario se ha eliminado', usuario });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: `Hubo un error al eliminar el usuario con id ${id}: ${error}`
		});
	}
};
