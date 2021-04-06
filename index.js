require('dotenv').config();
const inquirer = require("inquirer");
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async()=>{

    let opt=0;
    const busqueda = new Busquedas();
    
    do {
        opt = await inquirerMenu();

        switch(opt){
        case 1:
            //Mostrar mensaje
            const termino = await leerInput('Ciudad:');
            
            //Buscar los lugares 
            const lugares = await busqueda.ciudad(termino);
            
            //Selecionar el lugar
            const id = await listarLugares(lugares);
            if(id=='0') continue;

            const {nombre, lat, lng} = lugares.find(l=> l.id===id);

            //Guardar en DB
            busqueda.agregarHistorial(nombre);

            //Datos del clima
            const {temp, max, min, desc} = await busqueda.climaLugar(lat, lng);

            //Mostrar resultados
            console.clear();
            console.log('\nInformación del Lugar\n'.green);
            console.log('Ciudad: ', nombre.green);
            console.log('Latitud: ', lat);
            console.log('Longitud: ', lng);
            console.log('Temperatura: ', temp);
            console.log('Minima: ',min);
            console.log('Maxima: ',max);
            console.log('El clima esta: ', desc.green);
            break;
        case 2:
            busqueda.historialCapitalizado.forEach((lugar, id) =>{
                const idx = `${id +1}.-`.green;
                console.log(`${idx} ${lugar}`);
            })
            break;      
        }
    
        if(opt!==0) await pausa();

    } while (opt!==0);
}

main();