var objPartida = {
    iniciada: false,
    saldo: 3000,
    habitantes: 0,
    unidades: 0,
    casas: 0,
    fabricas: 0,
    detalles: {},
    ciudad: []
};



// Ejecución paneles
document.getElementById('nuevaPartida').onclick = function (){ 

    if (!objPartida.iniciada) {

        open("paneles/nuevapartida.html", 'Nueva partida', 'scrollbars=yes,width=700,height=1000,toolbar=yes');


    } else {

        msg('error', 'Ya has iniciado una partida previamente, no es posible crear una nueva partida');       

    }
}






// intervalo de actualización
let sumatorioHabitantes, sumatorioCasas;

let actualizador = setInterval( function(){    

    sumatorioHabitantes = 0;
    sumatorioCasas = 0;

    if (objPartida.iniciada) {

        let arrayCiudad = objPartida.ciudad;

        for (let i = 0; i < arrayCiudad.length; i++) {

            // TODO: aumentar habitantes en casas
            // TODO: actualizar valores de sumatorioHabitantes y sumatorioCasas
        }

        // actualización de valores de objeto partida
        objPartida.habitantes = sumatorioHabitantes;
        objPartida.casas = sumatorioCasas;
        
        // actualización de valores de contadores en panel      
        document.getElementById('contadorEdificios').textContent = objPartida.ciudad.length + " edificios";
        document.getElementById('contadorHabitantes').textContent = objPartida.habitantes + " habitantes";
    }

}, 100); 