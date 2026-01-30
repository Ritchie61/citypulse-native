// /screens/Home.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import PostCard from '../components/PostCard';
import { supabase } from '../lib/supabaseClient';

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
      .from('posts')
      .select('*')
      .order('timestamp', { ascending: false });

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

  // Placeholder for Add Post button
  const handleAddPost = () => {
    Alert.alert('Add Post', 'This will open the post creation screen.');
    console.log('Add Post button pressed');
  };

  // Placeholder for Comment button
  const handleComment = (postId: string) => {
    Alert.alert('Comment', `This will open comments for post ${postId}.`);
    console.log(`Comment button pressed for post ${postId}`);
  };

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

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddPost}>
            <Text style={styles.buttonText}>Add Post</Text>
          </TouchableOpacity>

          {/* Comment button works for the latest post */}
          {posts.length > 0 && (
            <TouchableOpacity style={styles.button} onPress={() => handleComment(posts[0].id)}>
              <Text style={styles.buttonText}>Comment</Text>
            </TouchableOpacity>
          )}
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
