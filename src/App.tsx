import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      {/* Ajustado de flex-grow para grow */}
      <main className="grow">
        <div className="p-8 text-center">Conteúdo Principal do Rachou</div>
      </main>

      <Footer />
    </div>
  );
}

export default App;