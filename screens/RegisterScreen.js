import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_BASE_URL = 'http://192.168.1.101:5000';

  const handleRegister = async () => {
    if (submitting) return;

    setError('');
    setSuccess('');

    if (!email || !password || !confirmPassword) {
      setError('Email et mot de passe sont obligatoires.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!acceptedTerms) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          (data && data.message) ||
            'Une erreur est survenue lors de la création du compte.',
        );
        return;
      }

      setSuccess(
        (data && data.message) ||
          'Compte créé, vérifiez votre email pour valider votre compte.',
      );
    } catch (e) {
      setError(
        "Impossible de contacter le serveur. Vérifiez que le backend tourne bien et qu'il est accessible depuis votre téléphone.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.appTitle}>Créer un compte</Text>
            <Text style={styles.appSubtitle}>
              Rejoignez Status Map en quelques secondes
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                placeholder="votre@email.com"
                placeholderTextColor="#A0AEC0"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Pseudo</Text>
              <TextInput
                placeholder="Votre pseudo"
                placeholderTextColor="#A0AEC0"
                autoCapitalize="none"
                style={styles.input}
                value={pseudo}
                onChangeText={setPseudo}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Mot de passe</Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#A0AEC0"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Confirmer le mot de passe</Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#A0AEC0"
                secureTextEntry
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity
              style={styles.termsRow}
              activeOpacity={0.8}
              onPress={() => setAcceptedTerms((prev) => !prev)}
            >
              <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                {acceptedTerms && <View style={styles.checkboxInner} />}
              </View>
              <Text style={styles.termsText}>
                J&apos;accepte les{' '}
                <Text style={styles.termsLink}>
                  conditions d&apos;utilisation
                </Text>
              </Text>
            </TouchableOpacity>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? <Text style={styles.successText}>{success}</Text> : null}

            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={handleRegister}
              disabled={submitting}
            >
              <Text style={styles.primaryButtonText}>
                {submitting ? 'Création en cours...' : "S'inscrire"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToLogin}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.backToLoginText}>
                Déjà un compte ? <Text style={styles.backToLoginLink}>Se connecter</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F3E8FF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 32,
  },
  header: {
    marginBottom: 24,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  appSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#4B5563',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  fieldGroup: {
    marginTop: 14,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#4C1D95',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#4C1D95',
    backgroundColor: 'rgba(76, 29, 149, 0.08)',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: '#4C1D95',
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: '#4B5563',
  },
  termsLink: {
    color: '#4C1D95',
    fontWeight: '500',
  },
  primaryButton: {
    marginTop: 22,
    backgroundColor: '#4C1D95',
    borderRadius: 999,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#F9FAFB',
    fontSize: 15,
    fontWeight: '600',
  },
  errorText: {
    marginTop: 14,
    fontSize: 13,
    color: '#B91C1C',
  },
  successText: {
    marginTop: 14,
    fontSize: 13,
    color: '#15803D',
  },
  backToLogin: {
    marginTop: 18,
    alignItems: 'center',
  },
  backToLoginText: {
    fontSize: 13,
    color: '#4B5563',
  },
  backToLoginLink: {
    color: '#4C1D95',
    fontWeight: '500',
  },
});

