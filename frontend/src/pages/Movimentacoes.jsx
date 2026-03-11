import { useEffect, useState } from 'react';
import { buscarMovimentacoes } from '../services/api';

function Movimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarMovimentacoes()
      .then((dados) => {
        setMovimentacoes(dados);
        setCarregando(false);
      })
      .catch(() => {
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <p className="mensagem-centro">Carregando...</p>;
  }

  return (
    <div className="pagina-movimentacoes">
      <h1>Historico de Movimentacoes</h1>

      {movimentacoes.length === 0 && (
        <p className="mensagem-centro">Nenhuma movimentacao registrada.</p>
      )}

      {movimentacoes.length > 0 && (
        <div className="tabela-container">
          <table className="tabela">
            <thead>
              <tr>
                <th>Data</th>
                <th>Produto</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes.map((mov) => (
                <tr key={mov.id}>
                  <td>{new Date(mov.criadoEm).toLocaleString('pt-BR')}</td>
                  <td>{mov.produto.nome}</td>
                  <td>
                    <span className={`badge-tipo badge-${mov.tipo.toLowerCase()}`}>
                      {mov.tipo}
                    </span>
                  </td>
                  <td>{mov.quantidade}</td>
                  <td>{mov.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Movimentacoes;
