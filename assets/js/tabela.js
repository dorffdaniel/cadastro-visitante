const url = "http://127.0.0.1:3002";

async function getVisitantes() {

    let path = url + '/getVisitante';
    let dados = await fetch(path);

    console.log(dados);

    let resp = await dados.json();

    let mens = ``;
    resp.msg.forEach(el => {
        mens += `<tr>`;
        mens += `<td> ${el.nome} </td>`;
        mens += `<td> ${el.cpf} </td>`;
        mens += `<td> ${el.dataNasc} </td>`;
        mens += `</tr>`;
    });

    $("#listagem").html(mens);

}


$(() => {
    getVisitantes();
})