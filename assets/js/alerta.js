
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
