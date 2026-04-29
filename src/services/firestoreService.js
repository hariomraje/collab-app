import firestore from '@react-native-firebase/firestore';

import { runOrQueue } from './syncService';

export const createDocument = async (docId) => {
  await firestore().collection('documents').doc(docId).set({
    content: '',
    updatedAt: new Date(),
  });
};

export const subscribeToDocument = (docId, callback) => {
  return firestore()
    .collection('documents')
    .doc(docId)
    .onSnapshot(doc => {
      if (doc.exists) {
        callback(doc.data());
      }
    });
};

export const updateDocument = async (docId, content) => {
  await runOrQueue(async () => {
    await firestore().collection('documents').doc(docId).update({
      content,
      updatedAt: new Date(),
    });
  });
};
