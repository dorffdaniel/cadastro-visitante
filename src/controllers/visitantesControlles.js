import conn from '../bd.js';
import crypt from 'bcrypt';

export async function cadastrar(req, res) {

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

}


export async function getVisitantes(req, res) {

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

}