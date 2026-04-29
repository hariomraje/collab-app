import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import {
  createDocument,
  subscribeToDocument,
  updateDocument,
} from '../services/firestoreService';

export default function EditorScreen({ route }) {
  const { docId } = route.params;

  const [content, setContent] = useState('');

  useEffect(() => {
    // Create doc if not exists
    createDocument(docId);

    // Subscribe to real-time updates
    const unsubscribe = subscribeToDocument(docId, (data) => {
      setContent(data.content);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (text) => {
    setContent(text);
    updateDocument(docId, text);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={content}
        onChangeText={handleChange}
        multiline
        placeholder="Start typing..."
        style={{ flex: 1, padding: 20 }}
      />
    </View>
  );
}