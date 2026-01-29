// /styles/PostCard.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  layout2: {
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  postMedia: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginVertical: 12,
  },
});

export default styles;
