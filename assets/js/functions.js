const url = ' http://127.0.0.1:3002';

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

    if (!nome.trim() || !email.trim() || !senha.trim() || !cpf.trim() || !data || sexo == '-1') {
        alerta("Erro", "Preencha todos os campos", "error");
        return;
    }

    const path = url + '/cadastrar';
    const dados = { nome, email, senha, cpf, data, sexo };

    try {

        const conteduo = await fetch(path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(dados)
        });

        let resp = await conteduo.json();

        if (resp.erro) {
            alerta("Erro", resp.erro, "error");
        }


        if (resp.msg) {
            alerta("Cadastrado", resp.msg, "success");
            $("#nome, #email, #senha, #cpf, #data").val('');
            $("#sexo").val("-1");
        }


    } catch (error) {
        console.log(error);
    }

}


function alerta(msg, titulo, icon) {
    Swal.fire({
        position: "center",
        icon: icon,
        title: titulo,
        text: msg,
        showConfirmButton: true,    // é aqui o botao
        confirmButtonText: 'OK',
        timer: 1500,
        showClass: {
            popup: `
              animate__animated
              animate__fadeInDown
              animate__faster
            `
        },
        hideClass: {
            popup: `
              animate__animated
              animate__fadeOutUp
              animate__faster
            `
        }
    });
}


$(document).ready(function () {
    showEstado();
});
