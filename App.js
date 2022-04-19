import React from "react";
import { StyleSheet } from "react-native";
import ContactSearch from "./views/ContactSearch";
import SendGift from "./views/SendGift";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppProvider } from "./AppContext";
// n
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <AppProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name="ContactSearch" component={ContactSearch} />
            <Stack.Screen name="SendGift" component={SendGift} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
