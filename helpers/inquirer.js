const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que deseas hacer?\n',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }, 
        ]
    }

];

const inquirerMenu = async ()=> {
    console.log('============================='.green);
    console.log('     Selecciona una opción'.rainbow    );
    console.log('=============================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}


const pausa = async() =>{
    const pregunta =[
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'Enter'.red} para continuar`,
        }
    ]
    
    console.log('\n');
    await inquirer.prompt(pregunta);
}

const leerInput = async(message) =>{
    const question =[
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Ingresa un valor por favor'
                }
                return true;
            }
        }
    ];


    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listarLugares  = async (lugares = []) =>{
    const choices = lugares.map((lugar, i)=>{
        const idx = `${i+1}.-`.green;
        return{
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: 0,
        name: '0.-'.green+'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleciona el lugar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (mensaje) =>{
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            mensaje
        }
    ]

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoCheckList  = async (tareas =[]) =>{
    const choices = tareas.map((tarea, i)=>{
        const idx = `${i+1}.-`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)?true:false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleciona',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}


module.exports={
    inquirerMenu,
    pausa,
    leerInput, 
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}