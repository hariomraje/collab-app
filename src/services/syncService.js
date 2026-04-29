import NetInfo from '@react-native-community/netinfo';

let isConnected = true;
let queue = [];

export const initNetworkListener = () => {
  NetInfo.addEventListener(state => {
    isConnected = state.isConnected;

    if (isConnected) {
      processQueue();
    }
  });
};

export const addToQueue = (action) => {
  queue.push(action);
};

const processQueue = async () => {
  while (queue.length > 0) {
    const action = queue.shift();
    await action();
  }
};

export const runOrQueue = async (action) => {
  if (isConnected) {
    await action();
  } else {
    addToQueue(action);
  }
};