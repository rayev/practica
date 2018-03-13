
document.getElementById('validarFormularioPartida').onclick = function() {


	//Valor por defecto del formulario, si algo va mal la variable cambiara a false y si todo va correcto abajo devolvera true. (Bandera de validacion)
	let todo_correcto = true;
	ocultarErrores();

	//Obtener valores de los input del formulario
	let nombreUsuario = document.getElementById("campoNombre").value;
	let password1 = document.getElementById("campoPwd1").value;
	let password2 = document.getElementById("campoPwd2").value;
	let mail = document.getElementById("campoEmail").value;
	let dni = document.getElementById("campoDNI").value;

	//Obtencion de los datos de los radios
	let pais = document.getElementsByName("pais");

	//Obtencion vlaor de forma pago
	let indicePago = document.getElementById("listaPago").selectedIndex;                  // retorna el índice de la selección
	let textoFormaPago = document.getElementById("listaPago").options[indicePago].text;     // retorna el texto de la selecciónç

	//Obtener el valor del check en la condiciones de servicio
	let condicionesServicio = document.getElementById("checkCondiciones").checked

	/*
	alert(nombreUsuario);
	alert(password1);
	alert(password2);
	alert(mail);
	alert(dni);
	alert(fecha);
	alert(pais);
	console.log(pais);
	alert(indicePago);
	alert(textoFormaPago);
	alert(condicionesServicio);
	*/

	//Comprobacion si ha marcado alguna radio por medio de un flag, paisMarcado es false si no ha marcado nada, si marca se cambia a true.
	let paisMarcado = false;

	for (var i = 0; i < pais.length; i++) {
		if ( pais[i].checked ) {
			paisMarcado = true;
		}
	}


	//ALMACENADO DE FECHAS Y CONVERSIÓN A OBJETOS PARA SU MANIPULACIÓN
	let fechaNacimiento = document.getElementById("campoFecha").value;
	let caracteres = /[/.-]/;
	//let separador = fechaNacimiento.charAt(2);
	let seccionesFecha = fechaNacimiento.split(caracteres);
	let objetoFechaNacimiento = new Date(seccionesFecha[2],seccionesFecha[1]-1,seccionesFecha[0]);

	let objetoFechaActual = new Date();
	let fechaMinima = objetoFechaActual.setYear(objetoFechaActual.getFullYear() - 18);
	let objetoFechaMinima = new Date(fechaMinima);

	console.log(objetoFechaActual);


	//Empezamos con la validacion de campos
	//Copmrobamos que todos los capos no son null
	if ( nombreUsuario === null || password1 === null || password2 === null || mail === null || dni === null || fechaNacimiento === null || pais === null || indicePago === null || condicionesServicio === null) {

		alert("No se enviaron los datos. Por favor, inténtelo de nuevo");
		return false;

	} else {

		//Empezamos a validar campo por campo
		//Comprobamos que el nombre de Usuario, no tiene espacios es mayor de 6 digitos
		if ( /^\s+$/.test(nombreUsuario) ||  nombreUsuario.length < 6 ) {

			let errorNombreUsuario = "El campo 'Nombre Usuario' no es correcto. Es obligatorio y mínimo de 6 letras.";
			mostrarError(errorNombreUsuario);
			return todo_correcto;

		}
		else if ( password1.length < 6 || !/[a-z]/.test(password1) || !/[A-Z]/.test(password1) || !/[0-9]/.test(password1) ){

			let errorPassword = "El campo 'Contraseña' no es correcto. Es obligatorio, de mínimo 6 caracteres, y debe contener una mayúscula, una minúscula y un dígito";
			mostrarError(errorPassword);
			return todo_correcto;
		
		}
		else if ( password1 != password2 ){

			let passwordDiferentes = "Las contraseñas no coinciden";
			mostrarError(passwordDiferentes);
			return todo_correcto;

		}
		else if ( !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail) ){

			let errorMail = "El campo 'Email' no es correcto. Es obligatorio, y debes indicar una '@' y un '.'";
			mostrarError(errorMail);
			return todo_correcto;

		}
		else if (  !validarDni(dni) ){

			let errorDni = "El campo 'DNI' es obligatorio, y el formato correcto debe ser 12345678X con la letra mayuscula.";
			mostrarError(errorDni);
			return todo_correcto;

		} 
		else if ( !/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(fechaNacimiento) ) {

			let errorFecha = "La fecha de nacimiento no es correcta. El formato debe ser dd/mm/aaaa, separados por barra(/), guion-medio (-) o punto(.)";
			mostrarError(errorFecha);
			return todo_correcto;

		}
		else if ( objetoFechaNacimiento > objetoFechaMinima ) {

			let menorEdad = "La fecha de nacimiento no es correcta. No puedes tener menos de 18 años.";
			mostrarError(menorEdad);
			return todo_correcto;

		}
		else if ( !paisMarcado ){

			let errorPais = "Debe marcar país de residencia.";
			mostrarError(errorPais);
			return todo_correcto;

		}
		else if ( indicePago === 0 ){

			let errorPago = "Debes de seleccionar una forma de pago.";
			mostrarError(errorPago);
			return todo_correcto;

		}
		else if ( !condicionesServicio ) {

			let errorCondiciones = "Debes aceptar las condiciones de servicio.";
			mostrarError(errorCondiciones);
			return todo_correcto;
		}

	}

	msg('success', '¡Valida el formulario!');


	function mostrarError(txt) {
		let divErrores = document.getElementById('errores');
		divErrores.innerText = txt;
		divErrores.className = "error_form"
		//divErrores.classList.remove('noVisible');
		//divErrores.classList.add('visible');

		todo_correcto = false;
		return todo_correcto
	}


	function ocultarErrores(){
		let divError = document.getElementById('errores');
		divError.innerText = "";

		// divError.classList.add('noVisible');
		// divError.classList.remove('visible');
		divError.classList.remove('error_form');
	}


	function validarDni(dni){

		let letra=dni.substr(dni.length-1,1);

		if ( /[A-Z]/.test(letra) ){
			let lockup = 'TRWAGMYFPDXBNJZSQVHLCKE';
			let valueDni=dni.substr(0,dni.length-1);
		 
			if(lockup.charAt(valueDni % 23)==letra){
				return true;
			}
			return false;

		} else{

			return false;
		}
	}


}