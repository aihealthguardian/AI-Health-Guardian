let isVoiceInput = false;  
 
let toastTimer = null;
// ── TRANSLATIONS ──
const homeTranslations = {
  en: {
    healthGuardianTitle: "Health Guardian",
    greetingPrefix: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    goodNight: "Good Night",
    healthScoreLabel: "Health Score",
    goodLabel: "Good",
    nextMedicineLabel: "Next Medicine",
    paracetamolLabel: "Paracetamol",
    todaysMedicinesLabel: "Appointment",
    takenLabel: "/ 5 taken",
    healthMonitoringTitle: "Health Monitoring",
    bpLabel: "Blood Pressure",
    bloodSugarLabel: "Blood Sugar",
    weightLabel: "Weight",
    bloodGroupLabel: "Blood Group",
    updateHealthDataLabel: "Update Health Data",
    bpFieldLabel: "BP (mmHg)",
    sugarFieldLabel: "Blood Sugar (mg/dL)",
    weightFieldLabel: "Weight (kg)",
    bgFieldLabel: "Blood Group",
    selectOption: "Select",
    saveHealthBtn: "Save Health Data",
    uploadReportText: "Upload Report (Camera / Gallery)",
    medicineAppointmentTitle: "Medicine & Appointment",
    nextMedicineName: "Next Medicine",
    medTimeText: "2:00 PM · After Food",
    takenBtnText: "Taken",
    missedBtnText: "Missed",
    nextAppointmentLabel: "Next Appointment: 7:00 PM",
    drLabel: "— Dr. Rajesh Patil",
    addMedText: "Add New Medicine (Camera / Gallery)",
    viewAllMedicines: "View All Medicines →",
    healthTrackerTitle: "Health Tracker — Monthly Graph",
    bpTab: "BP",
    sugarTab: "Sugar",
    weightTab: "Weight",
    dietAssistantTitle: "Diet Assistant",
    breakfastLabel: "Breakfast",
    breakfastText: "— Pohe + Tea",
    lunchLabel: "Lunch",
    lunchText: "— Dal Rice + Salad",
    dinnerLabel: "Dinner",
    dinnerText: "— Khichdi + Dahi",
    askDietAIText: "Ask Diet AI",
    healthGuardianAITitle: "Health Guardian AI",
    aiDescText: "Ask anything about your health, medicines, symptoms or reports. Available 24/7.",
    startChatText: "Start Chat with AI",
    voiceText: "Click to talk with AI using your voice — hands-free!",
    voiceBtn: "🎙 Voice",
    todayScheduleTitle: "Today's Schedule",
    scheduleMed1: "Medicine — Metformin",
    scheduleMed2: "Medicine — Paracetamol",
    scheduleWater: "💧 Water Reminder",
    scheduleAppointment: "Doctor Appointment",
    scheduleMed3: "Medicine — Aspirin",
    emergencyTitle: "Emergency",
    emergencyDesc: "Need urgent help? Tap below to alert your emergency contacts and family instantly.",
    emergencyBtn: "⚠ Send Emergency Alert",
    emergencyContactText: "Emergency Contact",
    familyContactText: "Family Contact",
    uploadReportModalTitle: "Upload Report",
    cameraText: "Camera",
    galleryText: "Gallery",
    addMedModalTitle: "Add New Medicine",
    scanUploadText: "Scan or upload your medicine prescription",
    medCameraText: "Camera",
    medGalleryText: "Gallery",
    todaysMedicinesModalTitle: "Today's Medicines",
    takenStatus: "✓ Taken",
    upcomingStatus: "⏰ Upcoming",
    chatModalTitle: "🛡️ Health Guardian AI",
    savedHistoryBtn: "Saved History",
    chatHistoryModalTitle: "Saved History",
    noChatHistoryMsg: "No saved history yet.",
    chatWelcomeMsg: "Hello! How can I help you today? 😊",
    chatSendBtn: "Send",
    chatVoiceBtn: "🎙",
    dietChatModalTitle: "🥗 Diet Assistant AI",
    dietChatWelcome: "Hi! I'm your Diet AI. Ask me anything about your diet, nutrition, meal plans or food habits! 🥦",
    dietSendBtn: "Send",
    dietVoiceBtn: "🎙",
    emergencyAlertSent: "Emergency Alert Sent!",
    emergencyPopupDesc: "Your emergency alert has been sent to your Emergency Contact and Family Contact. Help is on the way!",
    emergencyContactSent: "Emergency Contact",
    familyContactSent: "Family Contact",
    alertSentText: "Alert sent ✓",
    gotItBtn: "OK, Got it",
    privacyTitle: "🔒 Privacy & Security",
    termsTitle: "Terms & Conditions",
    termsText1: "By using HealthGuardian, you agree to the following terms. Please read them carefully.",
    privacyTitle2: "1. Data Privacy",
    privacyText1: "All health data you enter (blood pressure, sugar, weight, medications) is stored securely. We never share your personal health information with third parties without your explicit consent.",
    aiTitle: "2. AI-Generated Advice",
    aiText1: "The AI diet and health suggestions provided are for informational purposes only and do not replace professional medical advice. Always consult your doctor for medical decisions.",
    emergencyTitle2: "3. Emergency Alerts",
    emergencyText1: "Emergency alerts are sent to your pre-configured contacts. HealthGuardian is not a substitute for emergency services. In life-threatening situations, always call emergency services (112/108).",
    voiceTitle: "4. Voice Data",
    voiceText1: "Voice input is processed in real-time through your device's speech recognition. Audio data is not stored or transmitted to our servers.",
    accountTitle: "5. Account Security",
    accountText1: "You are responsible for maintaining the confidentiality of your account. Report any unauthorized access immediately.",
    updatesTitle: "6. Updates to Terms",
    updatesText1: "HealthGuardian reserves the right to update these terms. Continued use of the app constitutes acceptance of the revised terms.",
    understandBtn: "I Understand & Accept",
    notifTitle: "Notifications",
    notif1: "🔔 Time to take your Paracetamol at 2:00 PM",
    notif2: "📋 Your last uploaded report has been analysed",
    notif3: "📅 Appointment with Dr. Rajesh Patil at 7:00 PM",
    editProfile: "Edit Profile",
    languageChange: "Language Change",
    privacySecurity: "Privacy & Security",
    logOut: "Log Out",
    logOutSuccess: "Logged out successfully.",
    chatPlaceholder: "Type your question…",
    dietPlaceholder: "Ask about diet, nutrition…",
    langModalTitle: "🌐 Select Language",
    langSelectHint: "Select a language to change the interface",
    toastHealthUpdated: "✅ Health data updated!",
    toastTaken: "Thank you! 💊 Medicine marked as taken.",
    toastMissed: "⚠️ Medicine missed! Alarm will ring as reminder.",
    toastSwitchAccount: "Switch account feature coming soon!",
    toastReportUploaded: "Report uploaded! AI is analysing…",
    toastMedicineAdded: "Medicine added from prescription!",
    toastVoiceNotSupported: "Voice not supported in this browser.",
    toastCouldNotHear: "Could not hear you. Try again.",
    toastLoggedOut: "Logged out successfully.",
    toastLanguageChanged: "✅ Language changed to ",
    toastReportAnalysed: "📋 Report analysed by AI: ",
    profileUsernameFieldLabel: "Username",
    profileAgeFieldLabel: "Age",
    profileGenderFieldLabel: "Gender",
    profileDobFieldLabel: "Date of Birth",
    profileContactFieldLabel: "Family Contact No.",
    addMedFormTitle: "Add Medicine",
    medNameFieldLabel: "Medicine Name",
    medNamePlaceholder: "e.g. Metformin",
    medTimeFieldLabel: "Reminder Time",
    medDaysFieldLabel: "Duration (days)",
    saveMedEntryText: "Add Medicine & Set Reminder",
    testReminderText: "🔔 Test reminder sound",
    noMedicinesAdded: "No medicines added yet.",
    ambulanceLabel: "Ambulance",
    fireBrigadeLabel: "Fire Brigade",
    doctorLabel: "Doctor",
    contactLabel: "Contact",
    scheduleMedTileText: "Medicine",
    scheduleApptTileText: "Appointment",
    todaysApptModalTitle: "Today's Appointments",
    addApptFormTitle: "Add Appointment",
    apptDoctorLabel: "Doctor Name",
    apptHospitalLabel: "Hospital / Clinic Name",
    apptDoctorPlaceholder: "e.g. Dr. Sharma",
    apptDateLabel: "Date",
    apptTimeLabel: "Time",
    saveApptEntryText: "Add Appointment & Set Reminders",
    noAppointmentsAdded: "No appointments added yet.",
    reminderBeforeLabel: "Remind me before (days)",
    reminderOnDayLabel: "Remind me on appointment day (minutes before)",
    day: "Day",
    days: "Days",
    min: "min",
    hour: "hour",
    hours: "hours",
    toastMedicineSaved: "💊 Medicine prescription saved to database!",
    noRemindersSelected: "⚠️ Please select at least one reminder time.",
  },
  mr: {
    healthGuardianTitle: "हेल्थ गार्डियन",
    greetingPrefix: "शुभ सकाळ",
    goodAfternoon: "शुभ दुपार",
    goodEvening: "शुभ संध्याकाल",
    goodNight: "शुभ रात्री ",
    healthScoreLabel: "आरोग्य स्कोअर",
    goodLabel: "चांगले",
    nextMedicineLabel: "पुढील औषध",
    paracetamolLabel: "पॅरासिटामॉल",
    todaysMedicinesLabel: "अपॉइंटमेंट",
    takenLabel: "/ ५ घेतली",
    healthMonitoringTitle: "आरोग्य निरीक्षण",
    bpLabel: "रक्तदाब",
    bloodSugarLabel: "रक्तातील साखर",
    weightLabel: "वजन",
    bloodGroupLabel: "रक्तगट",
    updateHealthDataLabel: "आरोग्य माहिती अद्यतनित करा",
    bpFieldLabel: "रक्तदाब (mmHg)",
    sugarFieldLabel: "रक्तातील साखर (mg/dL)",
    weightFieldLabel: "वजन (kg)",
    bgFieldLabel: "रक्तगट",
    selectOption: "निवडा",
    saveHealthBtn: "आरोग्य माहिती जतन करा",
    uploadReportText: "रिपोर्ट अपलोड करा (कॅमेरा / गॅलरी)",
    medicineAppointmentTitle: "औषध आणि भेटी",
    nextMedicineName: "पुढील औषध",
    medTimeText: "२:०० PM · जेवणानंतर",
    takenBtnText: "घेतले",
    missedBtnText: "चुकले",
    nextAppointmentLabel: "पुढील भेट: ७:०० PM",
    drLabel: "— डॉ. राजेश पाटील",
    addMedText: "नवीन औषध घाला (कॅमेरा / गॅलरी)",
    viewAllMedicines: "सर्व औषधे पहा →",
    healthTrackerTitle: "आरोग्य ट्रॅकर — मासिक आलेख",
    bpTab: "रक्तदाब",
    sugarTab: "साखर",
    weightTab: "वजन",
    dietAssistantTitle: "आहार सहाय्यक",
    breakfastLabel: "नाश्ता",
    breakfastText: "— पोहे + चहा",
    lunchLabel: "दुपारचे जेवण",
    lunchText: "— डाळ भात + सॅलड",
    dinnerLabel: "रात्रीचे जेवण",
    dinnerText: "— खिचडी + दही",
    askDietAIText: "आहार AI ला विचारा",
    healthGuardianAITitle: "हेल्थ गार्डियन AI",
    aiDescText: "तुमच्या आरोग्य, औषधे, लक्षणे किंवा रिपोर्ट्सबद्दल काहीही विचारा. २४/७ उपलब्ध.",
    startChatText: "AI सोबत चॅट सुरू करा",
    voiceText: "तुमच्या आवाजाने AI शी बोला — हँड्स-फ्री!",
    voiceBtn: "🎙 आवाज",
    todayScheduleTitle: "आजचे वेळापत्रक",
    scheduleMed1: "औषध — मेटफॉर्मिन",
    scheduleMed2: "औषध — पॅरासिटामॉल",
    scheduleWater: "💧 पाणी स्मरणपत्र",
    scheduleAppointment: "डॉक्टर भेट",
    scheduleMed3: "औषध — ऍस्पिरिन",
    emergencyTitle: "आणीबाणी",
    emergencyDesc: "तातडीची मदत हवी आहे? खाली टॅप करा आणि त्वरित तुमच्या आपत्कालीन संपर्कांना सूचित करा.",
    emergencyBtn: "⚠ आपत्कालीन सूचना पाठवा",
    emergencyContactText: "आपत्कालीन संपर्क",
    familyContactText: "कुटुंब संपर्क",
    uploadReportModalTitle: "रिपोर्ट अपलोड करा",
    cameraText: "कॅमेरा",
    galleryText: "गॅलरी",
    addMedModalTitle: "नवीन औषध घाला",
    scanUploadText: "तुमची औषध प्रिस्क्रिप्शन स्कॅन किंवा अपलोड करा",
    medCameraText: "कॅमेरा",
    medGalleryText: "गॅलरी",
    todaysMedicinesModalTitle: "आजची औषधे",
    takenStatus: "✓ घेतले",
    upcomingStatus: "⏰ येणारे",
    chatModalTitle: "🛡️ हेल्थ गार्डियन AI",
    savedHistoryBtn: "जतन केलेला इतिहास",
    chatHistoryModalTitle: "जतन केलेला इतिहास",
    noChatHistoryMsg: "अजून कोणताही इतिहास जतन केलेला नाही.",
    chatWelcomeMsg: "नमस्कार! मी तुम्हाला आज कशी मदत करू शकते? 😊",
    chatSendBtn: "पाठवा",
    chatVoiceBtn: "🎙",
    dietChatModalTitle: "🥗 आहार सहाय्यक AI",
    dietChatWelcome: "नमस्कार! मी तुमचा आहार AI आहे. तुमच्या आहार, पोषण, जेवण योजना किंवा खाण्याच्या सवयींबद्दल काहीही विचारा! 🥦",
    dietSendBtn: "पाठवा",
    dietVoiceBtn: "🎙",
    emergencyAlertSent: "आपत्कालीन सूचना पाठवली!",
    emergencyPopupDesc: "तुमची आपत्कालीन सूचना तुमच्या आपत्कालीन संपर्क आणि कुटुंब संपर्कांना पाठवली गेली आहे. मदत येत आहे!",
    emergencyContactSent: "आपत्कालीन संपर्क",
    familyContactSent: "कुटुंब संपर्क",
    alertSentText: "सूचना पाठवली ✓",
    gotItBtn: "ठीक आहे",
    privacyTitle: "🔒 गोपनीयता आणि सुरक्षा",
    termsTitle: "अटी आणि शर्ती",
    termsText1: "हेल्थगार्डियन वापरून, तुम्ही खालील अटींना सहमती देता. कृपया त्या काळजीपूर्वक वाचा.",
    privacyTitle2: "१. डेटा गोपनीयता",
    privacyText1: "तुम्ही प्रविष्ट केलेला सर्व आरोग्य डेटा (रक्तदाब, साखर, वजन, औषधे) सुरक्षितपणे संग्रहित केला जातो. तुमची स्पष्ट संमतीशिवाय आम्ही तुमची वैयक्तिक आरोग्य माहिती तृतीय पक्षांशी कधीही शेअर करत नाही.",
    aiTitle: "२. AI-जनरेटेड सल्ला",
    aiText1: "दिलेले AI आहार आणि आरोग्य सूचना केवळ माहितीपूर्ण हेतूंसाठी आहेत आणि व्यावसायिक वैद्यकीय सल्ल्याची जागा घेत नाहीत. वैद्यकीय निर्णयांसाठी नेहमी तुमच्या डॉक्टरांचा सल्ला घ्या.",
    emergencyTitle2: "३. आपत्कालीन सूचना",
    emergencyText1: "आपत्कालीन सूचना तुमच्या पूर्व-कॉन्फिगर केलेल्या संपर्कांना पाठवल्या जातात. हेल्थगार्डियन आपत्कालीन सेवांचा पर्याय नाही. जीवघेण्या परिस्थितीत, नेहमी आपत्कालीन सेवांना (११२/१०८) कॉल करा.",
    voiceTitle: "४. आवाज डेटा",
    voiceText1: "आवाज इनपुट तुमच्या डिव्हाइसच्या स्पीच रिकग्निशनद्वारे रिअल-टाइममध्ये प्रक्रिया केला जातो. ऑडियो डेटा आमच्या सर्व्हरवर संग्रहित किंवा प्रसारित केला जात नाही.",
    accountTitle: "५. खाते सुरक्षा",
    accountText1: "तुमच्या खात्याची गोपनीयता राखण्यासाठी तुम्ही जबाबदार आहात. कोणत्याही अनधिकृत प्रवेशाची त्वरित तक्रार करा.",
    updatesTitle: "६. अटींमध्ये अद्यतने",
    updatesText1: "हेल्थगार्डियन या अटी अद्यतनित करण्याचा अधिकार राखून ठेवते. अॅपचा सतत वापर म्हणजे सुधारित अटींची स्वीकृती.",
    understandBtn: "मला समजले आणि मान्य आहे",
    notifTitle: "सूचना",
    notif1: "🔔 २:०० PM ला पॅरासिटामॉल घेण्याची वेळ",
    notif2: "📋 तुमचा शेवटचा अपलोड केलेला रिपोर्ट विश्लेषित केला गेला",
    notif3: "📅 ७:०० PM ला डॉ. राजेश पाटील यांची भेट",
    editProfile: "प्रोफाईल संपादित करा",
    languageChange: "भाषा बदला",
    privacySecurity: "गोपनीयता आणि सुरक्षा",
    logOut: "बाहेर पडा",
    logOutSuccess: "बाहेर पडलात.",
    chatPlaceholder: "तुमचा प्रश्न टाइप करा…",
    dietPlaceholder: "आहार, पोषण बद्दल विचारा…",
    langModalTitle: "🌐 भाषा निवडा",
    langSelectHint: "इंटरफेस बदलण्यासाठी भाषा निवडा",
    toastHealthUpdated: "✅ आरोग्य माहिती अद्यतनित!",
    toastTaken: "धन्यवाद! 💊 औषध घेतले म्हणून चिन्हांकित केले.",
    toastMissed: "⚠️ औषध चुकले! अलार्म वाजेल.",
    toastSwitchAccount: "खाते बदलण्याची सुविधा लवकरच येत आहे!",
    toastReportUploaded: "रिपोर्ट अपलोड केला! AI विश्लेषण करत आहे…",
    toastMedicineAdded: "प्रिस्क्रिप्शनमधून औषध जोडले!",
    toastVoiceNotSupported: "या ब्राउझरमध्ये आवाज समर्थित नाही.",
    toastCouldNotHear: "तुमचा आवाज ऐकू आला नाही. पुन्हा प्रयत्न करा.",
    toastLoggedOut: "बाहेर पडलात.",
    toastLanguageChanged: "✅ भाषा बदलली ",
    toastReportAnalysed: "📋 AI ने रिपोर्टचे विश्लेषण केले: ",
    profileUsernameFieldLabel: "युजरनेम",
    profileAgeFieldLabel: "वय",
    profileGenderFieldLabel: "लिंग",
    profileDobFieldLabel: "जन्मतारीख",
    profileContactFieldLabel: "फॅमिली कॉन्टॅक्ट नं.",
    addMedFormTitle: "औषध जोडा",
    medNameFieldLabel: "औषधाचे नाव",
    medNamePlaceholder: "उदा. मेटफॉर्मिन",
    medTimeFieldLabel: "रिमाइंडर वेळ",
    medDaysFieldLabel: "कालावधी (दिवस)",
    saveMedEntryText: "औषध जोडा आणि रिमाइंडर सेट करा",
    testReminderText: "🔔 रिमाइंडर आवाज तपासा",
    noMedicinesAdded: "अजून कोणतेही औषध जोडलेले नाही.",
    ambulanceLabel: "रुग्णवाहिका",
    fireBrigadeLabel: "अग्निशमन दल",
    doctorLabel: "डॉक्टर",
    contactLabel: "कॉन्टॅक्ट",
    scheduleMedTileText: "औषध",
    scheduleApptTileText: "अपॉइंटमेंट",
    todaysApptModalTitle: "आजच्या अपॉइंटमेंट्स",
    addApptFormTitle: "अपॉइंटमेंट जोडा",
    apptDoctorLabel: "डॉक्टर नाव",
    apptHospitalLabel: "हॉस्पिटल / क्लिनिकचे नाव",
    apptDoctorPlaceholder: "उदा. डॉ. शर्मा",
    apptDateLabel: "तारीख",
    apptTimeLabel: "वेळ",
    saveApptEntryText: "अपॉइंटमेंट जोडा आणि रिमाइंडर सेट करा",
    noAppointmentsAdded: "अजून कोणतीही अपॉइंटमेंट जोडलेली नाही.",
    reminderBeforeLabel: "आधी स्मरणपत्रे (दिवस)",
    reminderOnDayLabel: "अपॉइंटमेंटच्या दिवशी स्मरणपत्रे (मिनिटे)",
    day: "दिवस",
    days: "दिवस",
    min: "मिनिट",
    hour: "तास",
    hours: "तास",
    toastMedicineSaved: "💊 औषध प्रिस्क्रिप्शन डेटाबेसमध्ये सेव्ह केले!",
    noRemindersSelected: "⚠️ कृपया किमान एक स्मरणपत्र वेळ निवडा.",
  },
  hi: {
    healthGuardianTitle: "हेल्थ गार्डियन",
    greetingPrefix: "शुभ प्रभात",
    goodAfternoon: "शुभ दोपहर",
    goodEvening: "शुभ संध्या",
    goodNight: "शुभ रात्रि",
    healthScoreLabel: "स्वास्थ्य स्कोर",
    goodLabel: "अच्छा",
    nextMedicineLabel: "अगली दवा",
    paracetamolLabel: "पैरासिटामोल",
    todaysMedicinesLabel: "अपॉइंटमेंट",
    takenLabel: "/ 5 ली गईं",
    healthMonitoringTitle: "स्वास्थ्य निगरानी",
    bpLabel: "रक्तचाप",
    bloodSugarLabel: "रक्त शर्करा",
    weightLabel: "वजन",
    bloodGroupLabel: "रक्त समूह",
    updateHealthDataLabel: "स्वास्थ्य डेटा अपडेट करें",
    bpFieldLabel: "बीपी (mmHg)",
    sugarFieldLabel: "रक्त शर्करा (mg/dL)",
    weightFieldLabel: "वजन (kg)",
    bgFieldLabel: "रक्त समूह",
    selectOption: "चुनें",
    saveHealthBtn: "स्वास्थ्य डेटा सहेजें",
    uploadReportText: "रिपोर्ट अपलोड करें (कैमरा / गैलरी)",
    medicineAppointmentTitle: "दवा और अपॉइंटमेंट",
    nextMedicineName: "अगली दवा",
    medTimeText: "२:०० PM · भोजन के बाद",
    takenBtnText: "ली गई",
    missedBtnText: "छूट गई",
    nextAppointmentLabel: "अगली अपॉइंटमेंट: ७:०० PM",
    drLabel: "— डॉ. राजेश पाटिल",
    addMedText: "नई दवा जोड़ें (कैमरा / गैलरी)",
    viewAllMedicines: "सभी दवाइयाँ देखें →",
    healthTrackerTitle: "स्वास्थ्य ट्रैकर — मासिक ग्राफ",
    bpTab: "बीपी",
    sugarTab: "शुगर",
    weightTab: "वजन",
    dietAssistantTitle: "आहार सहायक",
    breakfastLabel: "नाश्ता",
    breakfastText: "— पोहे + चाय",
    lunchLabel: "दोपहर का भोजन",
    lunchText: "— दाल चावल + सलाद",
    dinnerLabel: "रात का भोजन",
    dinnerText: "— खिचड़ी + दही",
    askDietAIText: "आहार AI से पूछें",
    healthGuardianAITitle: "हेल्थ गार्डियन AI",
    aiDescText: "अपने स्वास्थ्य, दवाइयों, लक्षणों या रिपोर्टों के बारे में कुछ भी पूछें। २४/७ उपलब्ध।",
    startChatText: "AI के साथ चैट शुरू करें",
    voiceText: "अपनी आवाज़ से AI से बात करें — हाथ-मुक्त!",
    voiceBtn: "🎙 आवाज़",
    todayScheduleTitle: "आज का शेड्यूल",
    scheduleMed1: "दवा — मेटफॉर्मिन",
    scheduleMed2: "दवा — पैरासिटामोल",
    scheduleWater: "💧 पानी रिमाइंडर",
    scheduleAppointment: "डॉक्टर अपॉइंटमेंट",
    scheduleMed3: "दवा — एस्पिरिन",
    emergencyTitle: "आपातकालीन",
    emergencyDesc: "तत्काल मदद चाहिए? नीचे टैप करें और तुरंत अपने आपातकालीन संपर्कों को सचेत करें।",
    emergencyBtn: "⚠ आपातकालीन अलर्ट भेजें",
    emergencyContactText: "आपातकालीन संपर्क",
    familyContactText: "परिवार संपर्क",
    uploadReportModalTitle: "रिपोर्ट अपलोड करें",
    cameraText: "कैमरा",
    galleryText: "गैलरी",
    addMedModalTitle: "नई दवा जोड़ें",
    scanUploadText: "अपनी दवा प्रिस्क्रिप्शन स्कैन या अपलोड करें",
    medCameraText: "कैमरा",
    medGalleryText: "गैलरी",
    todaysMedicinesModalTitle: "आज की दवाइयाँ",
    takenStatus: "✓ ली गई",
    upcomingStatus: "⏰ आगामी",
    chatModalTitle: "🛡️ हेल्थ गार्डियन AI",
    savedHistoryBtn: "सहेजा गया इतिहास",
    chatHistoryModalTitle: "सहेजा गया इतिहास",
    noChatHistoryMsg: "अभी तक कोई सहेजा गया इतिहास नहीं है।",
    chatWelcomeMsg: "नमस्ते! मैं आज आपकी कैसे मदद कर सकता हूँ? 😊",
    chatSendBtn: "भेजें",
    chatVoiceBtn: "🎙",
    dietChatModalTitle: "🥗 आहार सहायक AI",
    dietChatWelcome: "नमस्ते! मैं आपका आहार AI हूँ। मुझसे अपने आहार, पोषण, भोजन योजना या खाने की आदतों के बारे में कुछ भी पूछें! 🥦",
    dietSendBtn: "भेजें",
    dietVoiceBtn: "🎙",
    emergencyAlertSent: "आपातकालीन अलर्ट भेजा गया!",
    emergencyPopupDesc: "आपका आपातकालीन अलर्ट आपके आपातकालीन संपर्क और परिवार संपर्क को भेजा गया है। मदद आ रही है!",
    emergencyContactSent: "आपातकालीन संपर्क",
    familyContactSent: "परिवार संपर्क",
    alertSentText: "अलर्ट भेजा ✓",
    gotItBtn: "ठीक है",
    privacyTitle: "🔒 गोपनीयता और सुरक्षा",
    termsTitle: "नियम और शर्तें",
    termsText1: "हेल्थगार्डियन का उपयोग करके, आप निम्नलिखित नियमों से सहमत हैं। कृपया उन्हें ध्यान से पढ़ें।",
    privacyTitle2: "१. डेटा गोपनीयता",
    privacyText1: "आपके द्वारा दर्ज किया गया सभी स्वास्थ्य डेटा (रक्तचाप, शुगर, वजन, दवाइयाँ) सुरक्षित रूप से संग्रहीत किया जाता है। हम आपकी स्पष्ट सहमति के बिना आपकी व्यक्तिगत स्वास्थ्य जानकारी कभी भी तृतीय पक्षों के साथ साझा नहीं करते हैं।",
    aiTitle: "२. AI-जनरेटेड सलाह",
    aiText1: "दी गई AI आहार और स्वास्थ्य सुझाव केवल सूचनात्मक उद्देश्यों के लिए हैं और पेशेवर चिकित्सा सलाह का स्थान नहीं लेते हैं। चिकित्सा निर्णयों के लिए हमेशा अपने डॉक्टर से सलाह लें।",
    emergencyTitle2: "३. आपातकालीन अलर्ट",
    emergencyText1: "आपातकालीन अलर्ट आपके पूर्व-कॉन्फ़िगर किए गए संपर्कों को भेजे जाते हैं। हेल्थगार्डियन आपातकालीन सेवाओं का विकल्प नहीं है। जीवन-खतरे की स्थितियों में, हमेशा आपातकालीन सेवाओं (११२/१०८) को कॉल करें।",
    voiceTitle: "४. वॉइस डेटा",
    voiceText1: "वॉइस इनपुट आपके डिवाइस की स्पीच रिकग्निशन के माध्यम से रीयल-टाइम में संसाधित किया जाता है। ऑडियो डेटा हमारे सर्वर पर संग्रहीत या प्रसारित नहीं किया जाता है।",
    accountTitle: "५. खाता सुरक्षा",
    accountText1: "आप अपने खाते की गोपनीयता बनाए रखने के लिए जिम्मेदार हैं। किसी भी अनधिकृत पहुंच की तुरंत रिपोर्ट करें।",
    updatesTitle: "६. नियमों में अद्यतन",
    updatesText1: "हेल्थगार्डियन इन नियमों को अद्यतन करने का अधिकार सुरक्षित रखता है। ऐप का निरंतर उपयोग संशोधित नियमों की स्वीकृति का गठन करता है।",
    understandBtn: "मैं समझता हूँ और स्वीकार करता हूँ",
    notifTitle: "सूचनाएं",
    notif1: "🔔 २:०० PM पर पैरासिटामोल लेने का समय",
    notif2: "📋 आपकी अंतिम अपलोड की गई रिपोर्ट का विश्लेषण किया गया",
    notif3: "📅 ७:०० PM पर डॉ. राजेश पाटिल के साथ अपॉइंटमेंट",
    editProfile: "प्रोफ़ाइल संपादित करें",
    languageChange: "भाषा बदलें",
    privacySecurity: "गोपनीयता और सुरक्षा",
    logOut: "लॉग आउट",
    logOutSuccess: "लॉग आउट किया गया।",
    chatPlaceholder: "अपना प्रश्न टाइप करें…",
    dietPlaceholder: "आहार, पोषण के बारे में पूछें…",
    langModalTitle: "🌐 भाषा चुनें",
    langSelectHint: "इंटरफ़ेस बदलने के लिए भाषा चुनें",
    toastHealthUpdated: "✅ स्वास्थ्य डेटा अपडेट किया गया!",
    toastTaken: "धन्यवाद! 💊 दवा ली गई के रूप में चिह्नित।",
    toastMissed: "⚠️ दवा छूट गई! अलार्म बजेगा।",
    toastSwitchAccount: "खाता बदलने की सुविधा जल्द आ रही है!",
    toastReportUploaded: "रिपोर्ट अपलोड की गई! AI विश्लेषण कर रहा है…",
    toastMedicineAdded: "प्रिस्क्रिप्शन से दवा जोड़ी गई!",
    toastVoiceNotSupported: "इस ब्राउज़र में आवाज़ समर्थित नहीं है।",
    toastCouldNotHear: "आपकी आवाज़ नहीं सुनाई दी। पुनः प्रयास करें।",
    toastLoggedOut: "लॉग आउट किया गया।",
    toastLanguageChanged: "✅ भाषा बदली गई ",
    toastReportAnalysed: "📋 AI ने रिपोर्ट का विश्लेषण किया: ",
    profileUsernameFieldLabel: "यूज़रनेम",
    profileAgeFieldLabel: "उम्र",
    profileGenderFieldLabel: "लिंग",
    profileDobFieldLabel: "जन्म तिथि",
    profileContactFieldLabel: "फैमिली कॉन्टैक्ट नं.",
    addMedFormTitle: "दवा जोड़ें",
    medNameFieldLabel: "दवा का नाम",
    medNamePlaceholder: "उदा. मेटफॉर्मिन",
    medTimeFieldLabel: "रिमाइंडर समय",
    medDaysFieldLabel: "अवधि (दिन)",
    saveMedEntryText: "दवा जोड़ें और रिमाइंडर सेट करें",
    testReminderText: "🔔 रिमाइंडर आवाज़ जांचें",
    noMedicinesAdded: "अभी तक कोई दवा नहीं जोड़ी गई।",
    ambulanceLabel: "एम्बुलेंस",
    fireBrigadeLabel: "फायर ब्रिगेड",
    doctorLabel: "डॉक्टर",
    contactLabel: "कॉन्टैक्ट",
    scheduleMedTileText: "दवा",
    scheduleApptTileText: "अपॉइंटमेंट",
    todaysApptModalTitle: "आज की अपॉइंटमेंट्स",
    addApptFormTitle: "अपॉइंटमेंट जोड़ें",
    apptDoctorLabel: "डॉक्टर का नाम",
    apptHospitalLabel: "अस्पताल / क्लिनिक का नाम",
    apptDoctorPlaceholder: "जैसे. डॉ. शर्मा",
    apptDateLabel: "तारीख",
    apptTimeLabel: "समय",
    saveApptEntryText: "अपॉइंटमेंट जोड़ें और रिमाइंडर सेट करें",
    noAppointmentsAdded: "अभी तक कोई अपॉइंटमेंट नहीं जोड़ी गई।",
    reminderBeforeLabel: "पहले की याद दिलाना (दिन)",
    reminderOnDayLabel: "अपॉइंटमेंट के दिन याद दिलाना (मिनट)",
    day: "दिन",
    days: "दिन",
    min: "मिनट",
    hour: "घंटा",
    hours: "घंटे",
    toastMedicineSaved: "💊 दवा प्रिस्क्रिप्शन डेटाबेस में सेव की गई!",
    noRemindersSelected: "⚠️ कृपया कम से कम एक याद दिलाने का समय चुनें।",
  },
  gu: {
    healthGuardianTitle: "હેલ્થ ગાર્ડિયન",
    greetingPrefix: "શુભ સવાર",
    goodAfternoon: "શુભ બપોર",
    goodEvening: "શુભ સાંજ",
    goodNight: "શુભ રાત્રિ",
    healthScoreLabel: "આરોગ્ય સ્કોર",
    goodLabel: "સારું",
    nextMedicineLabel: "આગળની દવા",
    paracetamolLabel: "પેરાસિટામોલ",
    todaysMedicinesLabel: "એપોઇન્ટમેન્ટ",
    takenLabel: "/ ૫ લીધી",
    healthMonitoringTitle: "આરોગ્ય દેખરેખ",
    bpLabel: "રક્તદબાણ",
    bloodSugarLabel: "રક્ત શર્કરા",
    weightLabel: "વજન",
    bloodGroupLabel: "રક્ત જૂથ",
    updateHealthDataLabel: "આરોગ્ય ડેટા અપડેટ કરો",
    bpFieldLabel: "બીપી (mmHg)",
    sugarFieldLabel: "રક્ત શર્કરા (mg/dL)",
    weightFieldLabel: "વજન (kg)",
    bgFieldLabel: "રક્ત જૂથ",
    selectOption: "પસંદ કરો",
    saveHealthBtn: "આરોગ્ય ડેટા સાચવો",
    uploadReportText: "રિપોર્ટ અપલોડ કરો (કૅમેરા / ગૅલેરી)",
    medicineAppointmentTitle: "દવા અને એપોઇન્ટમેન્ટ",
    nextMedicineName: "આગળની દવા",
    medTimeText: "૨:૦૦ PM · ભોજન પછી",
    takenBtnText: "લીધી",
    missedBtnText: "ચૂકી",
    nextAppointmentLabel: "આગળની એપોઇન્ટમેન્ટ: ૭:૦૦ PM",
    drLabel: "— ડૉ. રાજેશ પાટિલ",
    addMedText: "નવી દવા ઉમેરો (કૅમેરા / ગૅલેરી)",
    viewAllMedicines: "બધી દવાઓ જુઓ →",
    healthTrackerTitle: "આરોગ્ય ટ્રૅકર — માસિક ગ્રાફ",
    bpTab: "બીપી",
    sugarTab: "શુગર",
    weightTab: "વજન",
    dietAssistantTitle: "આહાર સહાયક",
    breakfastLabel: "નાસ્તો",
    breakfastText: "— પોહા + ચા",
    lunchLabel: "બપોરનું ભોજન",
    lunchText: "— દાળ ભાત + સલાડ",
    dinnerLabel: "રાત્રિભોજન",
    dinnerText: "— ખિચડી + દહીં",
    askDietAIText: "આહાર AI ને પૂછો",
    healthGuardianAITitle: "હેલ્થ ગાર્ડિયન AI",
    aiDescText: "તમારા આરોગ્ય, દવાઓ, લક્ષણો અથવા રિપોર્ટ્સ વિશે કંઈપણ પૂછો. ૨૪/૭ ઉપલબ્ધ.",
    startChatText: "AI સાથે ચેટ શરૂ કરો",
    voiceText: "તમારા અવાજથી AI સાથે વાત કરો — હેન્ડ્સ-ફ્રી!",
    voiceBtn: "🎙 અવાજ",
    todayScheduleTitle: "આજનું શેડ્યૂલ",
    scheduleMed1: "દવા — મેટફોર્મિન",
    scheduleMed2: "દવા — પેરાસિટામોલ",
    scheduleWater: "💧 પાણી રિમાઇન્ડર",
    scheduleAppointment: "ડૉક્ટર એપોઇન્ટમેન્ટ",
    scheduleMed3: "દવા — એસ્પિરિન",
    emergencyTitle: "કટોકટી",
    emergencyDesc: "તાત્કાલિક મદદ જોઈએ? નીચે ટેપ કરો અને તરત જ તમારા કટોકટી સંપર્કોને સૂચિત કરો.",
    emergencyBtn: "⚠ કટોકટી એલર્ટ મોકલો",
    emergencyContactText: "કટોકટી સંપર્ક",
    familyContactText: "કુટુંબ સંપર્ક",
    uploadReportModalTitle: "રિપોર્ટ અપલોડ કરો",
    cameraText: "કૅમેરા",
    galleryText: "ગૅલેરી",
    addMedModalTitle: "નવી દવા ઉમેરો",
    scanUploadText: "તમારી દવા પ્રિસ્ક્રિપ્શન સ્કેન અથવા અપલોડ કરો",
    medCameraText: "કૅમેરા",
    medGalleryText: "ગૅલેરી",
    todaysMedicinesModalTitle: "આજની દવાઓ",
    takenStatus: "✓ લીધી",
    upcomingStatus: "⏰ આગામી",
    chatModalTitle: "🛡️ હેલ્થ ગાર્ડિયન AI",
    savedHistoryBtn: "સાચવેલો ઇતિહાસ",
    chatHistoryModalTitle: "સાચવેલો ઇતિહાસ",
    noChatHistoryMsg: "હજુ સુધી કોઈ સાચવેલો ઇતિહાસ નથી.",
    chatWelcomeMsg: "નમસ્તે! હું આજે તમારી કેવી રીતે મદદ કરી શકું? 😊",
    chatSendBtn: "મોકલો",
    chatVoiceBtn: "🎙",
    dietChatModalTitle: "🥗 આહાર સહાયક AI",
    dietChatWelcome: "નમસ્તે! હું તમારો આહાર AI છું. મને તમારા આહાર, પોષણ, ભોજન યોજના અથવા ખાવાની આદતો વિશે કંઈપણ પૂછો! 🥦",
    dietSendBtn: "મોકલો",
    dietVoiceBtn: "🎙",
    emergencyAlertSent: "કટોકટી એલર્ટ મોકલાઈ!",
    emergencyPopupDesc: "તમારી કટોકટી એલર્ટ તમારા કટોકટી સંપર્ક અને કુટુંબ સંપર્કને મોકલવામાં આવી છે. મદદ આવી રહી છે!",
    emergencyContactSent: "કટોકટી સંપર્ક",
    familyContactSent: "કુટુંબ સંપર્ક",
    alertSentText: "એલર્ટ મોકલાઈ ✓",
    gotItBtn: "ઠીક છે",
    privacyTitle: "🔒 ગોપનીયતા અને સુરક્ષા",
    termsTitle: "શરતો અને નિયમો",
    termsText1: "હેલ્થગાર્ડિયનનો ઉપયોગ કરીને, તમે નીચેની શરતો સ્વીકારો છો. કૃપા કરીને તેમને ધ્યાનથી વાંચો.",
    privacyTitle2: "૧. ડેટા ગોપનીયતા",
    privacyText1: "તમે દાખલ કરેલો તમામ આરોગ્ય ડેટા (રક્તદબાણ, શુગર, વજન, દવાઓ) સુરક્ષિત રીતે સંગ્રહિત થાય છે. અમે તમારી સ્પષ્ટ સંમતિ વિના ક્યારેય તમારી વ્યક્તિગત આરોગ્ય માહિતી તૃતીય પક્ષો સાથે શેર કરતા નથી.",
    aiTitle: "૨. AI-જનરેટેડ સલાહ",
    aiText1: "આપવામાં આવેલી AI આહાર અને આરોગ્ય સૂચનો માત્ર માહિતીપ્રદ હેતુઓ માટે છે અને વ્યાવસાયિક તબીબી સલાહનું સ્થાન લેતી નથી. તબીબી નિર્ણયો માટે હંમેશા તમારા ડૉક્ટરની સલાહ લો.",
    emergencyTitle2: "૩. કટોકટી એલર્ટ",
    emergencyText1: "કટોકટી એલર્ટ તમારા પૂર્વ-કોન્ફિગર કરેલા સંપર્કોને મોકલવામાં આવે છે. હેલ્થગાર્ડિયન કટોકટી સેવાઓનો વિકલ્પ નથી. જીવન-જોખમી પરિસ્થિતિઓમાં, હંમેશા કટોકટી સેવાઓ (૧૧૨/૧૦૮) ને કૉલ કરો.",
    voiceTitle: "૪. અવાજ ડેટા",
    voiceText1: "અવાજ ઇનપુટ તમારા ઉપકરણની સ્પીચ રિકગ્નિશન દ્વારા રીઅલ-ટાઇમમાં પ્રક્રિયા કરવામાં આવે છે. ઑડિયો ડેટા અમારા સર્વર પર સંગ્રહિત અથવા પ્રસારિત થતો નથી.",
    accountTitle: "૫. ખાતું સુરક્ષા",
    accountText1: "તમારા ખાતાની ગોપનીયતા જાળવવા માટે તમે જવાબદાર છો. કોઈપણ અનધિકૃત પ્રવેશની તાત્કાલિક જાણ કરો.",
    updatesTitle: "૬. શરતોમાં અપડેટ્સ",
    updatesText1: "હેલ્થગાર્ડિયન આ શરતોને અપડેટ કરવાનો અધિકાર અનામત રાખે છે. ઍપનો સતત ઉપયોગ સંશોધિત શરતોની સ્વીકૃતિ દર્શાવે છે.",
    understandBtn: "હું સમજું છું અને સ્વીકારું છું",
    notifTitle: "સૂચનાઓ",
    notif1: "🔔 ૨:૦૦ PM પર પેરાસિટામોલ લેવાનો સમય",
    notif2: "📋 તમારો છેલ્લો અપલોડ કરેલો રિપોર્ટ વિશ્લેષિત કરવામાં આવ્યો",
    notif3: "📅 ૭:૦૦ PM પર ડૉ. રાજેશ પાટિલ સાથે એપોઇન્ટમેન્ટ",
    editProfile: "પ્રોફાઇલ સંપાદિત કરો",
    languageChange: "ભાષા બદલો",
    privacySecurity: "ગોપનીયતા અને સુરક્ષા",
    logOut: "લૉગ આઉટ",
    logOutSuccess: "લૉગ આઉટ કર્યું.",
    chatPlaceholder: "તમારો પ્રશ્ન ટાઇપ કરો…",
    dietPlaceholder: "આહાર, પોષણ વિશે પૂછો…",
    langModalTitle: "🌐 ભાષા પસંદ કરો",
    langSelectHint: "ઇન્ટરફેસ બદલવા માટે ભાષા પસંદ કરો",
    toastHealthUpdated: "✅ આરોગ્ય ડેટા અપડેટ થયો!",
    toastTaken: "આભાર! 💊 દવા લીધી તરીકે ચિહ્નિત.",
    toastMissed: "⚠️ દવા ચૂકી! અલાર્મ વાગશે.",
    toastSwitchAccount: "ખાતું બદલવાની સુવિધા ટૂંક સમયમાં આવી રહી છે!",
    toastReportUploaded: "રિપોર્ટ અપલોડ થયો! AI વિશ્લેષણ કરી રહ્યું છે…",
    toastMedicineAdded: "પ્રિસ્ક્રિપ્શનમાંથી દવા ઉમેરાઈ!",
    toastVoiceNotSupported: "આ બ્રાઉઝરમાં અવાજ સમર્થિત નથી.",
    toastCouldNotHear: "તમારો અવાજ સંભળાયો નહીં. ફરી પ્રયાસ કરો.",
    toastLoggedOut: "લૉગ આઉટ કર્યું.",
    toastLanguageChanged: "✅ ભાષા બદલાઈ ",
    toastReportAnalysed: "📋 AI દ્વારા રિપોર્ટનું વિશ્લેષણ કરવામાં આવ્યું: ",
    profileUsernameFieldLabel: "યુઝરનેમ",
    profileAgeFieldLabel: "ઉંમર",
    profileGenderFieldLabel: "લિંગ",
    profileDobFieldLabel: "જન્મ તારીખ",
    profileContactFieldLabel: "ફેમિલી કોન્ટેક્ટ નં.",
    addMedFormTitle: "દવા ઉમેરો",
    medNameFieldLabel: "દવાનું નામ",
    medNamePlaceholder: "દા.ત. મેટફોર્મિન",
    medTimeFieldLabel: "રિમાઇન્ડર સમય",
    medDaysFieldLabel: "અવધિ (દિવસો)",
    saveMedEntryText: "દવા ઉમેરો અને રિમાઇન્ડર સેટ કરો",
    testReminderText: "🔔 રિમાઇન્ડર અવાજ ચકાસો",
    noMedicinesAdded: "હજુ સુધી કોઈ દવા ઉમેરાઈ નથી.",
    ambulanceLabel: "એમ્બ્યુલન્સ",
    fireBrigadeLabel: "ફાયર બ્રિગેડ",
    doctorLabel: "ડૉક્ટર",
    contactLabel: "કોન્ટેક્ટ",
    scheduleMedTileText: "દવા",
    scheduleApptTileText: "એપોઇન્ટમેન્ટ",
    todaysApptModalTitle: "આજની એપોઇન્ટમેન્ટ",
    addApptFormTitle: "એપોઇન્ટમેન્ટ ઉમેરો",
    apptDoctorLabel: "ડૉક્ટરનું નામ",
    apptHospitalLabel: "હોસ્પિટલ / ક્લિનિકનું નામ",
    apptDoctorPlaceholder: "દા.ત. ડૉ. શર્મા",
    apptDateLabel: "તારીખ",
    apptTimeLabel: "સમય",
    saveApptEntryText: "એપોઇન્ટમેન્ટ ઉમેરો અને રિમાઇન્ડર સેટ કરો",
    noAppointmentsAdded: "હજુ સુધી કોઈ એપોઇન્ટમેન્ટ ઉમેરાઈ નથી.",
    reminderBeforeLabel: "પહેલાંની યાદ અપાવવી (દિવસ)",
    reminderOnDayLabel: "એપોઇન્ટમેન્ટના દિવસે યાદ અપાવવી (મિનિટ)",
    day: "દિવસ",
    days: "દિવસ",
    min: "મિનિટ",
    hour: "કલાક",
    hours: "કલાક",
    toastMedicineSaved: "💊 દવા પ્રિસ્ક્રિપ્શન ડેટાબેઝમાં સેવ થઈ!",
    noRemindersSelected: "⚠️ કૃપા કરીને ઓછામાં ઓછો એક સમય પસંદ કરો.",
  },

  ta: {
    healthGuardianTitle: "ஹெல்த் கார்டியன்",
    greetingPrefix: "காலை வணக்கம்",
    goodAfternoon: "மதிய வணக்கம்",
    goodEvening: "மாலை வணக்கம்",
    goodNight: "இரவு வணக்கம்",
    healthScoreLabel: "ஆரோக்கிய மதிப்பெண்",
    goodLabel: "நன்று",
    nextMedicineLabel: "அடுத்த மருந்து",
    paracetamolLabel: "பாராசிட்டமால்",
    todaysMedicinesLabel: "சந்திப்பு",
    takenLabel: "/ 5 எடுத்தது",
    healthMonitoringTitle: "ஆரோக்கிய கண்காணிப்பு",
    bpLabel: "இரத்த அழுத்தம்",
    bloodSugarLabel: "இரத்த சர்க்கரை",
    weightLabel: "எடை",
    bloodGroupLabel: "இரத்த வகை",
    updateHealthDataLabel: "ஆரோக்கியத் தரவைப் புதுப்பிக்கவும்",
    bpFieldLabel: "இரத்த அழுத்தம் (mmHg)",
    sugarFieldLabel: "இரத்த சர்க்கரை (mg/dL)",
    weightFieldLabel: "எடை (kg)",
    bgFieldLabel: "இரத்த வகை",
    selectOption: "தேர்ந்தெடுக்கவும்",
    saveHealthBtn: "ஆரோக்கியத் தரவைச் சேமிக்கவும்",
    uploadReportText: "அறிக்கையைப் பதிவேற்றவும் (கேமரா / கேலரி)",
    medicineAppointmentTitle: "மருந்து மற்றும் சந்திப்பு",
    healthTrackerTitle: "ஆரோக்கிய கண்காணிப்பு — மாதாந்திர வரைபடம்",
    bpTab: "இரத்த அழுத்தம்",
    sugarTab: "சர்க்கரை",
    weightTab: "எடை",
    healthGuardianAITitle: "ஹெல்த் கார்டியன் AI",
    aiDescText: "உங்கள் ஆரோக்கியம், மருந்துகள், அறிகுறிகள் அல்லது அறிக்கைகள் பற்றி எதையும் கேளுங்கள். 24/7 கிடைக்கும்.",
    startChatText: "AI உடன் உரையாடலைத் தொடங்கவும்",
    emergencyTitle: "அவசரநிலை",
    emergencyDesc: "அவசர உதவி வேண்டுமா? கீழே தட்டி உங்கள் அவசர மற்றும் குடும்பத் தொடர்புகளுக்கு உடனடியாகத் தெரிவிக்கவும்.",
    emergencyBtn: "⚠ அவசர எச்சரிக்கையை அனுப்பவும்",
    emergencyContactText: "அவசர தொடர்பு",
    familyContactText: "குடும்ப தொடர்பு",
    uploadReportModalTitle: "அறிக்கையைப் பதிவேற்றவும்",
    cameraText: "கேமரா",
    galleryText: "கேலரி",
    addMedModalTitle: "புதிய மருந்தைச் சேர்க்கவும்",
    scanUploadText: "உங்கள் மருந்துச் சீட்டை ஸ்கேன் செய்யவும் அல்லது பதிவேற்றவும்",
    medCameraText: "கேமரா",
    medGalleryText: "கேலரி",
    todaysMedicinesModalTitle: "இன்றைய மருந்துகள்",
    takenStatus: "✓ எடுத்தது",
    upcomingStatus: "⏰ வரவிருக்கும்",
    chatModalTitle: "🛡️ ஹெல்த் கார்டியன் AI",
    savedHistoryBtn: "சேமித்த வரலாறு",
    chatHistoryModalTitle: "சேமித்த வரலாறு",
    noChatHistoryMsg: "சேமித்த வரலாறு எதுவும் இல்லை.",
    chatWelcomeMsg: "வணக்கம்! இன்று நான் உங்களுக்கு எவ்வாறு உதவலாம்? 😊",
    chatSendBtn: "அனுப்பவும்",
    chatVoiceBtn: "🎙",
    dietChatModalTitle: "🥗 உணவு உதவியாளர் AI",
    dietChatWelcome: "வணக்கம்! நான் உங்கள் உணவு AI. உணவு, ஊட்டச்சத்து அல்லது உணவு பழக்கங்கள் பற்றி எதையும் கேளுங்கள்! 🥦",
    dietSendBtn: "அனுப்பவும்",
    dietVoiceBtn: "🎙",
    emergencyAlertSent: "அவசர எச்சரிக்கை அனுப்பப்பட்டது!",
    emergencyPopupDesc: "உங்கள் அவசர எச்சரிக்கை அவசர தொடர்பு மற்றும் குடும்பத் தொடர்புக்கு அனுப்பப்பட்டது. உதவி வருகிறது!",
    emergencyContactSent: "அவசர தொடர்பு",
    familyContactSent: "குடும்ப தொடர்பு",
    alertSentText: "எச்சரிக்கை அனுப்பப்பட்டது ✓",
    gotItBtn: "சரி",
    privacyTitle: "🔒 தனியுரிமை மற்றும் பாதுகாப்பு",
    termsTitle: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
    termsText1: "HealthGuardian-ஐ பயன்படுத்துவதன் மூலம், கீழ்க்கண்ட விதிமுறைகளை ஏற்கிறீர்கள்.",
    privacyTitle2: "1. தரவு தனியுரிமை",
    privacyText1: "நீங்கள் உள்ளிட்ட அனைத்து ஆரோக்கியத் தரவும் பாதுகாப்பாக சேமிக்கப்படுகிறது.",
    aiTitle: "2. AI உருவாக்கிய ஆலோசனை",
    aiText1: "AI வழங்கும் ஆலோசனைகள் தகவல் நோக்கத்திற்காக மட்டுமே.",
    emergencyTitle2: "3. அவசர எச்சரிக்கைகள்",
    emergencyText1: "அவசர எச்சரிக்கைகள் முன்பே அமைக்கப்பட்ட தொடர்புகளுக்கு அனுப்பப்படும்.",
    voiceTitle: "4. குரல் தரவு",
    voiceText1: "குரல் உள்ளீடு உங்கள் சாதனத்தின் குரல் அங்கீகாரத்தின் மூலம் செயலாக்கப்படுகிறது.",
    accountTitle: "5. கணக்கு பாதுகாப்பு",
    accountText1: "உங்கள் கணக்கின் ரகசியத்தன்மையைப் பாதுகாப்பது உங்கள் பொறுப்பு.",
    updatesTitle: "6. விதிமுறை புதுப்பிப்புகள்",
    updatesText1: "HealthGuardian இந்த விதிமுறைகளைப் புதுப்பிக்கும் உரிமையை வைத்துள்ளது.",
    understandBtn: "நான் புரிந்துகொண்டு ஏற்கிறேன்",
    editProfile: "சுயவிவரத்தைத் திருத்தவும்",
    languageChange: "மொழியை மாற்றவும்",
    privacySecurity: "தனியுரிமை மற்றும் பாதுகாப்பு",
    logOut: "வெளியேறு",
    chatPlaceholder: "உங்கள் கேள்வியை உள்ளிடவும்…",
    dietPlaceholder: "உணவு மற்றும் ஊட்டச்சத்து பற்றி கேளுங்கள்…",
    langModalTitle: "🌐 மொழியைத் தேர்ந்தெடுக்கவும்",
    langSelectHint: "இடைமுக மொழியை மாற்ற ஒரு மொழியைத் தேர்ந்தெடுக்கவும்",
    toastHealthUpdated: "✅ ஆரோக்கியத் தரவு புதுப்பிக்கப்பட்டது!",
    toastTaken: "நன்றி! 💊 மருந்து எடுத்ததாகக் குறிக்கப்பட்டது.",
    toastMissed: "⚠️ மருந்து தவறிவிட்டது!",
    toastReportUploaded: "அறிக்கை பதிவேற்றப்பட்டது! AI ஆய்வு செய்கிறது…",
    toastMedicineAdded: "மருந்து சேர்க்கப்பட்டது!",
    toastVoiceNotSupported: "இந்த உலாவியில் குரல் ஆதரிக்கப்படவில்லை.",
    toastCouldNotHear: "உங்கள் குரல் கேட்கவில்லை. மீண்டும் முயற்சிக்கவும்.",
    toastLoggedOut: "வெளியேறிவிட்டீர்கள்.",
    toastLanguageChanged: "✅ மொழி மாற்றப்பட்டது: ",
    profileUsernameFieldLabel: "பயனர்பெயர்",
    profileAgeFieldLabel: "வயது",
    profileGenderFieldLabel: "பாலினம்",
    profileDobFieldLabel: "பிறந்த தேதி",
    profileContactFieldLabel: "குடும்ப தொடர்பு எண்",
    addMedFormTitle: "மருந்தைச் சேர்க்கவும்",
    medNameFieldLabel: "மருந்தின் பெயர்",
    medNamePlaceholder: "எ.கா. Metformin",
    medTimeFieldLabel: "நினைவூட்டல் நேரம்",
    medDaysFieldLabel: "கால அளவு (நாட்கள்)",
    saveMedEntryText: "மருந்தைச் சேர்த்து நினைவூட்டலை அமைக்கவும்",
    noMedicinesAdded: "மருந்துகள் எதுவும் சேர்க்கப்படவில்லை.",
    scheduleMedTileText: "மருந்து",
    scheduleApptTileText: "சந்திப்பு",
    todaysApptModalTitle: "இன்றைய சந்திப்புகள்",
    addApptFormTitle: "சந்திப்பைச் சேர்க்கவும்",
    apptDoctorLabel: "மருத்துவரின் பெயர்",
    apptHospitalLabel: "மருத்துவமனை / கிளினிக் பெயர்",
    apptDoctorPlaceholder: "எ.கா. டாக்டர் சர்மா",
    apptDateLabel: "தேதி",
    apptTimeLabel: "நேரம்",
    saveApptEntryText: "சந்திப்பைச் சேர்த்து நினைவூட்டல்களை அமைக்கவும்",
    noAppointmentsAdded: "சந்திப்புகள் எதுவும் சேர்க்கப்படவில்லை.",
    reminderBeforeLabel: "முன்கூட்டியே நினைவூட்டவும் (நாட்கள்)",
    reminderOnDayLabel: "சந்திப்பு நாளில் நினைவூட்டவும் (நிமிடங்கள்)",
    day: "நாள்",
    days: "நாட்கள்",
    min: "நிமிடம்",
    hour: "மணி",
    hours: "மணிநேரம்",
    toastMedicineSaved: "💊 மருந்துச் சீட்டு தரவுத்தளத்தில் சேமிக்கப்பட்டது!",
    noRemindersSelected: "⚠️ குறைந்தது ஒரு நினைவூட்டல் நேரத்தைத் தேர்ந்தெடுக்கவும்."
  },

  te: {
    healthGuardianTitle: "హెల్త్ గార్డియన్",
    greetingPrefix: "శుభోదయం",
    goodAfternoon: "శుభ మధ్యాహ్నం",
    goodEvening: "శుభ సాయంత్రం",
    goodNight: "శుభ రాత్రి",
    healthScoreLabel: "ఆరోగ్య స్కోర్",
    goodLabel: "బాగుంది",
    nextMedicineLabel: "తదుపరి మందు",
    paracetamolLabel: "పారాసెటమాల్",
    todaysMedicinesLabel: "అపాయింట్‌మెంట్",
    takenLabel: "/ 5 తీసుకున్నారు",
    healthMonitoringTitle: "ఆరోగ్య పర్యవేక్షణ",
    bpLabel: "రక్తపోటు",
    bloodSugarLabel: "రక్త చక్కెర",
    weightLabel: "బరువు",
    bloodGroupLabel: "రక్త వర్గం",
    updateHealthDataLabel: "ఆరోగ్య డేటాను నవీకరించండి",
    bpFieldLabel: "రక్తపోటు (mmHg)",
    sugarFieldLabel: "రక్త చక్కెర (mg/dL)",
    weightFieldLabel: "బరువు (kg)",
    bgFieldLabel: "రక్త వర్గం",
    selectOption: "ఎంచుకోండి",
    saveHealthBtn: "ఆరోగ్య డేటాను సేవ్ చేయండి",
    uploadReportText: "రిపోర్ట్‌ను అప్‌లోడ్ చేయండి (కెమెరా / గ్యాలరీ)",
    medicineAppointmentTitle: "మందులు మరియు అపాయింట్‌మెంట్",
    healthTrackerTitle: "ఆరోగ్య ట్రాకర్ — నెలవారీ గ్రాఫ్",
    bpTab: "బీపీ",
    sugarTab: "చక్కెర",
    weightTab: "బరువు",
    healthGuardianAITitle: "హెల్త్ గార్డియన్ AI",
    aiDescText: "మీ ఆరోగ్యం, మందులు, లక్షణాలు లేదా రిపోర్టుల గురించి ఏదైనా అడగండి. 24/7 అందుబాటులో ఉంటుంది.",
    startChatText: "AIతో చాట్ ప్రారంభించండి",
    emergencyTitle: "అత్యవసరం",
    emergencyDesc: "తక్షణ సహాయం కావాలా? క్రింద ట్యాప్ చేసి అత్యవసర మరియు కుటుంబ పరిచయాలకు వెంటనే తెలియజేయండి.",
    emergencyBtn: "⚠ అత్యవసర అలర్ట్ పంపండి",
    emergencyContactText: "అత్యవసర పరిచయం",
    familyContactText: "కుటుంబ పరిచయం",
    uploadReportModalTitle: "రిపోర్ట్ అప్‌లోడ్ చేయండి",
    cameraText: "కెమెరా",
    galleryText: "గ్యాలరీ",
    addMedModalTitle: "కొత్త మందును జోడించండి",
    scanUploadText: "మీ మందుల ప్రిస్క్రిప్షన్‌ను స్కాన్ లేదా అప్‌లోడ్ చేయండి",
    medCameraText: "కెమెరా",
    medGalleryText: "గ్యాలరీ",
    todaysMedicinesModalTitle: "ఈరోజు మందులు",
    takenStatus: "✓ తీసుకున్నారు",
    upcomingStatus: "⏰ రాబోయేవి",
    chatModalTitle: "🛡️ హెల్త్ గార్డియన్ AI",
    savedHistoryBtn: "సేవ్ చేసిన చరిత్ర",
    chatHistoryModalTitle: "సేవ్ చేసిన చరిత్ర",
    noChatHistoryMsg: "ఇంకా సేవ్ చేసిన చరిత్ర లేదు.",
    chatWelcomeMsg: "నమస్కారం! ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను? 😊",
    chatSendBtn: "పంపండి",
    chatVoiceBtn: "🎙",
    dietChatModalTitle: "🥗 డైట్ అసిస్టెంట్ AI",
    dietChatWelcome: "నమస్కారం! నేను మీ డైట్ AI. ఆహారం, పోషణ లేదా భోజన ప్రణాళికల గురించి అడగండి! 🥦",
    dietSendBtn: "పంపండి",
    dietVoiceBtn: "🎙",
    emergencyAlertSent: "అత్యవసర అలర్ట్ పంపబడింది!",
    emergencyPopupDesc: "మీ అత్యవసర అలర్ట్ అత్యవసర మరియు కుటుంబ పరిచయాలకు పంపబడింది. సహాయం వస్తోంది!",
    emergencyContactSent: "అత్యవసర పరిచయం",
    familyContactSent: "కుటుంబ పరిచయం",
    alertSentText: "అలర్ట్ పంపబడింది ✓",
    gotItBtn: "సరే",
    privacyTitle: "🔒 గోప్యత మరియు భద్రత",
    termsTitle: "నిబంధనలు మరియు షరతులు",
    termsText1: "HealthGuardian ఉపయోగించడం ద్వారా మీరు ఈ నిబంధనలను అంగీకరిస్తున్నారు.",
    privacyTitle2: "1. డేటా గోప్యత",
    privacyText1: "మీరు నమోదు చేసిన ఆరోగ్య డేటా సురక్షితంగా నిల్వ చేయబడుతుంది.",
    aiTitle: "2. AI సలహా",
    aiText1: "AI అందించే సూచనలు సమాచార ప్రయోజనాల కోసం మాత్రమే.",
    emergencyTitle2: "3. అత్యవసర అలర్ట్లు",
    emergencyText1: "అత్యవసర అలర్ట్లు ముందుగా అమర్చిన పరిచయాలకు పంపబడతాయి.",
    voiceTitle: "4. వాయిస్ డేటా",
    voiceText1: "వాయిస్ ఇన్‌పుట్ మీ పరికరం ద్వారా రియల్ టైమ్‌లో ప్రాసెస్ చేయబడుతుంది.",
    accountTitle: "5. ఖాతా భద్రత",
    accountText1: "మీ ఖాతా గోప్యతను కాపాడటం మీ బాధ్యత.",
    updatesTitle: "6. నిబంధనల నవీకరణలు",
    updatesText1: "HealthGuardian ఈ నిబంధనలను నవీకరించే హక్కును కలిగి ఉంది.",
    understandBtn: "నాకు అర్థమైంది మరియు అంగీకరిస్తున్నాను",
    editProfile: "ప్రొఫైల్‌ను మార్చండి",
    languageChange: "భాషను మార్చండి",
    privacySecurity: "గోప్యత మరియు భద్రత",
    logOut: "లాగ్ అవుట్",
    chatPlaceholder: "మీ ప్రశ్నను టైప్ చేయండి…",
    dietPlaceholder: "డైట్, పోషణ గురించి అడగండి…",
    langModalTitle: "🌐 భాషను ఎంచుకోండి",
    langSelectHint: "ఇంటర్‌ఫేస్ మార్చడానికి భాషను ఎంచుకోండి",
    toastHealthUpdated: "✅ ఆరోగ్య డేటా నవీకరించబడింది!",
    toastTaken: "ధన్యవాదాలు! 💊 మందు తీసుకున్నట్లు గుర్తించబడింది.",
    toastMissed: "⚠️ మందు మిస్ అయింది!",
    toastReportUploaded: "రిపోర్ట్ అప్‌లోడ్ అయింది! AI విశ్లేషిస్తోంది…",
    toastMedicineAdded: "మందు జోడించబడింది!",
    toastVoiceNotSupported: "ఈ బ్రౌజర్‌లో వాయిస్‌కు మద్దతు లేదు.",
    toastCouldNotHear: "మీ మాట వినిపించలేదు. మళ్లీ ప్రయత్నించండి.",
    toastLoggedOut: "లాగ్ అవుట్ అయ్యారు.",
    toastLanguageChanged: "✅ భాష మార్చబడింది: ",
    profileUsernameFieldLabel: "వినియోగదారు పేరు",
    profileAgeFieldLabel: "వయస్సు",
    profileGenderFieldLabel: "లింగం",
    profileDobFieldLabel: "పుట్టిన తేదీ",
    profileContactFieldLabel: "కుటుంబ పరిచయ నంబర్",
    addMedFormTitle: "మందును జోడించండి",
    medNameFieldLabel: "మందు పేరు",
    medNamePlaceholder: "ఉదా. Metformin",
    medTimeFieldLabel: "రిమైండర్ సమయం",
    medDaysFieldLabel: "వ్యవధి (రోజులు)",
    saveMedEntryText: "మందును జోడించి రిమైండర్ సెట్ చేయండి",
    noMedicinesAdded: "ఇంకా మందులు జోడించలేదు.",
    scheduleMedTileText: "మందు",
    scheduleApptTileText: "అపాయింట్‌మెంట్",
    todaysApptModalTitle: "ఈరోజు అపాయింట్‌మెంట్లు",
    addApptFormTitle: "అపాయింట్‌మెంట్ జోడించండి",
    apptDoctorLabel: "డాక్టర్ పేరు",
    apptHospitalLabel: "హాస్పిటల్ / క్లినిక్ పేరు",
    apptDoctorPlaceholder: "ఉదా. డాక్టర్ శర్మ",
    apptDateLabel: "తేదీ",
    apptTimeLabel: "సమయం",
    saveApptEntryText: "అపాయింట్‌మెంట్ జోడించి రిమైండర్లు సెట్ చేయండి",
    noAppointmentsAdded: "ఇంకా అపాయింట్‌మెంట్లు జోడించలేదు.",
    reminderBeforeLabel: "ముందుగా గుర్తు చేయండి (రోజులు)",
    reminderOnDayLabel: "అపాయింట్‌మెంట్ రోజున గుర్తు చేయండి (నిమిషాలు)",
    day: "రోజు",
    days: "రోజులు",
    min: "నిమిషం",
    hour: "గంట",
    hours: "గంటలు",
    toastMedicineSaved: "💊 మందు ప్రిస్క్రిప్షన్ డేటాబేస్‌లో సేవ్ చేయబడింది!",
    noRemindersSelected: "⚠️ కనీసం ఒక రిమైండర్ సమయాన్ని ఎంచుకోండి."
  },

  kn: {
    healthGuardianTitle: "ಹೆಲ್ತ್ ಗಾರ್ಡಿಯನ್",
    greetingPrefix: "ಶುಭೋದಯ",
    goodAfternoon: "ಶುಭ ಮಧ್ಯಾಹ್ನ",
    goodEvening: "ಶುಭ ಸಂಜೆ",
    goodNight: "ಶುಭ ರಾತ್ರಿ",
    healthScoreLabel: "ಆರೋಗ್ಯ ಸ್ಕೋರ್",
    goodLabel: "ಚೆನ್ನಾಗಿದೆ",
    nextMedicineLabel: "ಮುಂದಿನ ಔಷಧಿ",
    paracetamolLabel: "ಪ್ಯಾರಾಸಿಟಮಾಲ್",
    todaysMedicinesLabel: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್",
    takenLabel: "/ 5 ತೆಗೆದುಕೊಂಡಿದೆ",
    healthMonitoringTitle: "ಆರೋಗ್ಯ ಮೇಲ್ವಿಚಾರಣೆ",
    bpLabel: "ರಕ್ತದೊತ್ತಡ",
    bloodSugarLabel: "ರಕ್ತದ ಸಕ್ಕರೆ",
    weightLabel: "ತೂಕ",
    bloodGroupLabel: "ರಕ್ತದ ಗುಂಪು",
    updateHealthDataLabel: "ಆರೋಗ್ಯ ಡೇಟಾವನ್ನು ನವೀಕರಿಸಿ",
    bpFieldLabel: "ರಕ್ತದೊತ್ತಡ (mmHg)",
    sugarFieldLabel: "ರಕ್ತದ ಸಕ್ಕರೆ (mg/dL)",
    weightFieldLabel: "ತೂಕ (kg)",
    bgFieldLabel: "ರಕ್ತದ ಗುಂಪು",
    selectOption: "ಆಯ್ಕೆಮಾಡಿ",
    saveHealthBtn: "ಆರೋಗ್ಯ ಡೇಟಾವನ್ನು ಉಳಿಸಿ",
    uploadReportText: "ವರದಿಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (ಕ್ಯಾಮೆರಾ / ಗ್ಯಾಲರಿ)",
    medicineAppointmentTitle: "ಔಷಧಿ ಮತ್ತು ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್",
    healthTrackerTitle: "ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕರ್ — ಮಾಸಿಕ ಗ್ರಾಫ್",
    bpTab: "ಬಿಪಿ",
    sugarTab: "ಸಕ್ಕರೆ",
    weightTab: "ತೂಕ",
    healthGuardianAITitle: "ಹೆಲ್ತ್ ಗಾರ್ಡಿಯನ್ AI",
    aiDescText: "ನಿಮ್ಮ ಆರೋಗ್ಯ, ಔಷಧಿಗಳು, ಲಕ್ಷಣಗಳು ಅಥವಾ ವರದಿಗಳ ಬಗ್ಗೆ ಏನು ಬೇಕಾದರೂ ಕೇಳಿ. 24/7 ಲಭ್ಯವಿದೆ.",
    startChatText: "AI ಜೊತೆ ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ",
    emergencyTitle: "ತುರ್ತು ಪರಿಸ್ಥಿತಿ",
    emergencyDesc: "ತುರ್ತು ಸಹಾಯ ಬೇಕೇ? ಕೆಳಗೆ ಟ್ಯಾಪ್ ಮಾಡಿ ನಿಮ್ಮ ತುರ್ತು ಮತ್ತು ಕುಟುಂಬ ಸಂಪರ್ಕಗಳಿಗೆ ತಕ್ಷಣ ತಿಳಿಸಿ.",
    emergencyBtn: "⚠ ತುರ್ತು ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಿ",
    emergencyContactText: "ತುರ್ತು ಸಂಪರ್ಕ",
    familyContactText: "ಕುಟುಂಬ ಸಂಪರ್ಕ",
    uploadReportModalTitle: "ವರದಿಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    cameraText: "ಕ್ಯಾಮೆರಾ",
    galleryText: "ಗ್ಯಾಲರಿ",
    addMedModalTitle: "ಹೊಸ ಔಷಧಿ ಸೇರಿಸಿ",
    scanUploadText: "ನಿಮ್ಮ ಔಷಧಿ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನ್ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    medCameraText: "ಕ್ಯಾಮೆರಾ",
    medGalleryText: "ಗ್ಯಾಲರಿ",
    todaysMedicinesModalTitle: "ಇಂದಿನ ಔಷಧಿಗಳು",
    takenStatus: "✓ ತೆಗೆದುಕೊಂಡಿದೆ",
    upcomingStatus: "⏰ ಮುಂದಿನವು",
    chatModalTitle: "🛡️ ಹೆಲ್ತ್ ಗಾರ್ಡಿಯನ್ AI",
    savedHistoryBtn: "ಉಳಿಸಿದ ಇತಿಹಾಸ",
    chatHistoryModalTitle: "ಉಳಿಸಿದ ಇತಿಹಾಸ",
    noChatHistoryMsg: "ಇನ್ನೂ ಯಾವುದೇ ಉಳಿಸಿದ ಇತಿಹಾಸವಿಲ್ಲ.",
    chatWelcomeMsg: "ನಮಸ್ಕಾರ! ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? 😊",
    chatSendBtn: "ಕಳುಹಿಸಿ",
    chatVoiceBtn: "🎙",
    dietChatModalTitle: "🥗 ಡಯಟ್ ಅಸಿಸ್ಟೆಂಟ್ AI",
    dietChatWelcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಡಯಟ್ AI. ಆಹಾರ, ಪೋಷಣೆ ಅಥವಾ ಊಟದ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ! 🥦",
    dietSendBtn: "ಕಳುಹಿಸಿ",
    dietVoiceBtn: "🎙",
    emergencyAlertSent: "ತುರ್ತು ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಲಾಗಿದೆ!",
    emergencyPopupDesc: "ನಿಮ್ಮ ತುರ್ತು ಎಚ್ಚರಿಕೆಯನ್ನು ತುರ್ತು ಮತ್ತು ಕುಟುಂಬ ಸಂಪರ್ಕಗಳಿಗೆ ಕಳುಹಿಸಲಾಗಿದೆ. ಸಹಾಯ ಬರುತ್ತಿದೆ!",
    emergencyContactSent: "ತುರ್ತು ಸಂಪರ್ಕ",
    familyContactSent: "ಕುಟುಂಬ ಸಂಪರ್ಕ",
    alertSentText: "ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಲಾಗಿದೆ ✓",
    gotItBtn: "ಸರಿ",
    privacyTitle: "🔒 ಗೌಪ್ಯತೆ ಮತ್ತು ಭದ್ರತೆ",
    termsTitle: "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು",
    termsText1: "HealthGuardian ಬಳಸುವ ಮೂಲಕ ನೀವು ಈ ನಿಯಮಗಳನ್ನು ಒಪ್ಪುತ್ತೀರಿ.",
    privacyTitle2: "1. ಡೇಟಾ ಗೌಪ್ಯತೆ",
    privacyText1: "ನೀವು ನಮೂದಿಸಿದ ಆರೋಗ್ಯ ಡೇಟಾವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ.",
    aiTitle: "2. AI ಸಲಹೆ",
    aiText1: "AI ಸಲಹೆಗಳು ಮಾಹಿತಿ ಉದ್ದೇಶಕ್ಕಾಗಿ ಮಾತ್ರ.",
    emergencyTitle2: "3. ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳು",
    emergencyText1: "ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳನ್ನು ಮೊದಲೇ ಹೊಂದಿಸಿದ ಸಂಪರ್ಕಗಳಿಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.",
    voiceTitle: "4. ಧ್ವನಿ ಡೇಟಾ",
    voiceText1: "ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಅನ್ನು ನಿಮ್ಮ ಸಾಧನದ ಮೂಲಕ ನೈಜ ಸಮಯದಲ್ಲಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತದೆ.",
    accountTitle: "5. ಖಾತೆ ಭದ್ರತೆ",
    accountText1: "ನಿಮ್ಮ ಖಾತೆಯ ಗೌಪ್ಯತೆಯನ್ನು ಕಾಪಾಡುವುದು ನಿಮ್ಮ ಜವಾಬ್ದಾರಿ.",
    updatesTitle: "6. ನಿಯಮಗಳ ನವೀಕರಣಗಳು",
    updatesText1: "HealthGuardian ಈ ನಿಯಮಗಳನ್ನು ನವೀಕರಿಸುವ ಹಕ್ಕನ್ನು ಹೊಂದಿದೆ.",
    understandBtn: "ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ ಮತ್ತು ಒಪ್ಪುತ್ತೇನೆ",
    editProfile: "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
    languageChange: "ಭಾಷೆ ಬದಲಾಯಿಸಿ",
    privacySecurity: "ಗೌಪ್ಯತೆ ಮತ್ತು ಭದ್ರತೆ",
    logOut: "ಲಾಗ್ ಔಟ್",
    chatPlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ…",
    dietPlaceholder: "ಆಹಾರ, ಪೋಷಣೆ ಬಗ್ಗೆ ಕೇಳಿ…",
    langModalTitle: "🌐 ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    langSelectHint: "ಇಂಟರ್ಫೇಸ್ ಬದಲಾಯಿಸಲು ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    toastHealthUpdated: "✅ ಆರೋಗ್ಯ ಡೇಟಾ ನವೀಕರಿಸಲಾಗಿದೆ!",
    toastTaken: "ಧನ್ಯವಾದಗಳು! 💊 ಔಷಧಿ ತೆಗೆದುಕೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಲಾಗಿದೆ.",
    toastMissed: "⚠️ ಔಷಧಿ ತಪ್ಪಿದೆ!",
    toastReportUploaded: "ವರದಿ ಅಪ್‌ಲೋಡ್ ಆಗಿದೆ! AI ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ…",
    toastMedicineAdded: "ಔಷಧಿ ಸೇರಿಸಲಾಗಿದೆ!",
    toastVoiceNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
    toastCouldNotHear: "ನಿಮ್ಮ ಧ್ವನಿ ಕೇಳಿಸಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    toastLoggedOut: "ಲಾಗ್ ಔಟ್ ಆಗಿದ್ದೀರಿ.",
    toastLanguageChanged: "✅ ಭಾಷೆ ಬದಲಾಯಿಸಲಾಗಿದೆ: ",
    profileUsernameFieldLabel: "ಬಳಕೆದಾರ ಹೆಸರು",
    profileAgeFieldLabel: "ವಯಸ್ಸು",
    profileGenderFieldLabel: "ಲಿಂಗ",
    profileDobFieldLabel: "ಜನ್ಮ ದಿನಾಂಕ",
    profileContactFieldLabel: "ಕುಟುಂಬ ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",
    addMedFormTitle: "ಔಷಧಿ ಸೇರಿಸಿ",
    medNameFieldLabel: "ಔಷಧಿಯ ಹೆಸರು",
    medNamePlaceholder: "ಉದಾ. Metformin",
    medTimeFieldLabel: "ರಿಮೈಂಡರ್ ಸಮಯ",
    medDaysFieldLabel: "ಅವಧಿ (ದಿನಗಳು)",
    saveMedEntryText: "ಔಷಧಿ ಸೇರಿಸಿ ಮತ್ತು ರಿಮೈಂಡರ್ ಹೊಂದಿಸಿ",
    noMedicinesAdded: "ಇನ್ನೂ ಯಾವುದೇ ಔಷಧಿ ಸೇರಿಸಲಾಗಿಲ್ಲ.",
    scheduleMedTileText: "ಔಷಧಿ",
    scheduleApptTileText: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್",
    todaysApptModalTitle: "ಇಂದಿನ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು",
    addApptFormTitle: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಸೇರಿಸಿ",
    apptDoctorLabel: "ವೈದ್ಯರ ಹೆಸರು",
    apptHospitalLabel: "ಆಸ್ಪತ್ರೆ / ಕ್ಲಿನಿಕ್ ಹೆಸರು",
    apptDoctorPlaceholder: "ಉದಾ. ಡಾ. ಶರ್ಮಾ",
    apptDateLabel: "ದಿನಾಂಕ",
    apptTimeLabel: "ಸಮಯ",
    saveApptEntryText: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಸೇರಿಸಿ ಮತ್ತು ರಿಮೈಂಡರ್ ಹೊಂದಿಸಿ",
    noAppointmentsAdded: "ಇನ್ನೂ ಯಾವುದೇ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಸೇರಿಸಲಾಗಿಲ್ಲ.",
    reminderBeforeLabel: "ಮೊದಲು ನೆನಪಿಸಿ (ದಿನಗಳು)",
    reminderOnDayLabel: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ದಿನ ನೆನಪಿಸಿ (ನಿಮಿಷಗಳು)",
    day: "ದಿನ",
    days: "ದಿನಗಳು",
    min: "ನಿಮಿಷ",
    hour: "ಗಂಟೆ",
    hours: "ಗಂಟೆಗಳು",
    toastMedicineSaved: "💊 ಔಷಧಿ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ!",
    noRemindersSelected: "⚠️ ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ಒಂದು ರಿಮೈಂಡರ್ ಸಮಯ ಆಯ್ಕೆಮಾಡಿ."
  },

  bn: {
    healthGuardianTitle: "হেলথ গার্ডিয়ান",
    greetingPrefix: "সুপ্রভাত",
    goodAfternoon: "শুভ অপরাহ্ন",
    goodEvening: "শুভ সন্ধ্যা",
    goodNight: "শুভ রাত্রি",
    healthScoreLabel: "স্বাস্থ্য স্কোর",
    goodLabel: "ভালো",
    nextMedicineLabel: "পরবর্তী ওষুধ",
    paracetamolLabel: "প্যারাসিটামল",
    todaysMedicinesLabel: "অ্যাপয়েন্টমেন্ট",
    takenLabel: "/ ৫টি নেওয়া হয়েছে",
    healthMonitoringTitle: "স্বাস্থ্য পর্যবেক্ষণ",
    bpLabel: "রক্তচাপ",
    bloodSugarLabel: "রক্তে শর্করা",
    weightLabel: "ওজন",
    bloodGroupLabel: "রক্তের গ্রুপ",
    updateHealthDataLabel: "স্বাস্থ্য তথ্য আপডেট করুন",
    bpFieldLabel: "রক্তচাপ (mmHg)",
    sugarFieldLabel: "রক্তে শর্করা (mg/dL)",
    weightFieldLabel: "ওজন (kg)",
    bgFieldLabel: "রক্তের গ্রুপ",
    selectOption: "নির্বাচন করুন",
    saveHealthBtn: "স্বাস্থ্য তথ্য সংরক্ষণ করুন",
    uploadReportText: "রিপোর্ট আপলোড করুন (ক্যামেরা / গ্যালারি)",
    medicineAppointmentTitle: "ওষুধ এবং অ্যাপয়েন্টমেন্ট",
    healthTrackerTitle: "স্বাস্থ্য ট্র্যাকার — মাসিক গ্রাফ",
    bpTab: "বিপি",
    sugarTab: "শর্করা",
    weightTab: "ওজন",
    healthGuardianAITitle: "হেলথ গার্ডিয়ান AI",
    aiDescText: "আপনার স্বাস্থ্য, ওষুধ, উপসর্গ বা রিপোর্ট সম্পর্কে যেকোনো প্রশ্ন করুন। ২৪/৭ উপলব্ধ।",
    startChatText: "AI-এর সঙ্গে চ্যাট শুরু করুন",
    emergencyTitle: "জরুরি অবস্থা",
    emergencyDesc: "জরুরি সাহায্য দরকার? নিচে ট্যাপ করে আপনার জরুরি ও পরিবারের পরিচিতিদের জানান।",
    emergencyBtn: "⚠ জরুরি সতর্কতা পাঠান",
    emergencyContactText: "জরুরি যোগাযোগ",
    familyContactText: "পরিবারের যোগাযোগ",
    uploadReportModalTitle: "রিপোর্ট আপলোড করুন",
    cameraText: "ক্যামেরা",
    galleryText: "গ্যালারি",
    addMedModalTitle: "নতুন ওষুধ যোগ করুন",
    scanUploadText: "আপনার ওষুধের প্রেসক্রিপশন স্ক্যান বা আপলোড করুন",
    medCameraText: "ক্যামেরা",
    medGalleryText: "গ্যালারি",
    todaysMedicinesModalTitle: "আজকের ওষুধ",
    takenStatus: "✓ নেওয়া হয়েছে",
    upcomingStatus: "⏰ আসন্ন",
    chatModalTitle: "🛡️ হেলথ গার্ডিয়ান AI",
    savedHistoryBtn: "সংরক্ষিত ইতিহাস",
    chatHistoryModalTitle: "সংরক্ষিত ইতিহাস",
    noChatHistoryMsg: "এখনও কোনো সংরক্ষিত ইতিহাস নেই।",
    chatWelcomeMsg: "নমস্কার! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি? 😊",
    chatSendBtn: "পাঠান",
    chatVoiceBtn: "🎙",
    dietChatModalTitle: "🥗 ডায়েট সহায়ক AI",
    dietChatWelcome: "নমস্কার! আমি আপনার ডায়েট AI। খাবার, পুষ্টি বা খাদ্য পরিকল্পনা সম্পর্কে জিজ্ঞাসা করুন! 🥦",
    dietSendBtn: "পাঠান",
    dietVoiceBtn: "🎙",
    emergencyAlertSent: "জরুরি সতর্কতা পাঠানো হয়েছে!",
    emergencyPopupDesc: "আপনার জরুরি সতর্কতা জরুরি ও পরিবারের যোগাযোগে পাঠানো হয়েছে। সাহায্য আসছে!",
    emergencyContactSent: "জরুরি যোগাযোগ",
    familyContactSent: "পরিবারের যোগাযোগ",
    alertSentText: "সতর্কতা পাঠানো হয়েছে ✓",
    gotItBtn: "ঠিক আছে",
    privacyTitle: "🔒 গোপনীয়তা ও নিরাপত্তা",
    termsTitle: "শর্তাবলি",
    termsText1: "HealthGuardian ব্যবহার করে আপনি এই শর্তাবলিতে সম্মত হচ্ছেন।",
    privacyTitle2: "১. তথ্যের গোপনীয়তা",
    privacyText1: "আপনার দেওয়া স্বাস্থ্য তথ্য নিরাপদে সংরক্ষণ করা হয়।",
    aiTitle: "২. AI-উৎপন্ন পরামর্শ",
    aiText1: "AI-এর পরামর্শ শুধুমাত্র তথ্যের উদ্দেশ্যে দেওয়া হয়।",
    emergencyTitle2: "৩. জরুরি সতর্কতা",
    emergencyText1: "জরুরি সতর্কতা পূর্বনির্ধারিত যোগাযোগগুলিতে পাঠানো হয়।",
    voiceTitle: "৪. ভয়েস তথ্য",
    voiceText1: "ভয়েস ইনপুট আপনার ডিভাইসের মাধ্যমে রিয়েল-টাইমে প্রক্রিয়া করা হয়।",
    accountTitle: "৫. অ্যাকাউন্ট নিরাপত্তা",
    accountText1: "আপনার অ্যাকাউন্টের গোপনীয়তা রক্ষা করা আপনার দায়িত্ব।",
    updatesTitle: "৬. শর্তাবলির আপডেট",
    updatesText1: "HealthGuardian প্রয়োজনে এই শর্তাবলি আপডেট করতে পারে।",
    understandBtn: "আমি বুঝেছি এবং গ্রহণ করছি",
    editProfile: "প্রোফাইল সম্পাদনা করুন",
    languageChange: "ভাষা পরিবর্তন করুন",
    privacySecurity: "গোপনীয়তা ও নিরাপত্তা",
    logOut: "লগ আউট",
    chatPlaceholder: "আপনার প্রশ্ন লিখুন…",
    dietPlaceholder: "খাবার ও পুষ্টি সম্পর্কে জিজ্ঞাসা করুন…",
    langModalTitle: "🌐 ভাষা নির্বাচন করুন",
    langSelectHint: "ইন্টারফেস পরিবর্তন করতে একটি ভাষা নির্বাচন করুন",
    toastHealthUpdated: "✅ স্বাস্থ্য তথ্য আপডেট হয়েছে!",
    toastTaken: "ধন্যবাদ! 💊 ওষুধ নেওয়া হয়েছে হিসেবে চিহ্নিত।",
    toastMissed: "⚠️ ওষুধ মিস হয়েছে!",
    toastReportUploaded: "রিপোর্ট আপলোড হয়েছে! AI বিশ্লেষণ করছে…",
    toastMedicineAdded: "ওষুধ যোগ করা হয়েছে!",
    toastVoiceNotSupported: "এই ব্রাউজারে ভয়েস সমর্থিত নয়।",
    toastCouldNotHear: "আপনার কথা শোনা যায়নি। আবার চেষ্টা করুন।",
    toastLoggedOut: "লগ আউট করা হয়েছে।",
    toastLanguageChanged: "✅ ভাষা পরিবর্তন হয়েছে: ",
    profileUsernameFieldLabel: "ইউজারনেম",
    profileAgeFieldLabel: "বয়স",
    profileGenderFieldLabel: "লিঙ্গ",
    profileDobFieldLabel: "জন্মতারিখ",
    profileContactFieldLabel: "পরিবারের যোগাযোগ নম্বর",
    addMedFormTitle: "ওষুধ যোগ করুন",
    medNameFieldLabel: "ওষুধের নাম",
    medNamePlaceholder: "যেমন Metformin",
    medTimeFieldLabel: "রিমাইন্ডার সময়",
    medDaysFieldLabel: "সময়কাল (দিন)",
    saveMedEntryText: "ওষুধ যোগ করে রিমাইন্ডার সেট করুন",
    noMedicinesAdded: "এখনও কোনো ওষুধ যোগ করা হয়নি।",
    scheduleMedTileText: "ওষুধ",
    scheduleApptTileText: "অ্যাপয়েন্টমেন্ট",
    todaysApptModalTitle: "আজকের অ্যাপয়েন্টমেন্ট",
    addApptFormTitle: "অ্যাপয়েন্টমেন্ট যোগ করুন",
    apptDoctorLabel: "ডাক্তারের নাম",
    apptHospitalLabel: "হাসপাতাল / ক্লিনিকের নাম",
    apptDoctorPlaceholder: "যেমন ডা. শর্মা",
    apptDateLabel: "তারিখ",
    apptTimeLabel: "সময়",
    saveApptEntryText: "অ্যাপয়েন্টমেন্ট যোগ করে রিমাইন্ডার সেট করুন",
    noAppointmentsAdded: "এখনও কোনো অ্যাপয়েন্টমেন্ট যোগ করা হয়নি।",
    reminderBeforeLabel: "আগে মনে করিয়ে দিন (দিন)",
    reminderOnDayLabel: "অ্যাপয়েন্টমেন্টের দিন মনে করিয়ে দিন (মিনিট)",
    day: "দিন",
    days: "দিন",
    min: "মিনিট",
    hour: "ঘণ্টা",
    hours: "ঘণ্টা",
    toastMedicineSaved: "💊 ওষুধের প্রেসক্রিপশন ডেটাবেসে সংরক্ষিত হয়েছে!",
    noRemindersSelected: "⚠️ অন্তত একটি রিমাইন্ডার সময় নির্বাচন করুন।"
  },

  pa: {
    healthGuardianTitle: "ਹੈਲਥ ਗਾਰਡੀਅਨ",
    greetingPrefix: "ਸ਼ੁਭ ਸਵੇਰ",
    goodAfternoon: "ਸ਼ੁਭ ਦੁਪਹਿਰ",
    goodEvening: "ਸ਼ੁਭ ਸ਼ਾਮ",
    goodNight: "ਸ਼ੁਭ ਰਾਤ",
    healthScoreLabel: "ਸਿਹਤ ਸਕੋਰ",
    goodLabel: "ਚੰਗਾ",
    nextMedicineLabel: "ਅਗਲੀ ਦਵਾਈ",
    paracetamolLabel: "ਪੈਰਾਸੀਟਾਮੋਲ",
    todaysMedicinesLabel: "ਅਪਾਇੰਟਮੈਂਟ",
    takenLabel: "/ 5 ਲਈ ਗਈ",
    healthMonitoringTitle: "ਸਿਹਤ ਨਿਗਰਾਨੀ",
    bpLabel: "ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ",
    bloodSugarLabel: "ਬਲੱਡ ਸ਼ੂਗਰ",
    weightLabel: "ਵਜ਼ਨ",
    bloodGroupLabel: "ਬਲੱਡ ਗਰੁੱਪ",
    updateHealthDataLabel: "ਸਿਹਤ ਡਾਟਾ ਅੱਪਡੇਟ ਕਰੋ",
    bpFieldLabel: "ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ (mmHg)",
    sugarFieldLabel: "ਬਲੱਡ ਸ਼ੂਗਰ (mg/dL)",
    weightFieldLabel: "ਵਜ਼ਨ (kg)",
    bgFieldLabel: "ਬਲੱਡ ਗਰੁੱਪ",
    selectOption: "ਚੁਣੋ",
    saveHealthBtn: "ਸਿਹਤ ਡਾਟਾ ਸੇਵ ਕਰੋ",
    uploadReportText: "ਰਿਪੋਰਟ ਅੱਪਲੋਡ ਕਰੋ (ਕੈਮਰਾ / ਗੈਲਰੀ)",
    medicineAppointmentTitle: "ਦਵਾਈ ਅਤੇ ਅਪਾਇੰਟਮੈਂਟ",
    healthTrackerTitle: "ਸਿਹਤ ਟ੍ਰੈਕਰ — ਮਹੀਨਾਵਾਰ ਗ੍ਰਾਫ",
    bpTab: "ਬੀਪੀ",
    sugarTab: "ਸ਼ੂਗਰ",
    weightTab: "ਵਜ਼ਨ",
    healthGuardianAITitle: "ਹੈਲਥ ਗਾਰਡੀਅਨ AI",
    aiDescText: "ਆਪਣੀ ਸਿਹਤ, ਦਵਾਈਆਂ, ਲੱਛਣਾਂ ਜਾਂ ਰਿਪੋਰਟਾਂ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ। 24/7 ਉਪਲਬਧ।",
    startChatText: "AI ਨਾਲ ਚੈਟ ਸ਼ੁਰੂ ਕਰੋ",
    emergencyTitle: "ਐਮਰਜੈਂਸੀ",
    emergencyDesc: "ਤੁਰੰਤ ਮਦਦ ਚਾਹੀਦੀ ਹੈ? ਹੇਠਾਂ ਟੈਪ ਕਰਕੇ ਆਪਣੇ ਐਮਰਜੈਂਸੀ ਅਤੇ ਪਰਿਵਾਰਕ ਸੰਪਰਕਾਂ ਨੂੰ ਸੂਚਿਤ ਕਰੋ।",
    emergencyBtn: "⚠ ਐਮਰਜੈਂਸੀ ਅਲਰਟ ਭੇਜੋ",
    emergencyContactText: "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ",
    familyContactText: "ਪਰਿਵਾਰਕ ਸੰਪਰਕ",
    uploadReportModalTitle: "ਰਿਪੋਰਟ ਅੱਪਲੋਡ ਕਰੋ",
    cameraText: "ਕੈਮਰਾ",
    galleryText: "ਗੈਲਰੀ",
    addMedModalTitle: "ਨਵੀਂ ਦਵਾਈ ਸ਼ਾਮਲ ਕਰੋ",
    scanUploadText: "ਆਪਣੀ ਦਵਾਈ ਦੀ ਪ੍ਰਿਸਕ੍ਰਿਪਸ਼ਨ ਸਕੈਨ ਜਾਂ ਅੱਪਲੋਡ ਕਰੋ",
    medCameraText: "ਕੈਮਰਾ",
    medGalleryText: "ਗੈਲਰੀ",
    todaysMedicinesModalTitle: "ਅੱਜ ਦੀਆਂ ਦਵਾਈਆਂ",
    takenStatus: "✓ ਲਈ ਗਈ",
    upcomingStatus: "⏰ ਆਉਣ ਵਾਲੀ",
    chatModalTitle: "🛡️ ਹੈਲਥ ਗਾਰਡੀਅਨ AI",
    savedHistoryBtn: "ਸੇਵ ਕੀਤਾ ਇਤਿਹਾਸ",
    chatHistoryModalTitle: "ਸੇਵ ਕੀਤਾ ਇਤਿਹਾਸ",
    noChatHistoryMsg: "ਅਜੇ ਕੋਈ ਸੇਵ ਕੀਤਾ ਇਤਿਹਾਸ ਨਹੀਂ ਹੈ।",
    chatWelcomeMsg: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਅੱਜ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ? 😊",
    chatSendBtn: "ਭੇਜੋ",
    chatVoiceBtn: "🎙",
    dietChatModalTitle: "🥗 ਡਾਇਟ ਅਸਿਸਟੈਂਟ AI",
    dietChatWelcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਡਾਇਟ AI ਹਾਂ। ਖੁਰਾਕ, ਪੋਸ਼ਣ ਜਾਂ ਖਾਣ-ਪੀਣ ਦੀਆਂ ਆਦਤਾਂ ਬਾਰੇ ਪੁੱਛੋ! 🥦",
    dietSendBtn: "ਭੇਜੋ",
    dietVoiceBtn: "🎙",
    emergencyAlertSent: "ਐਮਰਜੈਂਸੀ ਅਲਰਟ ਭੇਜਿਆ ਗਿਆ!",
    emergencyPopupDesc: "ਤੁਹਾਡਾ ਐਮਰਜੈਂਸੀ ਅਲਰਟ ਐਮਰਜੈਂਸੀ ਅਤੇ ਪਰਿਵਾਰਕ ਸੰਪਰਕਾਂ ਨੂੰ ਭੇਜਿਆ ਗਿਆ ਹੈ। ਮਦਦ ਆ ਰਹੀ ਹੈ!",
    emergencyContactSent: "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ",
    familyContactSent: "ਪਰਿਵਾਰਕ ਸੰਪਰਕ",
    alertSentText: "ਅਲਰਟ ਭੇਜਿਆ ਗਿਆ ✓",
    gotItBtn: "ਠੀਕ ਹੈ",
    privacyTitle: "🔒 ਪਰਾਈਵੇਸੀ ਅਤੇ ਸੁਰੱਖਿਆ",
    termsTitle: "ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ",
    termsText1: "HealthGuardian ਵਰਤ ਕੇ ਤੁਸੀਂ ਇਹਨਾਂ ਨਿਯਮਾਂ ਨਾਲ ਸਹਿਮਤ ਹੁੰਦੇ ਹੋ।",
    privacyTitle2: "1. ਡਾਟਾ ਪਰਾਈਵੇਸੀ",
    privacyText1: "ਤੁਹਾਡਾ ਦਿੱਤਾ ਸਿਹਤ ਡਾਟਾ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਸਟੋਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।",
    aiTitle: "2. AI ਸਲਾਹ",
    aiText1: "AI ਦੀਆਂ ਸਲਾਹਾਂ ਸਿਰਫ਼ ਜਾਣਕਾਰੀ ਲਈ ਹਨ।",
    emergencyTitle2: "3. ਐਮਰਜੈਂਸੀ ਅਲਰਟ",
    emergencyText1: "ਐਮਰਜੈਂਸੀ ਅਲਰਟ ਪਹਿਲਾਂ ਤੋਂ ਸੈੱਟ ਕੀਤੇ ਸੰਪਰਕਾਂ ਨੂੰ ਭੇਜੇ ਜਾਂਦੇ ਹਨ।",
    voiceTitle: "4. ਵੌਇਸ ਡਾਟਾ",
    voiceText1: "ਵੌਇਸ ਇਨਪੁੱਟ ਤੁਹਾਡੇ ਡਿਵਾਈਸ ਰਾਹੀਂ ਰੀਅਲ ਟਾਈਮ ਵਿੱਚ ਪ੍ਰੋਸੈਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।",
    accountTitle: "5. ਖਾਤਾ ਸੁਰੱਖਿਆ",
    accountText1: "ਆਪਣੇ ਖਾਤੇ ਦੀ ਗੋਪਨੀਯਤਾ ਦੀ ਰੱਖਿਆ ਕਰਨਾ ਤੁਹਾਡੀ ਜ਼ਿੰਮੇਵਾਰੀ ਹੈ।",
    updatesTitle: "6. ਨਿਯਮਾਂ ਦੇ ਅੱਪਡੇਟ",
    updatesText1: "HealthGuardian ਨੂੰ ਇਹ ਨਿਯਮ ਅੱਪਡੇਟ ਕਰਨ ਦਾ ਅਧਿਕਾਰ ਹੈ।",
    understandBtn: "ਮੈਂ ਸਮਝ ਗਿਆ ਅਤੇ ਸਵੀਕਾਰ ਕਰਦਾ ਹਾਂ",
    editProfile: "ਪ੍ਰੋਫਾਈਲ ਸੋਧੋ",
    languageChange: "ਭਾਸ਼ਾ ਬਦਲੋ",
    privacySecurity: "ਪਰਾਈਵੇਸੀ ਅਤੇ ਸੁਰੱਖਿਆ",
    logOut: "ਲੌਗ ਆਊਟ",
    chatPlaceholder: "ਆਪਣਾ ਸਵਾਲ ਲਿਖੋ…",
    dietPlaceholder: "ਡਾਇਟ ਅਤੇ ਪੋਸ਼ਣ ਬਾਰੇ ਪੁੱਛੋ…",
    langModalTitle: "🌐 ਭਾਸ਼ਾ ਚੁਣੋ",
    langSelectHint: "ਇੰਟਰਫੇਸ ਬਦਲਣ ਲਈ ਭਾਸ਼ਾ ਚੁਣੋ",
    toastHealthUpdated: "✅ ਸਿਹਤ ਡਾਟਾ ਅੱਪਡੇਟ ਹੋ ਗਿਆ!",
    toastTaken: "ਧੰਨਵਾਦ! 💊 ਦਵਾਈ ਲਈ ਹੋਈ ਵਜੋਂ ਦਰਜ ਕੀਤੀ ਗਈ।",
    toastMissed: "⚠️ ਦਵਾਈ ਰਹਿ ਗਈ!",
    toastReportUploaded: "ਰਿਪੋਰਟ ਅੱਪਲੋਡ ਹੋ ਗਈ! AI ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ…",
    toastMedicineAdded: "ਦਵਾਈ ਸ਼ਾਮਲ ਕੀਤੀ ਗਈ!",
    toastVoiceNotSupported: "ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਵੌਇਸ ਸਹਾਇਤਾ ਨਹੀਂ ਹੈ।",
    toastCouldNotHear: "ਤੁਹਾਡੀ ਆਵਾਜ਼ ਸੁਣਾਈ ਨਹੀਂ ਦਿੱਤੀ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    toastLoggedOut: "ਲੌਗ ਆਊਟ ਹੋ ਗਿਆ।",
    toastLanguageChanged: "✅ ਭਾਸ਼ਾ ਬਦਲੀ ਗਈ: ",
    profileUsernameFieldLabel: "ਯੂਜ਼ਰਨੇਮ",
    profileAgeFieldLabel: "ਉਮਰ",
    profileGenderFieldLabel: "ਲਿੰਗ",
    profileDobFieldLabel: "ਜਨਮ ਮਿਤੀ",
    profileContactFieldLabel: "ਪਰਿਵਾਰਕ ਸੰਪਰਕ ਨੰਬਰ",
    addMedFormTitle: "ਦਵਾਈ ਸ਼ਾਮਲ ਕਰੋ",
    medNameFieldLabel: "ਦਵਾਈ ਦਾ ਨਾਮ",
    medNamePlaceholder: "ਉਦਾਹਰਨ: Metformin",
    medTimeFieldLabel: "ਰਿਮਾਈਂਡਰ ਸਮਾਂ",
    medDaysFieldLabel: "ਮਿਆਦ (ਦਿਨ)",
    saveMedEntryText: "ਦਵਾਈ ਸ਼ਾਮਲ ਕਰੋ ਅਤੇ ਰਿਮਾਈਂਡਰ ਸੈੱਟ ਕਰੋ",
    noMedicinesAdded: "ਅਜੇ ਕੋਈ ਦਵਾਈ ਸ਼ਾਮਲ ਨਹੀਂ ਕੀਤੀ ਗਈ।",
    scheduleMedTileText: "ਦਵਾਈ",
    scheduleApptTileText: "ਅਪਾਇੰਟਮੈਂਟ",
    todaysApptModalTitle: "ਅੱਜ ਦੀਆਂ ਅਪਾਇੰਟਮੈਂਟਾਂ",
    addApptFormTitle: "ਅਪਾਇੰਟਮੈਂਟ ਸ਼ਾਮਲ ਕਰੋ",
    apptDoctorLabel: "ਡਾਕਟਰ ਦਾ ਨਾਮ",
    apptHospitalLabel: "ਹਸਪਤਾਲ / ਕਲੀਨਿਕ ਦਾ ਨਾਮ",
    apptDoctorPlaceholder: "ਉਦਾਹਰਨ: ਡਾ. ਸ਼ਰਮਾ",
    apptDateLabel: "ਮਿਤੀ",
    apptTimeLabel: "ਸਮਾਂ",
    saveApptEntryText: "ਅਪਾਇੰਟਮੈਂਟ ਸ਼ਾਮਲ ਕਰੋ ਅਤੇ ਰਿਮਾਈਂਡਰ ਸੈੱਟ ਕਰੋ",
    noAppointmentsAdded: "ਅਜੇ ਕੋਈ ਅਪਾਇੰਟਮੈਂਟ ਨਹੀਂ ਜੋੜੀ ਗਈ।",
    reminderBeforeLabel: "ਪਹਿਲਾਂ ਯਾਦ ਕਰਾਓ (ਦਿਨ)",
    reminderOnDayLabel: "ਅਪਾਇੰਟਮੈਂਟ ਵਾਲੇ ਦਿਨ ਯਾਦ ਕਰਾਓ (ਮਿੰਟ)",
    day: "ਦਿਨ",
    days: "ਦਿਨ",
    min: "ਮਿੰਟ",
    hour: "ਘੰਟਾ",
    hours: "ਘੰਟੇ",
    toastMedicineSaved: "💊 ਦਵਾਈ ਦੀ ਪ੍ਰਿਸਕ੍ਰਿਪਸ਼ਨ ਡਾਟਾਬੇਸ ਵਿੱਚ ਸੇਵ ਹੋ ਗਈ!",
    noRemindersSelected: "⚠️ ਕਿਰਪਾ ਕਰਕੇ ਘੱਟੋ-ਘੱਟ ਇੱਕ ਰਿਮਾਈਂਡਰ ਸਮਾਂ ਚੁਣੋ।"
  }
};

