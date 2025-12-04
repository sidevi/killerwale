// app/(auth)/signup.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
// Ensure you have installed expo-vector-icons: npx expo install @expo/vector-icons
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import Checkbox from 'expo-checkbox'; // You may need to install this: npx expo install expo-checkbox

const PRIMARY_COLOR = '#0C7B70'; // Deep Teal

export default function SignUpScreen() {
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
  });

  const handleSignUp = () => {
    // Basic validation check (Name and Email must not be empty, checkbox must be checked)
    if (!formData.name || !formData.email || !formData.password || !isChecked) {
        alert("Please fill out all fields and agree to the terms.");
        return;
    }
    
    console.log('Signing up with:', formData);
    // In a real app: Submit data to API, wait for success, then navigate.
    
    // For now, simulate success and navigate to a success modal or main app
    // router.replace('/(auth)/success'); 
  };
  
  const handleInputChange = (field: keyof typeof formData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Header (with back button) */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign Up</Text>
          <View style={{ width: 24 }} /> {/* Spacer for alignment */}
        </View>

        {/* 2. Main Form Area */}
        <View style={styles.formArea}>
          
          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            autoCapitalize="words"
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry
          />

          {/* Terms and Policy Checkbox (Matching design screens 10 & 11) */}
          <View style={styles.checkboxContainer}>
            <Checkbox 
                value={isChecked} 
                onValueChange={setChecked} 
                color={isChecked ? PRIMARY_COLOR : '#ccc'}
                style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>
                I agree to the Medics <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity 
            style={styles.signupButton} 
            onPress={handleSignUp}
            disabled={!isChecked} // Disable button until terms are accepted
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
          {/* Already have an account? */}
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/auth')}>
              <Text style={styles.loginLinkText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          {/* 3. Social Login Separator (Keeping consistent with Login screen) */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>OR</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* 4. Social Login Buttons */}
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={20} color="#333" />
            <Text style={styles.socialButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome5 name="apple" size={20} color="#333" />
            <Text style={styles.socialButtonText}>Sign in with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome5 name="facebook-square" size={20} color="#333" />
            <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Stylesheet (Shared and new styles) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
      flexGrow: 1, // Ensures content takes up available space for scrolling
      paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  formArea: {
    padding: 25,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  // --- Checkbox Styles ---
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
      alignSelf: 'center',
      marginRight: 10,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  termsLink: {
      color: PRIMARY_COLOR,
      fontWeight: '600',
  },
  // --- Button Styles ---
  signupButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  // --- Links and Prompts ---
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  loginPromptText: {
    color: '#666',
    marginRight: 5,
  },
  loginLinkText: {
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  // --- Separator and Social Buttons (Copied from Login) ---
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  separatorText: {
    width: 50,
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});