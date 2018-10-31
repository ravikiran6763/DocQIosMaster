/*globals angular */

'use strict';

/**
 * Contains the Constants, which are available across the app.
 * @author Ravikiran
 */
DoctorQuickApp.constant('BASE_URL', {

        //testing
        // 'url' : 'http://ec2-13-126-101-210.ap-south-1.compute.amazonaws.com/'
        //Staging doctorquickservices
        // 'url' : 'http://ec2-35-154-118-177.ap-south-1.compute.amazonaws.com/'
        //Development services.doctorquick
        //stage 1
        // 'url' : 'http://ec2-35-154-234-29.ap-south-1.compute.amazonaws.com/'
        //stage 2
          'url' : 'http://doctorquickelb-549049736.ap-south-1.elb.amazonaws.com/'

    })
.constant('API', {
          /*COMMON APIS*/

        // 'patientRegistration':'DQ/patientegistration.php',

        // 'login': 'common/test.php',
        'login': 'common/dqLogin.php',
        'logout': 'common/logout.php',
        'ForgotPassword': 'common/forgotPassword.php',
        'payuFailure': 'common/payuFailure.php',
        'payuSucces': 'common/payuSucces.php',
        'languages': 'common/languages.php',
        'updatePlayer': 'common/updatePlayer.php',
        'alreadyLoggedIn': 'common/alreadyLoggedIn.php',
        'pingToServer': 'common/ping.php',


        /*PATIENT APIS*/
        'patientRegistration' :'patient/patientRegistration.php',
        'patientDetails'      :'patient/patientDetails.php',
        'fetchMyDoctors'      :'patient/fetchMyDoctors.php',
        'myConsultations'     :'patient/myConsultations.php',
        'myWalletBalance'     :'patient/myWalletBalance.php',
        'paidForConsultations':'patient/paidForConsultations.php',
        'patientQuery'        :'patient/patientQuery.php',
        'paientCallBack'      :'patient/paientCallBack.php',
        'getMedicalSpecialist' : 'patient/listallspecialities.php',
        'fetchSpecificSpeciality' : 'patient/fetchSpecificSpeciality.php',
        'fetchSpecificDoctor'     :'patient/fetchSpecificDoctor.php',
        'specificSearch'     :'patient/specificSearch.php',
        'doctorbydifferentscenario' : 'patient/doctorlist.php',
        'sendrequesttodoctor' : 'patient/sendrequesttodoctor.php',
        'requestForCall' : 'patient/requestForCall.php',
        'cancelOne2oneReq' : 'patient/cancelOne2oneReq.php',
        'sendOfflineMessage' : 'patient/sendOfflineMessage.php',
        'sendNotification' : 'patient/sendNotification.php',
        'getMyDoctorRatings':'patient/getMyDoctorRatings.php',
        'getDocRatingsByAll' : 'patient/getDocRatingsByAll.php',
        'docSummary' : 'patient/docSummary.php',
        'topMeup' : 'patient/topMeUp.php',
        'refundRequest' : 'patient/refundRequest.php',

        'callAccepted' : 'patient/callAccepted.php',
        'callDecline' : 'patient/callDecline.php',
        'cancelCallReq' : 'patient/cancelCallReq.php',
        'popupSeen' : 'patient/popupSeen.php',
        'uploadImage' : 'patient/uploadImage.php',
        'changePatientPwd':'patient/changePatientPwd.php',
        'callaccepteddoctor':'patient/insertintomyconsultations.php',
        'existingPatient' : 'patient/existingPatient.php',
        'sendotp' : 'patient/sendotp.php',
        'savePatient':'patient/savePatient.php',
        'editNewPatient':'patient/editNewPatient.php',
        'rateMyDoctor':'patient/rateMyDoctortodoctordetails.php',
        'addToFavorite':'patient/addToFavorite.php',
        'checkForAccptedReq':'patient/checkForAccptedReq.php',
        'updateseenView':'patient/updateseenView.php',
        'declinedDuringCall':'patient/declinedDuringCall.php',
        'fetchPatientImage':'patient/fetchPatientImage.php',
        'checkCallStatus':'patient/checkCallStatus.php',
        'declineOne2oneReqPatient':'patient/declineOne2oneReqPatient.php',
        'getSubPatients':'patient/getSubPatients.php',
        'selectSubPatient':'patient/selectSubPatient.php',
        'deletePatient':'patient/deletePatient.php',
        'claimFreeConsultation':'patient/claimFreeConsultation.php',
        'checkEmailVerification':'patient/checkEmailVerification.php',
        'sendVerificationMail':'patient/sendVerificationMail.php',
        'updateEmail':'patient/updateEmail.php',
        'firstConsultation':'patient/firstConsultation.php',


        'verifyemail':'verifyemail/verifyemail.php',
        'checkDocStatusOnTheGo':'patient/checkDocStatusOnTheGo.php',
        'removeFavDoctor':'patient/removeFavDoctor.php',
        'noResponseFromDoc':'patient/noResponseFromDoc.php',
        'one2oneNoResponse':'patient/one2oneNoResponse.php',
        'getMinBalance':'patient/getMinBalance.php',
        'getdiffbalnce':'patient/getdiffbalnce.php',

        /*AGENT*/
        'agentDetails':'dqagent/dqAgentLogin.php',


        /*DOCTOR APIS*/
        'doctorRegistration'  :'doctor/doctorRegistration.php',
        'doctorDetails':'doctor/doctorDetails.php',
        'myConsultedPatients':'doctor/myConsultedPatients.php',
        'resendOtp':'DQ/resendOtp.php',
        'changePassword': 'changePassword',
        'invitereviews' : 'doctor/invitereview.php',
        'getdoctorrequest' : 'doctor/getdoctorrequestfrompatient.php',
        'consultationRequest' : 'doctor/consultationRequest.php',
        'currentPatient' : 'doctor/currentPatient.php',

        'fetchOne2OneReq' : 'doctor/fetchOne2OneReq.php',
        'requestacceptedbydoctor':  'doctor/acceptedpatientreqbydoctor.php',
        'declinedbydoctor':'doctor/declinedbydoctor.php',
        'acceptedbydoctor':'doctor/acceptedbydoctor.php',
        'cancelByDoc':'doctor/cancelByDoc.php',
        'patientActivity':'doctor/patientActivity.php',
        'checkIdStatus':'doctor/checkIdStatus.php',
        'videoOrAudio':'doctor/videoOrAudio.php',
        'doctorActivity':'doctor/doctorActivity.php',
        'updateNotes':'doctor/updateNotes.php',
        'docAccountsBalance' : 'doctor/docAccountsBalance.php',
        'docAccDetails' : 'doctor/docAccDetails.php',
        'reqPatientDetails' : 'doctor/reqPatientDetails.php',
        'updateDocPassword':'doctor/updateDocPassword.php',
        'createChatHistory':'doctor/createChatHistory.php',
        'createChatHistoryIos':'doctor/createChatHistoryios.php',
        'createChatHistoryIosforDoctor':'doctor/createChatHistoryIosforDoctor.php',
        'createChatHistoryforDoctor':'doctor/createChatHistoryforDoctor.php',
        'fetchChatHistory':'doctor/fetchChatHistory.php',
        'callStatus':'doctor/callStatus.php',
        'pushReqStatus':'doctor/pushReqStatus.php',
        'doctorQuery'  :'doctor/doctorQuery.php',
        'testjpegimage' :'prescription/responseasimages.php',
        'fetchAllDoctors':'DQ/fetchDoctors.php',
        'sidemenulist':'DQ/sidemenulist.php',
        'patientTrasactionHistory':'DQ/patientWallet/patientTrasactionHistory.php',

        /*  DOCTOR ON OFF API */
        'doctoronoffconditions':'doctor/doctoronoffline.php',
        'doctorStatus':'doctor/doctorStatus.php',

        'notifyPatient':'doctor/notifyPatient.php',
        'generateTinyUrl':'doctor/generateTinyUrl.php',
        'doctorEmailVerification':'doctor/doctorEmailVerification.php',
        'updateDoctorEmail':'doctor/updateDoctorEmail.php',
        'sendVerificationMailToDoc':'doctor/sendVerificationMailToDoc.php',
        'doctorDeviceUpdate':'doctor/doctorDeviceUpdate.php',
        'invitereviewforall':'doctor/invitereviewforall.php',
        'getonlysinglecontact':'doctor/getonlysinglecontact.php',
        'getonlysinglecontactforios':'doctor/getonlysinglecontactforios.php',
        'noResponseFromPatient':'doctor/noResponseFromPatient.php',




    })
.constant('AUTH_EVENTS', {
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
      })

.constant('USER_ROLES', {
      admin: 'admin_role',
      public: 'public_role'
      });
