var ventasIniciales;
var precio = $('#txt-precio').val();
var minimo= 0;
var maximo= 0;
var porcFMO;
var porcCOR;
var porcOLA;
var porcCHO;
var porcCOM;
var porcATL;


$(document).ready(function () {

    $('#txt-precio').val(15);

    $('#txt-ventas-ultimo-año').val(10000);

    $('#chk-producto-mercado').change(function(){
      if( $('#chk-producto-mercado').prop('checked') ) {
        $('#ventas-ultimo-año').removeClass('d-none');
        $('#chk-producto-mercado').prop('disabled',true);
      }
    });

    $('#slc-categorias').change(function(){
      
      if($('#slc-categorias').val()==1){
        ventasIniciales = 2100;
        porcFMO=2;
        porcCOR=2;
        porcOLA=2;
        porcCHO=2;
        porcCOM=2;
        porcATL=2;
      }
      else if($('#slc-categorias').val()==2){
        ventasIniciales = 2200;
        porcFMO=2;
        porcCOR=2;
        porcOLA=2;
        porcCHO=2;
        porcCOM=2;
        porcATL=2;
      }
      else if($('#slc-categorias').val()==3){
        ventasIniciales = 2300;
        porcFMO=2;
        porcCOR=2;
        porcOLA=2;
        porcCHO=2;
        porcCOM=2;
        porcATL=2;
      }
      else if($('#slc-categorias').val()==4){
        ventasIniciales = 2400;
        porcFMO=2;
        porcCOR=2;
        porcOLA=2;
        porcCHO=2;
        porcCOM=2;
        porcATL=2;
      }
      else if($('#slc-categorias').val()==5){
        ventasIniciales = 2500;
        porcFMO=2;
        porcCOR=2;
        porcOLA=2;
        porcCHO=2;
        porcCOM=2;
        porcATL=2;
      }
      else{
        ventasIniciales = 0;
      }

    });
    
    $('#btn-limpiar').click(function(){
      $('#chk-producto-mercado').prop('disabled',false);
      $('#chk-producto-mercado').prop('checked',false);
      $('#ventas-ultimo-año').addClass('d-none'); 
      $('#txt-precio').val(15);
      $('#txt-ventas-ultimo-año').val(10000);
      $('#slc-categorias').val(0);
      $('#txt-anios').val(1);

      document.getElementById('card-regional').classList.add('d-none');
      document.getElementById('card-casos').classList.add('d-none');
      document.getElementById('card-crecimiento-departamento').classList.add('d-none');

    });

    $('#btn-simular').click(function(){

      if( $('#chk-producto-mercado').prop('checked') ) {
        ventasIniciales = Number($('#txt-ventas-ultimo-año').val());
      }

      console.log(ventasIniciales);
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

var grafRegional=[];

var grafCasos=[];

var grafCrecDepto=[];


// function valoresEstadisticos(poblacion,numeroAnios,porcentajeMortalidad,porcentajeNatalidad){
//   var poblacionAuxiliar = Number(poblacion);
//   grafRegional.push(['Departamento','No. de Ventas']);
//   grafCrecDepto.push(['Año', 'Francisco Morazán', 'Cortés', 'Atlántida', 'Comayagua', 'Choluteca', 'Olancho']);

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
      data.addColumn('number', 'Año');
      data.addColumn('number', 'Crecimiento Positivo');
      data.addColumn('number', 'Crecimiento Negativo');
      data.addColumn('number', 'Crecimiento Pseudoaleatorio');

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
          title: 'Casos de Proyección de Ventas',
          subtitle: 'Se mostraran los distintos casos que se pueden generar para las ventas a través de los años'
        },
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
          ['Año', 'Francisco Morazán', 'Cortés', 'Atlántida', 'Comayagua', 'Choluteca', 'Olancho'],
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


  