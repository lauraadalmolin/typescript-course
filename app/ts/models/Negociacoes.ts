import { Negociacao } from './Negociacao';

export class Negociacoes {

    private _negociacoes: Array<Negociacao> = [];
    // private _negociacoes: Negociacao[] = [];
    
    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao)
    }

    paraArray(): Negociacao[] {
        // criando novo array para não permitir que o array
        // original seja excluído
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

}