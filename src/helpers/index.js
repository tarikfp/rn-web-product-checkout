const findProductQuantityInCheckout = (productSku, checkoutProducts) => {
  return checkoutProducts.reduce((prev, curr) => {
    console.log({ prev, curr });
    if (curr.sku === productSku) {
      prev++;
    }
    return prev;
  }, 0);
};

const calculateTotalCheckoutPrice = (checkoutProducts) => {
  const totalCheckoutPrice = checkoutProducts.reduce((prev, curr) => {
    prev = prev + curr.price;
    return prev;
  }, 0);

  return totalCheckoutPrice;
};

export const ProductHelpers = {
  findProductQuantityInCheckout,
  calculateTotalCheckoutPrice,
};
