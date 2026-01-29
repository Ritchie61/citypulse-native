import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  postCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16, // more rounded
    shadowColor: '#000',
    shadowOpacity: 0.08, // softer shadow
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  layout2: {
    backgroundColor: '#E0F7FA', // subtle cyan for layout2
    padding: 20,
  },
  postMedia: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginVertical: 12,
  },
});
