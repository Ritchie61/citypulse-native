import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabaseClient';

export default function NewPost({ navigation }: any) {
  const [text, setText] = useState('');
  const [mediaUri, setMediaUri] = useState<string | null>(null);

  // Pick image/video from library
  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.7,
    });

    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!text && !mediaUri) {
      Alert.alert('Error', 'Please add text or media for the post.');
      return;
    }

    let mediaUrl = null;

    // Upload media to Supabase storage if exists
    if (mediaUri) {
      try {
        const fileName = mediaUri.split('/').pop();
        const response = await fetch(mediaUri);
        const blob = await response.blob();

        const { data, error } = await supabase.storage
          .from('posts-media')
          .upload(fileName!, blob);

        if (error) throw error;

        const { publicUrl } = supabase.storage.from('posts-media').getPublicUrl(fileName!);
        mediaUrl = publicUrl;
      } catch (err) {
        console.error('Upload error:', err);
        Alert.alert('Error', 'Failed to upload media.');
        return;
      }
    }

    // Insert post in Supabase table
    const { data, error } = await supabase.from('posts').insert([
      {
        text,
        media: mediaUrl,
        user: 'Anonymous', // Replace with auth later
      },
    ]);

    if (error) {
      console.error('Insert error:', error);
      Alert.alert('Error', 'Failed to create post.');
    } else {
      Alert.alert('Success', 'Post created!');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write something..."
        multiline
        value={text}
        onChangeText={setText}
      />
      {mediaUri && <Image source={{ uri: mediaUri }} style={styles.preview} />}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={pickMedia}>
          <Text style={styles.buttonText}>Add Media</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2F2F2',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 12,
  },
  preview: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