// ── PER-USER LOCALSTORAGE KEYS ──
const currentUsername = document.body.dataset.username || '';

function userKey(base) {
    return base + '_' + (currentUsername || 'guest');
}

['appointments', 'medicines', 'userProfile'].forEach(k => {
  if (localStorage.getItem(k) !== null) localStorage.removeItem(k);
});

// ── LANGUAGE SELECTION ──
let currentLang = localStorage.getItem('selectedLanguage') || 'en';
let langData = homeTranslations[currentLang] || homeTranslations.en;

function openLanguageModal() {
  document.getElementById('languageModal').classList.add('open');
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

function selectLanguage(lang) {
  if (homeTranslations[lang]) {
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang);
    langData = homeTranslations[lang];
    applyHomeLanguage();
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    showToast(langData.toastLanguageChanged + langData.healthGuardianTitle, 'green');
    closeModal('languageModal');
  }
}

function applyHomeLanguage() {
  const d = langData;
  document.documentElement.lang = currentLang;

  document.getElementById('healthGuardianTitle').textContent = d.healthGuardianTitle;

  document.getElementById('healthScoreLabel').textContent = d.healthScoreLabel;
  document.getElementById('nextMedicineLabel').textContent = d.nextMedicineLabel;
  document.getElementById('todaysMedicinesLabel').textContent = d.todaysMedicinesLabel;

  document.getElementById('healthMonitoringTitle').textContent = d.healthMonitoringTitle;
  document.getElementById('bpLabel').textContent = d.bpLabel;
  document.getElementById('bloodSugarLabel').textContent = d.bloodSugarLabel;
  document.getElementById('weightLabel').textContent = d.weightLabel;
  document.getElementById('bloodGroupLabel').textContent = d.bloodGroupLabel;
  document.getElementById('updateHealthDataLabel').textContent = d.updateHealthDataLabel;
  document.getElementById('bpFieldLabel').textContent = d.bpFieldLabel;
  document.getElementById('sugarFieldLabel').textContent = d.sugarFieldLabel;
  document.getElementById('weightFieldLabel').textContent = d.weightFieldLabel;
  document.getElementById('bgFieldLabel').textContent = d.bgFieldLabel;
  document.getElementById('selectOption').textContent = d.selectOption;
  document.getElementById('saveHealthBtn').textContent = d.saveHealthBtn;
  document.getElementById('uploadReportText').textContent = d.uploadReportText;

  document.getElementById('medicineAppointmentTitle').textContent = d.medicineAppointmentTitle;

  document.getElementById('healthTrackerTitle').textContent = d.healthTrackerTitle;
  document.getElementById('bpTab').textContent = d.bpTab;
  document.getElementById('sugarTab').textContent = d.sugarTab;
  document.getElementById('weightTab').textContent = d.weightTab;

  document.getElementById('healthGuardianAITitle').textContent = d.healthGuardianAITitle;
  document.getElementById('aiDescText').textContent = d.aiDescText;
  document.getElementById('startChatText').textContent = d.startChatText;

  document.getElementById('emergencyTitle').textContent = d.emergencyTitle;
  document.getElementById('emergencyDesc').textContent = d.emergencyDesc;
  document.getElementById('emergencyBtn').textContent = d.emergencyBtn;
  document.getElementById('emergencyContactText').textContent = d.emergencyContactText;
  document.getElementById('familyContactText').textContent = d.familyContactText;

  document.getElementById('uploadReportModalTitle').textContent = d.uploadReportModalTitle;
  document.getElementById('cameraText').textContent = d.cameraText;
  document.getElementById('galleryText').textContent = d.galleryText;
  document.getElementById('addMedModalTitle').textContent = d.addMedModalTitle;
  document.getElementById('scanUploadText').textContent = d.scanUploadText;
  document.getElementById('medCameraText').textContent = d.medCameraText;
  document.getElementById('medGalleryText').textContent = d.medGalleryText;
  document.getElementById('todaysMedicinesModalTitle').textContent = d.todaysMedicinesModalTitle;

  document.getElementById('chatModalTitle').textContent = d.chatModalTitle;
  document.getElementById('savedHistoryBtn').textContent = d.savedHistoryBtn;
  document.getElementById('chatHistoryModalTitle').textContent = d.chatHistoryModalTitle;
  document.getElementById('chatHistoryEmpty').textContent = d.noChatHistoryMsg;
  document.getElementById('chatWelcomeMsg').textContent = d.chatWelcomeMsg;
  document.getElementById('chatSendBtn').textContent = d.chatSendBtn;
  document.getElementById('dietChatModalTitle').textContent = d.dietChatModalTitle;
  document.getElementById('dietChatWelcome').textContent = d.dietChatWelcome;
  document.getElementById('dietSendBtn').textContent = d.dietSendBtn;
  document.getElementById('dietVoiceBtn').textContent = d.dietVoiceBtn;
  document.getElementById('emergencyAlertSent').textContent = d.emergencyAlertSent;
  document.getElementById('emergencyPopupDesc').innerHTML = d.emergencyPopupDesc;
  document.getElementById('emergencyContactSent').textContent = d.emergencyContactSent;
  document.getElementById('familyContactSent').textContent = d.familyContactSent;
  document.getElementById('alertSentText').textContent = d.alertSentText;
  document.getElementById('alertSentText2').textContent = d.alertSentText;
  document.getElementById('gotItBtn').textContent = d.gotItBtn;
  document.getElementById('privacyTitle').textContent = d.privacyTitle;
  document.getElementById('termsTitle').textContent = d.termsTitle;
  document.getElementById('termsText1').textContent = d.termsText1;
  document.getElementById('privacyTitle2').textContent = d.privacyTitle2;
  document.getElementById('privacyText1').textContent = d.privacyText1;
  document.getElementById('aiTitle').textContent = d.aiTitle;
  document.getElementById('aiText1').textContent = d.aiText1;
  document.getElementById('emergencyTitle2').textContent = d.emergencyTitle2;
  document.getElementById('emergencyText1').textContent = d.emergencyText1;
  document.getElementById('voiceTitle').textContent = d.voiceTitle;
  document.getElementById('voiceText1').textContent = d.voiceText1;
  document.getElementById('accountTitle').textContent = d.accountTitle;
  document.getElementById('accountText1').textContent = d.accountText1;
  document.getElementById('updatesTitle').textContent = d.updatesTitle;
  document.getElementById('updatesText1').textContent = d.updatesText1;
  document.getElementById('understandBtn').textContent = d.understandBtn;

  document.getElementById('editProfile').textContent = d.editProfile;
  document.getElementById('languageChange').textContent = d.languageChange;
  document.getElementById('privacySecurity').textContent = d.privacySecurity;
  document.getElementById('logOut').textContent = d.logOut;
  document.getElementById('chatInput').placeholder = d.chatPlaceholder;
  document.getElementById('dietChatInput').placeholder = d.dietPlaceholder;
  document.getElementById('langModalTitle').textContent = d.langModalTitle;
  document.getElementById('langSelectHint').textContent = d.langSelectHint;

  document.getElementById('profileUsernameLabel').textContent = d.profileUsernameFieldLabel;
  document.getElementById('profileAgeLabel').textContent = d.profileAgeFieldLabel;
  document.getElementById('profileGenderLabel').textContent = d.profileGenderFieldLabel;
  document.getElementById('profileDobLabel').textContent = d.profileDobFieldLabel;

  document.getElementById('addMedFormTitle').textContent = d.addMedFormTitle;
  document.getElementById('medNameLabel').textContent = d.medNameFieldLabel;
  document.getElementById('medNameInput').placeholder = d.medNamePlaceholder;
  document.getElementById('medTimeLabel').textContent = d.medTimeFieldLabel;
  document.getElementById('medDaysLabel').textContent = d.medDaysFieldLabel;
  document.getElementById('saveMedEntryText').textContent = d.saveMedEntryText;

  document.getElementById('scheduleMedTileText').textContent = d.scheduleMedTileText;
  document.getElementById('scheduleApptTileText').textContent = d.scheduleApptTileText;

  document.getElementById('todaysApptModalTitle').textContent = d.todaysApptModalTitle;
  document.getElementById('allApptEmpty').textContent = d.noAppointmentsAdded;
  document.getElementById('addApptFormTitle').textContent = d.addApptFormTitle;
  document.getElementById('apptDoctorLabel').textContent = d.apptDoctorLabel;
  document.getElementById('apptHospitalLabel').textContent = d.apptHospitalLabel;
  document.getElementById('apptDoctorInput').placeholder = d.apptDoctorPlaceholder;
  document.getElementById('apptDateLabel').textContent = d.apptDateLabel;
  document.getElementById('apptTimeLabel').textContent = d.apptTimeLabel;
  document.getElementById('saveApptEntryText').textContent = d.saveApptEntryText;

  document.getElementById('reminderBeforeLabel').textContent = d.reminderBeforeLabel;
  document.getElementById('reminderOnDayLabel').textContent = d.reminderOnDayLabel;

  setDynamicGreeting();
  if (typeof renderHomeMedicineList === 'function') renderHomeMedicineList();
  if (typeof renderNextMedicineStat === 'function') renderNextMedicineStat();
  if (typeof renderNextApptStat === 'function') renderNextApptStat();
  if (typeof renderMedicineList === 'function') renderMedicineList();
}

