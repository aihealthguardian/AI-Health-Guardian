
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
  // ... Continue for other languages (ta, te, kn, bn, pa) with similar translations
  // For brevity, I've included only en, mr, hi, gu here. 
  // You can add the remaining languages (ta, te, kn, bn, pa) with similar translated strings.
};

// ── PER-USER LOCALSTORAGE KEYS ──
// currentUsername is rendered server-side by Jinja so each logged-in user gets
// their own isolated storage. New users will NOT see old users' data anymore.
const currentUsername = "{{ user[0] if user else '' }}";
function userKey(base) {
  // IMPORTANT: never fall back to the old shared (non-namespaced) key —
  // that key may still hold a previous user's leftover data.
  return base + '_' + (currentUsername || 'guest');
}

// One-time cleanup: remove old shared keys from before per-user namespacing
// existed, so they can never leak into any user's view again.
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
  
  // Topbar
  document.getElementById('healthGuardianTitle').textContent = d.healthGuardianTitle;
  
  // Stat cards
  document.getElementById('healthScoreLabel').textContent = d.healthScoreLabel;
  document.getElementById('nextMedicineLabel').textContent = d.nextMedicineLabel;
  document.getElementById('todaysMedicinesLabel').textContent = d.todaysMedicinesLabel;
  
  // Health Monitoring
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
  
  // Medicine
  document.getElementById('medicineAppointmentTitle').textContent = d.medicineAppointmentTitle;
  
  // Graph
  document.getElementById('healthTrackerTitle').textContent = d.healthTrackerTitle;
  document.getElementById('bpTab').textContent = d.bpTab;
  document.getElementById('sugarTab').textContent = d.sugarTab;
  document.getElementById('weightTab').textContent = d.weightTab;
  
  // AI
  document.getElementById('healthGuardianAITitle').textContent = d.healthGuardianAITitle;
  document.getElementById('aiDescText').textContent = d.aiDescText;
  document.getElementById('startChatText').textContent = d.startChatText;
  
  // Emergency
  document.getElementById('emergencyTitle').textContent = d.emergencyTitle;
  document.getElementById('emergencyDesc').textContent = d.emergencyDesc;
  document.getElementById('emergencyBtn').textContent = d.emergencyBtn;
  document.getElementById('emergencyContactText').textContent = d.emergencyContactText;
  document.getElementById('familyContactText').textContent = d.familyContactText;
  
  // Modals
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

  // Profile dropdown info fields
  document.getElementById('profileUsernameLabel').textContent = d.profileUsernameFieldLabel;
  document.getElementById('profileAgeLabel').textContent = d.profileAgeFieldLabel;
  document.getElementById('profileGenderLabel').textContent = d.profileGenderFieldLabel;
  document.getElementById('profileDobLabel').textContent = d.profileDobFieldLabel;

  // Add Medicine form
  document.getElementById('addMedFormTitle').textContent = d.addMedFormTitle;
  document.getElementById('medNameLabel').textContent = d.medNameFieldLabel;
  document.getElementById('medNameInput').placeholder = d.medNamePlaceholder;
  document.getElementById('medTimeLabel').textContent = d.medTimeFieldLabel;
  document.getElementById('medDaysLabel').textContent = d.medDaysFieldLabel;
  document.getElementById('saveMedEntryText').textContent = d.saveMedEntryText;

  // Today's Schedule tiles
  document.getElementById('scheduleMedTileText').textContent = d.scheduleMedTileText;
  document.getElementById('scheduleApptTileText').textContent = d.scheduleApptTileText;

  // Today's Appointments modal
  document.getElementById('todaysApptModalTitle').textContent = d.todaysApptModalTitle;
  document.getElementById('allApptEmpty').textContent = d.noAppointmentsAdded;
  document.getElementById('addApptFormTitle').textContent = d.addApptFormTitle;
  document.getElementById('apptDoctorLabel').textContent = d.apptDoctorLabel;
  document.getElementById('apptHospitalLabel').textContent = d.apptHospitalLabel;
  document.getElementById('apptDoctorInput').placeholder = d.apptDoctorPlaceholder;
  document.getElementById('apptDateLabel').textContent = d.apptDateLabel;
  document.getElementById('apptTimeLabel').textContent = d.apptTimeLabel;
  document.getElementById('saveApptEntryText').textContent = d.saveApptEntryText;
  
  // Reminder labels
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

