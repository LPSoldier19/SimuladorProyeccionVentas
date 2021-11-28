$(document).ready(function () {

    $('#txt-valor-porcentaje-natalidad').val(`${40}%`);
    $('#txt-valor-porcentaje-mortalidad').val(`${31}%`);
    $('#txt-poblacion').val(10000);

    $('#txt-porcentaje-natalidad').change(function() { 
        porcentajeNatalidad = $('#txt-porcentaje-natalidad').val();
        $('#txt-valor-porcentaje-natalidad').val(`${porcentajeNatalidad}%`)
    });

    $('#txt-porcentaje-mortalidad').change(function() { 
        porcentajemortalidad = $('#txt-porcentaje-mortalidad').val();
        $('#txt-valor-porcentaje-mortalidad').val(`${porcentajemortalidad}%`)
    });

    $('#btn-limpiar').click(function(){ 
        $('#txt-porcentaje-natalidad').val(40);
        $('#txt-porcentaje-mortalidad').val(31);
        $('#txt-valor-porcentaje-natalidad').val($('#txt-porcentaje-natalidad').val()+"%");
        $('#txt-valor-porcentaje-mortalidad').val( $('#txt-porcentaje-mortalidad').val()+"%");
        $('#txt-poblacion').val(10000);
        $('#txt-anios').val(2);

        document.getElementById('card-discapacidad').classList.add('d-none');
        document.getElementById('card-mortalidad').classList.add('d-none');
        document.getElementById('card-natalidad').classList.add('d-none');
        document.getElementById('grafico-area').classList.add('d-none');
        pFinal=[];
        pGeneroNatalidad=[];
        pGeneroMortalidad=[];
        pNatalidadesTiposDiscapacidad=[];

    });

    function mapaRegional(){

    }

    $('#btn-simular').click(function(){

      var poblacion = $('#txt-poblacion').val();
      var años = $('#txt-anios').val();
      var porcentajeNatalidad = $('#txt-porcentaje-natalidad').val();
      var porcentajeMortalidad = $('#txt-porcentaje-mortalidad').val();

      if(años>1){
        if(poblacion>=10000){
          document.getElementById('card-discapacidad').classList.remove('d-none');
          document.getElementById('card-mortalidad').classList.remove('d-none');
          document.getElementById('card-natalidad').classList.remove('d-none');
          document.getElementById('grafico-area').classList.remove('d-none');
          pFinal=[];
          pGeneroNatalidad=[];
          pGeneroMortalidad=[];
          pNatalidadesTiposDiscapacidad=[];
          dibujarGraficoGeneral();
          dibujarGraficoNatalidad();
          dibujarGraficoMortalidad();
          dibujarGraficoDiscapacidad();
          valoresEstadisticos(poblacion,años,porcentajeMortalidad,porcentajeNatalidad);
        }
        else{
          alert('Los datos ingresados no son validos');
          document.getElementById('card-discapacidad').classList.add('d-none');
          document.getElementById('card-mortalidad').classList.add('d-none');
          document.getElementById('card-natalidad').classList.add('d-none');
          document.getElementById('grafico-area').classList.add('d-none');
          pFinal=[];
          pGeneroNatalidad=[];
          pGeneroMortalidad=[];
          pNatalidadesTiposDiscapacidad=[];
        }
      }
      else{
        alert('Los datos ingresados no son validos');
        document.getElementById('card-discapacidad').classList.add('d-none');
        document.getElementById('card-mortalidad').classList.add('d-none');
        document.getElementById('card-natalidad').classList.add('d-none');
        document.getElementById('grafico-area').classList.add('d-none');
        pFinal=[];
        pGeneroNatalidad=[];
        pGeneroMortalidad=[];
        pNatalidadesTiposDiscapacidad=[];
      }
    });

    $('#btn-detener').click(function(){
      document.getElementById('card-discapacidad').classList.add('d-none');
      document.getElementById('card-mortalidad').classList.add('d-none');
      document.getElementById('card-natalidad').classList.add('d-none');
      document.getElementById('grafico-area').classList.add('d-none');
      pFinal=[];
      pGeneroNatalidad=[];
      pGeneroMortalidad=[];
      pNatalidadesTiposDiscapacidad=[];

    });

});

var pFinal=[];

var pGeneroNatalidad=[];

var pGeneroMortalidad=[];

var pNatalidadesTiposDiscapacidad = [];

function valoresEstadisticos(poblacion,numeroAnios,porcentajeMortalidad,porcentajeNatalidad){
  var poblacionAuxiliar = Number(poblacion);
  pFinal.push(['Año','Poblacion','Mortalidad','Natalidad']);
  pGeneroNatalidad.push(['Año', 'Hombres', 'Mujeres']);
  pGeneroMortalidad.push(['Año', 'Hombres', 'Mujeres']);
  pNatalidadesTiposDiscapacidad.push(['Año', 'Motriz','Mental','Ambas']);

  for(i=1;i<=numeroAnios;i++){
    var natalidad=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var mortalidad=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
    var x1=poblacionAuxiliar+(natalidad)-(mortalidad);
    pFinal.push([String(i),x1,natalidad,mortalidad]);
    poblacionAuxiliar=x1;
  }

  for(j=1;j<=numeroAnios;j++){
    var natalidadGeneral=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var mortalidad=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
    var natalidadHombres=natalidadGeneral*((50.41)/100);
    var natalidadMujeres=natalidadGeneral*((49.58)/100);
    var x1=poblacionAuxiliar+(natalidadGeneral)-(mortalidad);
    pGeneroNatalidad.push([String(j),natalidadHombres,natalidadMujeres]);
    poblacionAuxiliar=x1;
  }

  for(k=1;k<=numeroAnios;k++){
    var mortalidadGeneral=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
    var natalidad=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var mortalidadHombres=mortalidadGeneral*((17)/100);
    var mortalidadMujeres=mortalidadGeneral*((12)/100);
    var x1=poblacionAuxiliar+(natalidad)-(mortalidadGeneral);
    pGeneroMortalidad.push([String(k),mortalidadHombres,mortalidadMujeres]);
    poblacionAuxiliar=x1;
  }

  for(m=1;m<=numeroAnios;m++){
    var natalidadGeneral2=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var mortalidad=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
    var natalidadDiscapacidad=natalidadGeneral2*(0.05);
    var discapacidadMotrices=natalidadDiscapacidad*(0.6);
    var discapacidadMentales=natalidadDiscapacidad*(0.4);
    var discapacidadAmbas=natalidadDiscapacidad*(0.2);
    var x1=poblacionAuxiliar+(natalidadGeneral)-(mortalidad);
    pNatalidadesTiposDiscapacidad.push([String(m),discapacidadMotrices,discapacidadMentales,discapacidadAmbas]);
    poblacionAuxiliar=x1;
  }

}


  