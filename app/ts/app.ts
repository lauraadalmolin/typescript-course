import { NegociacaoController } from './controllers/NegociacaoController'

const controller = new NegociacaoController();
$('#superButton').click(controller.adiciona.bind(controller));
$('#importer').click(controller.importData.bind(controller));