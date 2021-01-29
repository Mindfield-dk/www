const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addUserRole = functions.region('europe-west').auth.user().onCreate(async (authUser) => {
    if (authUser.email) {
        try {
            const customClaims = { customer: true, };
            var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)
            admin.firestore().collection("roles").doc(authUser.uid).set({ email: authUser.email, role: customClaims }).then(() => {
                functions.logger.info("User role added");
            })
        } catch (error) {
            functions.logger.warn(error)
            functions.logger.warn('Adding user role failed')
        }
    }
});

exports.updateRole = functions.region('europe-west').https.onRequest((request, response) => {
    let dummyDoc = 'dummy2'
    let dummyEmail = "dummy@dummy.com"
    let dummyRole = { customer: false, }
    try {
        admin.firestore().collection("roles").doc(dummyDoc).set({ email: dummyEmail, role: dummyRole }).then(() => {
            functions.logger.info("Updated role");
            response.send("Updated role");
        })
    } catch (error) {
        functions.logger.warn('Update role failed')
        response.send("Update role failed");
    }
});

exports.deleteRole = functions.region('europe-west').https.onRequest((request, response) => {
    let dummyDoc = 'dummy2'
    try {
        admin.firestore().collection("roles").doc(dummyDoc).delete().then(() => {
            functions.logger.info("Delete role");
            response.send("Deleted role");
        })
    } catch (error) {
        functions.logger.warn('Delete role failed')
        response.send("Deleted role failed");
    }
});

