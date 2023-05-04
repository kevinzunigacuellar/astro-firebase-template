import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDdOmBvtzbTYaS4WJD8afXTxQ859Pw_j7s",
  authDomain: "astro-example.firebaseapp.com",
  projectId: "astro-example",
  storageBucket: "astro-example.appspot.com",
  messagingSenderId: "172699116810",
  appId: "1:172699116810:web:be77c0340e325106b886f3",
};

export const app = initializeApp(firebaseConfig);
