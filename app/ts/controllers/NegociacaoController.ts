import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject } from '../helpers/decorators/index';

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

    constructor() {
        this._negociacoesView.update(this._negociacoes)
    }

    adiciona(event: Event) {
        event.preventDefault();
        
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
        
        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes)
        this._mensagemView.update('Negociação adicionada com sucesso!')
        
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