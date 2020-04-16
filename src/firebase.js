import {
    initializeApp
} from 'firebase'

const fire = initializeApp({
    apiKey: "AIzaSyCOC8roJrsNvrCeZPf7IRGIwza0Zni6m_I",
    authDomain: "weather-106c2.firebaseapp.com",
    databaseURL: "https://weather-106c2.firebaseio.com",
    projectId: "weather-106c2",
    storageBucket: "weather-106c2.appspot.com",
    messagingSenderId: "708196993827",
    appId: "1:708196993827:web:3791d55dc78022b2e5da96",
    measurementId: "G-V6RCL99N5C"
})

export const db = fire.database();

export const distRef = db.ref('distritos') 
export const prevRef = db.ref('previsao')