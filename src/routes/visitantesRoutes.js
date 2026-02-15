import { Router } from 'express';
import { cadastrar, getVisitantes, getVisitantesPorId, editarVisitante } from '../controllers/visitantesControlles.js';

let route = Router();

route.post('/cadastrar', cadastrar);
route.get('/getVisitantes', getVisitantes);
route.get('/getVisitantes/:id', getVisitantesPorId);
route.put('/editVisitantes/:id', editarVisitante)

export default route;