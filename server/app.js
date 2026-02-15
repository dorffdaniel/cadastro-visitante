import express from 'express';
import conn from '../server/bd.js';
import cors from 'cors';
import crypt from 'bcrypt';

let app = express();
let porta = 3002;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {

    res.end('home do servidor');

})

app.post('/cadastrar', async (req, res) => {

    const { nome, email, senha, cpf, data, sexo } = req.body;

    if (!nome || !email || !senha || !cpf) {
        res.status(400).json({ erro: 'Nome , email, senha e cpf sao obrigratorios' })
    }

    if (senha.length < 5) {
        res.status(400).json({ erro: 'senha muito curta' });
    }

    try {

        const saltRounds = 10;
        let hash = await crypt.hash(senha, saltRounds);

        let sql = "INSERT INTO visitante(nome, email, senha, cpf, dataNasc, sexo) values (?, ?, ?, ?, ?, ?)";

        conn.query(sql, [nome, email, hash, cpf, data, sexo], (erro, result) => {
            if (erro) {
                res.status(500).json({ erro: 'erro ao cadastrar visitante' });
            } else {
                res.status(200).json({ msg: 'cadastrado com sucesso' });
            }

        });

    } catch (error) {
        res.status(500).json({ erro: 'falha ao gerar hash da senha' });
    }

})

app.get('/getVisitante', (req, res) => {

    let sql = "SELECT * FROM visitante";

    try {

        conn.query(sql, (erro, result) => {
            if (erro) {
                res.status(404).json({ erro: 'erro ao buscar visitantes' });
            } else {
                res.status(200).json({ msg: result });
            }
        })

    } catch (error) {
        res.status(500).json({ erro: 'falha ao conectar com o banco' });
    }

})


app.listen(porta, () => {
    console.log(`servidor rodando: http://localhost:${porta}/`)
})
