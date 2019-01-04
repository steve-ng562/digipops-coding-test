import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCorVqLiH-oPldWqkqJkp-aELjKDcAUZFQ",
    authDomain: "digipopscodetest.firebaseapp.com",
    databaseURL: "https://digipopscodetest.firebaseio.com",
    projectId: "digipopscodetest",
    storageBucket: "digipopscodetest.appspot.com",
    messagingSenderId: "817896085352",
    timestampsInSnapshots: true
  };

firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
