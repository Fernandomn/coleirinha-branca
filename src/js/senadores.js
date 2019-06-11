urlRoot = 'http://legis.senado.gov.br/dadosabertos/'
urlSenador = 'senador/'
urlListaAtual = 'lista/atual/'
$.support.cors = true

$('#bt-nav-senadores').click((event) => {
  event.preventDefault()
  $.ajax({
    url: urlRoot + urlSenador + urlListaAtual,
    type: 'GET',
    crossDomain: true,

    success: (result) => {
      console.log(result)
    },
    error: (err) => {
      console.error("erro: ", err)
    }
  })
})