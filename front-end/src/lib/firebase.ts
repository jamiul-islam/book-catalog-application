import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCLJEbq4zOOlwbS7CFHPDim9fI_WqaV_84',
  authDomain: 'my-practice-apps-b5091.firebaseapp.com',
  projectId: 'my-practice-apps-b5091',
  storageBucket: 'my-practice-apps-b5091.appspot.com',
  messagingSenderId: '428951770990',
  appId: '1:428951770990:web:a5adfa577982f11e70137f',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
