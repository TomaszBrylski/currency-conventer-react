import { useState, useEffect } from "react";
import { getCurrenciesDataFromApi } from "./api";

export const useRatesData = () => {
  const [ratesData, setRatesData] = useState({
    state: "loading",
    rates: null,
    date: null,
  });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await getCurrenciesDataFromApi();
        const { last_updated_at } = response.meta;

        setRatesData({
          state: "success",
          rates: response.data,
          date: last_updated_at,
        });
      } catch (err) {
        setRatesData({
          state: "error",
        });
      }
    };

    setTimeout(fetchRates, 1000);
  }, []);

  return ratesData;
};
