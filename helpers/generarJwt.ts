// npm install jsonwebtoken
// npm install --save-dev @types/jsonwebtoken
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generamos nuestro propio proceso asíncrono (Promise) para generar el token
export const generarJWT = (id: string, nombre: string, rol: string) => {
	return new Promise((resolve, reject) => {
		const payload = { id, nombre, rol };

		// jwt nos va a crear un token bajo una firma con una expiración determinada (2 horas en nuestro caso)
		jwt.sign(
			payload,
			process.env.SECRETPRIVATEKEY || '',
			{
				expiresIn: '2h'
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se pudo generar el token');
				} else {
					resolve(token);
				}
			}
		);
	});
};
