class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    // private _negociacoes: Negociacao[] = [];
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    paraArray() {
        // criando novo array para não permitir que o array
        // original seja excluído
        return [].concat(this._negociacoes);
    }
}
