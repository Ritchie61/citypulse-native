import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { StyleSheet } from 'react-native';
import { Fonts } from '../../constants/theme';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
        Home
      </ThemedText>
      <ThemedText>
        This is your custom home screen. Replace any template content with your own components here.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
