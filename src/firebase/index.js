import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { getAuth} from 'firebase/auth'
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIN_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP,
};
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const firestore= getFirestore(app);

export {app,auth,firestore}