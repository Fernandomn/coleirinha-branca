var urlCamara = 'https://dadosabertos.camara.leg.br/api/v2/'
var urlBlocos = 'blocos'
var urlDeputados = 'deputados'
var urlParams = '?ordem=ASC&ordenarPor=nome'

$('#testa-blocos').click(function () {
  $.ajax(
    {
      url: urlCamara + urlBlocos,
      type: 'GET',
      success: function (resp) {
        console.log('dados', resp.dados)
      },
      error: function (err) {
        console.log('err', err)
      }
    }
  )
  // .done()
});

$('#testa-deputados').click(function () {
  $.ajax(
    {
      url: urlCamara + urlDeputados + urlParams,
      type: 'GET',
      success: function (resp) {
        console.log('dados', resp.dados)
        resp.dados.map(function (dept, i) {
          let link = '<a data-nome="'+dept.nome+'" class="linha-dept" href="'+urlCamara + urlDeputados+ '/' +dept.id+'">';
          let id = '<td>' + link + dept.id + '</a></td>'
          let sigla = '<td>' + link + dept.siglaPartido + '</a></td>'
          let nome = '<td>' + link + dept.nome + '</a></td>'
          let uf = '<td>' + link + dept.siglaUf + '</a></td>'

          let linha = '<tr>' + id + nome + sigla + uf + '</tr>'

          $('#tabela-deputados').children('tbody').append(linha)
        })
      },
      error: function (err) {
        console.log('err', err)
      }
    }
  ).then(function (e) {
    $('#tabela-deputados').bootstrapTable({
      pagination: true,
      search: true
    })
    $('#tabela-deputados').show()

  })

});



$(document).on('click','.linha-dept',function(e){
  e.preventDefault()
  let nome = $(this).data('nome')
  $("#modal-titulo-deputado").html(nome)
  $.ajax(
    {
      url: $(this).attr('href'),
      type: 'GET',
      success: function (resp) {
        console.log(resp.dados)
        $('#cpf').html(resp.dados.cpf)
        $('#nome-civil').html(resp.dados.nomeCivil)
        $('#data-falecimento').html(resp.dados.dataFalecimento)
        $('#data-nascimento').html(resp.dados.dataNascimento)
        $('#escolaridade').html(resp.dados.escolaridade)
        $('#municipio-nascimento').html(resp.dados.municipioNascimento)
        $('#nome-civil').html(resp.dados.nomeCivil)
        //redesocial
        $('#sexo').html(resp.dados.sexo)
        $('#uf-nascimento').html(resp.dados.ufNascimento)
        $("#modal-tabela-deputados").modal('show')
      },
      error: function (err) {
        console.log('err', err)
      }
    }
  )
})





