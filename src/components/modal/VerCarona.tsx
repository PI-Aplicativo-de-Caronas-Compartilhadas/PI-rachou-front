// SearchModal.tsx
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-ultrasonic-blue-900">
            Buscar Carona
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            Fechar
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="De (Cidade, estação, local)"
              className="p-4 border rounded-xl w-full"
            />
            <input
              type="text"
              placeholder="Para (Cidade, estação, local)"
              className="p-4 border rounded-xl w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="date" className="p-4 border rounded-xl" />
            <input
              type="text"
              placeholder="Volta (Opcional)"
              className="p-4 border rounded-xl"
            />
            <select className="p-4 border rounded-xl">
              <option>1 adulto</option>
              <option>2 adultos</option>
              <option>3 adultos</option>
              <option>4 adultos</option>
            </select>
          </div>
          <button className="w-full bg-ultrasonic-blue-500 text-white py-4 rounded-xl font-bold hover:bg-ultrasonic-blue-600 transition">
            Procurar
          </button>
        </div>
      </div>
    </div>
  );
}
