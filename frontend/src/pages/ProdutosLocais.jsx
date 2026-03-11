import { useEffect, useState } from 'react';
import {
    atualizarProdutoLocal,
    buscarProdutosLocais,
    criarProdutoLocal,
} from '../services/api';

function ProdutosLocais() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [mensagemErro, setMensagemErro] = useState('');

  const [formulario, setFormulario] = useState({
    nome: '',
    descricao: '',
    preco: '',
    estoque: '',
    imagem: '',
  });

  function mostrarErro(erro) {
    setMensagemErro(erro);
    setTimeout(() => setMensagemErro(''), 4000);
  }

  function carregarProdutos() {
    setCarregando(true);
    buscarProdutosLocais()
      .then((dados) => {
        setProdutos(dados);
        setCarregando(false);
      })
      .catch(() => {
        setCarregando(false);
        mostrarErro('Erro ao carregar os produtos. Verifique a conexão.');
      });
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  function atualizarCampo(campo, valor) {
    setFormulario({
      ...formulario,
      [campo]: valor,
    });
  }

  function abrirFormCriacao() {
    setFormulario({ nome: '', descricao: '', preco: '', estoque: '', imagem: '' });
    setEditando(null);
    setMostrarForm(true);
  }

  function abrirFormEdicao(produto) {
    setFormulario({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco.toString(),
      estoque: produto.estoque.toString(),
      imagem: produto.imagem || '',
    });
    setEditando(produto.id);
    setMostrarForm(true);
  }

  async function salvar(e) {
    e.preventDefault();

    const dados = {
      nome: formulario.nome,
      descricao: formulario.descricao,
      preco: parseFloat(formulario.preco),
      estoque: parseInt(formulario.estoque),
      imagem: formulario.imagem || null,
    };

    try {
      if (editando) {
        await atualizarProdutoLocal(editando, dados);
      } else {
        await criarProdutoLocal(dados);
      }
      setMostrarForm(false);
      carregarProdutos();
    } catch (err) {
      mostrarErro(err.response?.data?.erro || 'Erro ao salvar o produto');
    }
  }

  if (carregando) {
    return <p className="mensagem-centro">Carregando...</p>;
  }

  return (
    <div className="pagina-produtos-locais">
      <div className="cabecalho-pagina">
        <h1>Produtos Locais</h1>
        <button className="botao-adicionar" onClick={abrirFormCriacao}>
          Novo Produto
        </button>
      </div>

      {mensagemErro && (
        <div style={{ backgroundColor: '#ffcccc', color: '#cc0000', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          {mensagemErro}
        </div>
      )}

      {mostrarForm && (
        <form className="formulario-produto" onSubmit={salvar}>
          <h2>{editando ? 'Editar Produto' : 'Novo Produto'}</h2>
          <div className="campo">
            <label>Nome</label>
            <input
              type="text"
              value={formulario.nome}
              onChange={(e) => atualizarCampo('nome', e.target.value)}
              required
            />
          </div>
          <div className="campo">
            <label>Descricao</label>
            <input
              type="text"
              value={formulario.descricao}
              onChange={(e) => atualizarCampo('descricao', e.target.value)}
              required
            />
          </div>
          <div className="campos-linha">
            <div className="campo">
              <label>Preco (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formulario.preco}
                onChange={(e) => atualizarCampo('preco', e.target.value)}
                required
              />
            </div>
            <div className="campo">
              <label>Estoque</label>
              <input
                type="number"
                value={formulario.estoque}
                onChange={(e) => atualizarCampo('estoque', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="campo">
            <label>URL da Imagem (opcional)</label>
            <input
              type="text"
              value={formulario.imagem}
              onChange={(e) => atualizarCampo('imagem', e.target.value)}
            />
          </div>
          <div className="form-acoes">
            <button type="submit" className="botao-finalizar">
              Salvar
            </button>
            <button
              type="button"
              className="botao-cancelar"
              onClick={() => setMostrarForm(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {produtos.length === 0 && !mostrarForm && (
        <p className="mensagem-centro">Nenhum produto cadastrado.</p>
      )}

      <div className="tabela-container">
        {produtos.length > 0 && (
          <table className="tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preco</th>
                <th>Estoque</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>R$ {produto.preco.toFixed(2)}</td>
                  <td>{produto.estoque}</td>
                  <td>
                    <button
                      className="botao-editar"
                      onClick={() => abrirFormEdicao(produto)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProdutosLocais;
