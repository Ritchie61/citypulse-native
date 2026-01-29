import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../styles/PostCard.styles';

export type PostCardProps = {
  text: string;
  media?: string | null;              // Supabase nullable field
  layoutType?: 'default' | 'layout2'; // Matches DB values
  timestamp: number | string;         // created_at from Supabase
  user?: string | null;
};

const PostCard: React.FC<PostCardProps> = ({
  text,
  media,
  layoutType = 'default',
  timestamp,
  user,
}) => {
  const formattedTime =
    typeof timestamp === 'string'
      ? new Date(timestamp).toLocaleString()
      : new Date(timestamp).toLocaleString();

  return (
    <View
      style={[
        styles.postCard,
        layoutType === 'layout2' && styles.layout2,
      ]}
    >
      {user && <Text style={internalStyles.user}>{user}</Text>}

      <Text style={internalStyles.text}>{text}</Text>

      {media && (
        <Image
          source={{ uri: media }}
          style={styles.postMedia}
          resizeMode="cover"
        />
      )}

      <Text style={internalStyles.timestamp}>{formattedTime}</Text>
    </View>
  );
};

const internalStyles = StyleSheet.create({
  user: {
    fontWeight: '600',
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
});

export default PostCard;
