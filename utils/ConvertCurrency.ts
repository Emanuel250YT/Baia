const API_URL = "https://dolarapi.com/v1/dolares/blue";

async function fetchExchangeRate() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.venta;
  } catch (error) {
    console.error("Error fetching exchange rate");
    return null;
  }
}

export async function convertUsdToArs(amount: number) {
  if (amount < 0) {
    return null;
  }
  const exchangeRate = await fetchExchangeRate();
  return amount * exchangeRate;
}
