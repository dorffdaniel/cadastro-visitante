

const url = "http://127.0.0.1:3002";

async function getVisitantes() {

    const path = `${url}/visitantes/getVisitantes`;
    let dados = await fetch(path);

    let resp = await dados.json();

    let mens = ``;
    resp.msg.forEach(el => {
        let img = "";
        if (el.imgPerfil != null) {
            img = el.imgPerfil
        } else {
            img = "img/imagemVisitantes/user.png"
        }

        let hoje = new Date(el.dataNasc);
        const formatoISO = hoje.toLocaleDateString('pt-BR')
        mens += `<tr>`;
        mens += `<td> <img src="${img}" class="imgPerfil"> ${el.nome} </td>`;
        mens += `<td> ${el.cpf} </td>`;
        mens += `<td> ${formatoISO} </td>`;
        mens += `<td class="text-center"> 
        <button class="btn btn-warning" onclick="editarVisitante(${el.id})"> Editar </button>        
        <button class="btn btn-danger" onclick="apagarVisitante(${el.id})"> Apagar </button>        
        </td>`;
        mens += `</tr>`;
    });

    $("#listagem").html(mens);

}

async function editarVisitante(idVisit) {

    let path = `${url}/visitantes/getVisitantes/${idVisit}`;

    try {
        let conteudo = await fetch(path);

        if (!conteudo) {
            throw new Error(`Erro na requisicao: ${conteudo.status}`);
        }

        let resp = await conteudo.json()

        resp.msg.forEach(el => {

            let img = "";

            el.imgPerfil != null ? img = el.imgPerfil : img = "img/imagemVisitantes/user.png";

            let data = new Date(el.dataNasc);
            const dataInput = data.toISOString().split('T')[0];

            $("#imgEdit").attr("src", img)
            $("#idVisit").val(el.id);
            $("#nomeEdit").val(el.nome);
            $("#cpfEdit").val(el.cpf);
            $("#dataEdit").val(dataInput);
        })

        $("#modalEdit").modal('show');

    } catch (error) {
        console.error("falha ao buscar o visitante ", error)
    }

}


async function alterarDadosVisitante() {

    let id = $("#idVisit").val();
    let nome = $("#nomeEdit").val();
    let cpf = $("#cpfEdit").val();
    let data = $("#dataEdit").val();

    console.log(id, nome, cpf, data)
    let dados = { nome, cpf, data }

    let path = `${url}/visitantes/editVisitantes/${id}`;

    try {
        let conteudo = await fetch(path, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(dados)
        });

        let resp = await conteudo.json();

        if (resp) {
            alerta(resp.msg, "Editado", "success")
            getVisitantes();
            $("#modalEdit").modal('hide');

        }


    } catch (error) {
        console.error("falha ao editar o visitante ", error);
    }

}

async function apagarVisitante(idVisit) {


    let path = `${url}/visitantes/apagarVisit/${idVisit}`;

    try {

        let conteudo = await fetch(path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let resp = await conteudo.json();

        if (resp.msg) {
            alerta(resp.msg, "Apagado", "success");
            getVisitantes();
        }


    } catch (error) {
        console.error("falha ao apagar Visitante ", error);
    }

}

function editarImagemPerfil() {

    $("#selecionarImagem").click();

}

function imagemSelecionada() {
    let imgSelec = $("#selecionarImagem")[0].files[0];

    console.log(imgSelec)

    if (imgSelec.name != '') {
        let imgTemp = URL.createObjectURL(imgSelec);

        $("#imgEdit").attr("src", imgTemp);
        $("#btnSlavarImg").removeClass("d-none")

    }

}

async function salvarImagemPerfil() {
    let imgSelec = $("#selecionarImagem")[0].files[0];

    let fomrDat = new FormData();
    let id = $("#idVisit").val();

    fomrDat.append("imagem", imgSelec);

    let path = `${url}/visitantes/editarImagemVisitantes/${id}`;

    let conteudo = await fetch(path, {
        method: 'PUT',
        body: fomrDat
    })


    let resp = await conteudo.json();
    console.log(resp);

}







$(() => {
    getVisitantes();
})