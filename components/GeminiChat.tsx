import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Send, MessageCircle } from 'lucide-react-native';
import { useGemini } from '@/hooks/useGemini';

export default function GeminiChat() {
  const [prompt, setPrompt] = useState('');
  const { generateResponse, response, loading, error, isConfigured } = useGemini();

  const handleSend = async () => {
    if (!prompt.trim() || loading) return;
    
    await generateResponse(prompt);
    setPrompt('');
  };

  if (!isConfigured) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <MessageCircle size={48} color="#ef4444" />
          <Text style={styles.errorTitle}>Gemini Not Configured</Text>
          <Text style={styles.errorText}>
            Please check your environment configuration
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MessageCircle size={24} color="#6366f1" />
        <Text style={styles.headerTitle}>Chat with Gemini AI</Text>
      </View>

      <ScrollView style={styles.responseContainer} showsVerticalScrollIndicator={false}>
        {error && (
          <View style={styles.errorMessage}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {response && (
          <View style={styles.responseBox}>
            <Text style={styles.responseText}>{response}</Text>
          </View>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Generating response...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Ask Gemini anything..."
          multiline
          maxLength={1000}
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!prompt.trim() || loading) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!prompt.trim() || loading}
        >
          <Send size={20} color={(!prompt.trim() || loading) ? '#9ca3af' : '#ffffff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 12,
  },
  responseContainer: {
    flex: 1,
    padding: 20,
  },
  responseBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorMessage: {
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#dc2626',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    maxHeight: 120,
    backgroundColor: '#ffffff',
  },
  sendButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 12,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
});