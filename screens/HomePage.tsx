// /screens/Home.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PostCard from '../components/PostCard';
import { supabase } from '../lib/supabaseClient'; // make sure you have this file

interface Post {
  id: string;
  text: string;
  media?: string;
  layoutType?: 'layout1' | 'layout2';
  timestamp?: string;
  user?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts') // your Supabase table
      .select('*')
      .order('timestamp', { ascending: false }); // latest posts first

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading && <Text style={{ textAlign: 'center', marginVertical: 20 }}>Loading posts...</Text>}

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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  scrollContainer: {
    paddingVertical: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
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
