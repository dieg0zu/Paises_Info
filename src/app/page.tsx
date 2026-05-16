"use client";

import { useEffect, useState } from "react";
import { Pais } from "../types/pais";
import { obtenerPaises } from "../services/api";
import ModalPais from "../components/modalPais";

//Vista principal que gestiona el estado, listado, búsqueda y detalle.
export default function Home() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //Estados para el manejo de filtros e interacción
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>("");
  const [regionFiltro, setRegionFiltro] = useState<string>("");
  const [paisSeleccionado, setPaisSeleccionado] = useState<Pais | null>(null);

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

  //Filtra los países en memoria basándose en la búsqueda y la región.
  const paisesFiltrados = paises.filter((pais) => {
    const coincideBusqueda = pais.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase());
    const coincideRegion = regionFiltro === "" || pais.region === regionFiltro;
    return coincideBusqueda && coincideRegion;
  });

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
          Listado de Países
        </h1>

        {/*Sección de Controles*/}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar país por nombre..."
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
          
          <select
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={regionFiltro}
            onChange={(e) => setRegionFiltro(e.target.value)}
          >
            <option value="">Todas las regiones</option>
            <option value="Africa">África</option>
            <option value="Americas">América</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceanía</option>
          </select>
        </div>
        
        {/*Renderiza el estado de carga*/}
        {cargando && (
          <div className="flex justify-center items-center py-10">
            <p className="text-gray-600 font-medium">Cargando información...</p>
          </div>
        )}
        
        {/*Renderiza el estado de error*/}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <p>{error}</p>
          </div>
        )}
        
        {/*Mensaje de resultados vacíos*/}
        {!cargando && !error && paisesFiltrados.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No se encontraron países que coincidan con la búsqueda.
          </div>
        )}

        {/*Renderiza el listado completo filtrado*/}
        {!cargando && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paisesFiltrados.map((pais) => (
              <div 
                key={pais.nombre} 
                onClick={() => setPaisSeleccionado(pais)}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-gray-200"
              >
                <img 
                  src={pais.urlBandera} 
                  alt={`Bandera de ${pais.nombre}`} 
                  className="w-full h-32 object-cover rounded mb-4 border border-gray-100"
                />
                <h2 className="font-bold text-lg text-center mt-2">{pais.nombre}</h2>
                <p className="text-sm text-gray-600 text-center font-medium mt-1">{pais.region}</p>
                <p className="text-xs text-gray-500 text-center">Capital: {pais.capital}</p>
              </div>
            ))}
          </div>
        )}

        {/*Renderiza el componente modal si hay un país seleccionado*/}
        <ModalPais 
          pais={paisSeleccionado} 
          onClose={() => setPaisSeleccionado(null)} 
        />
      </div>
    </main>
  );
}