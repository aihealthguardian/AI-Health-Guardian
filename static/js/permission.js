// ============================================
// ALL TRANSLATIONS
// ============================================
const translations = {
    en: {
        appName: "Agentic AI Healthcare",
        permissions: [
            { title: "Location Permission", desc: "Allow location access for emergency services and nearby healthcare support.", icon: "ti-map-pin" },
            { title: "Microphone Permission", desc: "Allow microphone access for Voice Assistant and AI Health Guardian.", icon: "ti-microphone" },
            { title: "Notification Permission", desc: "Receive medicine reminders, appointment alerts and health updates.", icon: "ti-bell" },
            { title: "Speaker Permission", desc: "Allow voice responses, emergency alerts and audio notifications.", icon: "ti-volume" }
        ],
        allowBtn: "Allow",
        denyBtn: "Don't Allow",
        completedMsg: "All Permissions Completed!",
        progress: "Permission {current} of {total}"
    },
    mr: {
        appName: "Agentic AI Healthcare",
        permissions: [
            { title: "लोकेशन परवानगी", desc: "आपत्कालीन सेवा आणि जवळच्या आरोग्य सुविधांसाठी लोकेशन परवानगी द्या.", icon: "ti-map-pin" },
            { title: "मायक्रोफोन परवानगी", desc: "व्हॉइस असिस्टंट आणि AI Health Guardian साठी मायक्रोफोन वापरण्याची परवानगी द्या.", icon: "ti-microphone" },
            { title: "नोटिफिकेशन परवानगी", desc: "औषध स्मरणपत्रे, अपॉइंटमेंट सूचना आणि आरोग्य अपडेट्स मिळवा.", icon: "ti-bell" },
            { title: "स्पीकर परवानगी", desc: "व्हॉइस प्रतिसाद आणि आपत्कालीन सूचना मिळवण्यासाठी परवानगी द्या.", icon: "ti-volume" }
        ],
        allowBtn: "परवानगी द्या",
        denyBtn: "नकार द्या",
        completedMsg: "सर्व परवानग्या पूर्ण झाल्या!",
        progress: "परवानगी {current}-{total} पैकी"
    },
    hi: {
        appName: "Agentic AI Healthcare",
        permissions: [
            { title: "लोकेशन अनुमति", desc: "आपातकालीन सेवाओं और नजदीकी स्वास्थ्य सहायता के लिए लोकेशन एक्सेस दें।", icon: "ti-map-pin" },
            { title: "माइक्रोफोन अनुमति", desc: "वॉयस असिस्टेंट और AI Health Guardian के लिए माइक्रोफोन एक्सेस दें।", icon: "ti-microphone" },
            { title: "नोटिफिकेशन अनुमति", desc: "दवा रिमाइंडर, अपॉइंटमेंट अलर्ट और स्वास्थ्य अपडेट प्राप्त करें।", icon: "ti-bell" },
            { title: "स्पीकर अनुमति", desc: "वॉयस रिस्पॉन्स और आपातकालीन अलर्ट के लिए अनुमति दें।", icon: "ti-volume" }
        ],
        allowBtn: "अनुमति दें",
        denyBtn: "अनुमति न दें",
        completedMsg: "सभी अनुमतियाँ पूरी हो गईं!",
        progress: "अनुमति {current} का {total}"
    },
    gu: {
        appName: "Agentic AI Healthcare",
        permissions: [
            { title: "સ્થાન પરવાનગી", desc: "આપાતકાલીન સેવાઓ અને નજીકની આરોગ્ય સહાય માટે સ્થાનની મંજૂરી આપો.", icon: "ti-map-pin" },
            { title: "માઇક્રોફોન પરવાનગી", desc: "માઇક્રોફોનની મંજૂરી આપો.", icon: "ti-microphone" },
            { title: "સૂચના પરવાનગી", desc: "દવા યાદ અપાવણીઓ અને આરોગ્ય અપડેટ્સ મેળવો.", icon: "ti-bell" },
            { title: "સ્પીકર પરવાનગી", desc: "ઓડિયો સૂચનાઓ માટે મંજૂરી આપો.", icon: "ti-volume" }
        ],
        allowBtn: "મંજૂરી આપો",
        denyBtn: "મંજૂરી ન આપો",
        completedMsg: "બધી પરવાનગીઓ પૂર્ણ થઈ!",
        progress: "પરવાનગી {current} નો {total}"
    },
    ta: {
        appName: "Agentic AI Healthcare",
        permissions: [
            { title: "இருப்பிட அனுமதி", desc: "அவசர சேவைகளுக்காக இருப்பிட அணுகலை அனுமதிக்கவும்.", icon: "ti-map-pin" },
            { title: "மைக்ரோஃபோன் அனுமதி", desc: "குரல் உதவியாளருக்காக மைக்ரோஃபோன் அனுமதி வழங்கவும்.", icon: "ti-microphone" },
            { title: "அறிவிப்பு அனுமதி", desc: "மருந்து நினைவூட்டல்கள் மற்றும் சுகாதார புதுப்பிப்புகளைப் பெறவும்.", icon: "ti-bell" },
            { title: "ஸ்பீக்கர் அனுமதி", desc: "குரல் பதில்கள் மற்றும் எச்சரிக்கைகளுக்கு அனுமதி வழங்கவும்.", icon: "ti-volume" }
        ],
        allowBtn: "அனுமதி",
        denyBtn: "அனுமதிக்க வேண்டாம்",
        completedMsg: "அனைத்து அனுமதிகளும் முடிந்தது!",
        progress: "அனுமதி {current} / {total}"
    },
    te: {
        appName: "Agentic AI Healthcare",
        permissions: [
            { title: "స్థాన అనుమతి", desc: "అత్యవసర సేవల కోసం స్థాన యాక్సెస్‌ను అనుమతించండి.", icon: "ti-map-pin" },
            { title: "మైక్రోఫోన్ అనుమతి", desc: "వాయిస్ అసిస్టెంట్ కోసం మైక్రోఫోన్ యాక్సెస్ ఇవ్వండి.", icon: "ti-microphone" },
            { title: "నోటిఫికేషన్ అనుమతి", desc: "ఔషధ రిమైండర్లు మరియు ఆరోగ్య అప్‌డేట్లు పొందండి.", icon: "ti-bell" },
            { title: "స్పీకర్ అనుమతి", desc: "వాయిస్ ప్రతిస్పందనల కోసం అనుమతి ఇవ్వండి.", icon: "ti-volume" }
        ],
        allowBtn: "అనుమతించు",
        denyBtn: "అనుమతించవద్దు",
        completedMsg: "అన్ని అనుమతులు పూర్తయ్యాయి!",
        progress: "అనుమతి {current} / {total}"
    },
    kn: {
        appName: "Agentic AI Healthcare",
        permissions: [
            { title: "ಸ್ಥಳ ಅನುಮತಿ", desc: "ತುರ್ತು ಸೇವೆಗಳಿಗಾಗಿ ಸ್ಥಳ ಪ್ರವೇಶಕ್ಕೆ ಅನುಮತಿ ನೀಡಿ.", icon: "ti-map-pin" },
            { title: "ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿ", desc: "ವಾಯ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್‌ಗಾಗಿ ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿ ನೀಡಿ.", icon: "ti-microphone" },
            { title: "ಅಧಿಸೂಚನೆ ಅನುಮತಿ", desc: "ಔಷಧಿ ನೆನಪಿಸುವಿಕೆ ಮತ್ತು ಆರೋಗ್ಯ ನವೀಕರಣಗಳನ್ನು ಪಡೆಯಿರಿ.", icon: "ti-bell" },
            { title: "ಸ್ಪೀಕರ್ ಅನುಮತಿ", desc: "ಧ್ವನಿ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಗೆ ಅನುಮತಿ ನೀಡಿ.", icon: "ti-volume" }
        ],
        allowBtn: "ಅನುಮತಿಸಿ",
        denyBtn: "ಅನುಮತಿಸಬೇಡಿ",
        completedMsg: "ಎಲ್ಲಾ ಅನುಮತಿಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ!",
        progress: "ಅನುಮತಿ {current} / {total}"
    },
    bn: {
        appName: "Agentic AI Healthcare",
        permissions: [
            { title: "অবস্থান অনুমতি", desc: "জরুরি পরিষেবার জন্য অবস্থান অ্যাক্সেস দিন।", icon: "ti-map-pin" },
            { title: "মাইক্রোফোন অনুমতি", desc: "ভয়েস অ্যাসিস্ট্যান্টের জন্য মাইক্রোফোন অ্যাক্সেস দিন।", icon: "ti-microphone" },
            { title: "নোটিফিকেশন অনুমতি", desc: "ওষুধের রিমাইন্ডার এবং স্বাস্থ্য আপডেট পান।", icon: "ti-bell" },
            { title: "স্পিকার অনুমতি", desc: "ভয়েস প্রতিক্রিয়ার জন্য অনুমতি দিন।", icon: "ti-volume" }
        ],
        allowBtn: "অনুমতি দিন",
        denyBtn: "অনুমতি দেবেন না",
        completedMsg: "সব অনুমতি সম্পন্ন হয়েছে!",
        progress: "অনুমতি {current} / {total}"
    },
    pa: {
        appName: "Agentic AI Healthcare",
        permissions: [
            { title: "ਲੋਕੇਸ਼ਨ ਇਜਾਜ਼ਤ", desc: "ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਲਈ ਲੋਕੇਸ਼ਨ ਐਕਸੈੱਸ ਦਿਓ।", icon: "ti-map-pin" },
            { title: "ਮਾਈਕ੍ਰੋਫੋਨ ਇਜਾਜ਼ਤ", desc: "ਵੋਇਸ ਅਸਿਸਟੈਂਟ ਲਈ ਮਾਈਕ੍ਰੋਫੋਨ ਐਕਸੈੱਸ ਦਿਓ।", icon: "ti-microphone" },
            { title: "ਨੋਟੀਫਿਕੇਸ਼ਨ ਇਜਾਜ਼ਤ", desc: "ਦਵਾਈ ਰਿਮਾਈਂਡਰ ਅਤੇ ਹੈਲਥ ਅੱਪਡੇਟ ਪ੍ਰਾਪਤ ਕਰੋ।", icon: "ti-bell" },
            { title: "ਸਪੀਕਰ ਇਜਾਜ਼ਤ", desc: "ਵੌਇਸ ਰਿਸਪਾਂਸ ਅਤੇ ਅਲਰਟ ਲਈ ਇਜਾਜ਼ਤ ਦਿਓ।", icon: "ti-volume" }
        ],
        allowBtn: "ਇਜਾਜ਼ਤ ਦਿਓ",
        denyBtn: "ਇਜਾਜ਼ਤ ਨਾ ਦਿਓ",
        completedMsg: "ਸਾਰੀਆਂ ਇਜਾਜ਼ਤਾਂ ਪੂਰੀਆਂ ਹੋ ਗਈਆਂ!",
        progress: "ਇਜਾਜ਼ਤ {current} / {total}"
    }
};

