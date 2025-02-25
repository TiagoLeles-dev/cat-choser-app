import { Tabs } from 'expo-router';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { icons } from '@/assets/icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none',
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarLabel: '' }} />
      <Tabs.Screen name="chat" options={{ title: "chat", tabBarLabel: '' }} />
      <Tabs.Screen name="profile" options={{ title: "profile", tabBarLabel: '' }} />
    </Tabs>
  );
}

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {

        const isFocused = state.index === index;

        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            style={[styles.tabButton, isFocused && styles.activeTab]}
          >
            {icons[route.name] && icons[route.name]({ color: isFocused ? "#EC537E" : "#737373" })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 12,
    bottom: 25,
    left: 100,
    right: 100,
    backgroundColor: 'white',
    borderRadius: 30,
    height: 54,
    justifyContent: 'space-around',
    alignItems: 'center',
    // iOS
    shadowColor: '#BFBFC0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 16,

    // Android
    elevation: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    transform: [{ scale: 1.2 }],
  },
});

export { CustomTabBar };
