import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Plus, Calendar, Quote } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface LoveNote {
  id: string;
  title: string;
  message: string;
  date: string;
  color: string;
}

const LOVE_NOTES_KEY = 'love_notes';

const gradientColors = [
  ['#ffecd2', '#fcb69f'],
  ['#a8edea', '#fed6e3'],
  ['#fbc2eb', '#a6c1ee'],
  ['#fdcbf1', '#e6dee9'],
  ['#ffecd2', '#fcb69f'],
];

export default function LoveNotesTab() {
  const [notes, setNotes] = useState<LoveNote[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', message: '' });

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem(LOVE_NOTES_KEY);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      } else {
        // Add some default notes
        const defaultNotes: LoveNote[] = [
          {
            id: '1',
            title: 'Good Morning Beautiful',
            message: 'Every morning I wake up grateful for another day to love you. Your smile is the sunshine that brightens my world. 💕',
            date: new Date().toLocaleDateString(),
            color: '#ffecd2',
          },
          {
            id: '2',
            title: 'Forever & Always',
            message: 'In a world full of temporary things, you are my forever. Thank you for being my constant source of joy and love.',
            date: new Date().toLocaleDateString(),
            color: '#a8edea',
          },
        ];
        setNotes(defaultNotes);
        await AsyncStorage.setItem(LOVE_NOTES_KEY, JSON.stringify(defaultNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async (updatedNotes: LoveNote[]) => {
    try {
      await AsyncStorage.setItem(LOVE_NOTES_KEY, JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const addNote = () => {
    if (newNote.title.trim() && newNote.message.trim()) {
      const note: LoveNote = {
        id: Date.now().toString(),
        title: newNote.title,
        message: newNote.message,
        date: new Date().toLocaleDateString(),
        color: gradientColors[Math.floor(Math.random() * gradientColors.length)][0],
      };
      const updatedNotes = [note, ...notes];
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
      setNewNote({ title: '', message: '' });
      setShowAddForm(false);
    }
  };

  const renderNote = (note: LoveNote, index: number) => (
    <View key={note.id} style={[styles.noteCard, { marginBottom: 20 }]}>
      <LinearGradient
        colors={gradientColors[index % gradientColors.length]}
        style={styles.noteGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.noteContent}>
          <View style={styles.noteHeader}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <View style={styles.dateContainer}>
              <Calendar size={14} color="#666" />
              <Text style={styles.noteDate}>{note.date}</Text>
            </View>
          </View>
          <View style={styles.quoteContainer}>
            <Quote size={20} color="#ec4899" style={styles.quoteIcon} />
            <Text style={styles.noteMessage}>{note.message}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffeef8', '#f0f9ff']}
        style={styles.background}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Heart size={32} color="#ec4899" fill="#ec4899" />
            <Text style={styles.headerTitle}>Love Notes for Jay</Text>
            <Text style={styles.headerSubtitle}>Sweet messages from the heart</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {notes.map((note, index) => renderNote(note, index))}
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddForm(true)}
          >
            <LinearGradient
              colors={['#ec4899', '#be185d']}
              style={styles.addButtonGradient}
            >
              <Plus size={24} color="#ffffff" />
              <Text style={styles.addButtonText}>Add Love Note</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        {showAddForm && (
          <BlurView intensity={80} style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Write a Love Note</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Title</Text>
                <View style={styles.inputWrapper}>
                  <Text
                    style={styles.textInput}
                    onPress={() => {
                      // For web compatibility, we'll use a simple prompt
                      if (Platform.OS === 'web') {
                        const title = prompt('Enter title:');
                        if (title) setNewNote(prev => ({ ...prev, title }));
                      }
                    }}
                  >
                    {newNote.title || 'Tap to enter title...'}
                  </Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Message</Text>
                <View style={[styles.inputWrapper, styles.messageInput]}>
                  <Text
                    style={styles.textInput}
                    onPress={() => {
                      // For web compatibility, we'll use a simple prompt
                      if (Platform.OS === 'web') {
                        const message = prompt('Enter your love message:');
                        if (message) setNewNote(prev => ({ ...prev, message }));
                      }
                    }}
                  >
                    {newNote.message || 'Tap to enter your love message...'}
                  </Text>
                </View>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setShowAddForm(false);
                    setNewNote({ title: '', message: '' });
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={addNote}
                >
                  <LinearGradient
                    colors={['#ec4899', '#be185d']}
                    style={styles.saveButtonGradient}
                  >
                    <Text style={styles.saveButtonText}>Save Note</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        )}
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
  noteCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  noteGradient: {
    padding: 20,
  },
  noteContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  noteTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1f2937',
    flex: 1,
    marginRight: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#6b7280',
    marginLeft: 4,
  },
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  quoteIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  noteMessage: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#374151',
    lineHeight: 24,
    flex: 1,
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'DancingScript-Bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#f9fafb',
  },
  messageInput: {
    minHeight: 80,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#374151',
    minHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#6b7280',
  },
  saveButton: {
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
  },
});