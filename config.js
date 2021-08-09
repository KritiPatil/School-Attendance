import firebase from 'firebase';
 
 var firebaseConfig = {
    apiKey: "AIzaSyCz2ShvhaMFxVJ8wSApGx3gA0rJtqFVckM",
    authDomain: "school-attendance-93ba9.firebaseapp.com",
    databaseURL: "https://school-attendance-93ba9-default-rtdb.firebaseio.com",
    projectId: "school-attendance-93ba9",
    storageBucket: "school-attendance-93ba9.appspot.com",
    messagingSenderId: "152266078480",
    appId: "1:152266078480:web:d768acfe7452cdd1080d95"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase.database();