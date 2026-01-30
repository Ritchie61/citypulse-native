import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';

import PostCard from '../components/PostCard';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'expo-router';

interface Post {
  id: number;
  text: string;
  media?: string | null;
  layoutType?: 'layout1' | 'layout2';
  timestamp: string;
  user?: string | null;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch posts (latest first)
  const fetchPosts = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts');
    } else {
      setPosts((data ?? []) as Post[]);
    }

    setLoading(false);
  }, []);

  // Initial load + realtime updates
  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel('posts-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          setPosts((current) => [payload.new as Post, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPosts]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            text={post.text}
            media={post.media ?? undefined}
            timestamp={post.timestamp}
            user={post.user ?? 'Anonymous'}
            layoutType={post.layoutType ?? 'layout1'}
          />
        ))}

        {/* Secondary actions (not main focus) */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/new-post')}
          >
            <Text style={styles.buttonText}>Add Post</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
