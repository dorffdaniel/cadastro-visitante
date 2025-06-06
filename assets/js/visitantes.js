class Visitantes {
    constructor(nome, email, senha, cpf, data, setor, coment) {
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._cpf = cpf;
        this._data = data;
        this._setor = setor;
        this._coment = coment;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome) {
        this._nome = nome;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get senha() {
        return this._senha;
    }

    set senha(senha) {
        this._senha = senha;
    }


    get cpf() {
        return this._cpf;
    }

    set cpf(cpf) {
        this._cpf = cpf;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }

    get setor() {
        return this._setor;
    }

    set setor(setor) {
        this._setor = setor;
    }

    get coment() {
        return this._coment;
    }

    set coment(coment) {
        this._coment = coment;
    }

    mostrarCpf(chaveCadastro) {
        const bytes = CryptoJS.AES.decrypt(this._cpf, chaveCadastro)

        const senhaOriginal = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        return senhaOriginal;

    }

}