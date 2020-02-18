// action creators
import { ADD_USER, REMOVE_USER, PAIR_USER } from './types';

let nextId = 0;

export const addUser = (username, email) => {
  return {
    type: ADD_USER,
    payload: {
      userId: nextId++,
      username,
      email,
      partnerId: null
    }
  }; // add in the pairing
};

export const removeUser = (userId) => {
  return {
    type: REMOVE_USER,
    payload: {
      userId
    }
  }
}

export const addPairing = (userId, partnerId) => {
  return {
    type: PAIR_USER,
    payload: {
      userId,
      partnerId
    }
  };
}

// add action for removing user