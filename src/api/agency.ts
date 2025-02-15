import express from 'express';

import AgencyController from './controller/agency';

const router = express.Router();
const agencyController = new AgencyController();

router.get('/', agencyController.getAgency);

export default router;
