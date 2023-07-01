import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC_K_fIH9rY6gUXU_PLEXT8IIiYJvfhT9I',
  authDomain: 'minstagram-648ac.firebaseapp.com',
  databaseURL: 'https://minstagram-648ac-default-rtdb.firebaseio.com',
  projectId: 'minstagram-648ac',
  storageBucket: 'minstagram-648ac.appspot.com',
  messagingSenderId: '547980036362',
  appId: '1:547980036362:web:ace317d8b92e1a089312f3',
  measurementId: 'G-HEYG0P3ZJW'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const auth = getAuth(app);

export const firebaseApp = app;

export const Fdatabase = database;
