import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native-web";

export default function AppButton({
  onPress,
  disabled,
  title,
  style,
  mode = "primary",
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={StyleSheet.flatten([
        styles.root,
        {
          backgroundColor: disabled
            ? "grey"
            : mode === "primary"
            ? "orange"
            : "royalblue",
        },
        style,
      ])}
      onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    minWidth: 100,
    padding: 12,
    height: 35,
    borderRadius: 8,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#ffffff",
  },
});
