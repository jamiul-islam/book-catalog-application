import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDdEeuPz-7pTL3NE5W8cIFMLDg8i8QVqo8',
  authDomain: 'book-catalog-60310.firebaseapp.com',
  projectId: 'book-catalog-60310',
  storageBucket: 'book-catalog-60310.appspot.com',
  messagingSenderId: '985130130438',
  appId: '1:985130130438:web:da96931152809d64467787',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
