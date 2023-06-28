



function main() {
    const estagio1 = new Estagio1();
    const estagio2 = new Estagio2();
    const estagio3 = new Estagio3();

    try {
        estagio1.conectarWpp();
        console.log('✅ Estágio 1 conectado com sucesso!\n\n');

        estagio2.conectarWpp();
        console.log('✅ Estágio 2 conectado com sucesso!\n\n');

        estagio3.conectarWpp();
        console.log('✅ Estágio 3 conectado com sucesso!\n\n');
    } catch (error) {
        console.error('Ops! Deu problema ao conectar! :(');
        console.error(error);
    }
}

main();