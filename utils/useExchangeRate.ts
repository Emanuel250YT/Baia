import { useState, useEffect } from "react";

const API_URL = "https://dolarapi.com/v1/dolares/blue";

function useExchangeRate() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [exchangeRateLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchExchangeRate() {
      const response = await fetch(API_URL);
      const data = await response.json();
      setExchangeRate(data.venta);
      setLoading(false);
    }

    fetchExchangeRate();
  }, []); 

  return { exchangeRate, exchangeRateLoading };
}

export default useExchangeRate;