// ============================================
// MAIN LOGIC
// ============================================
let current = 0;
let isProcessing = false;
let permissions = {
    location: false,
    microphone: false,
    notification: false,
    speaker: false
};
let lang = localStorage.getItem("selectedLanguage") || "en";

function getTranslations() {
    return translations[lang] || translations.en;
}

function updateUI() {
    const t = getTranslations();
    const perm = t.permissions[current];
    
    document.getElementById("appName").textContent = t.appName;
    document.getElementById("icon").innerHTML = `<i class="ti ${perm.icon}"></i>`;
    document.getElementById("title").textContent = perm.title;
    document.getElementById("description").textContent = perm.desc;
    document.getElementById("allowBtn").textContent = t.allowBtn;
    document.getElementById("denyBtn").textContent = t.denyBtn;
    document.getElementById("progress").textContent = t.progress
        .replace("{current}", current + 1)
        .replace("{total}", t.permissions.length);
}

function changeLanguage(value) {
    lang = value;
    localStorage.setItem("selectedLanguage", value);
    current = 0;
    updateUI();
}

// Load saved language
document.addEventListener("DOMContentLoaded", function () {

    const lang = localStorage.getItem("selectedLanguage") || "en";

    document.getElementById("languageSelect").value = lang;

    selectedLangCode = lang;

    updateUI();
});

