$('#bt-nav-senadores').click((event) => {
  event.preventDefault()
  $.ajax({
    url: urlRoot + urlSenador + urlListaAtual,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      "access-control-allow-origin": "*",
    },
    type: 'GET',
    crossDomain: true,
    success: function (result) {
      console.log(result)
    },
    error: function (err) {
      console.error("erro: ", err)
    }
  })
})