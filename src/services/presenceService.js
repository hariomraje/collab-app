import firestore from '@react-native-firebase/firestore';

const USERS_COLLECTION = 'presence';

export const setUserOnline = async (userId) => {
  await firestore().collection(USERS_COLLECTION).doc(userId).set({
    online: true,
    lastSeen: new Date(),
  });
};

export const setUserOffline = async (userId) => {
  await firestore().collection(USERS_COLLECTION).doc(userId).set({
    online: false,
    lastSeen: new Date(),
  });
};

export const subscribeToUsers = (callback) => {
  return firestore()
    .collection(USERS_COLLECTION)
    .onSnapshot(snapshot => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(users);
    });
};