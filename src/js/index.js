// deputados
var urlCamara = 'https://dadosabertos.camara.leg.br/api/v2/'
var urlBlocos = 'blocos'
var urlDeputados = 'deputados'
var urlParams = '?ordem=ASC&ordenarPor=nome'
var urlFoto = 'https://www.camara.leg.br/internet/deputado/bandep/'


// senadores
var urlRoot = 'http://legis.senado.gov.br/dadosabertos/'
var urlSenador = 'senador/'
var urlListaAtual = 'lista/atual/'
jQuery.support.cors = true;

// accordion
//$('.breakrow').click(function(){
criaClick = function () {
  $('.clickable').on('click', function () {
    console.log('criaClick')
    $(this).next().toggle();
  });
}
// $('#testa-blocos').click(function () {
//   $.ajax(
//     {
//       url: urlCamara + urlBlocos,
//       type: 'GET',
//       success: function (resp) {
//         console.log('dados', resp.dados)
//       },
//       error: function (err) {
//         console.log('err', err)
//       }
//     }
//   )
//   // .done()
// });