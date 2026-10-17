import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  AppText,
  BottomNavigator,
  BottomTabKey,
} from '@/src/components';
import { COLORS } from '@/src/constants/design';
import { CategoryScreen } from './CategoryScreen';
import { HomeScreen } from './HomeScreen';

export const MainTabScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BottomTabKey>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'categories':
        return <CategoryScreen onPressBack={() => setActiveTab('home')} />;
      default:
        return (
          <View style={styles.placeholderScreen}>
            <AppText variant="titleMedium" color={COLORS.text.white}>
              {activeTab.toUpperCase()}
            </AppText>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderContent()}
      </View>

      <BottomNavigator
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  content: {
    flex: 1,
  },
  placeholderScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
