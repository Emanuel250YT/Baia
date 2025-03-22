export const disasters = [
  { id: "flood", label: "Inundación", emoji: "💧" },
  { id: "earthquake", label: "Terremoto", emoji: "🌍" },
  { id: "hurricane", label: "Huracán", emoji: "🌀" },
  { id: "tornado", label: "Tornado", emoji: "🌪️" },
  { id: "wildfire", label: "Incendio forestal", emoji: "🔥" },
  { id: "tsunami", label: "Tsunami", emoji: "🌊" },
  { id: "landslide", label: "Deslizamiento de tierra", emoji: "🏔️" },
  { id: "volcanic_eruption", label: "Erupción volcánica", emoji: "🌋" },
  { id: "drought", label: "Sequía", emoji: "☀️" },
  { id: "heatwave", label: "Ola de calor", emoji: "🥵" },
  { id: "cold_wave", label: "Ola de frío", emoji: "❄️" },
  { id: "storm", label: "Tormenta fuerte", emoji: "⛈️" },
  { id: "hailstorm", label: "Tormenta de granizo", emoji: "🌨️" },
  { id: "pollution", label: "Contaminación", emoji: "🏭" },
  { id: "oil_spill", label: "Derrame de petróleo", emoji: "🛢️" },
  { id: "nuclear_accident", label: "Accidente nuclear", emoji: "☢️" },
  { id: "train_derailment", label: "Descarrilamiento de tren", emoji: "🚆" },
  { id: "plane_crash", label: "Accidente aéreo", emoji: "✈️" },
  { id: "building_collapse", label: "Colapso de edificio", emoji: "🏚️" },
  { id: "bridge_collapse", label: "Colapso de puente", emoji: "🌉" },
  { id: "house_fire", label: "Incendio doméstico", emoji: "🏠🔥" },
  { id: "gas_leak", label: "Fuga de gas", emoji: "🛢️💨" },
  { id: "electrical_fire", label: "Incendio eléctrico", emoji: "⚡🔥" },
  { id: "other", label: "Otro", emoji: "🤔" }
];

export interface IDisaster {
  id: string;
  label: string;
  emoji: string;
}