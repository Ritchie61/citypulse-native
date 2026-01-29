import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import PostCard from '../components/PostCard';

type Post = {
  id: string;
  text: string;
  media?: string;
  createdAt: number;
  layoutType?: 'default' | 'layout2';
};

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    text: 'Heavy rain warning in downtown area. Avoid low-lying roads.',
    media: 'https://via.placeholder.com/600x400',
    createdAt: Date.now(),
    layoutType: 'layout2',
  },
  {
    id: '2',
    text: 'Power outage reported near the hospital district.',
    createdAt: Date.now() - 1000 * 60 * 60,
    layoutType: 'default',
  },
];

export default function Home() {
  // Latest post first
  const posts = [...MOCK_POSTS].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            text={item.text}
            media={item.media}
            layoutType={item.layoutType}
            timestamp={item.createdAt}
          />
        )}
        contentContainerStyle={styles.feed}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating New Post Button (not dominant) */}
      <TouchableOpacity style={styles.fab}>
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
    lineHeight: 28,
  },
});
