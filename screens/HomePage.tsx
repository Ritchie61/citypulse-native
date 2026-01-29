import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Sample post type
type Post = {
  id: string;
  user: string;
  timestamp: string;
  text: string;
  media?: string; // image/video URL
  layoutType: 'layout1' | 'layout2';
};

// Sample data
const initialPosts: Post[] = [
  {
    id: '1',
    user: 'Alice',
    timestamp: '2026-01-29 09:00',
    text: 'Heavy rain warning in downtown!',
    media: 'https://via.placeholder.com/300x200.png?text=Weather',
    layoutType: 'layout2',
  },
  {
    id: '2',
    user: 'Bob',
    timestamp: '2026-01-28 18:30',
    text: 'Road closure near Main St.',
    layoutType: 'layout1',
  },
];

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  // Render each post
  const renderPost = ({ item }: { item: Post }) => {
    return (
      <View style={[styles.postCard, item.layoutType === 'layout2' && styles.layout2]}>
        <Text style={styles.username}>{item.user}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        <Text style={styles.postText}>{item.text}</Text>
        {item.media && (
          <Image source={{ uri: item.media }} style={styles.postMedia} resizeMode="cover" />
        )}
        <TouchableOpacity style={styles.commentButton}>
          <Text style={styles.commentText}>Comment</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={posts.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))} // latest first
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ paddingBottom: 100 }} // space for floating button
      />

      {/* Floating New Post Button */}
      <TouchableOpacity style={styles.newPostButton}>
        <Text style={styles.newPostText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  layout2: {
    backgroundColor: '#E3F2FD', // subtle blue tint for variant 2
  },
  username: {
    fontWeight: 'bold',
    color: '#212121',
    fontSize: 16,
  },
  timestamp: {
    color: '#757575',
    fontSize: 12,
    marginBottom: 8,
  },
  postText: {
    color: '#424242',
    fontSize: 14,
    marginBottom: 8,
  },
  postMedia: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  commentButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  commentText: {
    color: '#1976D2',
    fontWeight: '600',
  },
  newPostButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#1976D2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  newPostText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 32,
  },
});
