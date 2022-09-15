import * as _ from "lodash";

const parseCheckoutProducts = (checkoutProducts) => {
  const countedCheckoutProducts = _.countBy(checkoutProducts, (x) => x.sku);

  let final = [];

  Object.keys(countedCheckoutProducts).map((key) => {
    final.push({
      sku: Number(key),
      quantity: countedCheckoutProducts[key],
    });
  });

  return final;
};

// https://www.rosettacode.org/wiki/Luhn_test_of_credit_card_numbers#JavaScript

const isValidCreditCardNumber = (str) => {
  if (Number.isNaN(Number(str))) return false;

  const sumDigit = (c) => {
    return c < 10 ? c : sumDigit(Math.trunc(c / 10) + (c % 10));
  };

  return (
    str
      .split("")
      .reverse()
      .map(Number)
      .map((c, i) => (i % 2 !== 0 ? sumDigit(c * 2) : c))
      .reduce((acc, v) => acc + v) %
      10 ===
    0
  );
};

export const CheckoutHelpers = {
  parseCheckoutProducts,
  isValidCreditCardNumber,
};
