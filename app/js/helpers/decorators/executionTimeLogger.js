System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function executionTimeLogger() {
        return function (target, propertyKey, descriptor) {
            const originalMethod = descriptor.value;
            descriptor.value = function (...args) {
                console.log('====================');
                console.log(`parametros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const response = originalMethod.apply(this, args);
                const t2 = performance.now();
                console.log(`retorno do método ${propertyKey}: ${JSON.stringify(response)}`);
                console.log(`demorou ${t2 - t1} ms`);
                return response;
            };
            return descriptor;
        };
    }
    exports_1("executionTimeLogger", executionTimeLogger);
    return {
        setters: [],
        execute: function () {
        }
    };
});
