/**
 * Neoris -Tania Vaca, Luis Doncel
 */

const TIPO_CEDULA = 'CÉDULA';
const TIPO_PASAPORTE = 'PASAPORTE';
const TIPO_VISA = 'VISA';
const TIPO_RUC = 'RUC';
const MENSAJE_ERROR_VACIO = 'Por favor ingrese su cedula';
const MENSAJE_ERROR_CEDULA_INVALIDA = 'La cedula ingresada no es valida';
const MENSAJE_ERROR_RUC_INVALIDO = 'El RUC ingresado no es valido';
const MENSAJE_ERROR_IDENTIFICACION_NO_VALIDA = 'Tipo de Identificación no válida';
const MENSAJE_ERROR_TAMANO_CEDULA_INVALIDO = 'El tamaño de la cédula no puede ser mayor a 11';
const MENSAJE_ERROR_TAMANO_RUC_INVALIDO = 'El tamaño del RUC no puede ser mayor a 13';
const TOTAL_DIGITOS_CEDULA = 10;
var blnIndicador = 0;

function validarCedulaEC(cedula) {
    if (cedula.length === TOTAL_DIGITOS_CEDULA) {
        var cad = cedula;
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;

        if (cad !== "" && longitud === 10) {
            for (i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux = cad.charAt(i) * 2;
                    if (aux > 9)
                        aux -= 9;
                    total += aux;
                } else {
                    total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                }
            }

            total = total % 10 ? 10 - total % 10 : 0;

            if (cad.charAt(longitud - 1) == total) {
                console.log('La cedula ingesada es correcta');
                return true;
            } else {
                //console.log('La cedula ingesada es Incorrecta');
                return false;
            }
        } else {
            //console.log('Ha ingresado mal su cedula');
            return false;
        }
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
             //alert("No puede ingresar caracteres en el número");    
             $('input#submitCreateAccount').prop('disabled', true); 
             return false;    
          }
                      
          if (numDoc.length < 10 ){              
             //alert('El número ingresado no es válido');      
             $('input#submitCreateAccount').prop('disabled', true);  
             return false;          
          }
         
          /* Los primeros dos digitos corresponden al codigo de la provincia */
          provincia = numDoc.substr(0,2);      
          if (provincia < 1 || provincia > numeroProvincias){           
             //alert('El código de la provincia (dos primeros dígitos) es inválido'); 
             $('input#submitCreateAccount').prop('disabled', true);  
             return false;  
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
             //alert('El tercer dígito ingresado es inválido');    
             $('input#submitCreateAccount').prop('disabled', true);  
             return true;               
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
                //alert('El número de documento ingresado es incorrecto.');
                $('input#submitCreateAccount').prop('disabled', true);
                return false;
             }else if (numDoc.length >10 && numDoc.substr(10,3) != '001' ){                    
                //alert('El número de documento ingresado debe terminar con 001');
                $('input#submitCreateAccount').prop('disabled', true);
                return false;
             }else{
                alert('El número de documento ingresado:' + numDoc + ' es valido');
                $('input#submitCreateAccount').prop('disabled', false);
                return true;
             }
          }      
    }

function verificarCedula() {
    var cedula = $('input#datatel_sin').val().trim();
    var identificacion = '';
    $('#pruebaj1_tipodedocumento').find("option:selected").each(function() {    
      identificacion = $(this).text();      
    });   
    if (cedula.length > 0) {
        switch (identificacion.toString().toUpperCase()) {
            case TIPO_CEDULA:
                if(cedula.length > 13){
                  alert(MENSAJE_ERROR_TAMANO_CEDULA_INVALIDO);
                }else{
                  if (!validarCedulaEC(cedula)) {
                    $('input#submitCreateAccount').prop('disabled', true);
                    blnIndicador = 0;
                    alert(MENSAJE_ERROR_CEDULA_INVALIDA);
                  }else{
                      $('input#submitCreateAccount').prop('disabled', false);
                      blnIndicador = 0;                   
                  }  
                }
                break
             case TIPO_RUC:
                if(cedula.length > 13){
                  alert(MENSAJE_ERROR_TAMANO_RUC_INVALIDO);
                }else{
                  if (!validateRUC(cedula)) {
                    $('input#submitCreateAccount').prop('disabled', true);
                    blnIndicador = 0;
                    alert(MENSAJE_ERROR_CEDULA_INVALIDA);
                  }else{
                          $('input#submitCreateAccount').prop('disabled', false);
                          blnIndicador = 0;                   
                  } 
                }                  
                break
            case TIPO_PASAPORTE:
                $('input#submitCreateAccount').prop('disabled', false);
                blnIndicador = 1;
                console.log('pasaporte');                
            break
            case TIPO_VISA:
                $('input#submitCreateAccount').prop('disabled', false);
                blnIndicador = 1;
                console.log('visa');                
                break
            default:
                $('input#submitCreateAccount').prop('disabled', true);
                blnIndicador = 0;
                //alert("ME FUI POR OTRO LADO")
                alert(MENSAJE_ERROR_IDENTIFICACION_NO_VALIDA);        
        break;
        }
    } else {
        $('input#submitCreateAccount').prop('disabled', true);
        blnIndicador = 0;
        alert(MENSAJE_ERROR_VACIO);
    }
}

$(function () {
    $('input#submitCreateAccount').prop('disabled', true);
  blnIndicador = 0;
    $('input#datatel_sin').blur(function () {
        verificarCedula();        
    });        
});

$(function() {
    $("input[type='checkbox']").change(function() {
    if(this.checked) {
      // checkbox is checked      
      $('input#submitCreateAccount').prop('disabled', false);
      blnIndicador = 1;
    }
    else{
      $('input#submitCreateAccount').prop('disabled', true);
      blnIndicador = 0;
    }
    })
})

$(function() {    
    if(validarCedulaEC($('input#datatel_sin').val().trim())) {
      // checkbox is checked      
      $('input#submitCreateAccount').prop('disabled', false);     
    }  
})