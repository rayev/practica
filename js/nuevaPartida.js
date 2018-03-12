
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
		// const inputFormulario = document.getElementsByTagName('input');
		// for (input of inputFormulario) {
		// 	input.className += "error"; 
		// }
		return false;

	} else {

		//Empezamos a validar campo por campo
		//Comprobamos que el nombre de Usuario, no tiene espacios es mayor de 6 digitos
		if ( /^\s+$/.test(nombreUsuario) ||  nombreUsuario.length < 6 ) {

			//alert("El campo 'Nombre Usuario' no es correcto. Es obligatorio, de mínimo 6 letras.");
			const txtUsuario = document.getElementById('inputUsuario'); 
			txtUsuario.innerText = "El campo 'Nombre Usuario' no es correcto. Es obligatorio y mínimo de 6 letras.";
			let temp = document.getElementById('errores');
			temp.innerText = "El campo 'Nombre Usuario' no es correcto. Es obligatorio y mínimo de 6 letras.";
			// if ( txtUsuario.className === "" ){
			// 	txtUsuario.className = "error";
			// }
			const divUsuario = document.getElementsByClassName('errorNombre');
			//divUsuario[0].style.display = 'block';
			asignarClasesError(txtUsuario, divUsuario);
			// todo_correcto = false
			return todo_correcto;

		}
		else if ( password1.length < 6 || !/[a-z]/.test(password1) || !/[A-Z]/.test(password1) || !/[0-9]/.test(password1) ){

			//alert("El campo 'Contraseña' no es correcto. Es obligatorio, de mínimo 6 caracteres, y debe contener una mayúscula, una minúscula y un dígito");
			const txtPwd1 = document.getElementById('inputPwd1');
			txtPwd1.innerText = "El campo 'Contraseña' no es correcto. Es obligatorio, de mínimo 6 caracteres, y debe contener una mayúscula, una minúscula y un dígito";
			// if ( txtPwd1.className === "" ){
			// 	txtPwd1.className = "error";
			// }
			txtPwd1.className = "error";
			const divPwd1 = document.getElementsByClassName("errorPwd1");
			// divPwd1[0].style.display = 'block';
			asignarClasesError(txtPwd1, divPwd1);
			// todo_correcto = false
			return todo_correcto;
		
		}  
		else if ( password1 != password2 ){

			//alert("Las contraseñas no coinciden");
			const txtPwd2 = document.getElementById('inputPwd2');
			txtPwd2.innerText = "Las contraseñas no coinciden";
			// txtPwd2.className = "error";
			const divPwd2 = document.getElementsByClassName("errorPwd2");
			// divPwd2[0].style.display = 'block';
			asignarClasesError(txtPwd2, divPwd2);
			// todo_correcto = false
			return todo_correcto;

		}
		else if ( !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail) ){

			//alert("El campo 'Email' no es correcto. Es obligatorio, y debes indicar una '@' y un '.'");
			const txtMail = document.getElementById('inputMail');
			txtMail.innerText = "El campo 'Email' no es correcto. Es obligatorio, y debes indicar una '@' y un '.'";
			// txtMail.className = "error";
			const divMail = document.getElementsByClassName("errorMail");
			// divMail[0].style.display = 'block';
			asignarClasesError(txtMail, divMail);
			// todo_correcto = false
			return todo_correcto;

		}
		else if (  !validarDni(dni) ){

			//alert("El campo 'DNI' es obligatorio, y el formato correcto debe ser 12345678X con la letra mayuscula.");
			const txtDni = document.getElementById('inputDni');
			txtDni.innerText = "El campo 'DNI' es obligatorio, y el formato correcto debe ser 12345678X con la letra mayuscula.";
			const divDni = document.getElementsByClassName('errorDni');
			asignarClasesError(txtDni, divDni);
			return	todo_correcto;

		} 
		else if ( !/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(fechaNacimiento) ) {

			// alert("La fecha de nacimiento no es correcta. El formato debe ser dd/mm/aaaa, separados por barra(/), guion-medio (-) o punto(.)");
			const textFechaNacimiento = document.getElementById('inputFecha');
			textFechaNacimiento.innerText = "La fecha de nacimiento no es correcta. El formato debe ser dd/mm/aaaa, separados por barra(/), guion-medio (-) o punto(.)";
			const divFecha = document.getElementsByClassName("errorFecha");
			asignarClasesError(textFechaNacimiento, divFecha);
			return todo_correcto;

		}
		else if ( objetoFechaNacimiento > objetoFechaMinima ) {

			//alert("La fecha de nacimiento no es correcta. No puedes tener menos de 18 años.");
			const textMenorEdad = document.getElementById('inputFecha');
			textMenorEdad.innerText = "La fecha de nacimiento no es correcta. No puedes tener menos de 18 años.";
			const divMenorEdad = document.getElementsByClassName('errorFecha');
			asignarClasesError(textMenorEdad, divMenorEdad);
			return todo_correcto;

		}
		else if ( !paisMarcado ){

			//alert("Debe marcar país de residencia.");
			const textPais = document.getElementById('radioPais');
			textPais.innerText = "Debe marcar país de residencia.";
			const divPais = document.getElementsByClassName('errorPais');
			asignarClasesError(textPais, divPais);
			return todo_correcto;
		}
		else if ( indicePago === 0 ){

			//alert("Debes de seleccionar una forma de pago.");
			const txtFormaPago = document.getElementById('selectPago');
			txtFormaPago.innerText = "Debes de seleccionar una forma de pago.";
			const divPago = document.getElementsByClassName('errorPago');
			asignarClasesError(txtFormaPago, divPago);
			return todo_correcto;

		}
		else if ( !condicionesServicio ) {

			//alert("Debes aceptar las condiciones de servicio.");
			const txtCondiciones = document.getElementById('inputCondiciones');
			txtCondiciones.innerText = "Debes aceptar las condiciones de servicio.";
			const divCondiciones = document.getElementsByClassName('errorCondiciones');
			asignarClasesError(txtCondiciones, divCondiciones);
			return todo_correcto;

			}

	}

	msg('success', '¡Valida el formulario!');


	function asignarClasesError(txt, div){

		if ( txt.className === "" ){
			txt.className = "error";
		}

		div[0].style.display = 'block';

		todo_correcto = false;
		return todo_correcto;
	}


	function ocultarErrores(){

		let divErrores = document.getElementsByTagName('div');
		//console.log(divErrores);
		for (let i of divErrores) {
			if(i.style.display === 'block'){
				i.style.display = 'none';
			}
		}

	}


	function validarDni(dni){

		let letra=dni.substr(dni.length-1,1);

		if ( /[A-Z]/.test(letra) ){
			let lockup = 'TRWAGMYFPDXBNJZSQVHLCKE';
			let valueDni=dni.substr(0,dni.length-1);
			//let letra=dni.substr(dni.length-1,1).toUpperCase();
		 
			if(lockup.charAt(valueDni % 23)==letra){
				return true;
			}
			return false;

		} else{

			return false;
		}
	}	

}