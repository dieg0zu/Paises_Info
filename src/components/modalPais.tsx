import { Pais } from "../types/pais";

interface ModalPaisProps {
  pais: Pais | null;
  onClose: () => void;
}

//Componente de ventana modal para mostrar el detalle de un país seleccionado.
export default function ModalPais({ pais, onClose }: ModalPaisProps) {
  if (!pais) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        
        //Boton de cierre
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        //Parte superior con la bandera y el nombre del país
        <div className="flex flex-col items-center">
          <img
            src={pais.urlBandera}
            alt={`Bandera de ${pais.nombre}`}
            className="w-full h-44 object-cover rounded mb-4 shadow-sm border border-gray-100"
          />
          <h2 className="text-2xl font-bold mb-4 text-center">{pais.nombre}</h2>
        </div>

        //Informacion del país
        <div className="space-y-3 text-sm border-t pt-4">
          <div>
            <span className="font-semibold text-gray-700">Región:</span>{" "}
            <span className="text-gray-600">{pais.region}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Capital:</span>{" "}
            <span className="text-gray-600">{pais.capital}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Población:</span>{" "}
            <span className="text-gray-600">
              {pais.poblacion.toLocaleString("es-PE")}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Moneda(s):</span>{" "}
            <span className="text-gray-600">
              {pais.moneda.length > 0 ? pais.moneda.join(", ") : "No disponible"}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Idioma(s):</span>{" "}
            <span className="text-gray-600">
              {pais.idioma.length > 0 ? pais.idioma.join(", ") : "No disponible"}
            </span>
          </div>
        </div>

        {/* Botón inferior de cierre */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}