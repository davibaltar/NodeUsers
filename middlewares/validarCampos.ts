//Instalar esto si no se tiene, se supone que ya incluye tipos
// npm install express-validator

import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

// Middleware que valida los campos de entrada en una solicitud utilizando la función `validationResult` de `express-validator`.
// Si se encuentran errores de validación, la función devuelve una respuesta con el estado HTTP 400 y los errores encontrados en formato JSON.
// En caso contrario, la función llama al siguiente middleware utilizando `next()`, lo que permite que la solicitud continúe hacia el siguiente paso en la cadena de middlewares o al controlador final.

export const validarCampos = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}

	next();
};
