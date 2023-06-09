// Modules
import { put, call, all, takeLatest } from "typed-redux-saga/macro";

import { User } from "firebase/auth";
import { AdditionalInformation } from "../../utils/firebase/firebase.utils";

// Action Types
import { USER_ACTION_TYPES } from "./user.types";

// Redux Actions
import {
  signInSuccess,
  signInFailed,
  setCurrentUser,
  EmailSignInStart,
  EmailSignUpStart,
} from "./user.action";

// Firebase
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if (!userSnapshot) return;
    yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (err) {
    yield put(signInFailed(err as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* signUpWithEmailAndPassword({ payload }: EmailSignUpStart) {
  const { email, password, displayName } = payload;
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user, { displayName });
    }
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);

    if (userAuth) {
      yield* call(getSnapshotFromUserAuth, userAuth);
    }
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* signOutAuthUser() {
  try {
    yield* call(signOutUser);
    yield* put(setCurrentUser(null));
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onEmailSignUpStart() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
    signUpWithEmailAndPassword
  );
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutAuthUser);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onEmailSignUpStart),
  ]);
}
