import express from 'express';
import cors from 'cors';
import visitRoute from './routes/visitantesRoutes.js';


let app = express();
let porta = 3002;

app.use(cors());
app.use(express.json());

app.use('/visitantes', visitRoute);


app.get('/', (req, res) => {
    res.end('home do servidor');

})


app.listen(porta, () => {
    console.log(`servidor rodando: http://localhost:${porta}/`)
})
