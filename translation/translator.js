function translateSpeciesName(species){

  const translatedSpecies = {
    "Human": "Humano",
    "Alien": "Alienígena",
    "Humanoid": "Humanóide",
    "Unknown": "Desconhecido",
    "Poopybutthole": "Sr. Poopybutthole",
    "Mythological Creature": "Criatura Mítica",
    "Animal": "Animal",
    "Robot": "Robô",
    "Cronenberg": "Cronenberg",
    "Disease": "Doença",
  };
  
  return translatedSpecies[species] || "Não Definido";
}

function translateStatus(status) {
  const translatedStatus = {
    "Alive": "Vivo",
    "Dead": "Morto",
    "unknown": "Desconhecido"
  }

  return translatedStatus[status] || "Não Definido";
}