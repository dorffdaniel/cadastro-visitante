import { Router } from 'express';
import { cadastrar, getVisitantes, getVisitantesPorId, editarVisitante, apagarVisit, parser, editarImagemVisitante } from '../controllers/visitantesControlles.js';

let route = Router();

route.post('/cadastrar', parser.single('imagem'), cadastrar);
route.get('/getVisitantes', getVisitantes);
route.get('/getVisitantes/:id', getVisitantesPorId);
route.put('/editVisitantes/:id', editarVisitante)
route.delete('/apagarVisit/:id', apagarVisit)
route.put('/editarImagemVisitantes/:id', parser.single('imagem'), editarImagemVisitante)

export default route;