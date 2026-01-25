import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function NewAlert() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  async function submit() {
    if (!title || !description) return;

    await supabase.from('alerts').insert({
      title,
      description
    });

    router.back();
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Button title="Publish Alert" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 6
  }
});
