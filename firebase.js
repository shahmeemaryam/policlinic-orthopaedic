// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

window.sendOTP = function(phoneNumber) {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible'
  }, auth);

  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent!");
    }).catch(error => {
      console.error(error);
      alert("Error sending OTP");
    });
}

window.verifyOTP = function(otp, patientData) {
  window.confirmationResult.confirm(otp)
    .then(result => {
      // Save booking in Firebase DB
      const bookingsRef = ref(db, 'bookings');
      push(bookingsRef, patientData);
      alert("Booking confirmed!");
    }).catch(error => {
      console.error(error);
      alert("Incorrect OTP");
    });
}
