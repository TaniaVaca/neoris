  	function loadParameters(){
  		var variableTD = document.getElementById("pruebaj1_tipodedocumento");
		var td = variableTD.options[variableTD.selectedIndex].text;
		var numDoc = document.getElementById("datatel_sin").value;	
		validaTipoDocumeto(td,numDoc);
  	}
  	
  	function validaTipoDocumeto(td,numDoc){
  		if(td=="RUC"){
  			validateRUC(numDoc);
  		}else if(td=="Cédula"){
  			validateCC(numDoc);
  		}else{
  			alert('El número de documento ingresado:' + numDoc + ' es valido');
  			$('input#submitCreateAccount').prop('disabled', false);
  		}
  	}
  	function validateRUC(numDoc){
		var suma = 0;      
      	var residuo = 0;      
	    var pri = false;      
	    var pub = false;            
	    var nat = false;      
	    var numeroProvincias = 22;                  
	    var modulo = 11;
	                  
	      /* Verifico que el campo no contenga letras */                  
	      var ok=1;
	      for (i=0; i<numDoc.length && ok==1 ; i++){
	         var n = parseInt(numDoc.charAt(i));
	         if (isNaN(n)) ok=0;
	      }
	      if (ok==0){
	         alert("No puede ingresar caracteres en el número");    
	         $('input#submitCreateAccount').prop('disabled', true);     
	      }
	                  
	      if (numDoc.length < 10 ){              
	         alert('El número ingresado no es válido');      
	         $('input#submitCreateAccount').prop('disabled', true);            
	      }
	     
	      /* Los primeros dos digitos corresponden al codigo de la provincia */
	      provincia = numDoc.substr(0,2);      
	      if (provincia < 1 || provincia > numeroProvincias){           
	         alert('El código de la provincia (dos primeros dígitos) es inválido'); 
	         $('input#submitCreateAccount').prop('disabled', true);    
	      }
	      /* Aqui almacenamos los digitos de la cedula en variables. */
	      d1  = numDoc.substr(0,1);         
	      d2  = numDoc.substr(1,1);         
	      d3  = numDoc.substr(2,1);         
	      d4  = numDoc.substr(3,1);         
	      d5  = numDoc.substr(4,1);         
	      d6  = numDoc.substr(5,1);         
	      d7  = numDoc.substr(6,1);         
	      d8  = numDoc.substr(7,1);         
	      d9  = numDoc.substr(8,1);         
	      d10 = numDoc.substr(9,1);                
	         
	      /* El tercer digito es: */                           
	      /* 9 para sociedades privadas y extranjeros   */         
	      /* 6 para sociedades publicas */         
	      /* menor que 6 (0,1,2,3,4,5) para personas naturales */ 
	      if (d3==7 || d3==8){           
	         alert('El tercer dígito ingresado es inválido');    
	         $('input#submitCreateAccount').prop('disabled', true);                 
	      }         
	         
	      /* Solo para personas naturales (modulo 10) */         
	      if (d3 < 6){           
	         nat = true;            
	         p1 = d1 * 2;  if (p1 >= 10) p1 -= 9;
	         p2 = d2 * 1;  if (p2 >= 10) p2 -= 9;
	         p3 = d3 * 2;  if (p3 >= 10) p3 -= 9;
	         p4 = d4 * 1;  if (p4 >= 10) p4 -= 9;
	         p5 = d5 * 2;  if (p5 >= 10) p5 -= 9;
	         p6 = d6 * 1;  if (p6 >= 10) p6 -= 9; 
	         p7 = d7 * 2;  if (p7 >= 10) p7 -= 9;
	         p8 = d8 * 1;  if (p8 >= 10) p8 -= 9;
	         p9 = d9 * 2;  if (p9 >= 10) p9 -= 9;             
	         modulo = 10;
	      }              
	      suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
	      residuo = suma % modulo;                                         
	      /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
	      digitoVerificador = residuo==0 ? 0: modulo - residuo;                
	      /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/                         
	      if(nat == true){         
	         if (digitoVerificador != d10){                          
	            alert('El número de documento ingresado es incorrecto.');
	            $('input#submitCreateAccount').prop('disabled', true);
	         }else if (numDoc.length >10 && numDoc.substr(10,3) != '001' ){                    
	            alert('El número de documento ingresado debe terminar con 001');
	            $('input#submitCreateAccount').prop('disabled', true);
	         }else{
	         	alert('El número de documento ingresado:' + numDoc + ' es valido');
	         	$('input#submitCreateAccount').prop('disabled', false);
	         }
	      }      
  	}
  	function validateCC(numDoc){
	  	//Preguntamos si la cedula consta de 10 digitos
	    if(numDoc.length == 10){
	        
	        //Obtenemos el digito de la region que sonlos dos primeros digitos
	        var digito_region = numDoc.substring(0,2);
	        
	        //Pregunto si la region existe ecuador se divide en 24 regiones
	        if( digito_region >= 1 && digito_region <=24 ){
	          
	          // Extraigo el ultimo digito
	          var ultimo_digito   = numDoc.substring(9,10);

	          //Agrupo todos los pares y los sumo
	          var pares = parseInt(numDoc.substring(1,2)) + parseInt(numDoc.substring(3,4)) + parseInt(numDoc.substring(5,6)) + parseInt(numDoc.substring(7,8));

	          //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
	          var numero1 = numDoc.substring(0,1);
	          var numero1 = (numero1 * 2);
	          if( numero1 > 9 ){ var numero1 = (numero1 - 9); }

	          var numero3 = numDoc.substring(2,3);
	          var numero3 = (numero3 * 2);
	          if( numero3 > 9 ){ var numero3 = (numero3 - 9); }

	          var numero5 = numDoc.substring(4,5);
	          var numero5 = (numero5 * 2);
	          if( numero5 > 9 ){ var numero5 = (numero5 - 9); }

	          var numero7 = numDoc.substring(6,7);
	          var numero7 = (numero7 * 2);
	          if( numero7 > 9 ){ var numero7 = (numero7 - 9); }

	          var numero9 = numDoc.substring(8,9);
	          var numero9 = (numero9 * 2);
	          if( numero9 > 9 ){ var numero9 = (numero9 - 9); }

	          var impares = numero1 + numero3 + numero5 + numero7 + numero9;

	          //Suma total
	          var suma_total = (pares + impares);

	          //extraemos el primero digito
	          var primer_digito_suma = String(suma_total).substring(0,1);

	          //Obtenemos la decena inmediata
	          var decena = (parseInt(primer_digito_suma) + 1)  * 10;

	          //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
	          var digito_validador = decena - suma_total;

	          //Si el digito validador es = a 10 toma el valor de 0
	          if(digito_validador == 10)
	            var digito_validador = 0;

	          //Validamos que el digito validador sea igual al de la cedula
	          if(digito_validador == ultimo_digito){
	            alert('El número de documento ingresado:' + numDoc + ' es valido');
	            $('input#submitCreateAccount').prop('disabled', false);
	          }else{
	            alert('El número de documento ingresado:' + numDoc + ' es invalido');
	            $('input#submitCreateAccount').prop('disabled', true);
	          }
	          
	        }else{
	          // imprimimos en consola si la region no pertenece
	          alert('El número de documento ingresado no pertenece a ninguna region');
	          $('input#submitCreateAccount').prop('disabled', true);
	        }
	     }else{
	        //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
	        alert('El número de documento ingresado tiene menos de 10 Digitos');
	        $('input#submitCreateAccount').prop('disabled', true);
	     }    
  	}
  	function init(){
  		$('input#submitCreateAccount').prop('disabled', true);
	    $('input#datatel_sin').blur(function () {
	        loadParameters();      
	    });
  	}
  	init();
