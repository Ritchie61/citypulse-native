import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../lib/supabase';
import PostCard from '../components/PostCard';

type Post = {
  id: string;
  text: string;
  media_url?: string | null;
  layout_type?: 'default' | 'layout2';
  created_at: string;
};

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data ?? []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            text={item.text}
            media={item.media_url}
            layoutType={item.layout_type}
            timestamp={new Date(item.created_at).getTime()}
          />
        )}
        contentContainerStyle={styles.feed}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating new post button */}
      <TouchableOpacity
  style={styles.fab}
  onPress={() => {
    console.log('FAB pressed: Create Post (navigation coming next)');
  }}
>
  <Text style={styles.fabText}>＋</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
  },
  feed: {
    paddingVertical: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 28,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