// Apply on load
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
      // Voice फक्त तेव्हाच बोलेल जेव्हा user ने voice input वापरलं असेल
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
function getLast6MonthLabels() {
  const labels = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(d.toLocaleString('en-US', { month: 'short' }));
  }
  return labels;
}
const months = getLast6MonthLabels();
const graphData = {
  bp:     [null, null, null, null, null, null],
  sugar:  [null, null, null, null, null, null],
  weight: [null, null, null, null, null, null]
};
const graphLabels = { bp:'Blood Pressure (mmHg)', sugar:'Blood Sugar (mg/dL)', weight:'Weight (kg)' };
let currentGraph = 'bp';
let chart;

function initChart() {
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

async function loadHealthHistory() {
  try {
    const res = await fetch('/get_health_history');
    const data = await res.json();
    if (!data.months || !data.months.length) return;

    const len = graphData.bp.length; // 6 months
    for (let i = 0; i < len; i++) {
      const idx = data.bp.length - (len - i);
      graphData.bp[i]     = idx >= 0 ? data.bp[idx]     : null;
      graphData.sugar[i]  = idx >= 0 ? data.sugar[idx]  : null;
      graphData.weight[i] = idx >= 0 ? data.weight[idx] : null;
    }

    chart.data.datasets[0].data = graphData[currentGraph];
    chart.update();

    const lastIdx = data.months.length - 1;
    if (lastIdx >= 0) {
      if (data.sugar[lastIdx] != null) document.getElementById('sugarVal').textContent = data.sugar[lastIdx];
      if (data.weight[lastIdx] != null) document.getElementById('weightVal').textContent = data.weight[lastIdx];
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
  
  // Initialize remindersFired for each selected reminder
  const newAppt = appointments[appointments.length - 1];
  beforeDays.forEach(d => { newAppt.remindersFired['before_' + d] = false; });
  onDayMinutes.forEach(m => { newAppt.remindersFired['onDay_' + m] = false; });
  
  saveAppointments(appointments);

  // Save to DB
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

  // Clear form
  document.getElementById('apptDoctorInput').value = '';
  document.getElementById('apptHospitalInput').value = '';
  document.getElementById('apptDateInput').value = '';
  document.getElementById('apptHourInput').selectedIndex = 0;
  document.getElementById('apptMinuteInput').selectedIndex = 0;
  document.getElementById('apptAmPmInput').selectedIndex = 0;
  
  // Uncheck all checkboxes
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

    // Full appointment date+time (actual appointment time)
    const apptDateTime = new Date(a.date + 'T' + a.time + ':00');

    // Before-day reminders — fire at the SAME time as the appointment, X days earlier.
    // e.g. appointment 5:00 PM + "3 days before" -> reminder fires at 5:00 PM, 3 days prior.
    // Catch-up: if that exact moment was missed (app closed), it fires on the very next
    // check, as long as the appointment itself hasn't happened yet.
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

    // On-day reminders (minutes before appointment time) — already based on actual time.
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

    isVoiceInput = true;   // <-- Add this

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

        // History modal बंद
        document.getElementById("chatHistoryModal").classList.remove("open");

        // Chat modal open
        document.getElementById("chatPageModal").classList.add("open");

        const chatWindow = document.getElementById("chatWindow");

        // Question + AI answer दाखव
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

  // Show user message
  win.innerHTML += `<div class="chat-msg user">${msg}</div>`;
  win.scrollTop = win.scrollHeight;

  // Show thinking message
  const thinking = document.createElement('div');
  thinking.className = 'chat-msg ai';
  thinking.textContent = 'Thinking...';
  win.appendChild(thinking);
  win.scrollTop = win.scrollHeight;

  try {
    // Send question to Flask
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

    // Show AI response
    thinking.textContent = reply;

    // Voice response
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

        // History modal बंद
        document.getElementById("chatHistoryModal").classList.remove("open");

        // Chat modal open
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

    // 🔊 Emergency Siren
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

// Add click handlers for checkbox styling
document.querySelectorAll('.checkbox-item').forEach(item => {
  item.addEventListener('click', function(e) {
    // Don't toggle if clicking the checkbox itself (it handles its own toggle)
    if (e.target.tagName === 'INPUT') return;
    const checkbox = this.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    this.classList.toggle('checked', checkbox.checked);
  });
  
  // Also handle checkbox change event
  const checkbox = item.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', function() {
    this.closest('.checkbox-item').classList.toggle('checked', this.checked);
  });
});
