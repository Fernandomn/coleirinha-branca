var urlCamara = 'https://dadosabertos.camara.leg.br/api/v2/'
var urlBlocos = 'blocos'
var urlDeputados = 'deputados'
var urlParams = '?ordem=ASC&ordenarPor=nome'
var urlFoto = 'https://www.camara.leg.br/internet/deputado/bandep/'
var urlProposicoes = (id) => { return 'proposicoes?idDeputadoAutor=' + id + '&ordem=ASC&ordenarPor=id' }
var urlDespesas = (id) => { return 'deputados/' + id + '/despesas/' }

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

$('#bt-nav-deputados').click(function (e) {
  e.preventDefault()
  $.ajax(
    {
      url: urlCamara + urlDeputados + urlParams,
      type: 'GET',
      success: function (resp) {
        // console.log('dados', resp.dados)
        resp.dados.map(function (dept, i) {
          let link = '<a data-id="' + dept.id + '" data-nome="' + dept.nome + '" class="linha-dept" href="' + urlCamara + urlDeputados + '/' + dept.id + '">';
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



$(document).on('click', '.linha-dept', function (e) {
  e.preventDefault()
  let nome = $(this).data('nome')
  let id = $(this).data('id')
  $("#modal-titulo-deputado").html(nome)

  // Dados pessoais
  $.ajax(
    {
      url: $(this).attr('href'),
      type: 'GET',
      success: function (resp) {
        // console.log(resp.dados)
        $('#foto').attr('src', urlFoto + resp.dados.id + '.jpg')
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

  // Proposicoes
  $.ajax(
    {
      url: urlCamara + urlProposicoes(id),
      type: 'GET',
      success: function (resp) {
        // console.log(resp.dados)
        resp.dados.map(function (prep, i) {
          let link = '<a class="linha-proposicoes">';
          let ano = '<td>' + link + tratarCampos(prep.ano) + '</a></td>'
          let prepEmenta = prep.ementa.length > 20 ? prep.ementa.substr(0, 20) + '...' : prep.ementa
          let ementa = '<td title="' + prep.ementa + '">' + link + prepEmenta + '</a></td>'
          let numero = '<td>' + link + prep.numero + '</a></td>'
          let siglaTipo = '<td>' + link + prep.siglaTipo + '</a></td>'

          let linha = '<tr>' + ano + ementa + numero + siglaTipo + '</tr>'

          $('#tabela-proposicoes').children('tbody').append(linha)
        })
      },
      error: function (err) {
        console.log('err', err)
      }
    }
  )

  // Despesas
  $.ajax(
    {
      url: urlCamara + urlDespesas(id), 
      type: 'GET',
      success: function (resp) {
        // console.log(resp.dados)
        resp.dados.map(function (prep, i) {
          let prepNmForn = prep.nomeFornecedor.length > 20 ? prep.nomeFornecedor.substr(0, 20) + '...' : prep.ementa
          let prepTpDesp = prep.tipoDespesa.length > 20 ? prep.tipoDespesa.substr(0, 20) + '...' : prep.ementa
          // Para colocar o valor em formato de dinheiro brasileiro
          let valorDocTexto = prep.valorDocumento.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
          let valorLiqTexto = prep.valorLiquido.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

          let link = '<a class="linha-despesas">';
          let dataAno = '<td>' + link + tratarCampos(prep.dataDocumento) + '</a></td>'
          let nomeFornecedor = '<td title="' + prep.nomeFornecedor + '">' + link + prepNmForn + '</a></td>'
          let tipoDespesa = '<td title="' + prep.tipoDespesa + '">' + link + prepTpDesp + '</a></td>'
          let valorDocumento = '<td>' + link + valorDocTexto + '</a></td>'
          let valorLiquido = '<td>' + link + valorLiqTexto + '</a></td>'

          let linha = '<tr>' + dataAno + nomeFornecedor + tipoDespesa + valorDocumento + valorLiquido + '</tr>'
          console.log(linha)
          $('#tabela-despesas').children('tbody').append(linha)
        })
      },
      error: function (err) {
        console.log('err', err)
      }
    }
  )

})

function tratarCampos(str) {
  if (str == undefined || str == null) {
    return ''
  }
  return str
}

