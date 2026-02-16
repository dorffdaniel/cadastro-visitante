const url = 'http://127.0.0.1:3002';

let estado = ['Masculino', 'Feminino', 'Outro', 'Prefiro nao responder'];

function showEstado() {
    let msg = `<option value='-1'> Selecione um sexo </option>`

    estado.forEach(element => {
        msg += `<option value=${element}>${element}</option>`
    })

    $('#sexo').html(msg);
}

async function cadastrarVisitante() {

    let nome = $('#nome').val();
    let email = $('#email').val();
    let senha = $('#senha').val();
    let cpf = $('#cpf').val();
    let data = $('#data').val();
    let sexo = $('#sexo').val();
    let img = $("#imgPerfil")[0].files[0];


    let formDat = new FormData();
    formDat.append("nome", nome);
    formDat.append("email", email);
    formDat.append("senha", senha);
    formDat.append("cpf", cpf);
    formDat.append("data", data);
    formDat.append("sexo", sexo);
    formDat.append("imagem", img);

    if (!nome.trim() || !email.trim() || !senha.trim() || !cpf.trim() || !data || sexo == '-1') {
        alerta("Erro", "Preencha todos os campos", "error");
        return;
    }

    const path = `${url}/visitantes/cadastrar`;

    try {

        const conteduo = await fetch(path, {
            method: 'POST',
            body: formDat
        });

        let resp = await conteduo.json();

        if (resp.erro) {
            console.log("Erro", resp.erro, "error");
        }

        if (resp.msg) {
            $("#nome, #email, #senha, #cpf, #data").val('');
            $("#sexo").val("-1");
            /* setTimeout(() => {
                alerta("Cadastrado", resp.msg, "success");
            }, 100); */
            alerta("Cadastrado", resp.msg, "success");
            mostrarImgemSelecionada();
        }


    } catch (error) {
        console.log(error);
    }

}


function mostrarImgemSelecionada() {
    let imgPerfil = $("#imgPerfil")[0].files[0];

    let imgTemp = URL.createObjectURL(imgPerfil);
    $("#imgVisualizacao").attr('src', imgTemp);
}



$(document).ready(function () {
    showEstado();
});
