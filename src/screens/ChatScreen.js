import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
} from 'react-native';
import {
  sendMessage,
  subscribeToMessages,
} from '../services/chatService';

export default function ChatScreen() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToMessages(setMessages);
    return () => unsubscribe();
  }, []);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text, USER_ID);
    setText('');
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        inverted
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 5 }}>
           {item.user}: {item.text}
          </Text>
        )}
      />

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type message..."
        style={{
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
        }}
      />

      <Button title="Send" onPress={handleSend} />
    </View>
  );
}