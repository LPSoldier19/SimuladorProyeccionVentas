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
        ventasIniciales = 102126;
        porcFMO=0.25;
        porcCOR=0.32;
        porcOLA=0.12;
        porcCHO=0.08;
        porcCOM=0.10;
        porcATL=0.13;
        minimo= -0.087;
        maximo= 0.087;
      }
      else if($('#slc-categorias').val()==2){
        ventasIniciales = 80300;
        porcFMO=0.34;
        porcCOR=0.31;
        porcOLA=0.11;
        porcCHO=0.7;
        porcCOM=0.5;
        porcATL=0.12;
        minimo= -0.0213;
        maximo= 0.0213;
      }
      else if($('#slc-categorias').val()==3){
        ventasIniciales = 27740;
        porcFMO=0.37;
        porcCOR=0.29;
        porcOLA=0.09;
        porcCHO=0.05;
        porcCOM=0.08;
        porcATL=0.12;
        minimo= -0.0602;
        maximo= 0.0602;
      }
      else if($('#slc-categorias').val()==4){
        ventasIniciales = 164250;
        porcFMO=0.21;
        porcCOR=0.25;
        porcOLA=0.19;
        porcCHO=0.11;
        porcCOM=0.09;
        porcATL=0.15;
        minimo= -0.0405;
        maximo= 0.0405;
      }
      else if($('#slc-categorias').val()==5){
        ventasIniciales = 240900;
        porcFMO=0.23;
        porcCOR=0.22;
        porcOLA=0.15;
        porcCHO=0.11;
        porcCOM=0.12;
        porcATL=0.17;
        minimo= -0.0505;
        maximo= 0.0505;
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

      var categoria = $('#slc-categorias').val();
      var precioProducto = $('#txt-precio').val();
      var cantidadAnios = $('#txt-anios').val();

      if(precioProducto>=15){
        if(1<cantidadAnios<=10){
          if(categoria!=0){
            document.getElementById('card-casos').classList.remove('d-none');
            document.getElementById('card-crecimiento-departamento').classList.remove('d-none');
            document.getElementById('card-regional').classList.remove('d-none');
            grafRegional=[];
            grafCasos=[];
            grafCrecDepto=[];
            mapaRegional();
            graficoCasos();
            graficoCrecimientoDepartamentos();
            valoresEstadisticos(precioProducto,ventasIniciales,cantidadAnios);
          }
          else{
            alert('Los datos ingresados son incorrectos');
          }
        }
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

var grafRegional=[];

var grafCasos=[];

var grafCrecDepto=[];


function valoresEstadisticos(precio,ventasUltimoAnio,numeroAnios){
  var ventasIniciales = Number(ventasUltimoAnio)*Number(precio);
  var ventasFMO;
  var ventasCOR;
  var ventasOLA;
  var ventasCHO;
  var ventasCOM;
  var ventasATL; 
  grafRegional.push(['Departamento','No. de Ventas']);
  grafCrecDepto.push(['Año', 'Francisco Morazán', 'Cortés', 'Atlántida', 'Comayagua', 'Choluteca', 'Olancho']);
  
  //llenar Array GrafRegional
  for(i=1;i<=numeroAnios;i++){
    ventasFMO = ventasIniciales*porcFMO;
    ventasCOR = ventasIniciales*porcCOR;
    ventasOLA = ventasIniciales*porcOLA;
    ventasCHO = ventasIniciales*porcCHO;
    ventasCOM = ventasIniciales*porcCOM;
    ventasATL = ventasIniciales*porcATL;
    var x1 = ventasIniciales+(ventasIniciales*(Math.random() * (maximo - minimo) + minimo));
    ventasIniciales=x1;
  }

  var ventasAuxiliares = ventasIniciales;
  var ventasAuxiliares2 = ventasIniciales;
  var ventasAuxiliares3 = ventasIniciales;

  //llenar array grafCasos
  for(j=1;j<=numeroAnios;j++){
    var crecimientoPositivo=ventasAuxiliares2+(ventasAuxiliares2*maximo);
    var crecimientoNegativo=ventasAuxiliares3+(ventasAuxiliares3*minimo);
    var crecimientoPseudoaleatorio=ventasAuxiliares+(ventasAuxiliares*(Math.random() * (maximo - minimo) + minimo));
    var x2 = ventasAuxiliares+(ventasAuxiliares*(Math.random() * (maximo - minimo) + minimo));
    var x3 = ventasAuxiliares2+(ventasAuxiliares2*maximo);
    var x4 = ventasAuxiliares3+(ventasAuxiliares3*minimo);
    grafCasos.push([j,Math.round(crecimientoPositivo),Math.round(crecimientoNegativo),Math.round(crecimientoPseudoaleatorio)]);
    ventasAuxiliares=x2;
    ventasAuxiliares2=x3;
    ventasAuxiliares3=x4;
  }

  //llenar array grafCrecDpto
  for(k=1;k<=numeroAnios;k++){
    ventasFMO = ventasIniciales*porcFMO;
    ventasCOR = ventasIniciales*porcCOR;
    ventasOLA = ventasIniciales*porcOLA;
    ventasCHO = ventasIniciales*porcCHO;
    ventasCOM = ventasIniciales*porcCOM;
    ventasATL = ventasIniciales*porcATL;
    var x1 = ventasIniciales+(ventasIniciales*(Math.random() * (maximo - minimo) + minimo));
    grafCrecDepto.push([`${k}`, Math.round(ventasFMO), Math.round(ventasCOR), Math.round(ventasATL), Math.round(ventasCOM), Math.round(ventasCHO), Math.round(ventasOLA)]);
    ventasIniciales=x1;
  }

  grafRegional.push(['Francisco Morazán',Math.round(ventasFMO)]);
  grafRegional.push(['Cortés',Math.round(ventasCOR)]);
  grafRegional.push(['Atlántida',Math.round(ventasATL)]);
  grafRegional.push(['Comayagua',Math.round(ventasCOM)]);
  grafRegional.push(['Choluteca',Math.round(ventasCHO)]);
  grafRegional.push(['Olancho',Math.round(ventasOLA)]);

  
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
           var data = google.visualization.arrayToDataTable(grafRegional);
     
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

      data.addRows(grafCasos);

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
        var data = google.visualization.arrayToDataTable(grafCrecDepto);

        var options = {
          chart: {
            title: 'Proyección de Ventas por Departamentos'
          },
          height: 500
        };

        var chart = new google.charts.Bar(document.getElementById('grafico-crecimiento-departamento'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }

}


  