function setDynamicGreeting() {
  const h = new Date().getHours();
  let greeting = "";

  if (h >= 5 && h < 12) {
    greeting = langData.greetingPrefix || "Good Morning";
  } else if (h >= 12 && h < 16) {
    greeting = langData.goodAfternoon || "Good Afternoon";
  } else if (h >= 16 && h < 20) {
    greeting = langData.goodEvening || "Good Evening";
  } else {
    greeting = langData.goodNight || "Good Night";
  }

  document.getElementById("dynamicGreeting").textContent = greeting + ",";
}

try { applyHomeLanguage(); } catch (e) { console.error('applyHomeLanguage error:', e); }
renderHomeMedicineList();
renderNextMedicineStat();
if (typeof renderNextApptStat === 'function') renderNextApptStat();

// ── CAMERA UPLOAD FUNCTIONS ──
let cameraStream = null;

function openUploadModal() {
  document.getElementById('uploadModal').classList.add('open');
  const video = document.getElementById('cameraPreview');
  video.classList.remove('active');
  video.srcObject = null;
  document.getElementById('captureBtn').classList.remove('active');
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
}

function closeUploadModal() {
  document.getElementById('uploadModal').classList.remove('open');
  const video = document.getElementById('cameraPreview');
  video.classList.remove('active');
  video.srcObject = null;
  document.getElementById('captureBtn').classList.remove('active');
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
}

