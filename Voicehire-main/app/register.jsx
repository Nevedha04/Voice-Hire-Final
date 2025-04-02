import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router";

export default function RegisterScreen() {
  const { signUp, setActive } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const navigation=useNavigation();

  const handleSignUp = async () => {
    try {
      if (!signUp) {
        Alert.alert("Error", "Clerk authentication is not initialized yet.");
        return;
      }

      setLoading(true);

      // Step 1: Create the user in Clerk
      await signUp.create({ emailAddress: email, password });

      // Step 2: Send email verification code
      await signUp.prepareEmailAddressVerification();

      setPendingVerification(true);
      Alert.alert("Check Your Email", "A verification code has been sent to your email.");
    } catch (error) {
      Alert.alert("Error", error.errors?.[0]?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);

      if (!verificationCode) {
        Alert.alert("Error", "Please enter the verification code.");
        return;
      }

      // Step 3: Verify the email with the code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      // Step 4: Set user session active
      await setActive({ session: completeSignUp.createdSessionId });

      // Step 5: Navigate to home/tabs
      navigation.navigate("(tabs)");
    } catch (error) {
      Alert.alert("Error", error.errors?.[0]?.message || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {!pendingVerification ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.btn} onPress={handleSignUp} disabled={loading}>
            <Text style={styles.btnText}>{loading ? "Signing Up..." : "Sign Up"}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter Verification Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            keyboardType="numeric"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />

          <TouchableOpacity style={styles.btn} onPress={handleVerify} disabled={loading}>
            <Text style={styles.btnText}>{loading ? "Verifying..." : "Verify"}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },
  btn: {
    padding: 16,
    backgroundColor: "#000",
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
});

