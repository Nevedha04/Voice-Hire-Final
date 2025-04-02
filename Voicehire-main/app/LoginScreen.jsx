import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from "expo-router";

export default function LoginScreen() {
  const { signIn, isLoaded } = useSignIn();
  const navigation = useNavigation();
  
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Login
  const handleLogin = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email, // Email
        password: password, // Password
      });

      console.log("Login Success:", result);
      Alert.alert("Success", "Login Successful!");
      
      // Navigate to the main app (Home)
      navigation.navigate("(tabs)");

    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Login Failed", error.errors ? error.errors[0].message : "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("./../assets/images/loogo.jpg")} style={styles.logo} />
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        {/* Navigate to Register Screen */}
        <TouchableOpacity onPress={() => navigation.navigate("register")}>
          <Text style={styles.registerText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageContainer: { alignItems: "center", marginTop: 80 },
  logo: { width: 250, height: 250, borderRadius: 20, borderWidth: 2, borderColor: "grey" },
  subContainer: { padding: 30, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%", height: 50, borderColor: "#ccc", borderWidth: 1, borderRadius: 10, 
    paddingHorizontal: 15, marginBottom: 15, backgroundColor: "#f9f9f9"
  },
  btn: { backgroundColor: "#000", padding: 15, borderRadius: 30, width: "100%", alignItems: "center" },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  registerText: { marginTop: 15, color: "#555", textDecorationLine: "underline" },
});

