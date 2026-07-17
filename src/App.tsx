import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Sobre from './pages/sobre/Sobre';
import ListaViagens from './pages/viagem/ListaViagens';
import CadastrarViagem from './pages/viagem/CadastrarViagem';
import Login from './pages/login/Login'; 
import CadastroUsuario from './pages/cadastrousuario/CadastroUsuario'; // Importando a nova tela de cadastro
import { AuthProvider } from './contexts/AuthContext';
import { Modalidades } from './pages/modalidades/Modalidades';
import { ToastContainer } from 'react-toastify';
import Perfil from './pages/perfil/Perfil';

function App() {
  return (
    <>
      <AuthProvider>
      <ToastContainer limit={1}/>        
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[calc(100vh-10rem)] bg-slate-950">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/cadastro/usuario" element={<CadastroUsuario />} />
            <Route path="/login" element={<Login />} />
            <Route path="/viagens" element={<ListaViagens />} />
            <Route path="/cadastrarviagem" element={<CadastrarViagem />} />            
            <Route path="/modalidades" element={<Modalidades />} />
            <Route path="/perfil" element={<Perfil />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;