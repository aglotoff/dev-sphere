// Imports
import { Router } from 'express';

// App Imports
import { render } from '../controllers/render';

const router = Router();

router.get('/*', render);

export default router;
