import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductHelpers } from "../helpers";
import {
  addToCheckoutProducts,
  removeFromCheckoutProducts,
  resetCheckoutProducts,
} from "../redux/products";

export default function useExecuteProductItemAction() {
  const dispatch = useDispatch();

  const checkoutProducts = useSelector(
    (state) => state.products.checkoutProducts,
  );

  const handleAddToCheckoutProducts = React.useCallback(
    (product) => {
      dispatch(addToCheckoutProducts(product));
    },
    [dispatch],
  );

  const handleResetCheckoutProducts = React.useCallback(() => {
    dispatch(resetCheckoutProducts());
  }, [dispatch]);

  const handleRemoveFromCheckoutProducts = React.useCallback(
    (product) => {
      dispatch(removeFromCheckoutProducts(product.sku));
    },
    [dispatch],
  );

  const getItemQuantityInCheckout = React.useCallback(
    (productSku) => {
      return ProductHelpers.findProductQuantityInCheckout(
        productSku,
        checkoutProducts,
      );
    },
    [checkoutProducts],
  );

  return {
    checkoutProducts,
    handleAddToCheckoutProducts,
    handleResetCheckoutProducts,
    handleRemoveFromCheckoutProducts,
    getItemQuantityInCheckout,
  };
}
