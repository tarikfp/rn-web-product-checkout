import React from "react";
import { StyleSheet, Text, View } from "react-native-web";

export default function ProductListError() {
  return (
    <View style={styles.center}>
      <Text>An unknown error occurred...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
