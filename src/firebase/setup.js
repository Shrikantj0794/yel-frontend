
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCozoFbQLCvk-tmXC1NaNP4WUHBtgEll7M",
  authDomain: "yel-seva.firebaseapp.com",
  projectId: "yel-seva",
  storageBucket: "yel-seva.appspot.com",
  messagingSenderId: "805456534311",
  appId: "1:805456534311:web:54a2c267078f6bd1486702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
