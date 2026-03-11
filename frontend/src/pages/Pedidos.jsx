import { useEffect, useState } from 'react';
import {
    atualizarPedido,
    atualizarStatusPedido,
    buscarPedidos,
    deletarPedido,
} from '../services/api';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(null);
  const [mensagemErro, setMensagemErro] = useState('');
  const [formEdicao, setFormEdicao] = useState({
    nomeCliente: '',
    email: '',
    endereco: '',
  });

  function mostrarErro(erro) {
    setMensagemErro(erro);
    setTimeout(() => setMensagemErro(''), 4000);
  }

  function carregarPedidos() {
    setCarregando(true);
    buscarPedidos()
      .then((dados) => {
        setPedidos(dados);
        setCarregando(false);
      })
      .catch(() => {
        setCarregando(false);
        mostrarErro('Erro ao carregar os pedidos.');
      });
  }

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function mudarStatus(id, novoStatus) {
    try {
      await atualizarStatusPedido(id, novoStatus);
      carregarPedidos();
    } catch (err) {
      mostrarErro(err.response?.data?.erro || 'Erro ao atualizar status');
    }
  }

  function abrirEdicao(pedido) {
    setEditando(pedido.id);
    setFormEdicao({
      nomeCliente: pedido.nomeCliente,
      email: pedido.email,
      endereco: pedido.endereco,
    });
  }

  async function salvarEdicao(id) {
    try {
      await atualizarPedido(id, formEdicao);
      setEditando(null);
      carregarPedidos();
    } catch (err) {
      mostrarErro(err.response?.data?.erro || 'Erro ao editar pedido');
    }
  }

  async function handleDeletar(id) {
    if (!confirm('Tem certeza que deseja deletar este pedido?')) {
      return;
    }
    try {
      await deletarPedido(id);
      carregarPedidos();
    } catch (err) {
      mostrarErro(err.response?.data?.erro || 'Erro ao deletar pedido');
    }
  }

  if (carregando) {
    return <p className="mensagem-centro">Carregando pedidos...</p>;
  }

  return (
    <div className="pagina-pedidos">
      <h1>Pedidos</h1>

      {mensagemErro && (
        <div style={{ backgroundColor: '#ffcccc', color: '#cc0000', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          {mensagemErro}
        </div>
      )}

      {pedidos.length === 0 && (
        <p className="mensagem-centro">Nenhum pedido encontrado.</p>
      )}

      <div className="lista-pedidos">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="card-pedido">
            <div className="card-pedido-cabecalho">
              <div>
                <strong>Pedido #{pedido.id}</strong>
                <span className="pedido-numero">{pedido.numeroPedido}</span>
              </div>
              <div className="pedido-cabecalho-acoes">
                <span className={`badge-status badge-${pedido.status.toLowerCase()}`}>
                  {pedido.status}
                </span>
                <button className="botao-editar" onClick={() => abrirEdicao(pedido)}>
                  Editar
                </button>
                <button className="botao-remover" onClick={() => handleDeletar(pedido.id)}>
                  Deletar
                </button>
              </div>
            </div>

            {editando === pedido.id ? (
              <div className="edicao-pedido">
                <div className="campo">
                  <label>Nome do Cliente</label>
                  <input
                    type="text"
                    value={formEdicao.nomeCliente}
                    onChange={(e) => setFormEdicao({ ...formEdicao, nomeCliente: e.target.value })}
                  />
                </div>
                <div className="campo">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formEdicao.email}
                    onChange={(e) => setFormEdicao({ ...formEdicao, email: e.target.value })}
                  />
                </div>
                <div className="campo">
                  <label>Endereco</label>
                  <input
                    type="text"
                    value={formEdicao.endereco}
                    onChange={(e) => setFormEdicao({ ...formEdicao, endereco: e.target.value })}
                  />
                </div>
                <div className="form-acoes">
                  <button className="botao-finalizar" onClick={() => salvarEdicao(pedido.id)}>
                    Salvar
                  </button>
                  <button className="botao-cancelar" onClick={() => setEditando(null)}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="card-pedido-info">
                  <p><strong>Cliente:</strong> {pedido.nomeCliente}</p>
                  <p><strong>Email:</strong> {pedido.email}</p>
                  <p><strong>Endereco:</strong> {pedido.endereco}</p>
                  <p><strong>Pagamento:</strong> {pedido.formaPagamento}</p>
                </div>

                <div className="card-pedido-itens">
                  <strong>Itens:</strong>
                  {pedido.itensPedido.map((item) => (
                    <div key={item.id} className="pedido-item">
                      <span>{item.nomeProduto} x{item.quantidade}</span>
                      <span>R$ {(item.precoUnit * item.quantidade).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="card-pedido-acoes">
                  <strong>Alterar status:</strong>
                  <div className="botoes-status">
                    <button
                      className="botao-status botao-pendente"
                      disabled={pedido.status === 'PENDENTE'}
                      onClick={() => mudarStatus(pedido.id, 'PENDENTE')}
                    >
                      Pendente
                    </button>
                    <button
                      className="botao-status botao-pago"
                      disabled={pedido.status === 'PAGO'}
                      onClick={() => mudarStatus(pedido.id, 'PAGO')}
                    >
                      Pago
                    </button>
                    <button
                      className="botao-status botao-enviado"
                      disabled={pedido.status === 'ENVIADO'}
                      onClick={() => mudarStatus(pedido.id, 'ENVIADO')}
                    >
                      Enviado
                    </button>
                  </div>
                </div>

                {pedido.historicos && pedido.historicos.length > 0 && (
                  <div className="card-pedido-historico">
                    <strong>Historico:</strong>
                    {pedido.historicos.map((h) => (
                      <div key={h.id} className="historico-item">
                        <span className={`badge-status badge-${h.status.toLowerCase()}`}>
                          {h.status}
                        </span>
                        <span className="historico-data">
                          {new Date(h.criadoEm).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pedidos;
