import firestore from '@react-native-firebase/firestore';

export const sendMessage = async (text, user) => {
  await firestore().collection('messages').add({
    text,
    user,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

export const subscribeToMessages = (callback) => {
  return firestore()
    .collection('messages')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    });
};