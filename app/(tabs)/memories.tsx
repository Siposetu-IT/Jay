import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Heart, Calendar, MapPin, Plus } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
}

const MEMORIES_KEY = 'memories';

// Beautiful stock photos from Pexels
const stockPhotos = [
  'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1024981/pexels-photo-1024981.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export default function MemoriesTab() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    loadMemories();
  }, []);

  const loadMemories = async () => {
    try {
      const storedMemories = await AsyncStorage.getItem(MEMORIES_KEY);
      if (storedMemories) {
        setMemories(JSON.parse(storedMemories));
      } else {
        // Add some default memories
        const defaultMemories: Memory[] = [
          {
            id: '1',
            title: 'Our First Date',
            description: 'The day we first met and I knew you were special. Your laugh filled the entire café and my heart.',
            date: 'March 15, 2023',
            location: 'Downtown Café',
            imageUrl: stockPhotos[0],
          },
          {
            id: '2',
            title: 'Beach Sunset',
            description: 'Walking hand in hand as the sun painted the sky in shades of pink and gold. Perfect moment, perfect person.',
            date: 'June 22, 2023',
            location: 'Sunset Beach',
            imageUrl: stockPhotos[1],
          },
          {
            id: '3',
            title: 'Cozy Movie Night',
            description: 'Cuddled up watching our favorite movie. Sometimes the simplest moments are the most precious.',
            date: 'August 10, 2023',
            location: 'Home Sweet Home',
            imageUrl: stockPhotos[2],
          },
        ];
        setMemories(defaultMemories);
        await AsyncStorage.setItem(MEMORIES_KEY, JSON.stringify(defaultMemories));
      }
    } catch (error) {
      console.error('Error loading memories:', error);
    }
  };

  const addNewMemory = () => {
    const newMemory: Memory = {
      id: Date.now().toString(),
      title: 'New Adventure',
      description: 'Another beautiful moment to remember forever...',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      location: 'Somewhere Special',
      imageUrl: stockPhotos[Math.floor(Math.random() * stockPhotos.length)],
    };
    
    const updatedMemories = [newMemory, ...memories];
    setMemories(updatedMemories);
    AsyncStorage.setItem(MEMORIES_KEY, JSON.stringify(updatedMemories));
  };

  const renderMemory = (memory: Memory, index: number) => (
    <View key={memory.id} style={styles.memoryCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: memory.imageUrl }} style={styles.memoryImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageOverlay}
        />
        <View style={styles.imageContent}>
          <Text style={styles.memoryTitle}>{memory.title}</Text>
          <View style={styles.memoryMeta}>
            <View style={styles.metaItem}>
              <Calendar size={14} color="#ffffff" />
              <Text style={styles.metaText}>{memory.date}</Text>
            </View>
            <View style={styles.metaItem}>
              <MapPin size={14} color="#ffffff" />
              <Text style={styles.metaText}>{memory.location}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.memoryContent}>
        <Text style={styles.memoryDescription}>{memory.description}</Text>
        <View style={styles.heartContainer}>
          <Heart size={20} color="#ec4899" fill="#ec4899" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fef7ff', '#f0f9ff']}
        style={styles.background}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Camera size={32} color="#ec4899" />
            <Text style={styles.headerTitle}>Our Memories</Text>
            <Text style={styles.headerSubtitle}>Moments we'll treasure forever</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {memories.map((memory, index) => renderMemory(memory, index))}
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={addNewMemory}
          >
            <LinearGradient
              colors={['#ec4899', '#be185d']}
              style={styles.addButtonGradient}
            >
              <Plus size={24} color="#ffffff" />
              <Text style={styles.addButtonText}>Add Memory</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  memoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  memoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  imageContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  memoryTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
    marginBottom: 8,
  },
  memoryMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    marginLeft: 4,
  },
  memoryContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  memoryDescription: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#374151',
    lineHeight: 24,
    flex: 1,
    marginRight: 12,
  },
  heartContainer: {
    marginTop: 4,
  },
  addButton: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
});