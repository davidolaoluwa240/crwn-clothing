import { AnyAction } from "redux";
// Action Types
import { UserData } from "../../utils/firebase/firebase.utils";
import { setCurrentUser, signInSuccess, signInFailed } from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: null | Error;
};

// User Initial State
const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// Create User Reducer
export const userReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (setCurrentUser.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if (signInFailed.match(action)) {
    return { ...state, error: action.payload };
  }

  return state;
};