async function openCamera() {
  try {
    const video = document.getElementById('cameraPreview');
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    cameraStream = stream;
    video.srcObject = stream;
    video.classList.add('active');
    document.getElementById('captureBtn').classList.add('active');
    document.getElementById('uploadPreview').textContent = '📸 Camera is ready. Click "Capture Photo" to take a picture.';
  } catch(err) {
    console.error(err);
    showToast('⚠️ Camera access denied. Please allow camera permission.', 'red');
  }
}

function capturePhoto() {
  const video = document.getElementById('cameraPreview');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob(function(blob) {
    const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
    processReportFile(file);
  }, 'image/jpeg', 0.95);
}

function handleGalleryUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  processReportFile(file);
  event.target.value = '';
}

function processReportFile(file) {
  document.getElementById('uploadPreview').textContent = `✅ "${file.name}" uploaded & sent to AI for analysis.`;
  closeUploadModal();
  openChatPage();

  const win = document.getElementById('chatWindow');
  const imageUrl = URL.createObjectURL(file);
  win.innerHTML += `<div class="chat-msg user" style="background:transparent;padding:0;border:none;"><img src="${imageUrl}" alt="Uploaded report" style="width:140px;height:auto;border-radius:10px;display:block;box-shadow:0 2px 8px rgba(0,0,0,0.15);"></div>`;
  win.scrollTop = win.scrollHeight;

  const thinking = document.createElement('div');
  thinking.className = 'chat-msg ai';
  thinking.textContent = '📋 Analysing your report... Please wait.';
  win.appendChild(thinking);
  win.scrollTop = win.scrollHeight;
  showToast(langData.toastReportUploaded || 'Report uploaded! AI is analysing…', 'green');

  const formData = new FormData();
  formData.append('file', file);

  fetch('/upload_report', {
    method: 'POST',
    body: formData
  })
  .then(resp => resp.json())
  .then(data => {
    if (data.success) {
      const reply = data.reply || 'Report saved. No readable text found for analysis.';
      thinking.textContent = reply;
      if (isVoiceInput && typeof speakText === 'function') {
        speakText(reply);
      }
      isVoiceInput = false;
    } else {
      thinking.textContent = '⚠️ ' + (data.message || 'Could not analyse this report.');
    }
    win.scrollTop = win.scrollHeight;
  })
  .catch(e => {
    console.error(e);
    thinking.textContent = '⚠️ Connection error. Please try again.';
    win.scrollTop = win.scrollHeight;
  });
}

