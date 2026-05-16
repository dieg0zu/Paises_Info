"use client";

import { useEffect, useState } from "react";
import { Pais } from "../types/pais";
import { obtenerPaises } from "../services/api";

//Vista principal que gestiona el estado y el listado de países.
export default function Home() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //Ejecuta la carga inicial de datos al montar el componente.
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await obtenerPaises();
        setPaises(datos);
      } catch (err) {
        setError("Ocurrió un error al cargar los países. Intente nuevamente.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
          Directorio de Países
        </h1>
        
        {cargando && (
          <div className="flex justify-center items-center py-10">
            <p className="text-gray-600 font-medium">Cargando información...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <p>{error}</p>
          </div>
        )}
        
        {!cargando && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {paises.slice(0, 12).map((pais) => (
              <div 
                key={pais.nombre} 
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img 
                  src={pais.urlBandera} 
                  alt={`Bandera de ${pais.nombre}`} 
                  className="w-full h-32 object-cover rounded mb-4 shadow-sm"
                />
                <h2 className="font-bold text-lg text-center mt-2">{pais.nombre}</h2>
                <p className="text-sm text-gray-600 text-center">{pais.capital}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}