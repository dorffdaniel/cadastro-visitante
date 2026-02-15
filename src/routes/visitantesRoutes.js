import { Router } from 'express';
import { cadastrar, getVisitantes } from '../controllers/visitantesControlles.js';

let route = Router();

route.post('/cadastrar', cadastrar);
route.get('/getVisitantes', getVisitantes);

export default route;