// ── ADD MEDICINE CAMERA FUNCTIONS ──
let medCameraStream = null;

function openMedModal() {
  document.getElementById('medModal').classList.add('open');
  const video = document.getElementById('medCameraPreview');
  video.classList.remove('active');
  video.srcObject = null;
  document.getElementById('medCaptureBtn').classList.remove('active');
  if (medCameraStream) {
    medCameraStream.getTracks().forEach(t => t.stop());
    medCameraStream = null;
  }
}

function closeMedModal() {
  document.getElementById('medModal').classList.remove('open');
  const video = document.getElementById('medCameraPreview');
  video.classList.remove('active');
  video.srcObject = null;
  document.getElementById('medCaptureBtn').classList.remove('active');
  if (medCameraStream) {
    medCameraStream.getTracks().forEach(t => t.stop());
    medCameraStream = null;
  }
}

async function openMedCamera() {
  try {
    const video = document.getElementById('medCameraPreview');
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    medCameraStream = stream;
    video.srcObject = stream;
    video.classList.add('active');
    document.getElementById('medCaptureBtn').classList.add('active');
    document.getElementById('medPreview').textContent = '📸 Camera is ready. Click "Capture Prescription" to take a picture.';
  } catch(err) {
    console.error(err);
    showToast('⚠️ Camera access denied. Please allow camera permission.', 'red');
  }
}

