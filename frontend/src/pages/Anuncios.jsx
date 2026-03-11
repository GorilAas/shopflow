import { useEffect, useState } from 'react';
import {
    buscarAnuncios,
    buscarProdutos,
    buscarProdutosLocais,
    deletarAnuncio,
    importarAnuncio,
    vincularAnuncio,
} from '../services/api';

function Anuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [produtosMarketplace, setProdutosMarketplace] = useState([]);
  const [produtosLocais, setProdutosLocais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('anuncios');
  const [mensagemErro, setMensagemErro] = useState('');

  function mostrarErro(erro) {
    setMensagemErro(erro);
    setTimeout(() => setMensagemErro(''), 4000);
  }

  function carregarDados() {
    setCarregando(true);
    Promise.all([buscarAnuncios(), buscarProdutos(), buscarProdutosLocais()])
      .then(([anunciosData, produtosData, locaisData]) => {
        setAnuncios(anunciosData);
        setProdutosMarketplace(produtosData);
        setProdutosLocais(locaisData);
        setCarregando(false);
      })
      .catch(() => {
        setCarregando(false);
        mostrarErro('Erro ao carregar os dados. Verifique a conexão com a API.');
      });
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function handleImportar(produtoExternoId) {
    try {
      await importarAnuncio(produtoExternoId);
      carregarDados();
    } catch (err) {
      mostrarErro(err.response?.data?.erro || 'Erro ao importar anúncio');
    }
  }

  async function handleVincular(anuncioId, produtoLocalId) {
    try {
      await vincularAnuncio(anuncioId, produtoLocalId ? parseInt(produtoLocalId) : null);
      carregarDados();
    } catch (err) {
      mostrarErro(err.response?.data?.erro || 'Erro ao vincular produto');
    }
  }

  async function handleDeletar(id) {
    if (!confirm('Tem certeza que deseja deletar este anúncio?')) {
      return;
    }
    try {
      await deletarAnuncio(id);
      carregarDados();
    } catch (err) {
      mostrarErro(err.response?.data?.erro || 'Erro ao deletar');
    }
  }

  const idsImportados = anuncios.map((a) => a.produtoExternoId);

  if (carregando) {
    return <p className="mensagem-centro">Carregando...</p>;
  }

  return (
    <div className="pagina-anuncios">
      <h1>Anúncios</h1>

      {mensagemErro && (
        <div style={{ backgroundColor: '#ffcccc', color: '#cc0000', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          {mensagemErro}
        </div>
      )}

      <div className="abas">
        <button
          className={abaAtiva === 'anuncios' ? 'aba-ativa' : ''}
          onClick={() => setAbaAtiva('anuncios')}
        >
          Meus Anúncios ({anuncios.length})
        </button>
        <button
          className={abaAtiva === 'importar' ? 'aba-ativa' : ''}
          onClick={() => setAbaAtiva('importar')}
        >
          Importar do Marketplace
        </button>
      </div>

      {abaAtiva === 'anuncios' && (
        <div className="lista-anuncios">
          {anuncios.length === 0 && (
            <p className="mensagem-centro">Nenhum anúncio importado ainda.</p>
          )}
          {anuncios.map((anuncio) => (
            <div key={anuncio.id} className="card-anuncio">
              <img
                src={anuncio.imagem}
                alt={anuncio.nome}
                className="anuncio-imagem"
              />
              <div className="anuncio-info">
                <h3>{anuncio.nome}</h3>
                <p>Preço marketplace: R$ {anuncio.preco.toFixed(2)}</p>
                <p>ID externo: {anuncio.produtoExternoId}</p>
                
                <div className="vincular-area">
                  <select
                    value={anuncio.produtoLocalId || ""}
                    onChange={(e) => handleVincular(anuncio.id, e.target.value)}
                  >
                    <option value="">Não vinculado (Selecione um produto)</option>
                    {produtosLocais.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nome} (estoque: {p.estoque})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="anuncio-acoes">
                <button className="botao-remover" onClick={() => handleDeletar(anuncio.id)}>
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {abaAtiva === 'importar' && (
        <div className="grade-produtos">
          {produtosMarketplace.map((produto) => (
            <div key={produto.id} className="card-produto">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="card-produto-imagem"
              />
              <div className="card-produto-info">
                <h3 className="card-produto-nome">{produto.nome}</h3>
                <p className="card-produto-preco">R$ {produto.preco.toFixed(2)}</p>
                <p style={{ fontSize: '0.85em', color: '#555', margin: '10px 0' }}>
                  {produto.descricao}
                </p>
                {idsImportados.includes(produto.id) ? (
                  <button className="botao-desabilitado" disabled>
                    Já importado
                  </button>
                ) : (
                  <button
                    className="botao-adicionar"
                    onClick={() => handleImportar(produto.id)}
                  >
                    Importar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Anuncios;
