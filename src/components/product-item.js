import React from "react";
import { StyleSheet, Text, View } from "react-native-web";
import AppButton from "./button";

function ProductItem({
  product: { sku, name, description, price },
  onAddProductPress,
  onRemoveProductPress,
  quantityInCheckout,
}) {
  return (
    <View style={styles.root}>
      <View style={styles.upperContainer}>
        <View style={{ justifyContent: "center" }}>
          <Text>{name}</Text>
          <Text>{description}</Text>
        </View>

        <Text>
          {quantityInCheckout > 0
            ? "Total Price in basket  " +
              (quantityInCheckout * price).toFixed(2)
            : "Price " + price}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text>Count: {quantityInCheckout}</Text>

        {onAddProductPress !== undefined && (
          <AppButton
            disabled={quantityInCheckout === 10}
            mode="secondary"
            onPress={() => onAddProductPress({ sku, name, description, price })}
            title="Add to basket"
          />
        )}

        {onRemoveProductPress !== undefined && (
          <AppButton
            onPress={() =>
              onRemoveProductPress({ sku, name, description, price })
            }
            title="Remove from basket"
          />
        )}
      </View>
    </View>
  );
}

export default React.memo(ProductItem);

const styles = StyleSheet.create({
  root: {
    width: "100%",
    padding: 16,
    height: 120,
    borderBottomWidth: 1,
  },
  upperContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomContainer: {
    flex: 1,
    marginTop: 9,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
