import React, { useState } from "react";
import { currencies } from "../currencies";
import { Result } from "./Result";
import { Button, Field, Header, Info, LabelText } from "./styled";

export const Form = ({ calculateResult, result }) => {
  const [currency, setCurrency] = useState(currencies[0].short);
  const [amount, setAmount] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    calculateResult(currency, amount);
  };

  return (
    <form onSubmit={onSubmit}>
      <Header>Kalkulator walut</Header>
      <p>
        <label>
          <LabelText>Kwota w zł*:</LabelText>
          <Field
            value={amount}
            onChange={({ target }) => setAmount(target.value)}
            placeholder="Kwota w zł"
            className="form__field"
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
            {currencies.map((currency) => (
              <option key={currency.short} value={currency.short}>
                {currency.name}
              </option>
            ))}
          </Field>
        </label>
      </p>
      <p>
        <Button>Przelicz</Button>
      </p>

      <Info>Kurs walut z dnia 12.01.2024</Info>

      <Result result={result} />
    </form>
  );
};
