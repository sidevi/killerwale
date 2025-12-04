// app/(auth)/login.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
const PRIMARY_COLOR = "#0C7B70"; // Deep Teal

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Logic for authenticating the user
    console.log("Logging in...");
    // router.replace('/index'); // Navigate to the main app after successful login
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header (with back button) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      {/* 2. Main Form Area */}
      <View style={styles.formArea}>
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
        />

        {/* Forgot Password Link */}
        <TouchableOpacity style={styles.forgotPasswordLink}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Don't have an account? */}
        <View style={styles.signUpPrompt}>
          <Text style={styles.signUpPromptText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.signUpLinkText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Social Login Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>OR</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* 4. Social Login Buttons */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/Google.png")}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />

          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/Apple.png")}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />

          <Text style={styles.socialButtonText}>Sign in with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/images/Facebook.png")}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />

          <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  formArea: {
    padding: 25,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 17,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  forgotPasswordLink: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 15,
    borderRadius: 17,
    alignItems: "center",
    marginBottom: 25,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  signUpPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  signUpPromptText: {
    color: "#666",
    marginRight: 5,
  },
  signUpLinkText: {
    color: PRIMARY_COLOR,
    fontWeight: "600",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#eee",
  },
  separatorText: {
    width: 50,
    textAlign: "center",
    color: "#999",
    fontSize: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 18,
    marginBottom: 15,
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333333ff",
    fontWeight: "400",
  },
});
