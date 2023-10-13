import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/database';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Initialize Firebase
const initializeFirebase = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp();
  }
};

// Get references to Firebase services
const auth = firebase.auth();
const firestoreDB = firebase.firestore();
const realtimeDB = firebase.database();

GoogleSignin.configure({
  webClientId: '269069863779-rj9710f46bbiphf6i7q0o2tg07p7ee1g.apps.googleusercontent.com',
  offlineAccess: true
});

async function signinWithGoogle() {
  try {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
    return auth.signInWithCredential(googleCredential);
  } catch (error) {
    console.log(error);
  }
}

export { initializeFirebase, auth, firestoreDB, realtimeDB, signinWithGoogle };