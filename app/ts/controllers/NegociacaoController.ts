import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { HandlerFunction, NegociacaoService } from '../services/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { imprime } from '../helpers/index';

let timer = 0;

export class NegociacaoController {
    
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes)
    }

    @throttle()
    adiciona() {
        
        let data = new Date(this._inputData.val().replace(/-/g, ','));
        
        if (this.isBusinessDay(data)) {
            this._mensagemView.update("Você não pode adicionar negociações em fins de semana.")
            return;
        }
        
        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        )
        
        imprime(negociacao, this._negociacoes)

        this._negociacoes.adiciona(negociacao);
        this._negociacoes.paraTexto()
        this._negociacoesView.update(this._negociacoes)
        this._mensagemView.update('Negociação adicionada com sucesso!')
        
    }

    @throttle()
    async importData() {
        const isOk: HandlerFunction = (res: Response) => {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }

        clearTimeout(timer);

        const negociacoesParaImportar = await this._negociacaoService
            .obterNegociacoes(isOk)

        const negociacoesJaImportadas = this._negociacoes.paraArray();
        console.log("Negociações importadas...", negociacoesJaImportadas)

        negociacoesParaImportar
            .filter(negociacao => 
                !negociacoesJaImportadas.some(jaImportada => 
                    negociacao.isEqual(jaImportada)))

        negociacoesParaImportar.forEach(negociacao => 
            this._negociacoes.adiciona(negociacao))

        this._negociacoesView.update(this._negociacoes)
    }

    private isBusinessDay(data: Date) {
        return data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo
    }

}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}