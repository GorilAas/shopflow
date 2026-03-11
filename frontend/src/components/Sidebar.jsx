import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        ShopFlow
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end>
          Cadastrar Venda
        </NavLink>
        <NavLink to="/pedidos">
          Pedidos
        </NavLink>
        <NavLink to="/anuncios">
          Anuncios
        </NavLink>
        <NavLink to="/produtos-locais">
          Produtos Locais
        </NavLink>
        <NavLink to="/movimentacoes">
          Movimentacoes
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
