import { Negociacao, MeuObjeto} from './index';

export class Negociacoes implements MeuObjeto<Negociacoes> {

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

    paraTexto(): void {
        console.log(JSON.stringify(this._negociacoes)); 
    }

    isEqual(negociacoes: Negociacoes): boolean {

        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes)


    }

}