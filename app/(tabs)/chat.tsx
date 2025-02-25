import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const chat: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>02</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FBFAFF"

  },
  text: {
    fontSize: 126,
    fontWeight: 700,
    color: "#BFBFC0",
    marginTop: "30%"
  }
})

export default chat;