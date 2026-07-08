import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sobre from './pages/sobre/Sobre';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[calc(100vh-10rem)] bg-slate-950">
        <Routes>
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;