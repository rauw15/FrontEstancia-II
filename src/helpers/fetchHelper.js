// fetchHelper.js
export const fetchWithHiddenError = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la solicitud");
    }
    return await response.json();
  } catch (error) {
    // No muestra la URL en la consola
    console.error("Error en la solicitud:", error.message);
    throw error;
  }
};
