const controller = new NegociacaoController();

// document   
//     .querySelector('.form')
//     .addEventListener('.click', controller.adiciona.bind(controller))

document.getElementById('superButton')
        .addEventListener('click', controller.adiciona.bind(controller));