var urlProposicoes = (id) => {
  return 'proposicoes?idDeputadoAutor=' + id + '&ordem=ASC&ordenarPor=id'
}
var urlDespesas = (id) => {
  return 'deputados/' + id + '/despesas/'
}

var urlEventos = (id) => {
  return 'deputados/' + id + '/eventos'
}
var umMinuto = 60000
var respProp = {}
var respEvent = {}
var respDesp = {}

$('#bt-nav-deputados').click(function (e) {
  e.preventDefault()
  $.ajax({
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
  }).then(function (e) {
    $('#tabela-deputados').bootstrapTable({
      pagination: true,
      search: true
    })
    $('#tabela-deputados').show()

  })
});

carregaDados = function (url, id) {
  $.ajax({
    url: url,
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
      console.error('err', err)
    }
  })
}

carregaProp = function (id) {
  $.ajax({
    url: urlCamara + urlProposicoes(id),
    type: 'GET',
    success: function (resp) {
      // $('#tabela-proposicoes').remove()
      if (resp.dados == respProp) {
        return
      }
      respProp = resp.dados
      $('#tabela-proposicoes tr').remove()
      resp.dados.map(function (prep, i) {
        console.log('prep', prep)
        let link = '<a class="linha-proposicoes">';
        let ano = '<td>' + link + tratarCamposVazios(prep.ano) + '</a></td>'
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
  })
}

carregaDesp = function (id) {
  $.ajax({
    url: urlCamara + urlDespesas(id),
    type: 'GET',
    success: function (resp) {
      // console.log(resp.dados)
      if (resp.dados == respDesp) {
        return
      }
      respDesp = resp.dados
      $('#tabela-despesas tr').remove()
      resp.dados.map(function (desp, i) {
        let prepNmForn = desp.nomeFornecedor.length > 20 ? desp.nomeFornecedor.substr(0, 20) + '...' : desp.ementa
        let prepTpDesp = desp.tipoDespesa.length > 20 ? desp.tipoDespesa.substr(0, 20) + '...' : desp.ementa
        // Para colocar o valor em formato de dinheiro brasileiro
        let valorDocTexto = desp.valorDocumento.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })
        let valorLiqTexto = desp.valorLiquido.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })

        let link = '<a class="linha-despesas">';
        let dataAno = '<td>' + link + tratarCamposVazios(desp.dataDocumento) + '</a></td>'
        let nomeFornecedor = '<td title="' + desp.nomeFornecedor + '">' + link + prepNmForn + '</a></td>'
        let tipoDespesa = '<td title="' + desp.tipoDespesa + '">' + link + prepTpDesp + '</a></td>'
        let valorDocumento = '<td>' + link + valorDocTexto + '</a></td>'
        let valorLiquido = '<td>' + link + valorLiqTexto + '</a></td>'

        let linha = '<tr>' + dataAno + nomeFornecedor + tipoDespesa + valorDocumento + valorLiquido + '</tr>'
        // console.log(linha)
        $('#tabela-despesas').children('tbody').append(linha)
      })
    },
    error: function (err) {
      console.log('err', err)
    }
  })
}

carregaEvent = function (id) {
  $.ajax({
    url: urlCamara + urlEventos(id),
    type: 'GET',
    success: function (resp) {
      // console.log(resp)
      if (resp.dados == respEvent) {
        return
      }
      respEvent = resp.dados
      $('#tabela-eventos tr').remove()
      
      resp.dados.map(function (even, i) {
        let link = '<a class="linha-evento">'
        let options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        };
        let dataIni = new Date(even.dataHoraFim)
        let dataFim = new Date(even.dataHoraFim)

        let tipo = '<td>' + link + even.descricaoTipo + '</a></td>'
        let descricao = '<td>' + link + even.descricao + '</a></td>'
        let horaFim = '<td>' + link + tratarCamposVazios(dataIni.toLocaleDateString('pt-BR', options)) + '</a></td>'
        let horaIni = '<td>' + link + tratarCamposVazios(dataFim.toLocaleDateString('pt-BR', options)) + '</a></td>'
        let localCamara = '<td>' + link + even.localCamara.nome + '</a></td>'
        let orgao = '<td>' + link + even.orgaos[0] + '</a></td>'
        let situacao = '<td>' + link + even.situacao + '</a></td>'

        let linha = '<tr>' + localCamara + tipo + descricao + horaIni + horaFim + '</tr>'
        console.log(linha)
        $('#tabela-eventos').children('tbody').append(linha)
      })
    },
    error: function (err) {
      console.error('err', err)
    },
  })
}

$(document).on('click', '.linha-dept', function (e) {
  e.preventDefault()
  let nome = $(this).data('nome')
  let id = $(this).data('id')
  let deptUrl = $(this).attr('href')
  $("#modal-titulo-deputado").html(nome)

  // Dados pessoais
  carregaDados(deptUrl, id)

  // Proposicoes
  carregaProp(id)
  var reloadProp = setInterval(function () {
    console.log("realoading Prop")
    carregaProp(id)

  }, umMinuto)

  // Despesas
  carregaDesp(id)
  var reloadProp = setInterval(function () {
    console.log("realoading Prop")
    carregaDesp(id)

  }, umMinuto)

  // Eventos
  carregaEvent(id)
  var reloadProp = setInterval(function () {
    console.log("realoading Prop")
    carregaEvent(id)

  }, umMinuto)
})

function tratarCamposVazios(str) {
  return str || ''
}