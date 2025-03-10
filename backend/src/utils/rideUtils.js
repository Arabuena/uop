const axios = require('axios');

// Calcula ETA usando Google Distance Matrix API
async function calculateETA(origin, destination) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.rows[0]?.elements[0]?.duration) {
      return {
        text: response.data.rows[0].elements[0].duration.text,
        value: response.data.rows[0].elements[0].duration.value
      };
    }
    return null;
  } catch (error) {
    console.error('Erro ao calcular ETA:', error);
    return null;
  }
}

// Calcula preço dinâmico baseado em demanda
function calculateDynamicPrice(basePrice, demand) {
  const multiplier = 1 + (demand / 10); // Aumenta 10% para cada ponto de demanda
  return basePrice * multiplier;
}

module.exports = {
  calculateETA,
  calculateDynamicPrice
}; 