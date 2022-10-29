import { Routes, Route } from 'react-router-dom';
import FormularioPratos from './paginas/Administracao/Pratos/FormularioPratos';
import ListaPratos from './paginas/Administracao/Pratos/LIstaPratos';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import CadastroRestaurante from './paginas/Administracao/Restaurantes/CadastroRestaurante';
import PaginaBaseAdmin from './paginas/Administracao/Restaurantes/PaginaBaseAdmin';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin/>}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<CadastroRestaurante />} />
        <Route path="restaurantes/:id" element={<CadastroRestaurante />} />
        <Route path="pratos" element={<ListaPratos />} />
        <Route path="pratos/novo" element={<FormularioPratos />} />
      </Route>

    </Routes>
  );
}

export default App;