function captureMedPhoto() {
  const video = document.getElementById('medCameraPreview');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob(function(blob) {
    const file = new File([blob], 'med-prescription.jpg', { type: 'image/jpeg' });
    processMedFile(file);
  }, 'image/jpeg', 0.95);
}

function handleMedGalleryUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  processMedFile(file);
  event.target.value = '';
}

function processMedFile(file) {
  document.getElementById('medPreview').textContent = `✅ "${file.name}" scanned. Medicine details extracted and saved to database.`;
  closeMedModal();
  showToast(langData.toastMedicineSaved || '💊 Medicine prescription saved to database!', 'green');
  setTimeout(() => {
    showToast(langData.toastMedicineAdded || 'Medicine added from prescription! 💊', 'green');
  }, 1500);
}

// ── EXISTING FUNCTIONS ──
// CHANGED: 6 months -> 12 months
const GRAPH_MONTH_COUNT = 12;

function getLast6MonthLabels() {
  const labels = [];
  const year = new Date().getFullYear();
  for (let m = 1; m <= 12; m++) {
    const d = new Date(year, m - 1, 1);
    labels.push(d.toLocaleString('en-US', { month: 'short' }));
  }
  return labels;
}

// FIX: "months" is now `let` so it can be recalculated (was `const` before,
// which meant the x-axis labels were frozen at whatever they were on page load
// and never refreshed even when new months' data was saved).
let months = getLast6MonthLabels();

const graphData = {
  bp:     new Array(GRAPH_MONTH_COUNT).fill(null),
  sugar:  new Array(GRAPH_MONTH_COUNT).fill(null),
  weight: new Array(GRAPH_MONTH_COUNT).fill(null)
};
const graphLabels = { bp:'Blood Pressure (mmHg)', sugar:'Blood Sugar (mg/dL)', weight:'Weight (kg)' };
let currentGraph = 'bp';
let chart;

// NEW: wraps the <canvas id="healthChart"> in a horizontally scrollable
// inner div so 12 months of data have room to breathe instead of being
// squeezed into the visible width. The OUTER container (canvas's current
// parent) becomes the scroll viewport; an INNER div (wider than the
// viewport) holds the canvas so Chart.js draws it at full width.
function setupScrollableChartContainer() {
  const canvas = document.getElementById('healthChart');
  if (!canvas) return;

  // already wrapped (e.g. initChart called again) — nothing to do
  if (canvas.parentElement && canvas.parentElement.id === 'healthChartScrollInner') return;

  const outer = canvas.parentElement;
  if (!outer) return;

  // IMPORTANT — measure BEFORE inserting the wide inner content.
  // `.graph-wrap` is a flex item (inside `.card`, itself a CSS grid item).
  // Flex/grid items default to `min-width: auto`, meaning they grow to
  // fit their content's min-content size instead of shrinking — so once
  // a wide (1800px) div goes inside, `.graph-wrap`, `.card`, and the grid
  // track around it all stretch to fit it, blowing out the whole page
  // horizontally instead of scrolling locally. Locking the container to
  // its real (pre-injection) width, and forcing min-width:0, stops that:
  // the oversized inner div then overflows only within this fixed box.
  const naturalWidth = outer.getBoundingClientRect().width;
  outer.style.width = naturalWidth + 'px';
  outer.style.maxWidth = naturalWidth + 'px';
  outer.style.minWidth = '0';

  const inner = document.createElement('div');
  inner.id = 'healthChartScrollInner';

  // width per month "column". This must exceed the card's own width for
  // the scroll to actually trigger — the "Health Tracker" card sits in a
  // 2-column CSS grid (.content { grid-template-columns: 1fr 1fr }), so on
  // most screens it's comfortably wider than a small fixed width, meaning
  // the graph would just fit with no scroll at all. 150px/month keeps the
  // total width (150 * 12 = 1800px) reliably wider than the card on
  // virtually any screen, so the scroll shows up consistently. Tweak this
  // number directly if it still doesn't scroll on your screen, or feels
  // too spread out / cramped.
  const pxPerMonth = 150;
  inner.style.width = (pxPerMonth * GRAPH_MONTH_COUNT) + 'px';
  inner.style.height = '100%';

  outer.style.overflowX = 'auto';
  outer.style.overflowY = 'hidden';
  outer.style.webkitOverflowScrolling = 'touch'; // smooth momentum scroll on iOS

  outer.insertBefore(inner, canvas);
  inner.appendChild(canvas);
}

