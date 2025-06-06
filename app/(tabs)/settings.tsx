import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Heart, 
  Moon, 
  Smartphone, 
  Globe,
  Info,
  ChevronRight 
} from 'lucide-react-native';

export default function SettingsTab() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dailyReminders, setDailyReminders] = useState(true);

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    value, 
    onValueChange, 
    showSwitch = false,
    showChevron = false,
    onPress 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    showSwitch?: boolean;
    showChevron?: boolean;
    onPress?: () => void;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress && !showSwitch}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Icon size={20} color="#ec4899" />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {showSwitch && (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#e5e7eb', true: '#fce7f3' }}
            thumbColor={value ? '#ec4899' : '#9ca3af'}
          />
        )}
        {showChevron && (
          <ChevronRight size={20} color="#9ca3af" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fef7ff', '#f0f9ff']}
        style={styles.background}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <SettingsIcon size={32} color="#ec4899" />
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSubtitle}>Customize your experience</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.sectionContent}>
              <SettingItem
                icon={Bell}
                title="Push Notifications"
                subtitle="Receive love notes and reminders"
                value={notifications}
                onValueChange={setNotifications}
                showSwitch
              />
              <SettingItem
                icon={Heart}
                title="Daily Love Reminders"
                subtitle="Get a sweet message every day"
                value={dailyReminders}
                onValueChange={setDailyReminders}
                showSwitch
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            <View style={styles.sectionContent}>
              <SettingItem
                icon={Moon}
                title="Dark Mode"
                subtitle="Switch to dark theme"
                value={darkMode}
                onValueChange={setDarkMode}
                showSwitch
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.sectionContent}>
              <SettingItem
                icon={Smartphone}
                title="App Version"
                subtitle="1.0.0"
                showChevron
              />
              <SettingItem
                icon={Globe}
                title="Platform"
                subtitle={Platform.OS === 'web' ? 'Web' : 'Mobile'}
                showChevron
              />
              <SettingItem
                icon={Info}
                title="About This App"
                subtitle="Made with love for Jay"
                showChevron
              />
            </View>
          </View>

          <View style={styles.loveNote}>
            <LinearGradient
              colors={['#fce7f3', '#fdf2f8']}
              style={styles.loveNoteGradient}
            >
              <Heart size={24} color="#ec4899" fill="#ec4899" />
              <Text style={styles.loveNoteText}>
                This app was created with all my love for you, Jay. 
                Every feature, every color, every detail was chosen 
                to bring a smile to your face. 💕
              </Text>
            </LinearGradient>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'DancingScript-Bold',
    color: '#1f2937',
    marginTop: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fce7f3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#1f2937',
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 16,
  },
  loveNote: {
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  loveNoteGradient: {
    padding: 24,
    alignItems: 'center',
  },
  loveNoteText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 12,
  },
});