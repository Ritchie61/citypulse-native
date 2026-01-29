import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PostCard from '../components/PostCard';

// Example posts data (later you’ll fetch this from Supabase)
const posts = [
  {
    id: 1,
    text: 'Weather alert: heavy rain expected!',
    user: 'Admin',
    timestamp: '2 mins ago',
    media: 'https://example.com/image1.jpg',
    layoutType: 'layout1',
  },
  {
    id: 2,
    text: 'Road closed due to flooding',
    user: 'Admin',
    timestamp: '10 mins ago',
    layoutType: 'layout2',
  },
  {
    id: 3,
    text: 'Community meeting tomorrow at 5 PM',
    user: 'Community Board',
    timestamp: '1 hour ago',
    layoutType: 'layout1',
  },
];

// Sort posts latest first
const sortedPosts = posts.sort((a, b) => b.id - a.id);

export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {sortedPosts.map((post) => (
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
