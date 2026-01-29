import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function CreatePost() {
  const [text, setText] = useState('');
  const [layoutType, setLayoutType] = useState<'default' | 'layout2'>('default');
  const [loading, setLoading] = useState(false);

  async function submitPost() {
    if (!text.trim()) {
      Alert.alert('Post cannot be empty');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('posts').insert({
      text,
      layout_type: layoutType,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setText('');
      Alert.alert('Posted', 'Your alert has been published');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Alert</Text>

      <TextInput
        style={styles.input}
        placeholder="Write an alert, warning, or update…"
        multiline
        value={text}
        onChangeText={setText}
      />

      <View style={styles.layoutRow}>
        <TouchableOpacity
          style={[
            styles.layoutButton,
            layoutType === 'default' && styles.activeLayout,
          ]}
          onPress={() => setLayoutType('default')}
        >
          <Text>Layout 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.layoutButton,
            layoutType === 'layout2' && styles.activeLayout,
          ]}
          onPress={() => setLayoutType('layout2')}
        >
          <Text>Layout 2</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.submit}
        onPress={submitPost}
        disabled={loading}
      >
        <Text style={styles.submitText}>
          {loading ? 'Posting…' : 'Post Alert'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  layoutRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  layoutButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
  },
  activeLayout: {
    backgroundColor: '#E0F2FE',
    borderColor: '#38BDF8',
  },
  submit: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
