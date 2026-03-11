import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CadastrarVenda from './pages/CadastrarVenda';
import Pedidos from './pages/Pedidos';
import Anuncios from './pages/Anuncios';
import ProdutosLocais from './pages/ProdutosLocais';
import Movimentacoes from './pages/Movimentacoes';

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <main className="conteudo">
          <Routes>
            <Route path="/" element={<CadastrarVenda />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/anuncios" element={<Anuncios />} />
            <Route path="/produtos-locais" element={<ProdutosLocais />} />
            <Route path="/movimentacoes" element={<Movimentacoes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
