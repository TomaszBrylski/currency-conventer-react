import axios from "axios";

const URL =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_LO7p2dI7bDzYx6BoNIu3lkBEizY7erOuZRLC3pxW&currencies=&base_currency=PLN";

export const getCurrenciesDataFromApi = async () => {
  const response = await axios.get(URL);
  if (response.status !== 200) {
    throw new Error();
  }
  return response.data;
};