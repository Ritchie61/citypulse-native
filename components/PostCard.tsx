import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../styles/PostCard.styles';

interface PostCardProps {
  text: string;
  media?: string; // URL of image/video
  layoutType?: 'layout1' | 'layout2';
  timestamp?: string;
  user?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  text,
  media,
  layoutType = 'layout1',
  timestamp,
  user,
}) => {
  return (
    <View style={layoutType === 'layout2' ? styles.layout2 : styles.postCard}>
      {user && <Text style={internalStyles.user}>{user}</Text>}
      <Text style={internalStyles.text}>{text}</Text>
      {media && (
        <Image
          source={{ uri: media }}
          style={styles.postMedia}
          resizeMode="cover"
        />
      )}
      {timestamp && <Text style={internalStyles.timestamp}>{timestamp}</Text>}
    </View>
  );
};

// Optional internal styles for small tweaks
const internalStyles = StyleSheet.create({
  user: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
});

export default PostCard;
