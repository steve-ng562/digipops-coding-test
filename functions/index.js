const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.incrementFilmsCount = functions.firestore.document('films/{film}').onCreate((event) => {

	var totalRef = admin.firestore().collection('total').doc('total');


	return admin.firestore()
			.collection('total')
			.doc('total')
			.get()
			.then(doc => {
				console.log
				return totalRef.set({
					total: doc.data().total + 1
				});
			});
});

exports.decrementFilmsCount = functions.firestore.document('films/{film}').onDelete((event) => {

	var totalRef = admin.firestore().collection('total').doc('total');


	return admin.firestore()
			.collection('total')
			.doc('total')
			.get()
			.then(doc => {
				console.log
				return totalRef.set({
					total: doc.data().total - 1
				});
			});
});
