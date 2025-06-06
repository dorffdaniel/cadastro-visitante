let visitante = []


let estado = ['RH', 'TI', 'Financeiro', 'Comercial'];

function showEstado() {
    let msg = `<option value='-1'> campo vazio </option>`

    estado.forEach(element => {
        msg += `<option value=${element}>${element}</option>`
    })

    $('#setor').html(msg);

}

showEstado();




let link = window.location.pathname;


if (link == '/javascript/visitante/index.html') {
    if (localStorage.getItem('chaveVisitante') != null) {

        visitante = pegarVisitante();

    }
}


let chaveCadastro = '18248118';
let dadosGuardados = [];

if (link == '/javascript/visitante/tabela.html') {
    if (localStorage.getItem('chaveVisitante') != null) {


        visitante = pegarVisitante();

        mostrarTabela()


    }
}



function cadastrarVisitante() {

    let nome = $('#nome').val();
    let email = $('#email').val();
    let senha = $('#senha').val();
    let cpfEncrip = $('#cpf').val();
    let data = $('#data').val();
    let setor = $('#setor').val();
    let coment = $('#coment').val();


    const encriptando = CryptoJS.AES.encrypt(JSON.stringify(cpfEncrip), chaveCadastro).toString();

    if (veri(email)) {

        visitante.push(new Visitantes(nome, email, senha, encriptando, data, setor, coment))

        alerta("cadastrado com sucesso", "Cadastrado Visitante", "success");

        guardarVisitante()

    } else {
        alerta(`ja se econtra cadastrado`, "Erro", "error");
    }

}


//DEPOIS DE CADASTRAR TENHO QUE MANDAR PARA O SESSION E USO DESTA FORMA 
function guardarVisitante() {
    localStorage.setItem('chaveVisitante', JSON.stringify(visitante));

}

function pegarVisitante() {
    const dadosVis = JSON.parse(localStorage.getItem('chaveVisitante'))

    let verifVisi = [];

    for (let i = 0; i < dadosVis.length; i++) {
        let visiNovos = Object.assign(new Visitantes(), dadosVis[i])

        verifVisi.push(visiNovos)
    }

    return verifVisi;
}




function mostrarTabela() {

    if ($.fn.DataTable.isDataTable('#dtExample')) {
        $('#dtExample').DataTable().destroy();
    }

    let txt = "";

    visitante.forEach((element, index) => {

        /*    let cpfCriptografado = CryptoJS.AES.encrypt(JSON.stringify(element.cpf), chaveCadastro).toString(); */

        let cpfCriptografado = element.cpf;

        txt += `<tr>`
        txt += `<td> ${element.nome}</td>`
        txt += `<td> ${cpfCriptografado}</td>`
        txt += `<td> ${element.data}</td>`
        txt += `<td> <button type='button' class='btn btn-info' onclick='inform(${index})'>Info</button> </td>`
        txt += `<td> <button type='button' class='btn btn-info' onclick='cpf(${index})'>ver</button> </td>`
        txt += `<td> <button type='button' class='btn btn-info' onclick='delete1(${index})'>delete</button> </td>`
        txt += `</tr>`
    })

    $('#listagem').html(txt);

    //faz parte do database
    $('#dtExample').DataTable({
        "pageLength": 25
    });

}


function inform(valor) {
    $('#modalId').modal('show');

    let guard = visitante[valor]

    let txt = ''

    txt += `<ul>`
    txt += `<li> nome: ${guard.nome}</li>`
    txt += `<li> data: ${guard.data}</li>`
    txt += `<li> setor: ${guard.setor}</li>`
    txt += `<li> comentario: ${guard.coment}</li>`
    txt += `</ul>`

    $('#resModal').html(txt);

}


function cpf() {
    $('#modalCpf').modal('show');

}


function verificarSenha() {

    let confSenha = $('#confirmSenha').val();

    let encontrou = false;

    let msg = ``
    visitante.forEach(elem => {
        if(confSenha == elem.senha) {
            encontrou = true
            msg += `<ul>`
            msg += `<li> cpf: ${elem.mostrarCpf(chaveCadastro)}</li>`
            msg += `</ul>`

        }
      
    });

    if(!encontrou){
        msg = 'senha incorreta'
    }
    $('#confirmSenha').val('')
     $('#resMod').html(msg); 

}


function closeMod(){
    $('#resMod').html(' '); 
    $('#confirmSenha').val('')
}


function delete1(valor) {

    visitante.splice(valor, 1)

    guardarVisitante()
    mostrarTabela()

}

















function veri(valor) {
    let flag = true;

    visitante.forEach(elemento => {
        if (valor == elemento.email) {
            flag = false
        }
    })

    return flag;
}
























function getSelect(arr, flag) {

    let txt = `<option value= '-1'> campo vazio </option>`

    arr.forEach((element, index) => {

        if (flag == 1) {
            txt += `<option value = "${element.nome}"> ${element.nome}</option>`
        }

        if (flag == 2) {
            txt += `<option value ="${index}"> ${element.nomeFunc}</option>`
        }
        if (flag == 3) {
            txt += `<option value = "${index}"> ${element.filme}</option>`
        }

    })
    return txt;
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
    $('select').select2();
});



$(document).ready(function () {

    $('#idModal').on('shown.bs.modal', function () {
        $("#idDoSelect").select2({
            dropdownParent: $('#idDoModal')
        });
    });

})