import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
// firebase and firestore need their own reducers
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

// Reducers

const firebaseConfig = {
  apiKey: "AIzaSyACBuxFkW8mCe3AAqKb6A3vz6Wk-eTKtI4",
  authDomain: "reactclientpanel-840bb.firebaseapp.com",
  databaseURL: "https://reactclientpanel-840bb.firebaseio.com",
  projectId: "reactclientpanel-840bb",
  storageBucket: "reactclientpanel-840bb.appspot.com",
  messagingSenderId: "807991940811"
};

// react-redux-firebase config
// sets the user profile for user authentication ???
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// init firebase instance
firebase.initializeApp(firebaseConfig);
// init firestore
firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
// All custom reducers will also go here as usual
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// create initial state
// settings will be here and will come from local storage
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