function initChart() {
  setupScrollableChartContainer();
  const ctx = document.getElementById('healthChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: graphLabels[currentGraph],
        data: graphData[currentGraph],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2563eb',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: '#f1f5fb' }, ticks: { font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });
}

function switchGraph(el, key) {
  document.querySelectorAll('.graph-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  currentGraph = key;
  chart.data.datasets[0].data = graphData[key];
  chart.data.datasets[0].label = graphLabels[key];
  chart.update();
}

initChart();

function formatMonthLabel(raw) {
  if (!raw) return '';
  let d = new Date(raw);
  if (isNaN(d)) {
    const parts = String(raw).split('-');
    if (parts.length >= 2) {
      d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
    }
  }
  if (isNaN(d)) return String(raw);
  return d.toLocaleString('en-US', { month: 'short' });
}

// NEW: real "YYYY-MM" calendar-month key, used to align backend data to
// actual calendar months instead of raw array position (fixes months
// getting skipped/compressed when a month has no saved data).
function monthKeyFromRaw(raw) {
  if (!raw) return null;
  let d = new Date(raw);
  if (isNaN(d)) {
    const parts = String(raw).split('-');
    if (parts.length >= 2) {
      d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
    }
  }
  if (isNaN(d)) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getLastNMonthKeys(n) {
  const keys = [];
  const year = new Date().getFullYear();
  for (let m = 1; m <= 12; m++) {
    keys.push(`${year}-${String(m).padStart(2, '0')}`);
  }
  return keys;
}

async function loadHealthHistory() {
  try {
    const res = await fetch('/get_health_history');
    const data = await res.json();
    if (!data.months || !data.months.length) return;

    // Map backend rows by real calendar-month key so a month with no
    // saved data becomes a gap (null) instead of shifting every later
    // month backward.
    const map = {};
    data.months.forEach((raw, idx) => {
      const key = monthKeyFromRaw(raw);
      if (key) {
        map[key] = {
          bp: data.bp ? data.bp[idx] : null,
          sugar: data.sugar ? data.sugar[idx] : null,
          weight: data.weight ? data.weight[idx] : null
        };
      }
    });

    const keys = getLastNMonthKeys(GRAPH_MONTH_COUNT);
    const newLabels = keys.map(k => formatMonthLabel(k + '-01'));

    keys.forEach((key, i) => {
      const entry = map[key];
      graphData.bp[i]     = entry ? entry.bp     : null;
      graphData.sugar[i]  = entry ? entry.sugar  : null;
      graphData.weight[i] = entry ? entry.weight : null;
    });

    months = newLabels;
    chart.data.labels = months;
    chart.data.datasets[0].data = graphData[currentGraph];
    chart.update();

    // most recent calendar month (within the window) that actually has data
    let lastKey = null;
    for (let i = keys.length - 1; i >= 0; i--) {
      if (map[keys[i]]) { lastKey = keys[i]; break; }
    }
    if (lastKey) {
      const entry = map[lastKey];
      if (entry.sugar != null) document.getElementById('sugarVal').textContent = entry.sugar;
      if (entry.weight != null) document.getElementById('weightVal').textContent = entry.weight;
      updateHealthScoreDisplay();
    }
  } catch (e) {
    console.error('loadHealthHistory error:', e);
  }
}

loadHealthHistory();

function saveHealthData() {
  const bp = document.getElementById('inputBP').value;
  const sugar = document.getElementById('inputSugar').value;
  const weight = document.getElementById('inputWeight').value;
  const bg = document.getElementById('inputBG').value;
  const lastIdx = graphData.bp.length - 1;

  if (bp) {
    document.getElementById('bpVal').textContent = bp;
    const systolic = parseFloat(bp.split('/')[0]);
    if (!isNaN(systolic)) graphData.bp[lastIdx] = systolic;
  }
  if (sugar) {
    document.getElementById('sugarVal').textContent = sugar;
    graphData.sugar[lastIdx] = Number(sugar);
  }
  if (weight) {
    document.getElementById('weightVal').textContent = weight;
    graphData.weight[lastIdx] = Number(weight);
  }
  if (bg) document.getElementById('bgVal').textContent = bg;

  chart.data.datasets[0].data = graphData[currentGraph];
  chart.update();
  updateHealthScoreDisplay();

  const formData = new FormData();
  formData.append("bp", bp);
  formData.append("sugar", sugar);
  formData.append("weight", weight);
  formData.append("blood_group", bg);

  fetch("/save_health", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    if (data === "success") {
      console.log("Health data saved successfully.");
      loadHealthHistory();
    } else {
      console.log("Database save failed.");
    }
  })
  .catch(error => console.error(error));

  showToast(langData.toastHealthUpdated || '✅ Health data updated!', 'green');
}

function calculateHealthScore() {
  const bpText = document.getElementById('bpVal').textContent.trim();
  const sugarText = document.getElementById('sugarVal').textContent.trim();
  const weightText = document.getElementById('weightVal').textContent.trim();

  let score = 100;
  let factors = 0;

  if (bpText && bpText !== '--') {
    const parts = bpText.split('/');
    const systolic = parseFloat(parts[0]);
    const diastolic = parseFloat(parts[1]);
    if (!isNaN(systolic) && !isNaN(diastolic)) {
      factors++;
      if (systolic >= 140 || diastolic >= 90) score -= 25;
      else if (systolic >= 130 || diastolic >= 85) score -= 15;
      else if (systolic > 120 || diastolic > 80) score -= 8;
      else if (systolic < 90 || diastolic < 60) score -= 15;
    }
  }

  if (sugarText && sugarText !== '--') {
    const sugar = Number(sugarText);
    if (!isNaN(sugar) && sugar > 0) {
      factors++;
      if (sugar > 180) score -= 25;
      else if (sugar > 125) score -= 18;
      else if (sugar > 100) score -= 8;
      else if (sugar < 70) score -= 15;
    }
  }

  if (weightText && weightText !== '--') {
    const weight = Number(weightText);
    if (!isNaN(weight) && weight > 0) {
      factors++;
      if (weight < 40 || weight > 100) score -= 10;
      else if (weight < 45 || weight > 90) score -= 5;
    }
  }

  if (factors === 0) return null;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function updateHealthScoreDisplay() {
  const score = calculateHealthScore();
  const scoreEl = document.getElementById('healthScoreVal');
  const goodEl = document.getElementById('goodLabel');

  if (score === null) {
    scoreEl.textContent = '--';
    goodEl.textContent = '';
    return;
  }

  scoreEl.textContent = score;

  if (score >= 85) {
    goodEl.textContent = langData.goodLabel || 'Good';
    goodEl.style.color = 'var(--green)';
  } else if (score >= 65) {
    goodEl.textContent = 'Fair';
    goodEl.style.color = '#f59e0b';
  } else {
    goodEl.textContent = 'Low';
    goodEl.style.color = 'var(--red)';
  }
}

// ── SHARED AUDIO CONTEXT ──
let sharedAudioCtx = null;
function getAudioCtx() {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioContext();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}
document.addEventListener('click', () => { getAudioCtx(); }, { once: true });
document.addEventListener('touchstart', () => { getAudioCtx(); }, { once: true });

function markMedItem(id, type) {
  const medicines = getMedicines();
  const m = medicines.find(x => x.id === id);
  if (!m) return;

  const alreadyLoggedToday = m.takenToday || m.missedToday;
  if (!alreadyLoggedToday && m.durationDays) {
    m.daysCompleted = (m.daysCompleted || 0) + 1;
  }

  if (type === 'taken') {
    m.takenToday = true;
    m.missedToday = false;
    saveMedicines(medicines);
    showToast(langData.toastTaken || 'Thank you! 💊 Medicine marked as taken.', 'green');
  } else {
    m.missedToday = true;
    m.takenToday = false;
    saveMedicines(medicines);
    showToast(langData.toastMissed || '⚠️ Medicine missed! Alarm will ring as reminder.', 'red');
    try {
      const ac = getAudioCtx();
      for (let i = 0; i < 3; i++) {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain); gain.connect(ac.destination);
        osc.frequency.setValueAtTime(880, ac.currentTime + i * 0.7);
        gain.gain.setValueAtTime(0.3, ac.currentTime + i * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + i * 0.7 + 0.5);
        osc.start(ac.currentTime + i * 0.7);
        osc.stop(ac.currentTime + i * 0.7 + 0.5);
      }
    } catch(e) {}
  }
  const courseFinished = m.durationDays && (m.daysCompleted || 0) >= m.durationDays;
  if (courseFinished) {
    deleteMedicineEntry(id);
    try { if (typeof renderNextApptStat === 'function') renderNextApptStat(); } catch(e) {}
    return;
  }

  try { renderNextMedicineStat(); } catch(e) {}
  try { renderHomeMedicineList(); } catch(e) {}
  try { if (typeof renderNextApptStat === 'function') renderNextApptStat(); } catch(e) {}
  try { renderMedicineList(); } catch(e) {}
}

function openAllMedicines() {
  renderMedicineList();
  document.getElementById('allMedModal').classList.add('open');
}

function getMedicines() {
  try { return JSON.parse(localStorage.getItem(userKey('medicines')) || '[]'); } catch(e) { return []; }
}

function saveMedicines(list) {
  localStorage.setItem(userKey('medicines'), JSON.stringify(list));
}

function getNextUpcomingMedicine() {
  const medicines = getMedicines();
  if (!medicines.length) return null;
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  let best = null, bestDiff = Infinity;
  medicines.forEach(m => {
    if (!isMedicineCourseActive(m)) return;
    const parts = (m.time || '').split(':').map(Number);
    if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return;
    const mins = parts[0] * 60 + parts[1];
    let diff = mins - nowMinutes;
    if (diff < 0) diff += 24 * 60;
    if (m.takenToday || m.missedToday) diff += 24 * 60;
    if (diff < bestDiff) { bestDiff = diff; best = m; }
  });
  return best;
}

function toggleNextMedicineDropdown(e) {
  if (e) e.stopPropagation();
  const dd = document.getElementById('nextMedicineDropdown');
  if (!dd) return;
  dd.style.display = (dd.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener('click', function() {
  const dd = document.getElementById('nextMedicineDropdown');
  if (dd) dd.style.display = 'none';
});

function renderNextMedicineStat() {
  const valEl = document.getElementById('nextMedTimeVal');
  const subEl = document.getElementById('paracetamolLabel');
  const cardEl = document.getElementById('nextMedicineStatCard');
  const ddEl = document.getElementById('nextMedicineDropdown');
  if (!valEl || !subEl || !cardEl || !ddEl) return;

  const medicines = getMedicines();
  const next = getNextUpcomingMedicine();

  if (next) {
    valEl.textContent = formatTime12(next.time);
    subEl.textContent = next.name;
  } else {
    valEl.textContent = '--';
    subEl.textContent = '';
  }

  if (medicines.length > 1) {
    cardEl.style.cursor = 'pointer';
    cardEl.onclick = toggleNextMedicineDropdown;
    const sorted = [...medicines].sort((a, b) => {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const diff = m => {
        const [h, mi] = (m.time || '0:0').split(':').map(Number);
        let d = (h * 60 + mi) - nowMinutes;
        if (d < 0) d += 24 * 60;
        if (m.takenToday || m.missedToday) d += 24 * 60;
        return d;
      };
      return diff(a) - diff(b);
    });
    ddEl.innerHTML = sorted.map(m => `
      <div style="display:flex;justify-content:space-between;gap:8px;padding:8px 6px;border-bottom:1px solid var(--border);font-size:12px;">
        <span style="font-weight:700;color:var(--text-dark);">${escapeHtml(m.name)}</span>
        <span style="color:var(--text-mid);">${formatTime12(m.time)}</span>
      </div>
    `).join('');
  } else {
    cardEl.style.cursor = 'default';
    cardEl.onclick = null;
    ddEl.style.display = 'none';
    ddEl.innerHTML = '';
  }
}

function getNextUpcomingAppointment() {
  const appointments = getAppointments();
  if (!appointments.length) return null;
  const now = new Date();
  let best = null, bestDiff = Infinity;
  appointments.forEach(a => {
    if (!a.date || !a.time) return;
    const dt = new Date(a.date + 'T' + a.time + ':00');
    const diff = dt.getTime() - now.getTime();
    if (diff >= 0 && diff < bestDiff) { bestDiff = diff; best = a; }
  });
  if (!best) {
    const sorted = [...appointments].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    best = sorted[0];
  }
  return best;
}

function toggleNextApptDropdown(e) {
  if (e) e.stopPropagation();
  const dd = document.getElementById('nextApptDropdown');
  if (!dd) return;
  dd.style.display = (dd.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener('click', function() {
  const dd = document.getElementById('nextApptDropdown');
  if (dd) dd.style.display = 'none';
});

function renderNextApptStat() {
  const valEl = document.getElementById('medsTakenVal');
  const subEl = document.getElementById('takenLabel');
  const cardEl = document.getElementById('nextApptStatCard');
  const ddEl = document.getElementById('nextApptDropdown');
  if (!valEl || !subEl || !cardEl || !ddEl) return;

  const appointments = getAppointments();
  const next = getNextUpcomingAppointment();

  if (next) {
    valEl.textContent = formatApptDate(next.date) + ' • ' + formatTime12(next.time);
    subEl.textContent = next.doctor || '';
  } else {
    valEl.textContent = '--';
    subEl.textContent = '';
  }

  if (appointments.length > 1) {
    cardEl.style.cursor = 'pointer';
    cardEl.onclick = toggleNextApptDropdown;
    const sorted = [...appointments].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    ddEl.innerHTML = sorted.map(a => `
      <div style="display:flex;justify-content:space-between;gap:8px;padding:8px 6px;border-bottom:1px solid var(--border);font-size:12px;">
        <span style="font-weight:700;color:var(--text-dark);">${escapeHtml(a.doctor)}</span>
        <span style="color:var(--text-mid);">${formatApptDate(a.date)} • ${formatTime12(a.time)}</span>
      </div>
    `).join('');
  } else {
    cardEl.style.cursor = 'default';
    cardEl.onclick = null;
    ddEl.style.display = 'none';
    ddEl.innerHTML = '';
  }
}

function renderHomeMedicineList() {
  const container = document.getElementById('allMedicinesInlineList');
  const emptyEl = document.getElementById('noMedicinesInlineMsg');
  if (!container) return;
  const medicines = getMedicines();

  if (!medicines.length) {
    container.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';

  const takenLabel = (langData && langData.takenBtnText) ? langData.takenBtnText : 'Taken';
  const missedLabel = (langData && langData.missedBtnText) ? langData.missedBtnText : 'Missed';

  container.innerHTML = medicines.map(m => {
    const active = isMedicineCourseActive(m);
    let daysInfo = '';
    if (m.durationDays) {
      const remaining = m.durationDays - (m.daysCompleted || 0);
      daysInfo = remaining > 0
        ? `<div style="font-size:11px;color:var(--text-mid);margin-top:2px;">${remaining} day${remaining === 1 ? '' : 's'} left</div>`
        : `<div style="font-size:11px;color:var(--text-light);margin-top:2px;">✅ Course completed</div>`;
    }
    return `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--border);${active ? '' : 'opacity:0.55;'}">
      <div style="flex:1;min-width:0;">
        <div class="medicine-name" style="font-size:14px;">${escapeHtml(m.name)}</div>
        <div class="medicine-time" style="margin-top:2px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${formatTime12(m.time)}</span>
        </div>
        ${daysInfo}
      </div>
      ${isMedActionWindowOpen(m) ? `
      <div style="display:flex;gap:6px;flex-shrink:0;">
        <button class="btn-outline taken" onclick="markMedItem('${m.id}','taken')" style="padding:6px 10px;font-size:11px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><polyline points="20 6 9 17 4 12"/></svg>
          ${takenLabel}
        </button>
        <button class="btn-outline missed" onclick="markMedItem('${m.id}','missed')" style="padding:6px 10px;font-size:11px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ${missedLabel}
        </button>
      </div>
      ` : ''}
    </div>
  `;
  }).join('');
}

function isMedActionWindowOpen(m) {
  if (m.takenToday || m.missedToday) return false;
  if (!isMedicineCourseActive(m)) return false;
  const parts = (m.time || '').split(':').map(Number);
  if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return false;
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const targetMinutes = parts[0] * 60 + parts[1];
  let diff = targetMinutes - nowMinutes;
  if (diff > 12 * 60) diff -= 24 * 60;
  if (diff < -12 * 60) diff += 24 * 60;
  return diff <= 5;
}

function toggleMedDeletePanel() {
  const editP = document.getElementById('medEditPanel');
  if (editP) editP.style.display = 'none';
  const p = document.getElementById('medDeletePanel');
  if (!p) return;
  const show = p.style.display !== 'flex';
  p.style.display = show ? 'flex' : 'none';
  if (show) renderMedDeletePanel();
}

function renderMedDeletePanel() {
  const p = document.getElementById('medDeletePanel');
  if (!p) return;
  const medicines = getMedicines();
  if (!medicines.length) {
    p.innerHTML = '<div style="font-size:12px;color:var(--text-mid);">No medicines to delete.</div>';
    return;
  }
  p.innerHTML = medicines.map(m => `
    <div style="display:flex;align-items:center;justify-content:space-between;background:var(--blue-mid);border-radius:8px;padding:8px 10px;">
      <span style="font-size:13px;font-weight:700;color:var(--text-dark);">${escapeHtml(m.name)} <span style="font-weight:400;color:var(--text-mid);">(${formatTime12(m.time)})</span></span>
      <svg onclick="deleteMedicineEntry('${m.id}'); renderMedDeletePanel();" style="width:16px;height:16px;color:#dc2626;cursor:pointer;flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
    </div>
  `).join('');
}

function toggleMedEditPanel() {
  const delP = document.getElementById('medDeletePanel');
  if (delP) delP.style.display = 'none';
  const p = document.getElementById('medEditPanel');
  if (!p) return;
  const show = p.style.display !== 'flex';
  p.style.display = show ? 'flex' : 'none';
  if (show) renderMedEditPickList();
}

function renderMedEditPickList() {
  const p = document.getElementById('medEditPanel');
  if (!p) return;
  const medicines = getMedicines();
  if (!medicines.length) {
    p.innerHTML = '<div style="font-size:12px;color:var(--text-mid);">No medicines to edit.</div>';
    return;
  }
  p.innerHTML = medicines.map(m => `
    <div onclick="openMedEditForm('${m.id}')" style="cursor:pointer;background:var(--blue-mid);border-radius:8px;padding:8px 10px;font-size:13px;font-weight:700;color:var(--text-dark);">
      ${escapeHtml(m.name)} <span style="font-weight:400;color:var(--text-mid);">(${formatTime12(m.time)})</span>
    </div>
  `).join('');
}

function openMedEditForm(id) {
  const medicines = getMedicines();
  const m = medicines.find(x => x.id === id);
  if (!m) return;
  const parts = m.time.split(':').map(Number);
  const h = parts[0], mi = parts[1];
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const p = document.getElementById('medEditPanel');
  if (!p) return;
  p.innerHTML = `
    <div class="field-group" style="margin-bottom:8px;">
      <span class="field-label">Medicine Name</span>
      <input type="text" class="field-input" id="editMedNameInput" value="${escapeHtml(m.name)}" style="width:100%;">
    </div>
    <div class="field-group" style="margin-bottom:8px;">
      <span class="field-label">Reminder Time</span>
      <div style="display:flex;gap:6px;">
        <select class="field-input" id="editMedHourInput" style="flex:1;"></select>
        <select class="field-input" id="editMedMinuteInput" style="flex:1;"></select>
        <select class="field-input" id="editMedAmPmInput" style="flex:1;">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
    <button class="btn-blue" style="width:100%;padding:10px;" onclick="saveMedEdit('${id}')">Save Changes</button>
  `;
  populateTimeDropdown('editMedHourInput', 'editMedMinuteInput');
  document.getElementById('editMedHourInput').value = String(h12);
  document.getElementById('editMedMinuteInput').value = String(mi);
  document.getElementById('editMedAmPmInput').value = ampm;
}

function saveMedEdit(id) {
  const name = document.getElementById('editMedNameInput').value.trim();
  const time = get24HourTime('editMedHourInput', 'editMedMinuteInput', 'editMedAmPmInput');
  if (!name || !time) {
    showToast('⚠️ Please enter medicine name and time.', 'red');
    return;
  }
  const medicines = getMedicines();
  const m = medicines.find(x => x.id === id);
  if (m) {
    m.name = name;
    m.time = time;
    m.lastFiredDate = null;
    saveMedicines(medicines);
    renderHomeMedicineList();
    renderNextMedicineStat();
    renderMedicineList();
    showToast('✅ Medicine updated', 'green');
  }
  const p = document.getElementById('medEditPanel');
  if (p) p.style.display = 'none';
}

function renderMedicineList() {
  const listEl = document.getElementById('allMedList');
  const emptyEl = document.getElementById('allMedEmpty');
  if (!listEl || !emptyEl) return;

  const medicines = getMedicines();

  if (!medicines.length) {
    listEl.innerHTML = '';
    emptyEl.style.display = 'block';
    return;
  }
  emptyEl.style.display = 'none';

  listEl.innerHTML = medicines.map(m => `
    <div style="display:flex;align-items:center;justify-content:space-between;background:var(--blue-mid);border-radius:10px;padding:10px 12px;gap:8px;">
      <div style="flex:1;min-width:0;">
        <div style="font-size:13px;font-weight:700;color:var(--text-dark);">${escapeHtml(m.name)}</div>
        <div style="font-size:11px;color:var(--text-mid);">⏰ ${formatTime12(m.time)}${m.takenToday ? ' • ✅' : ''}</div>
      </div>
      <svg onclick="deleteMedicineEntry('${m.id}')" style="width:16px;height:16px;color:var(--text-mid);cursor:pointer;flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
    </div>
  `).join('');
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function populateTimeDropdown(hourId, minuteId) {
  const hourEl = document.getElementById(hourId);
  const minEl = document.getElementById(minuteId);
  if (hourEl && !hourEl.options.length) {
    for (let h = 1; h <= 12; h++) {
      hourEl.innerHTML += `<option value="${h}">${h}</option>`;
    }
  }
  if (minEl && !minEl.options.length) {
    for (let m = 0; m < 60; m++) {
      minEl.innerHTML += `<option value="${m}">${String(m).padStart(2, '0')}</option>`;
    }
  }
}
populateTimeDropdown('medHourInput', 'medMinuteInput');
populateTimeDropdown('apptHourInput', 'apptMinuteInput');

function get24HourTime(hourId, minuteId, ampmId) {
  const h12 = parseInt(document.getElementById(hourId).value, 10);
  const m = parseInt(document.getElementById(minuteId).value, 10);
  const ampm = document.getElementById(ampmId).value;
  if (isNaN(h12) || isNaN(m)) return '';
  let h24 = h12 % 12;
  if (ampm === 'PM') h24 += 12;
  return `${String(h24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function formatTime12(t) {
  if (!t) return '--';
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

function addMedicineEntry() {
  const name = document.getElementById('medNameInput').value.trim();
  const time = get24HourTime('medHourInput', 'medMinuteInput', 'medAmPmInput');
  const daysRaw = document.getElementById('medDaysInput').value.trim();
  const durationDays = daysRaw ? parseInt(daysRaw, 10) : null;

  if (!name || !time) {
    showToast('⚠️ Please enter medicine name and reminder time.', 'red');
    return;
  }
  if (daysRaw && (isNaN(durationDays) || durationDays < 1)) {
    showToast('⚠️ Please enter a valid number of days.', 'red');
    return;
  }

  const medicines = getMedicines();
  medicines.push({
    id: 'med_' + Date.now(),
    name, time,
    lastFiredDate: null,
    lastResetDate: null,
    takenToday: false,
    durationDays: durationDays,
    daysCompleted: 0,
    startDate: new Date().toISOString().slice(0, 10)
  });
  saveMedicines(medicines);
  const formData = new FormData();
  formData.append("medicine_name", name);
  formData.append("reminder_time", time);

  fetch("/save_medicine", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    if(data === "success"){
      console.log("Medicine Saved");
    }else{
      console.log(data);
    }
  });

  document.getElementById('medNameInput').value = '';
  document.getElementById('medHourInput').selectedIndex = 0;
  document.getElementById('medMinuteInput').selectedIndex = 0;
  document.getElementById('medAmPmInput').selectedIndex = 0;
  document.getElementById('medDaysInput').value = '';

  renderMedicineList();
  renderHomeMedicineList();
  renderNextMedicineStat();
  showToast('💊 Medicine added — reminder set for ' + formatTime12(time), 'green');
}

function isMedicineCourseActive(m) {
  if (!m.durationDays) return true;
  return (m.daysCompleted || 0) < m.durationDays;
}

function deleteMedicineEntry(id) {
  const medicines = getMedicines().filter(m => m.id !== id);
  saveMedicines(medicines);
  renderMedicineList();
  renderHomeMedicineList();
  renderNextMedicineStat();
}

function ringMedicineAlarm(med) {
  renderHomeMedicineList();
  renderNextMedicineStat();

  showToast('🔔 Your Medicine time is up, ' + med.name + (med.dose ? ' (' + med.dose + ')' : ''), 'green');
  speakText('Your Medicine time is up, ' + med.name + (med.dose ? ', ' + med.dose : '') + '.');
  try {
    const ac = getAudioCtx();
    const ringCount = 5;
    const ringGap = 0.75;
    for (let i = 0; i < ringCount; i++) {
      const startAt = ac.currentTime + i * ringGap;
      [880, 660].forEach((freq, j) => {
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.connect(g); g.connect(ac.destination);
        osc.type = 'square';
        osc.frequency.value = freq;
        const t = startAt + j * 0.18;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.9, t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        osc.start(t);
        osc.stop(t + 0.2);
      });
    }
  } catch(e) {}

  setTimeout(() => {
    showToast('🔔 You\'re time to take ' + med.name + (med.dose ? ' (' + med.dose + ')' : ''), 'green');
    speakText('You\'re time to take ' + med.name + (med.dose ? ', ' + med.dose : '') + '.');
  }, 4000);

  setTimeout(() => {
    const medicines = getMedicines();
    const current = medicines.find(m => m.id === med.id);
    if (current && !current.takenToday) {
      showToast('🔔 You\'re time to take ' + current.name + (current.dose ? ' (' + current.dose + ')' : ''), 'red');
      speakText('You\'re time to take ' + current.name + (current.dose ? ', ' + current.dose : '') + '.');
    }
  }, 5 * 60 * 1000);
}

function checkScheduleAlarms() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const nowStr = `${hh}:${mm}`;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const todayStr = now.toDateString();
  const todayISO = now.toISOString().slice(0, 10);

  const medicines = getMedicines();
  let changed = false;
  medicines.forEach(m => {
    if (!isMedicineCourseActive(m)) return;
    const parts = (m.time || '').split(':').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const targetMinutes = parts[0] * 60 + parts[1];
      const resetMinute = (targetMinutes - 5 + 1440) % 1440;
      if (nowMinutes === resetMinute && m.lastResetDate !== todayStr) {
        m.takenToday = false;
        m.missedToday = false;
        m.lastResetDate = todayStr;
        changed = true;
      }
    }

    if (m.time === nowStr && m.lastFiredDate !== todayStr) {
      ringMedicineAlarm(m);
      m.lastFiredDate = todayStr;
      changed = true;
    }
  });
  if (changed) {
    saveMedicines(medicines);
    try { renderNextMedicineStat(); } catch(e) {}
    try { renderHomeMedicineList(); } catch(e) {}
  }

  checkAppointmentReminders();
}

// ── TODAY'S APPOINTMENTS FUNCTIONS WITH CHECKBOXES FOR MULTIPLE REMINDERS ──
function openAllAppointments() {
  renderAppointmentList();
  if (typeof renderNextApptStat === 'function') renderNextApptStat();
  document.getElementById('allApptModal').classList.add('open');
}

function getAppointments() {
  try { return JSON.parse(localStorage.getItem(userKey('appointments')) || '[]'); } catch(e) { return []; }
}

function saveAppointments(list) {
  localStorage.setItem(userKey('appointments'), JSON.stringify(list));
}

function formatApptDate(d) {
  if (!d) return '';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

function getSelectedCheckboxValues(containerId) {
  const container = document.getElementById(containerId);
  const checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(checkboxes).map(cb => parseInt(cb.value, 10));
}

function renderAppointmentList() {
  const listEl = document.getElementById('allApptList');
  const emptyEl = document.getElementById('allApptEmpty');
  const appointments = getAppointments().slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  if (!appointments.length) {
    listEl.innerHTML = '';
    emptyEl.style.display = 'block';
    return;
  }
  emptyEl.style.display = 'none';

  listEl.innerHTML = appointments.map(a => {
    const beforeReminders = a.reminderBeforeDays && a.reminderBeforeDays.length ? a.reminderBeforeDays.map(d => d + 'd').join(', ') : 'None';
    const dayReminders = a.reminderOnDayMin && a.reminderOnDayMin.length ? a.reminderOnDayMin.map(m => m + 'min').join(', ') : 'None';
    return `
    <div style="display:flex;align-items:center;justify-content:space-between;background:var(--blue-mid);border-radius:10px;padding:10px 12px;">
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--text-dark);">${escapeHtml(a.doctor)}</div>
        <div style="font-size:11px;color:var(--text-mid);">🏥 ${escapeHtml(a.hospital || '')}</div>
        <div style="font-size:11px;color:var(--text-mid);">📅 ${formatApptDate(a.date)} • ⏰ ${formatTime12(a.time)}</div>
        <div style="font-size:10px;color:var(--text-light);margin-top:2px;">
          ⏰ Before: ${beforeReminders} | Day: ${dayReminders}
        </div>
      </div>
      <svg onclick="deleteAppointmentEntry('${a.id}')" style="width:16px;height:16px;color:var(--text-mid);cursor:pointer;flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
    </div>
  `}).join('');
}

function addAppointmentEntry() {
  const doctor = document.getElementById('apptDoctorInput').value.trim();
  const hospital = document.getElementById('apptHospitalInput').value.trim();
  const date = document.getElementById('apptDateInput').value;
  const time = get24HourTime('apptHourInput', 'apptMinuteInput', 'apptAmPmInput');

  const beforeDays = getSelectedCheckboxValues('beforeDaysCheckboxes');
  const onDayMinutes = getSelectedCheckboxValues('onDayCheckboxes');

  if (!doctor || !date || !time) {
    showToast('⚠️ Please enter doctor name, date and time.', 'red');
    return;
  }

  if (beforeDays.length === 0 && onDayMinutes.length === 0) {
    showToast(langData.noRemindersSelected || '⚠️ Please select at least one reminder time.', 'red');
    return;
  }

  const appointments = getAppointments();
  appointments.push({
    id: 'appt_' + Date.now(),
    doctor,
    hospital: hospital || '',
    date,
    time,
    reminderBeforeDays: beforeDays,
    reminderOnDayMin: onDayMinutes,
    fired: false,
    remindersFired: {}
  });

  const newAppt = appointments[appointments.length - 1];
  beforeDays.forEach(d => { newAppt.remindersFired['before_' + d] = false; });
  onDayMinutes.forEach(m => { newAppt.remindersFired['onDay_' + m] = false; });

  saveAppointments(appointments);

  const formData = new FormData();
  formData.append("doctor_name", doctor);
  formData.append("hospital_name", hospital || '');
  formData.append("appointment_date", date);
  formData.append("appointment_time", time);
  formData.append("reminder_before_days", JSON.stringify(beforeDays));
  formData.append("reminder_on_day_min", JSON.stringify(onDayMinutes));

  fetch("/save_appointment", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => console.log(data))
  .catch(err => console.error(err));

  document.getElementById('apptDoctorInput').value = '';
  document.getElementById('apptHospitalInput').value = '';
  document.getElementById('apptDateInput').value = '';
  document.getElementById('apptHourInput').selectedIndex = 0;
  document.getElementById('apptMinuteInput').selectedIndex = 0;
  document.getElementById('apptAmPmInput').selectedIndex = 0;

  document.querySelectorAll('#beforeDaysCheckboxes input, #onDayCheckboxes input').forEach(cb => cb.checked = false);

  renderAppointmentList();
  if (typeof renderNextApptStat === 'function') renderNextApptStat();

  let reminderText = '';
  if (beforeDays.length) reminderText += beforeDays.map(d => d + 'd before').join(', ');
  if (onDayMinutes.length) {
    if (reminderText) reminderText += ' & ';
    reminderText += onDayMinutes.map(m => m + 'min before').join(', ');
  }

  showToast('📅 Appointment added — Reminders: ' + reminderText, 'green');
}

function deleteAppointmentEntry(id) {
  const appointments = getAppointments().filter(a => a.id !== id);
  saveAppointments(appointments);
  renderAppointmentList();
  if (typeof renderNextApptStat === 'function') renderNextApptStat();
}

// ── APPOINTMENT REMINDER FUNCTIONS WITH MULTIPLE REMINDERS ──
function checkAppointmentReminders() {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const todayStr = now.toISOString().slice(0, 10);

  const appointments = getAppointments();
  let changed = false;

  appointments.forEach(a => {
    if (!a.remindersFired) {
      a.remindersFired = {};
      if (a.reminderBeforeDays) {
        a.reminderBeforeDays.forEach(d => { a.remindersFired['before_' + d] = false; });
      }
      if (a.reminderOnDayMin) {
        a.reminderOnDayMin.forEach(m => { a.remindersFired['onDay_' + m] = false; });
      }
      changed = true;
    }

    const apptDateTime = new Date(a.date + 'T' + a.time + ':00');

    if (a.reminderBeforeDays && a.reminderBeforeDays.length) {
      a.reminderBeforeDays.forEach(days => {
        const key = 'before_' + days;
        if (!a.remindersFired[key]) {
          const reminderDateTime = new Date(apptDateTime.getTime() - days * 24 * 60 * 60 * 1000);

          if (now >= reminderDateTime && now < apptDateTime) {
            ringApptBeforeReminder(a, days);
            a.remindersFired[key] = true;
            changed = true;
          }
        }
      });
    }

    if (todayStr === a.date && a.reminderOnDayMin && a.reminderOnDayMin.length) {
      const apptTime = a.time.split(':').map(Number);
      const apptMinutes = apptTime[0] * 60 + apptTime[1];

      a.reminderOnDayMin.forEach(minutes => {
        const key = 'onDay_' + minutes;
        if (!a.remindersFired[key]) {
          const reminderMinutes = apptMinutes - minutes;

          if (nowMinutes >= reminderMinutes && now < apptDateTime) {
            ringApptOnDayReminder(a, minutes);
            a.remindersFired[key] = true;
            changed = true;
          }
        }
      });
    }
  });

  if (changed) saveAppointments(appointments);
}

function ringApptBeforeReminder(appt, days) {
  const dayText = days === 1 ? '1 day' : (days + ' days');
  const hospitalText = appt.hospital ? ' at ' + appt.hospital : '';
  const msg = `📅 Reminder: You have an appointment with ${appt.doctor}${hospitalText} in ${dayText} on ${formatApptDate(appt.date)} at ${formatTime12(appt.time)}.`;
  showToast(msg, 'green');
  speakText(`Reminder. You have an appointment with ${appt.doctor} in ${dayText} on ${formatApptDate(appt.date)} at ${formatTime12(appt.time)}.`);
  playAppointmentSound();
}

function ringApptOnDayReminder(appt, minutes) {
  const hospitalText = appt.hospital ? ' at ' + appt.hospital : '';
  const minutesText = minutes === 60 ? '1 hour' : (minutes + ' minutes');
  const msg = `⏰ ${minutesText} until your appointment with ${appt.doctor}${hospitalText} at ${formatTime12(appt.time)}.`;
  showToast(msg, 'green');
  speakText(`Reminder. ${minutesText} until your appointment with ${appt.doctor} at ${formatTime12(appt.time)}.`);
  playAppointmentSound();
}

function playAppointmentSound() {
  try {
    const ac = getAudioCtx();
    for (let i = 0; i < 4; i++) {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.frequency.setValueAtTime(770, ac.currentTime + i * 0.5);
      gain.gain.setValueAtTime(0.28, ac.currentTime + i * 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + i * 0.5 + 0.35);
      osc.start(ac.currentTime + i * 0.5);
      osc.stop(ac.currentTime + i * 0.5 + 0.35);
    }
  } catch(e) {}
}

setInterval(checkScheduleAlarms, 10000);
setInterval(function() { try { renderNextMedicineStat(); } catch(e) {} }, 10000);
checkScheduleAlarms();

async function sendDietChat() {
  const input = document.getElementById('dietChatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  const win = document.getElementById('dietChatWindow');
  win.innerHTML += `<div class="chat-msg user">${msg}</div>`;
  win.scrollTop = win.scrollHeight;
  const thinking = document.createElement('div');
  thinking.className = 'chat-msg ai'; thinking.textContent = '…';
  win.appendChild(thinking); win.scrollTop = win.scrollHeight;
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6', max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a friendly Diet AI assistant. The user's own saved data (use only what is present, ignore blanks): BP ${document.getElementById('bpVal').textContent}, Blood Sugar ${document.getElementById('sugarVal').textContent}, Weight ${document.getElementById('weightVal').textContent}, Blood Group ${document.getElementById('bgVal').textContent}, Breakfast ${document.getElementById('breakfastText').textContent}, Lunch ${document.getElementById('lunchText').textContent}, Dinner ${document.getElementById('dinnerText').textContent}. Answer the user's diet/nutrition question based only on their question and their own data above. Format each day and each meal on its own new line, using a line break after every meal entry. Query: ${msg}`
        }]
      })
    });
    const data = await resp.json();
    thinking.textContent = data.content?.[0]?.text || 'Sorry, I could not respond.';
  } catch(e) {
    thinking.textContent = '⚠️ Connection error. Please try again.';
  }
  win.scrollTop = win.scrollHeight;
}

