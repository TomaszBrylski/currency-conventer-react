import React, { useState } from "react";
import { Result } from "./Result";
import {
  Button,
  Field,
  Header,
  Info,
  LabelText,
  Loading,
  Failure,
} from "./styled";

import { useRatesData } from "./useRatesData";

export const Form = () => {
  const [result, setResult] = useState();
  const ratesData = useRatesData();

  const calculateResult = (currency, amount) => {
    const rate = ratesData.rates[currency];

    setResult({
      sourceAmount: +amount,
      targetAmount: amount * rate,
      currency,
    });
  };

  const [currency, setCurrency] = useState("PLN");
  const [amount, setAmount] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    calculateResult(currency, amount);
  };

  return (
    <form onSubmit={onSubmit}>
      <Header>Kalkulator walut</Header>
      {ratesData.state === "loading" ? (
        <Loading>
          Sekunda... <br /> Ładuję kursy walut z Europejskiego Banku Centralnego
        </Loading>
      ) : ratesData.state === "error" ? (
        
        <Failure>Coś nie działa. Sprawdź połączenie z internetem</Failure>
      ) : (
        <>
          <p>
            <label>
              <LabelText>Kwota w zł*:</LabelText>
              <Field
                value={amount}
                onChange={({ target }) => setAmount(target.value)}
                placeholder="Kwota w zł"
                type="number"
                required
                step="0.01"
                min="0.01"
              />
            </label>
          </p>
          <p>
            <label>
              <LabelText>Waluta:</LabelText>
              <Field
                as="select"
                value={currency}
                onChange={({ target }) => setCurrency(target.value)}
              >
                {ratesData.rates && Object.keys(ratesData.rates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </Field>
            </label>
          </p>
          <p>
            <Button>Przelicz</Button>
          </p>

          <Info>Kursy walut pobierane są z Europejskiego Banku Centralnego</Info>

          <Result result={result} />
        </>
      )}
    </form>
  );
};
