$(document).ready(function () {

    $('#txt-precio').val(100);

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
        document.getElementById('card-regional').classList.add('d-none');
        pFinal=[];
        pGeneroNatalidad=[];
        pGeneroMortalidad=[];
        pNatalidadesTiposDiscapacidad=[];

    });

    $('#btn-simular').click(function(){

      var precio = $('#txt-precio').val();
      var años = $('#txt-anios').val();
    //   var porcentajeMortalidad = $('#txt-porcentaje-mortalidad').val();

      if(años>1){
        if(precio>=100){
          document.getElementById('card-discapacidad').classList.remove('d-none');
          document.getElementById('card-mortalidad').classList.remove('d-none');
          document.getElementById('card-natalidad').classList.remove('d-none');
          document.getElementById('card-regional').classList.remove('d-none');
          pFinal=[];
          pGeneroNatalidad=[];
          pGeneroMortalidad=[];
          pNatalidadesTiposDiscapacidad=[];
          mapaRegional();
          dibujarGraficoNatalidad();
          dibujarGraficoMortalidad();
          dibujarGraficoDiscapacidad();
          valoresEstadisticos(precio,años,porcentajeMortalidad,porcentajeNatalidad);

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
        document.getElementById('card-regional').classList.add('d-none');
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
      document.getElementById('card-regional').classList.add('d-none');
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


function mapaRegional(){
    google.charts.load('current', {
        'packages':['geochart'],
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        google.charts.load('current', {
            'packages': ['geochart'],
            'mapsApiKey': 'AIzaSyBikQ4kDo8W_lr3H3yKd2jibvoCsYugkvA'
          });
          google.charts.setOnLoadCallback(drawMarkersMap);
     
           function drawMarkersMap() {
           var data = google.visualization.arrayToDataTable([
             ['Departamento',   'Popularidad'],
             ['Valle',      578],
             ['Francisco Morazán',     6345],
             ['Islas de la Bahía',     2110],
             ['Cortés',     10500],
             ['Atlántida',     4567],
             ['Comayagua',     3500],
           ]);
     
           var options = {
             region: 'HN',
             resolution: 'provinces',
             colorAxis: {colors: ['blue']}
           };
     
           var chart = new google.visualization.GeoChart(document.getElementById('grafico-regional'));
           chart.draw(data, options);
         };
      }
}


  