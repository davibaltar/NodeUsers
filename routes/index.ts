import { Router } from 'express';
import { routerUsuarios } from './usuarios';
import { routerAuth } from './auth';
import { routerCategorias } from './categorias';

const router = Router();

router.use('/usuarios', routerUsuarios);
router.use('/categorias', routerCategorias);
router.use('/auth', routerAuth);

export default router;
