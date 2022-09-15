import { Link } from "@react-navigation/web";
import * as _ from "lodash";
import React from "react";
import { StyleSheet, Text, View } from "react-native-web";
import ProductItem from "../../components/product-item";
import useExecuteProductItemAction from "../../hooks";
import ProductListError from "./components/error";
import ProductListLoading from "./components/loading";
import useGetAllProductList from "./hooks";

const ProductList = () => {
  const { hasError, loading, products } = useGetAllProductList();

  const {
    checkoutProducts,
    getItemQuantityInCheckout,
    handleAddToCheckoutProducts,
    handleRemoveFromCheckoutProducts,
  } = useExecuteProductItemAction();

  if (loading) {
    return <ProductListLoading />;
  }

  if (hasError) {
    return <ProductListError />;
  }

  return (
    <View style={styles.page}>
      <Text style={styles.text}>Page 1</Text>

      <Text style={styles.text}>
        {checkoutProducts.length ?? 0} items in your basket{" "}
      </Text>

      {_.sortBy(
        _.uniqBy(products, (x) => x.sku),
        (x) => x.sku,
      ).map((product) => (
        <ProductItem
          key={product.sku}
          quantityInCheckout={getItemQuantityInCheckout(product.sku)}
          product={product}
          onAddProductPress={handleAddToCheckoutProducts}
          onRemoveProductPress={handleRemoveFromCheckoutProducts}
        />
      ))}
      <Link routeName="Page2">Go to checkout</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 12,
  },
  text: {
    fontSize: 18,
    marginHorizontal: "auto",
    fontWeight: 700,
    marginVertical: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductList;