function startDietVoiceInput() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showToast(langData.toastVoiceNotSupported || 'Voice not supported in this browser.', 'red'); return; }
  const r = new SR();
  r.lang = 'en-IN'; r.interimResults = false; r.maxAlternatives = 1;
  const status = document.getElementById('dietVoiceStatus');
  status.style.display = 'block'; status.textContent = '🎙 Listening… speak now';
  r.start();
  r.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    document.getElementById('dietChatInput').value = transcript;
    status.style.display = 'none';
    sendDietChat();
  };
  r.onerror = () => { status.style.display = 'none'; showToast(langData.toastCouldNotHear || 'Could not hear you. Try again.', 'red'); };
  r.onend = () => { status.style.display = 'none'; };
}

function startVoiceInput() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showToast(langData.toastVoiceNotSupported || 'Voice not supported in this browser.', 'red'); return; }
  const r = new SR();
  r.lang = 'en-IN'; r.interimResults = false; r.maxAlternatives = 1;
  const status = document.getElementById('voiceStatus');
  status.style.display = 'block'; status.textContent = '🎙 Listening… speak now';
  r.start();
  r.onresult = (e) => {
    const transcript = e.results[0][0].transcript;

    isVoiceInput = true;

    document.getElementById('chatInput').value = transcript;
    status.style.display = 'none';
    sendChat();
  };
  r.onerror = () => { status.style.display = 'none'; showToast(langData.toastCouldNotHear || 'Could not hear you. Try again.', 'red'); };
  r.onend = () => { status.style.display = 'none'; };
}

function speakText(text) {
  try {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-IN';
    utter.rate = 1;
    window.speechSynthesis.speak(utter);
  } catch(e) {}
}

function startVoiceInputGuardian() {
  document.getElementById('chatPageModal').classList.add('open');
  setTimeout(() => startVoiceInput(), 300);
}

function openChatPage() {
  document.getElementById('chatPageModal').classList.add('open');
}

function openPrivacyModal() {
  document.getElementById('privacyModal').classList.add('open');
}

function toggleProfileDropdown(e) {
  e.stopPropagation();
  document.getElementById('profileDropdown').classList.toggle('open');
}

async function openContactListModal(type) {
  const titleEl = document.getElementById("contactListModalTitle");
  const bodyEl = document.getElementById("contactListBody");

  const response = await fetch("/get_contacts");
  const data = await response.json();
  console.log(data);

  let items = [];

  if (type === "emergency") {
    titleEl.textContent = langData.emergencyContactText || "Emergency Contact";
    items = [
      { label: langData.ambulanceLabel || "Ambulance", value: data.ambulance_contact || "108" },
      { label: langData.fireBrigadeLabel || "Fire Brigade", value: data.fire_brigade_contact || "101" },
      { label: langData.doctorLabel || "Doctor", value: data.doctor_contact || "--" }
    ];
  } else {
    titleEl.textContent = langData.familyContactText || "Family Contact";
    const contactLabel = langData.contactLabel || "Contact";
    items = [
      { label: contactLabel + " 1", value: data.family_contact1 || "--" },
      { label: contactLabel + " 2", value: data.family_contact2 || "--" },
      { label: contactLabel + " 3", value: data.family_contact3 || "--" }
    ];
  }

  bodyEl.innerHTML = items.map((item, i) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;margin-bottom:12px;border:1px solid #fecaca;border-radius:10px;background:#fff5f5;">
      <div style="display:flex;gap:10px;align-items:center;">
        <span style="font-weight:700;color:#94a3b8;">${i+1}.</span>
        <span style="font-weight:600;">${item.label}</span>
      </div>
      <span style="font-weight:700;color:#ef4444;">${item.value}</span>
    </div>
  `).join("");

  document.getElementById("contactListModal").classList.add("open");
}

function closeProfileDropdown() {
  document.getElementById('profileDropdown').classList.remove('open');
}

function openProfileGallery(e) {
  e.stopPropagation();
  document.getElementById('avatarFileInput').click();
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const avatarEl = document.getElementById('profileAvatar');
    avatarEl.innerHTML = `<img src="${ev.target.result}" alt="Profile photo">`;
    const topbarAvatar = document.getElementById('topbarAvatar');
    if (topbarAvatar) topbarAvatar.innerHTML = `<img src="${ev.target.result}" alt="Profile photo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    try {
      const profile = JSON.parse(localStorage.getItem(userKey('userProfile')) || '{}');
      profile.avatar = ev.target.result;
      localStorage.setItem(userKey('userProfile'), JSON.stringify(profile));
    } catch(err) {}
    showToast('Profile photo updated', 'green');
  };
  reader.readAsDataURL(file);
}

function loadProfileInfo() {
  try {
    const profile = JSON.parse(localStorage.getItem(userKey("userProfile")) || "{}");
    if (profile.avatar) {
      const avatarEl = document.getElementById("profileAvatar");
      if (avatarEl) {
        avatarEl.innerHTML = `<img src="${profile.avatar}" alt="Profile photo">`;
      }
      const topbarAvatar = document.getElementById("topbarAvatar");
      if (topbarAvatar) {
        topbarAvatar.innerHTML = `<img src="${profile.avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
      }
    }
  } catch(err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", loadProfileInfo);

document.addEventListener("click", () => {
  document.getElementById("profileDropdown").classList.remove("open");
});

function openProfilePage() {
  localStorage.setItem("fromSwitchAccount","true");
  window.location.href = "lang.html#profileCard";
}

function openChatHistory() {

    const listEl = document.getElementById("chatHistoryList");
    const emptyEl = document.getElementById("chatHistoryEmpty");

    document.getElementById("chatHistoryModal").classList.add("open");

    listEl.innerHTML = "";
    emptyEl.style.display = "none";

    fetch("/get_chat_history")
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to load history");
        }
        return res.json();
    })
    .then(history => {

        if (history.length === 0) {
            emptyEl.style.display = "block";
            return;
        }

        listEl.innerHTML = history.map(chat => `

            <div
                onclick="openSavedChat(${chat.chat_id})"
                style="
                    cursor:pointer;
                    padding:12px;
                    border:1px solid #ddd;
                    border-radius:10px;
                    margin-bottom:10px;
                    background:#f8f9ff;
                    font-weight:600;
                ">

                📝 ${chat.question}

            </div>

        `).join("");

    })
    .catch(error => {

        console.error("History Error:", error);

        listEl.innerHTML = `
            <div style="color:red;text-align:center;padding:15px;">
                Could not load saved history.
            </div>
        `;
    });
}

async function openSavedChat(chatId) {

    try {
        const response = await fetch(`/get_chat/${chatId}`);

        if (!response.ok) {
            throw new Error("Failed to load chat");
        }

        const chat = await response.json();

        document.getElementById("chatHistoryModal").classList.remove("open");

        document.getElementById("chatPageModal").classList.add("open");

        const chatWindow = document.getElementById("chatWindow");

        chatWindow.innerHTML = `
            <div class="chat-msg user">
                ${escapeHtml(chat.question)}
            </div>

            <div class="chat-msg ai">
                ${escapeHtml(chat.response)}
            </div>
        `;

        chatWindow.scrollTop = chatWindow.scrollHeight;

    } catch (error) {
        console.error("Saved Chat Error:", error);
        alert("Could not load this conversation.");
    }
}
function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text || "";

    return div.innerHTML;
}

async function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();

  if (!msg) return;

  input.value = '';

  const win = document.getElementById('chatWindow');

  win.innerHTML += `<div class="chat-msg user">${msg}</div>`;
  win.scrollTop = win.scrollHeight;

  const thinking = document.createElement('div');
  thinking.className = 'chat-msg ai';
  thinking.textContent = 'Thinking...';
  win.appendChild(thinking);
  win.scrollTop = win.scrollHeight;

  try {
    const resp = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: msg
      })
    });

    const data = await resp.json();

    if (!resp.ok || !data.success) {
      throw new Error(data.error || data.reply || 'AI response failed');
    }

    const reply = data.reply;

    thinking.textContent = reply;

    if (isVoiceInput && typeof speakText === 'function') {
    speakText(reply);
}

isVoiceInput = false;

  } catch (error) {
    console.error('AI Error:', error);

    thinking.textContent =
      '⚠️ Sorry, I could not connect to the AI. Please try again.';
  }

  win.scrollTop = win.scrollHeight;
}

function openSavedChat(chatId) {

    fetch("/get_chat/" + chatId)
    .then(res => res.json())
    .then(chat => {

        document.getElementById("chatHistoryModal").classList.remove("open");

        document.getElementById("chatPageModal").classList.add("open");

        const win = document.getElementById("chatWindow");

        win.innerHTML = `
            <div class="chat-msg user">
                ${chat.question}
            </div>

            <div class="chat-msg ai">
                ${chat.response}
            </div>
        `;

        win.scrollTop = win.scrollHeight;

    });

}

function sendEmergency() {

    document.getElementById('emergencyPopup').classList.add('open');

    try {
        const ac = new (window.AudioContext || window.webkitAudioContext)();

        for (let i = 0; i < 3; i++) {

            const osc = ac.createOscillator();
            const gain = ac.createGain();

            osc.connect(gain);
            gain.connect(ac.destination);

            osc.type = "sine";
            osc.frequency.value = 1000;

            gain.gain.setValueAtTime(0.4, ac.currentTime + i * 0.5);
            gain.gain.exponentialRampToValueAtTime(
                0.001,
                ac.currentTime + i * 0.5 + 0.4
            );

            osc.start(ac.currentTime + i * 0.5);
            osc.stop(ac.currentTime + i * 0.5 + 0.4);
        }

    } catch (e) {
        console.log("Audio Error:", e);
    }

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return;
    }

    navigator.geolocation.watchPosition(

        function(position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            fetch("/emergency", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    latitude: latitude,
                    longitude: longitude
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.error(error);
            });

        },

        function(error) {

            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("Location permission denied.");
                    break;

                case error.POSITION_UNAVAILABLE:
                    alert("Location unavailable.");
                    break;

                case error.TIMEOUT:
                    alert("Location request timed out.");
                    break;

                default:
                    alert("Unknown location error.");
            }

        },

        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
        }

    );

}

function openMedModal() { document.getElementById('medModal').classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function logoutUser() {
  setTimeout(() => {
    fetch("/logout")
    .then(() => {
      window.location.href = "/";
    });
  }, 100);
}

function switchAccount() {
    window.location.href = "/switch_account";
}

function showToast(msg, type) {
  const t = document.getElementById("toast");
  if (!t) return;

  t.textContent = msg;
  t.className = `toast show ${type}`;

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    t.classList.remove("show");
  }, 3500);
}
document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
});

document.querySelectorAll('.checkbox-item').forEach(item => {
  item.addEventListener('click', function(e) {
    if (e.target.tagName === 'INPUT') return;
    const checkbox = this.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    this.classList.toggle('checked', checkbox.checked);
  });

  const checkbox = item.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', function() {
    this.closest('.checkbox-item').classList.toggle('checked', this.checked);
  });
});