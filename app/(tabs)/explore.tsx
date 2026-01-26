import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '../../components/ui/collapsible';
import { ExternalLink } from '../../components/external-link';
import ParallaxScrollView from '../../components/parallax-scroll-view';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { Fonts } from '../../constants/theme';

export default function ExploreScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Explore
        </ThemedText>
      </ThemedView>

      <ThemedText>
        This app includes your custom code and assets.
      </ThemedText>

      <Collapsible title="Images">
        <ThemedText>
          Static images with different densities will automatically load @2x/@3x versions.
        </ThemedText>

        {/* Your actual logo */}
        <Image
          source={require('../../assets/images/icon-home.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />

        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Device & Platform Info">
        <ThemedText>
          Works on Android, iOS, and web. Use <ThemedText type="defaultSemiBold">w</ThemedText> for web.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
