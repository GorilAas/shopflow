import { useEffect, useState } from 'react';
import { buscarAnuncios, criarPedido } from '../services/api';

function CadastrarVenda() {
  const [anuncios, setAnuncios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [itensVenda, setItensVenda] = useState([]);
  const [sucesso, setSucesso] = useState(null);
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const [formulario, setFormulario] = useState({
    nomeCliente: '',
    email: '',
    endereco: '',
    formaPagamento: 'PIX',
  });

  useEffect(() => {
    buscarAnuncios()
      .then((dados) => {
        const vinculados = dados.filter((a) => a.produtoLocal);
        setAnuncios(vinculados);
        setCarregando(false);
      })
      .catch(() => {
        setCarregando(false);
      });
  }, []);

  function adicionarItem(anuncio) {
    const existe = itensVenda.find((i) => i.produtoExternoId === anuncio.produtoExternoId);
    if (existe) {
      setItensVenda(
        itensVenda.map((i) =>
          i.produtoExternoId === anuncio.produtoExternoId
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        )
      );
    } else {
      setItensVenda([
        ...itensVenda,
        {
          produtoExternoId: anuncio.produtoExternoId,
          nome: anuncio.produtoLocal.nome,
          preco: anuncio.produtoLocal.preco,
          quantidade: 1,
        },
      ]);
    }
  }

  function removerItem(produtoExternoId) {
    setItensVenda(itensVenda.filter((i) => i.produtoExternoId !== produtoExternoId));
  }

  function alterarQuantidade(produtoExternoId, quantidade) {
    if (quantidade <= 0) {
      removerItem(produtoExternoId);
      return;
    }
    setItensVenda(
      itensVenda.map((i) =>
        i.produtoExternoId === produtoExternoId ? { ...i, quantidade } : i
      )
    );
  }

  function atualizarCampo(campo, valor) {
    setFormulario({ ...formulario, [campo]: valor });
  }

  function calcularTotal() {
    return itensVenda.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }

  async function enviarPedido(e) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);

    const dados = {
      ...formulario,
      itens: itensVenda.map((item) => ({
        produtoExternoId: item.produtoExternoId,
        quantidade: item.quantidade,
      })),
    };

    try {
      const resposta = await criarPedido(dados);
      setSucesso(resposta.numeroPedido);
      setItensVenda([]);
      setFormulario({ nomeCliente: '', email: '', endereco: '', formaPagamento: 'PIX' });
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao cadastrar venda');
    }
    setEnviando(false);
  }

  if (carregando) {
    return <p className="mensagem-centro">Carregando...</p>;
  }

  if (sucesso) {
    return (
      <div className="pagina-confirmacao">
        <div className="confirmacao-card">
          <h1>Venda Cadastrada!</h1>
          <p>O pedido foi registrado com sucesso.</p>
          <div className="confirmacao-numero">
            <span>Numero do pedido:</span>
            <strong>{sucesso}</strong>
          </div>
          <button className="botao-voltar" onClick={() => setSucesso(null)}>
            Nova venda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pagina-venda">
      <h1>Cadastrar Venda</h1>

      <div className="venda-layout">
        <div className="venda-produtos">
          <h2>Produtos Disponiveis</h2>
          {anuncios.length === 0 && (
            <p className="mensagem-centro">
              Nenhum anuncio vinculado a produto local. Importe e vincule na pagina de Anuncios.
            </p>
          )}
          <div className="lista-produtos-venda">
            {anuncios.map((anuncio) => (
              <div key={anuncio.id} className="item-produto-venda">
                <img
                  src={anuncio.imagem}
                  alt={anuncio.nome}
                  className="produto-venda-imagem"
                />
                <div className="produto-venda-info">
                  <strong>{anuncio.produtoLocal.nome}</strong>
                  <span>R$ {anuncio.produtoLocal.preco.toFixed(2)}</span>
                  <span className="estoque-info">
                    Estoque: {anuncio.produtoLocal.estoque}
                  </span>
                </div>
                <button
                  className="botao-adicionar"
                  onClick={() => adicionarItem(anuncio)}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="venda-carrinho">
          <h2>Itens da Venda</h2>

          {itensVenda.length === 0 && (
            <p className="mensagem-centro">Nenhum item adicionado.</p>
          )}

          {itensVenda.map((item) => (
            <div key={item.produtoExternoId} className="item-carrinho-venda">
              <div className="item-carrinho-venda-info">
                <strong>{item.nome}</strong>
                <span>R$ {item.preco.toFixed(2)}</span>
              </div>
              <div className="item-carrinho-acoes">
                <button onClick={() => alterarQuantidade(item.produtoExternoId, item.quantidade - 1)}>
                  -
                </button>
                <span>{item.quantidade}</span>
                <button onClick={() => alterarQuantidade(item.produtoExternoId, item.quantidade + 1)}>
                  +
                </button>
                <button className="botao-remover" onClick={() => removerItem(item.produtoExternoId)}>
                  X
                </button>
              </div>
            </div>
          ))}

          {itensVenda.length > 0 && (
            <>
              <div className="venda-total">
                <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
              </div>

              <form className="venda-formulario" onSubmit={enviarPedido}>
                <h3>Dados do Cliente</h3>
                <div className="campo">
                  <label>Nome</label>
                  <input
                    type="text"
                    value={formulario.nomeCliente}
                    onChange={(e) => atualizarCampo('nomeCliente', e.target.value)}
                    required
                  />
                </div>
                <div className="campo">
                  <label>E-mail</label>
                  <input
                    type="email"
                    value={formulario.email}
                    onChange={(e) => atualizarCampo('email', e.target.value)}
                    required
                  />
                </div>
                <div className="campo">
                  <label>Endereco</label>
                  <input
                    type="text"
                    value={formulario.endereco}
                    onChange={(e) => atualizarCampo('endereco', e.target.value)}
                    required
                  />
                </div>
                <div className="campo">
                  <label>Pagamento</label>
                  <select
                    value={formulario.formaPagamento}
                    onChange={(e) => atualizarCampo('formaPagamento', e.target.value)}
                  >
                    <option value="PIX">Pix</option>
                    <option value="CARTAO">Cartao</option>
                    <option value="BOLETO">Boleto</option>
                  </select>
                </div>

                {erro && <p className="mensagem-erro">{erro}</p>}

                <button
                  type="submit"
                  className="botao-finalizar"
                  disabled={enviando}
                >
                  {enviando ? 'Enviando...' : 'Cadastrar Venda'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CadastrarVenda;
