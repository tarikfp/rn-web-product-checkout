import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native-web";

export default function AppModal({ visible, setVisible, content }) {
  return (
    <Modal animationType="slide" onRequestClose={setVisible} visible={visible}>
      <View style={styles.container}>
        <Text>{content}</Text>
        <Text onPress={() => setVisible(false)}>Close modal</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
