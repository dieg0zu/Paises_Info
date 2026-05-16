import { Pais } from "../types/pais";

export const obtenerPaises = async (): Promise<Pais[]> => {
  try {
    const respuesta = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,currencies,languages");

    if (!respuesta.ok) {
      throw new Error("Error al conectar a la API de países");
    }

    const datosCrudos = await respuesta.json();

    // Mapea la respuesta cruda hacia la estructura de la interfaz Pais.
    const paisesMapeados: Pais[] = datosCrudos.map((paisCrudo: any) => {
      // Convierte el objeto dinámico de monedas a un arreglo de cadenas.
      const arregloMonedas = paisCrudo.currencies
        ? Object.values(paisCrudo.currencies).map((moneda: any) => moneda.name)
        : [];

      // Convierte el objeto dinámico de idiomas a un arreglo de cadenas.
      const arregloIdiomas = paisCrudo.languages
        ? Object.values(paisCrudo.languages).map((idioma) => String(idioma))
        : [];

      return {
        nombre: paisCrudo.name?.common || "Sin nombre",
        capital: paisCrudo.capital && paisCrudo.capital.length > 0 ? paisCrudo.capital[0] : "Sin capital",
        region: paisCrudo.region || "Sin región",
        poblacion: paisCrudo.population || 0,
        urlBandera: paisCrudo.flags?.svg || paisCrudo.flags?.png || "",
        monedas: arregloMonedas,
        idiomas: arregloIdiomas,
      };
    });

    return paisesMapeados;
  } catch (error) {
    console.error("Error al intentar obtener Paises:", error);
    throw error;
  }
};