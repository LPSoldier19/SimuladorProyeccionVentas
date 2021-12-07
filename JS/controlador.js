var porcentajeCrecimiento = 0;
var ventasIniciales = 0;


$(document).ready(function () {

    $('#txt-precio').val(100);

    $('#txt-porcentaje-natalidad').change(function() { 
        porcentajeNatalidad = $('#txt-porcentaje-natalidad').val();
        $('#txt-valor-porcentaje-natalidad').val(`${porcentajeNatalidad}%`)
    });

    $('#chk-producto-mercado').change(function(){
      if( $('#chk-producto-mercado').prop('checked') ) {
        $('#ventas-ultimo-año').removeClass('d-none');
      }
      else{
        $('#ventas-ultimo-año').addClass('d-none');
      }
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

          document.getElementById('card-casos').classList.remove('d-none');
          document.getElementById('card-crecimiento-departamento').classList.remove('d-none');
          // document.getElementById('card-natalidad').classList.remove('d-none');
          document.getElementById('card-regional').classList.remove('d-none');
          pFinal=[];
          pGeneroNatalidad=[];
          pGeneroMortalidad=[];
          pNatalidadesTiposDiscapacidad=[];
          mapaRegional();
          graficoCasos();
          graficoCrecimientoDepartamentos();

          //valoresEstadisticos(precio,años,porcentajeMortalidad,porcentajeNatalidad);

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

// function valoresEstadisticos(poblacion,numeroAnios,porcentajeMortalidad,porcentajeNatalidad){
//   var poblacionAuxiliar = Number(poblacion);
//   pFinal.push(['Año','Poblacion','Mortalidad','Natalidad']);
//   pGeneroNatalidad.push(['Año', 'Hombres', 'Mujeres']);
//   pGeneroMortalidad.push(['Año', 'Hombres', 'Mujeres']);
//   pNatalidadesTiposDiscapacidad.push(['Año', 'Motriz','Mental','Ambas']);

//   for(i=1;i<=numeroAnios;i++){
//     var natalidad=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
//     var mortalidad=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
//     var x1=poblacionAuxiliar+(natalidad)-(mortalidad);
//     pFinal.push([String(i),x1,natalidad,mortalidad]);
//     poblacionAuxiliar=x1;
//   }

//   for(j=1;j<=numeroAnios;j++){
//     var natalidadGeneral=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
//     var mortalidad=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
//     var natalidadHombres=natalidadGeneral*((50.41)/100);
//     var natalidadMujeres=natalidadGeneral*((49.58)/100);
//     var x1=poblacionAuxiliar+(natalidadGeneral)-(mortalidad);
//     pGeneroNatalidad.push([String(j),natalidadHombres,natalidadMujeres]);
//     poblacionAuxiliar=x1;
//   }

//   for(k=1;k<=numeroAnios;k++){
//     var mortalidadGeneral=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
//     var natalidad=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
//     var mortalidadHombres=mortalidadGeneral*((17)/100);
//     var mortalidadMujeres=mortalidadGeneral*((12)/100);
//     var x1=poblacionAuxiliar+(natalidad)-(mortalidadGeneral);
//     pGeneroMortalidad.push([String(k),mortalidadHombres,mortalidadMujeres]);
//     poblacionAuxiliar=x1;
//   }

//   for(m=1;m<=numeroAnios;m++){
//     var natalidadGeneral2=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
//     var mortalidad=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
//     var natalidadDiscapacidad=natalidadGeneral2*(0.05);
//     var discapacidadMotrices=natalidadDiscapacidad*(0.6);
//     var discapacidadMentales=natalidadDiscapacidad*(0.4);
//     var discapacidadAmbas=natalidadDiscapacidad*(0.2);
//     var x1=poblacionAuxiliar+(natalidadGeneral)-(mortalidad);
//     pNatalidadesTiposDiscapacidad.push([String(m),discapacidadMotrices,discapacidadMentales,discapacidadAmbas]);
//     poblacionAuxiliar=x1;
//   }

// }


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
             ['Departamento',   'No. de Ventas'],
             ['Francisco Morazán',     6345],
             ['Cortés',     10500],
             ['Atlántida',     4567],
             ['Comayagua',     3500],
             ['Choluteca',     3500],
             ['Olancho',     3500],
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

function graficoCasos(){
  google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Day');
      data.addColumn('number', 'Guardians of the Galaxy');
      data.addColumn('number', 'The Avengers');
      data.addColumn('number', 'Transformers: Age of Extinction');

      data.addRows([
        [1,  37.8, 80.8, 41.8],
        [2,  30.9, 69.5, 32.4],
        [3,  25.4,   57, 25.7],
        [4,  11.7, 18.8, 10.5],
        [5,  11.9, 17.6, 10.4],
        [6,   8.8, 13.6,  7.7],
        [7,   7.6, 12.3,  9.6],
        [8,  12.3, 29.2, 10.6],
        [9,  16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11,  5.3,  7.9,  4.7],
        [12,  6.6,  8.4,  5.2],
        [13,  4.8,  6.3,  3.6],
        [14,  4.2,  6.2,  3.4]
      ]);

      var options = {
        chart: {
          title: 'Box Office Earnings in First Two Weeks of Opening',
          subtitle: 'in millions of dollars (USD)'
        },
        width: 900,
        height: 500
      };

      var chart = new google.charts.Line(document.getElementById('grafico-casos'));

      chart.draw(data, google.charts.Line.convertOptions(options));
    }
}

function graficoCrecimientoDepartamentos(){
  
  google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Francisco Morazán', 'Cortés', 'Atlántida', 'Comayagua', 'Choluteca', 'Olancho'],
          ['2014', 1000, 400, 200, 600,780,890],
          ['2015', 1000, 400, 200, 600,780,890],
          ['2016', 1000, 400, 200, 600,780,890],
          ['2017', 1000, 400, 200, 600,780,890]
        ]);

        var options = {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
          height: 500
        };

        var chart = new google.charts.Bar(document.getElementById('grafico-crecimiento-departamento'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }

}


  