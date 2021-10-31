import directoryRouter from './directory';
import { Router } from 'express';
const router = Router();

router.use('/api', directoryRouter);

export default router;
