import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import PostCard from '../components/PostCard';
import { supabase } from '../lib/supabaseClient';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';

interface Post {
  id: number;
  text: string;
  media?: string;
  layoutType?: 'layout1' | 'layout2';
  timestamp: string;
  user?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts');
    } else {
      setPosts(data as Post[]);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  // -----------------------
  // Real-time subscription
  // -----------------------
  useEffect(() => {
    const subscription = supabase
      .from('posts')
      .on('INSERT', (payload) => {
        // Add new post at the top
        setPosts((currentPosts) => [payload.new, ...currentPosts]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              text={post.text}
              user={post.user}
              timestamp={post.timestamp}
              media={post.media}
              layoutType={post.layoutType}
            />
          ))}

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/screens/NewPost')}
            >
              <Text style={styles.buttonText}>Add Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Comment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  scrollContainer: { paddingVertical: 16 },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
