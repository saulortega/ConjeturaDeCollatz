

function numeroPar(n){
	return (n%2===0);
}



function formatearNumero(numero){
	numero+='';
	var signoMas=/\+/g;
	if(signoMas.test(numero)){ //Notación científica...
		numero=numero.replace('.',',');
		return numero;
	} else {
		numero=parseInt(numero);
		numero+='';
		var regx = /(\d+)(\d{3})/;
		while (regx.test(numero)) {
			numero=numero.replace(regx, '$1'+'.'+'$2');
		}
		return numero;
	}
}



var conjetura = {
	'iniciar':function(){
		conjetura.limpiar();
		var numero=conjetura.numero();
		if(numero){
			conjetura.calcular(numero);
		}
	},
	'numero':function(){
		var num = $('#número').val();
		if(num){
			if($.isNumeric(num)){
				num = parseInt(num);
				if(num>=1){
					if(num<=999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999){
						return num;
					} else {
						$('#aviso').html('Ya es demasiado, ¿no?').show('fast');
						return false;
					}
				} else {
					$('#aviso').html('Escriba un número mayor a 1.').show('fast');
					return false;
				}
			} else {
				$('#aviso').html('Escriba un número.').show('fast');
				return false;
			}
		} else {
			return false;
		}
	},
	'calcular':function(numero){
		var iteraciones=0;
		var numeros=[numero];
		$('#numero-inicial').html(formatearNumero(numero));
		$('#resultados').html(formatearNumero(numero));
		for ( ; numero>1 ; ) {
			iteraciones++;
			if(numeroPar(numero)){
				numero=numero/2;
			} else {
				numero=(numero*3)+1;
			}
			numeros.push(numero);
			$('#resultados').append(', '+formatearNumero(numero));
		};
		$('#cantidad-iteraciones').html(formatearNumero(iteraciones));
		conjetura.graficar(numeros,iteraciones);
	},
	'graficar':function(numeros,iteraciones){
		var iteracion=0;
		var cadaIteracion=[];
		for ( ; iteraciones>=iteracion; iteracion++ ) {
			cadaIteracion.push(iteracion);
		};
		var graf = $("#gráfica");
		$('#contenedor-gráfica').parent('div').show();
		var grafica = new Chart(graf, {
			type: 'line',
			data: {
				labels: cadaIteracion,
				datasets: [{
					label: "Gráfica de iteraciones",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: numeros,
				}]
			}
		});
	},
	'limpiar':function(){
		$('#aviso').html('').hide();
		$('#resultados').html('');
		$('#numero-inicial').html('');
		$('#cantidad-iteraciones').html('');
		$('#gráfica').remove();
		$('#contenedor-gráfica').append('<canvas id="gráfica"><canvas>');
		$('#contenedor-gráfica').parent('div').hide();
	}
}