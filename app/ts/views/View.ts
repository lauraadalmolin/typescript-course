import { executionTimeLogger } from '../helpers/decorators/index';

export abstract class View<T> {

    private _elemento: JQuery;
    private _scape: boolean;

    // interrogação significa que o parâmetro é opcional
    // quando nada é atribuido, fica definido como undefined
    // constructor(seletor: string, scape?: boolean) {
    constructor(seletor: string, scape: boolean = false) {
        this._elemento = $(seletor);
        this._scape = scape;
    }

    update(model: T): void {
        let template = this.template(model);
        if (this._scape)
            template = template.replace(/<script>[\s\S]*?<\/script >/g, "");
        this._elemento.html(template);
    }

    abstract template(model: T): string;
}