function allowPermission() {

    if (isProcessing) return;
    isProcessing = true;

    requestPermission(current, function () {

        if (current === 0) permissions.location = true;
        if (current === 1) permissions.microphone = true;
        if (current === 2) permissions.notification = true;
        if (current === 3) permissions.speaker = true;

        current++;

        const t = getTranslations();

        if (current < t.permissions.length) {

            updateUI();
            isProcessing = false;

        } else {

            fetch("/save_permissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(permissions)
            })
            .then(res => res.json())
            .then(data => {
                window.location.href = "/main";
            });

        }

    });

}

function denyPermission() {

    if (isProcessing) return;
    isProcessing = true;

    if (current === 0) permissions.location = false;
    if (current === 1) permissions.microphone = false;
    if (current === 2) permissions.notification = false;
    if (current === 3) permissions.speaker = false;

    current++;

    const t = getTranslations();

    if (current < t.permissions.length) {

        updateUI();
        isProcessing = false;

    } else {

        fetch("/save_permissions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(permissions)
        })
        .then(res => res.json())
        .then(data => {
            alert(t.completedMsg);
            window.location.href = "/main";
        });

    }

}

function requestPermission(index, callback) {
    switch(index) {
        case 0: // Location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    () => callback(),
                    () => callback()
                );
            } else {
                callback();
            }
            break;
            
        case 1: // Microphone
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
                        stream.getTracks().forEach(t => t.stop());
                        callback();
                    })
                    .catch(() => callback());
            } else {
                callback();
            }
            break;
            
        case 2: // Notification
            if ('Notification' in window) {
                if (Notification.permission === 'granted' || Notification.permission === 'denied') {
                    callback();
                } else {
                    Notification.requestPermission().then(() => callback());
                }
            } else {
                callback();
            }
            break;
            
        case 3: // Speaker
            try {
                let ctx = new (window.AudioContext || window.webkitAudioContext)();
                if (ctx.state === 'suspended') {
                    ctx.resume().then(() => callback()).catch(() => callback());
                } else {
                    callback();
                }
            } catch(e) {
                callback();
            }
            break;
            
        default:
            callback();
    }
}
