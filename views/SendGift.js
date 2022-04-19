import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAppContext } from "./../AppContext";
import { Button } from "@rneui/base";

const SendGift = ({ navigation }) => {
  const appContext = useAppContext();

  const handlePress = () => {
    console.log("You pressed me!");
  };

  return (
    <View style={styles.container}>
      <Text>Send Gift to {appContext.name} </Text>
      <Button
        title="Send!"
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
        onPress={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonStyle: {
    backgroundColor: "rgba(127, 220, 103, 1)",
  },
  buttonContainer: {
    height: 40,
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  buttonTitle: {
    color: "white",
    marginHorizontal: 20,
  },
});

export default SendGift;
