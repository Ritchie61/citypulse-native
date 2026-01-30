import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import PostCard from '../components/PostCard';
import { supabase } from '../lib/supabase';

interface Post {
  id: number;
  text: string;
  user?: string;
  timestamp: string;
  media?: string;
  layoutType?: 'layout1' | 'layout2';
}

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')                // your table name
      .select('*')
      .order('timestamp', { ascending: false }); // latest first

    if (error) {
      console.log('Error fetching posts:', error);
    } else {
      setPosts(data as Post[]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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

        {/* Placeholder buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/new-post')}
          >
            <Text style={styles.buttonText}>Add Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Comment pressed')}
          >
            <Text style={styles.buttonText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  scrollContainer: { paddingVertical: 16 },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
