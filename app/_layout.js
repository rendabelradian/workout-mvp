// app/_layout.js
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#111" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // makes background consistent across screens
  },
});
