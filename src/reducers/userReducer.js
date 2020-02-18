// Reducer
import { ADD_USER, REMOVE_USER, PAIR_USER } from '../actions/types';

const INITIAl_STATE = {
  userList: []
}; // eventually add other state elements in

const users = (state = INITIAl_STATE, action) => {
  switch (action.type) {
    case ADD_USER:
      // TODO: do checking to make sure there are no duplicates
      return { 
        ...state,
        userList: [
          ...state.userList,
          {
            userId: action.payload.userId,
            username: action.payload.username,
            email: action.payload.email,
          }
        ]
      }
    case REMOVE_USER:
      const userList = state.userList.filter(user => user.userId !== action.payload.userId); // filter out the userId to remove

      return {
        ...state,
        userList
      }
    case PAIR_USER:
      // update the state
      // check should happen outside of the store

      // update user with partner id
      state.userList.filter(user => {
        if (user.userId === action.payload.userId) {
          user.partnerId = action.payload.partnerId;
        }
      });
      // update partner with user id
      state.userList.filter(user => {
        if (user.userId === action.payload.partnerId) {
          user.partnerId = action.payload.userId;
        }
      });

      const updatedState = Object.assign({}, state); // copy the state into a new copy
      
      console.log(updatedState);
      return updatedState;
    default:
      return state;
  }
};

export default users;