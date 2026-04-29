import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { subscribeToUsers } from '../services/presenceService';

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToUsers(setUsers);
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Create Document"
        onPress={() =>
          navigation.navigate('Editor', { docId: 'test-doc-1' })
        }
      />

      <Button
        title="Open Chat"
        onPress={() => navigation.navigate('Chat')}
      />

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
        Online Users:
      </Text>

      {users.map(user => (
        <Text key={user.id}>
          {user.id} - {user.online ? '🟢 Online' : '⚫ Offline'}
        </Text>
      ))}
    </View>
  );
}