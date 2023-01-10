importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
 apiKey: "AIzaSyBaUaNJe050MkvaSfL2LOw24AnXKN2Sl60",
 authDomain: "esmp-4b85e.firebaseapp.com",
 //databaseURL: "config data from general tab",
 projectId: "esmp-4b85e",
 storageBucket: "esmp-4b85e.appspot.com",
 messagingSenderId: "688134919204",
 appId: "1:688134919204:web:8d4fd7ee3736a5d73974b1",
 measurementId: "G-PKZSYV6D3P"
});
const messaging = firebase.messaging();