import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';

export default function SignupScreen() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const errors = [];
    
    if (password.length < minLength) {
      errors.push('At least 8 characters');
    }
    if (!hasUpperCase) {
      errors.push('One uppercase letter');
    }
    if (!hasLowerCase) {
      errors.push('One lowercase letter');
    }
    if (!hasNumbers) {
      errors.push('One number');
    }
    if (!hasSpecialChar) {
      errors.push('One special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  };

  const handleSignup = () => {
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
    });

    let isValid = true;

    // Email validation
    if (!form.email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      isValid = false;
    } else if (!validateEmail(form.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      isValid = false;
    }

    // Password validation
    if (!form.password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      isValid = false;
    } else {
      const passwordCheck = validatePassword(form.password);
      if (!passwordCheck.isValid) {
        setErrors(prev => ({ 
          ...prev, 
          password: `Password must contain: ${passwordCheck.errors.join(', ')}`
        }));
        isValid = false;
      }
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Please confirm your password' }));
      isValid = false;
    } else if (form.password !== form.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      isValid = false;
    }

    if (isValid) {
      router.replace('./(tabs)/explore');
    }
  };

  // Add password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return '';
    const { errors } = validatePassword(password);
    const strength = 5 - errors.length; // 5 requirements total
    
    if (strength === 5) return 'Strong';
    if (strength >= 3) return 'Medium';
    return 'Weak';
  };

  const getPasswordStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Strong':
        return '#2ecc71';
      case 'Medium':
        return '#f1c40f';
      case 'Weak':
        return '#e74c3c';
      default:
        return '#bdc3c7';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={email => {
                setForm(prev => ({ ...prev, email }));
                setErrors(prev => ({ ...prev, email: '' }));
              }}
              placeholder="Email"
              placeholderTextColor="#6b7280"
              style={[styles.inputControl, errors.email ? styles.inputError : null]}
              value={form.email}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.input}>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={password => {
                setForm(prev => ({ ...prev, password }));
                setErrors(prev => ({ ...prev, password: '' }));
              }}
              placeholder="Password"
              placeholderTextColor="#6b7280"
              style={[styles.inputControl, errors.password ? styles.inputError : null]}
              secureTextEntry={true}
              value={form.password}
            />
            {form.password && (
              <View style={styles.passwordStrength}>
                <Text style={[
                  styles.passwordStrengthText,
                  { color: getPasswordStrengthColor(getPasswordStrength(form.password)) }
                ]}>
                  Password Strength: {getPasswordStrength(form.password)}
                </Text>
              </View>
            )}
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          <View style={styles.input}>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={confirmPassword => {
                setForm(prev => ({ ...prev, confirmPassword }));
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
              }}
              placeholder="Confirm Password"
              placeholderTextColor="#6b7280"
              style={[styles.inputControl, errors.confirmPassword ? styles.inputError : null]}
              secureTextEntry={true}
              value={form.confirmPassword}
            />
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSignup}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.push('./login');
          }}>
          <Text style={styles.formFooter}>
            Already have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 140,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    marginTop: 175,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  passwordStrength: {
    marginTop: 5,
    marginLeft: 5,
  },
  passwordStrengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
});