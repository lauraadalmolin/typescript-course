export function executionTimeLogger() {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            console.log('====================')
            console.log(`parametros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const response = originalMethod.apply(this, args);
            const t2 = performance.now();
            console.log(`retorno do método ${propertyKey}: ${JSON.stringify(response)}`);
            console.log(`demorou ${t2 - t1} ms`);
            return response;
        }

        return descriptor; 
    }

}