import { Link } from "@react-navigation/web";
import axios from "axios";
import * as _ from "lodash";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native-web";
import { ProductsAPI } from "../../api/products";
import AppButton from "../../components/button";
import AppModal from "../../components/modal";
import ProductItem from "../../components/product-item";
import { ProductHelpers } from "../../helpers";
import useExecuteProductItemAction from "../../hooks";
import { CheckoutHelpers } from "./helpers";

const Checkout = ({ navigation }) => {
  const [creditCardNumber, setCreditCardNumber] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isModalVisible, setModalVisible] = React.useState(false);

  const {
    checkoutProducts,
    getItemQuantityInCheckout,
    handleRemoveFromCheckoutProducts,
    handleResetCheckoutProducts,
  } = useExecuteProductItemAction();

  const hasCheckoutItems = checkoutProducts.length > 0;

  const handleCheckoutPress = async () => {
    try {
      setLoading(true);
      // check credit card validity

      if (
        !CheckoutHelpers.isValidCreditCardNumber(creditCardNumber.toString())
      ) {
        setModalVisible(true);
        setErrorMessage(
          "Bad request...Please double check your credit card number or items...",
        );
        setCreditCardNumber("");
        return;
      }

      const body = {
        basket: CheckoutHelpers.parseCheckoutProducts(checkoutProducts),
        cardNumber: creditCardNumber,
      };

      const response = await ProductsAPI.checkout(body);

      if (response.msg) {
        handleResetCheckoutProducts();
        navigation.navigate("Success");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_BAD_REQUEST") {
          setModalVisible(true);
          setErrorMessage(
            "Bad request...Please double check your credit card number or items...",
          );
          setCreditCardNumber("");
        } else {
          handleResetCheckoutProducts();
          navigation.navigate("Error");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.text}>Checkout</Text>

      <Text style={styles.text}>
        {checkoutProducts.length ?? 0} items in your basket{" "}
      </Text>

      {!hasCheckoutItems && (
        <Text>You do not have any product in your basket yet</Text>
      )}

      {_.sortBy(
        _.uniqBy(checkoutProducts, (x) => x.sku),
        (x) => x.sku,
      ).map((product) => (
        <ProductItem
          key={product.sku}
          quantityInCheckout={getItemQuantityInCheckout(product.sku)}
          product={product}
          onRemoveProductPress={handleRemoveFromCheckoutProducts}
        />
      ))}

      {hasCheckoutItems && (
        <View style={styles.bottomContainer}>
          <Text
            style={
              styles.text
            }>{`Total price ${ProductHelpers.calculateTotalCheckoutPrice(
            checkoutProducts,
          )}`}</Text>
        </View>
      )}

      {hasCheckoutItems && (
        <View style={styles.bottomContainer}>
          <>
            <Text>Credit card</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 8 }}
              value={creditCardNumber}
              onChangeText={setCreditCardNumber}
            />
          </>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <AppButton
              mode="secondary"
              style={{ marginTop: 12 }}
              onPress={handleCheckoutPress}
              title="Place order"
            />
          )}
        </View>
      )}

      {isModalVisible && errorMessage != "" && (
        <AppModal
          content={errorMessage}
          visible={isModalVisible}
          setVisible={setModalVisible}
        />
      )}
      <Link routeName="Page1">Go to Page 1</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginHorizontal: "auto",
    fontWeight: 700,
  },
  bottomContainer: {
    marginTop: 12,
    padding: 24,
  },
});

export default Checkout;
