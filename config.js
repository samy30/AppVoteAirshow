import Firebase from 'firebase';  
let config = {  
    apiKey: "AIzaSyAu4lGUge7LBJrdAqVrM8ndBtxR696ZYv0",
    authDomain: "aeroday2019.firebaseapp.com",
    databaseURL: "https://aeroday2019.firebaseio.com",
    projectId: "aeroday2019",
    storageBucket: "aeroday2019.appspot.com",
    messagingSenderId: "896065711555"
};
let app = Firebase.initializeApp(config);  
export const db = app.database();