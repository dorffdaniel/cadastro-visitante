import conn from '../bd.js';
import crypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/imagemVisitantes/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // gera nome único
    }
});

export const parser = multer({ storage });


export async function cadastrar(req, res) {

    const { nome, email, senha, cpf, data, sexo } = req.body;

    const foto = req.file ? `/img/imagemVisitantes/${req.file.filename}` : null; // caminho para o banco

    console.log('req.body:', req.body);
    console.log('req.file:', req.file);


    if (!nome || !email || !senha || !cpf) {
        return res.status(400).json({ erro: 'Nome , email, senha e cpf sao obrigratorios' })
    }

    /* if (senha.length < 5) {
        return res.status(400).json({ erro: 'senha muito curta' });
    } */

    try {

        const saltRounds = 10;
        let hash = await crypt.hash(senha, saltRounds);

        let sql = "INSERT INTO visitante(nome, email, senha, cpf, dataNasc, sexo, imgPerfil) values (?, ?, ?, ?, ?, ?, ?)";

        conn.query(sql, [nome, email, hash, cpf, data, sexo, foto], (erro, result) => {
            if (erro) {
                console.log('Erro MySQL:', erro);
                return res.status(500).json({ erro: erro.message || 'Erro ao cadastrar visitante' });
            } else {
                return res.status(200).json({ msg: 'cadastrado com sucesso' });
            }

        });


    } catch (error) {
        return res.status(500).json({ erro: 'falha ao gerar hash da senha' });
    }

}


export async function getVisitantes(req, res) {

    let sql = "SELECT * FROM visitante";

    try {

        conn.query(sql, (erro, result) => {
            if (erro) {
                return res.status(404).json({ erro: 'erro ao buscar visitantes' });
            } else {
                return res.status(200).json({ msg: result });
            }
        })

    } catch (error) {
        return res.status(500).json({ erro: 'falha ao conectar com o banco' });
    }

}

export async function getVisitantesPorId(req, res) {

    const id = req.params.id;
    let sql = "SELECT * FROM visitante WHERE id = ?";

    try {

        conn.query(sql, [id], (erro, result) => {
            if (erro) {
                return res.status(400).json({ erro: 'erro ao buscar o visitante' })
            } else {
                return res.status(200).json({ msg: result });
            }

        })

    } catch (error) {
        return res.status(500).json({ erro: 'erro ao conectar com banco' })
    }
}

export async function editarVisitante(req, res) {

    let id = req.params.id;
    const { nome, cpf, data } = req.body

    if (!nome || !cpf || !data) {
        return res.status(400).json({ erro: 'Dados obrigatórios não enviados' });
    }

    let sql = `UPDATE visitante 
    SET nome= ?, cpf= ?, dataNasc=? 
    WHERE id = ?`;

    conn.query(sql, [nome, cpf, data, id], (erro, resul) => {

        if (erro) {
            return res.status(400).json({ erro: 'erro ao tentar editar' });
        } else {
            return res.status(200).json({ msg: "Editado com Sucesso" });
        }
    })

}

export async function apagarVisit(req, res) {

    let id = req.params.id;

    let sql = "DELETE FROM visitante WHERE id = ?";

    try {
        conn.query(sql, [id], (erro, result) => {
            if (erro) {
                return res.status(400).json({ erro: 'erro ao tentar apagar o visitante' })
            } else {
                return res.status(200).json({ msg: 'Apagado com sucesso' });
            }
        })

    } catch (error) {
        return res.status(500).json({ erro: 'erro ao conectar com o banco de dados' })
    }

}

export async function editarImagemVisitante(req, res) {

    const foto = req.file ? `/img/imagemVisitantes/${req.file.filename}` : null;
    let id = req.params.id;

    let sql = "UPDATE visitante SET imgPerfil = ? WHERE id = ?";

    try {
        conn.query(sql, [foto, id], (erro, result) => {
            if (erro) {
                return res.status(400).json({ erro: "erro ao tentar editar a imagem do perfil" });
            } else {
                return res.status(200).json({ msg: "Imagem editada com sucesso" });
            }
        })
    } catch (error) {
        return res.status(500).json({ erro: "erro ao conectar com o banco de dados" });
    }

}