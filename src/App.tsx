src/App.tsx : import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Sobre from './pages/sobre/Sobre';
import ListaViagens from './pages/viagem/ListaViagens';
import CadastrarViagem from './pages/viagem/CadastrarViagem';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[calc(100vh-10rem)] bg-slate-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/viagens" element={<ListaViagens />} />
          <Route path="/cadastrarviagem" element={<CadastrarViagem />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
