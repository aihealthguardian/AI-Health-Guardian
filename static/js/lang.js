    function togglePasswordVisibility(inputId, btn) {
      const input = document.getElementById(inputId);
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('ti-eye');
        icon.classList.add('ti-eye-off');
      } else {
        input.type = 'password';
        icon.classList.remove('ti-eye-off');
        icon.classList.add('ti-eye');
      }
    }
    const translations = {
      en: { langTitle:"Choose Language", langSub:"Select the language you're most comfortable with", langIndianLabel:"Indian languages", langContinueBtn:'Continue <i class="ti ti-arrow-right"></i>', loginWelcome:"Welcome", loginSubtitle:"Sign in to AI Health Guardian", lblUsername:"Username", usernameInput:"Enter your username", lblPassword:"Password", passwordInput:"Enter your password", lblForgot:"Forgot password?", btnLogin:"Sign in", lblOr:"or", btnGoogleText:"Continue with Google", profileTitle:"Create Profile", profileSub:"Please provide your health details", btnTakePic:"Take a Pic", btnFromGallery:"Select from Gallery", lblEmail:"Email Address", email_ph:"example@mail.com", lblAge:"Age", age_ph:"Years", lblGender:"Gender", optMale:"Male", optFemale:"Female", optOther:"Other", lblDob:"Date of Birth", lblFamily:"Family Contact Numbers", lblFamilyTitle:"Family Members", lblFam1:"Family Member 1", lblFam2:"Family Member 2", lblFam3:"Family Member 3", lblFamilyEmailTitle:"Family Login Emails", lblFam1Email:"Family Member 1 Email", lblFam2Email:"Family Member 2 Email", lblFam3Email:"Family Member 3 Email", lblEmergency:"Emergency Contact Numbers", lblEmergencyTitle:"Quick-dial Services", lblAmbulance:"Ambulance", lblFire:"Fire Brigade", lblDoctor:"Family Doctor", lblBlood:"Blood Group", lblState:"State", lblSelectState:"Select your State", lblCity:"City", city_ph:"Enter City", lblAddress:"Address", address_ph:"Enter complete address", btnSave:'<i class="ti ti-checkbox"></i> Complete Profile Setup', toastLangSaved:"Language updated successfully!", toastLoginSuccess:"Welcome! Fill your profile details.", toastProfileSaved:"Profile saved successfully! Welcome aboard.", toastForgot:"Password reset link sent to your registered email.", toastGoogle:"Redirecting to Google sign-in...",resetTitle:"Reset Password",
resetSub:"Create a new password and confirm it",
newPasswordLabel:"New Password",
newPasswordPlaceholder:"Enter new password",
confirmPasswordLabel:"Confirm Password",
confirmPasswordPlaceholder:"Confirm new password",
updatePasswordBtn:"Update Password",
backToLoginBtn:"Back to Login"},
      mr: { langTitle:"भाषा निवडा", langSub:"तुम्हाला सर्वात सोयीस्कर असणारी भाषा निवडा", langIndianLabel:"भारतीय भाषा", langContinueBtn:'पुढे जा <i class="ti ti-arrow-right"></i>', loginWelcome:"स्वागत आहे", loginSubtitle:"AI हेल्थ गार्डियन मध्ये लॉग इन करा", lblUsername:"युझरनेम", usernameInput:"तुमचे युझरनेम प्रविष्ट करा", lblPassword:"पासवर्ड", passwordInput:"तुमचा पासवर्ड प्रविष्ट करा", lblForgot:"पासवर्ड विसरलात?", btnLogin:"साइन इन करा", lblOr:"किंवा", btnGoogleText:"Google द्वारे सुरू ठेवा", profileTitle:"प्रोफाइल तयार करा", profileSub:"कृपया तुमची आरोग्य माहिती द्या", btnTakePic:"फोटो काढा", btnFromGallery:"गॅलरीतून निवडा", lblEmail:"ईमेल पत्ता", email_ph:"example@mail.com", lblAge:"वय", age_ph:"वर्षे", lblGender:"लिंग", optMale:"पुरुष", optFemale:"महिला", optOther:"इतर", lblDob:"जन्म तारीख", lblFamily:"कुटुंबाचे संपर्क क्रमांक", lblFamilyTitle:"कुटुंबातील सदस्य", lblFam1:"कुटुंब सदस्य १", lblFam2:"कुटुंब सदस्य २", lblFam3:"कुटुंब सदस्य ३", lblFamilyEmailTitle:"कुटुंब सदस्यांचे लॉगिन ईमेल", lblFam1Email:"कुटुंब सदस्य १ ईमेल", lblFam2Email:"कुटुंब सदस्य २ ईमेल", lblFam3Email:"कुटुंब सदस्य ३ ईमेल", lblEmergency:"आणीबाणी संपर्क क्रमांक", lblEmergencyTitle:"त्वरित सेवा", lblAmbulance:"रुग्णवाहिका", lblFire:"अग्निशमन दल", lblDoctor:"कुटुंब डॉक्टर", lblBlood:"रक्तगट", lblState:"राज्य", lblSelectState:"तुमचे राज्य निवडा", lblCity:"शहर", city_ph:"शहर प्रविष्ट करा", lblAddress:"पत्ता", address_ph:"पूर्ण पत्ता प्रविष्ट करा", btnSave:'<i class="ti ti-checkbox"></i> प्रोफाइल जतन करा', toastLangSaved:"भाषा यशस्वीरित्या निवडली!", toastLoginSuccess:"स्वागत आहे! कृपया प्रोफाइल माहिती भरा.", toastProfileSaved:"प्रोफाइल यशस्वीरित्या जतन झाली!", toastForgot:"पासवर्ड रीसेट लिंक तुमच्या ईमेलवर पाठवली आहे.", toastGoogle:"Google साइन-इन वर रीडायरेक्ट करत आहे...",resetTitle:"पासवर्ड रीसेट करा",
resetSub:"नवीन पासवर्ड तयार करा आणि पुष्टी करा",
newPasswordLabel:"नवीन पासवर्ड",
newPasswordPlaceholder:"नवीन पासवर्ड प्रविष्ट करा",
confirmPasswordLabel:"पासवर्डची पुष्टी करा",
confirmPasswordPlaceholder:"पासवर्ड पुन्हा प्रविष्ट करा",
updatePasswordBtn:"पासवर्ड अपडेट करा",
backToLoginBtn:"लॉगिनकडे परत जा"},
      hi: { langTitle:"भाषा चुनें", langSub:"उस भाषा का चयन करें जिसमें आप सबसे अधिक सहज हैं", langIndianLabel:"भारतीय भाषाएँ", langContinueBtn:'आगे बढ़ें <i class="ti ti-arrow-right"></i>', loginWelcome:"स्वागत है", loginSubtitle:"AI हेल्थ गार्डियन में साइन इन करें", lblUsername:"यूज़रनेम", usernameInput:"अपना यूज़रनेम दर्ज करें", lblPassword:"पासवर्ड", passwordInput:"अपना पासवर्ड दर्ज करें", lblForgot:"पासवर्ड भूल गए?", btnLogin:"साइन इन करें", lblOr:"अथवा", btnGoogleText:"Google के साथ जारी रखें", profileTitle:"प्रोफ़ाइल बनाएं", profileSub:"कृपया अपनी स्वास्थ्य जानकारी प्रदान करें", btnTakePic:"फ़ोटो लें", btnFromGallery:"गैलरी से चुनें", lblEmail:"ईमेल पता", email_ph:"example@mail.com", lblAge:"आयु", age_ph:"वर्ष", lblGender:"लिंग", optMale:"पुरुष", optFemale:"महिला", optOther:"अन्य", lblDob:"जन्म तिथि", lblFamily:"पारिवारिक संपर्क नंबर", lblFamilyTitle:"परिवार के सदस्य", lblFam1:"परिवार सदस्य 1", lblFam2:"परिवार सदस्य 2", lblFam3:"परिवार सदस्य 3", lblFamilyEmailTitle:"परिवार लॉगिन ईमेल", lblFam1Email:"परिवार सदस्य 1 ईमेल", lblFam2Email:"परिवार सदस्य 2 ईमेल", lblFam3Email:"परिवार सदस्य 3 ईमेल", lblEmergency:"आपातकालीन संपर्क नंबर", lblEmergencyTitle:"त्वरित सेवाएं", lblAmbulance:"एम्बुलेंस", lblFire:"अग्निशमन", lblDoctor:"परिवार डॉक्टर", lblBlood:"रक्त समूह", lblState:"राज्य", lblSelectState:"अपना राज्य चुनें", lblCity:"शहर", city_ph:"शहर दर्ज करें", lblAddress:"पता", address_ph:"पूरा पता दर्ज करें", btnSave:'<i class="ti ti-checkbox"></i> प्रोफ़ाइल सेटअप पूरा करें', toastLangSaved:"भाषा सफलतापूर्वक चुनी गई!", toastLoginSuccess:"स्वागत है! अपनी प्रोफ़ाइल भरें।", toastProfileSaved:"प्रोफ़ाइल सफलतापूर्वक सहेजी गई!", toastForgot:"पासवर्ड रीसेट लिंक आपके ईमेल पर भेज दिया गया है।", toastGoogle:"Google साइन-इन पर रीडायरेक्ट कर रहा है...", resetTitle:"पासवर्ड रीसेट करें",
resetSub:"नया पासवर्ड बनाएं और उसकी पुष्टि करें",
newPasswordLabel:"नया पासवर्ड",
newPasswordPlaceholder:"नया पासवर्ड दर्ज करें",
confirmPasswordLabel:"पासवर्ड की पुष्टि करें",
confirmPasswordPlaceholder:"पासवर्ड दोबारा दर्ज करें",
updatePasswordBtn:"पासवर्ड अपडेट करें",
backToLoginBtn:"लॉगिन पर वापस जाएं"},
      gu: { langTitle:"ભાષા પસંદ કરો", langSub:"તમે સૌથી વધુ અનુકૂળ હોવ તે ભાષા પસંદ કરો", langIndianLabel:"ભારતીય ભાષાઓ", langContinueBtn:'આગળ વધો <i class="ti ti-arrow-right"></i>', loginWelcome:"સ્વાગત છે", loginSubtitle:"AI હેલ્થ ગાર્ડિયનમાં સાઇન ઇન કરો", lblUsername:"યુઝરનેમ", usernameInput:"તમારું યુઝરનેમ દાખલ કરો", lblPassword:"પાસવર્ડ", passwordInput:"તમારો પાસવર્ડ દાખલ કરો", lblForgot:"પાસવર્ડ ભૂલી ગયા?", btnLogin:"સાઇન ઇન કરો", lblOr:"અથવા", btnGoogleText:"Google સાથે ચાલુ રાખો", profileTitle:"પ્રોફાઇલ બનાવો", profileSub:"કૃપા કરીને તમારી આરોગ્ય વિગતો આપો", btnTakePic:"ફોટો લો", btnFromGallery:"ગેલેરીમાંથી પસંદ કરો", lblEmail:"ઈમેલ સરનામું", email_ph:"example@mail.com", lblAge:"ઉંમર", age_ph:"વર્ષ", lblGender:"લિંગ", optMale:"પુરુષ", optFemale:"સ્ત્રી", optOther:"અન્ય", lblDob:"જન્મ તારીખ", lblFamily:"કુટુંબ સંપર્ક નંબરો", lblFamilyTitle:"કુટુંબના સભ્યો", lblFam1:"કુટુંબ સભ્ય 1", lblFam2:"કુટુંબ સભ્ય 2", lblFam3:"કુટુંબ સભ્ય 3", lblFamilyEmailTitle:"કુટુંબ લોગિન ઈમેલ", lblFam1Email:"કુટુંબ સભ્ય 1 ઈમેલ", lblFam2Email:"કુટુંબ સભ્ય 2 ઈમેલ", lblFam3Email:"કુટુંબ સભ્ય 3 ઈમેલ", lblEmergency:"કટોકટી સંપર્ક નંબરો", lblEmergencyTitle:"તાત્કાલિક સેવાઓ", lblAmbulance:"એમ્બ્યુલન્સ", lblFire:"ફાયર બ્રિગેડ", lblDoctor:"કુટુંબ ડૉક્ટર", lblBlood:"બ્લડ ગ્રુપ", lblState:"રાજ્ય", lblSelectState:"તમારું રાજ્ય પસંદ કરો", lblCity:"શહેર", city_ph:"શહેર દાખલ કરો", lblAddress:"સરનામું", address_ph:"પૂરું સરનામું દાખલ કરો", btnSave:'<i class="ti ti-checkbox"></i> પ્રોફાઇલ સાચવો', toastLangSaved:"ભાષા સફળતાપૂર્વક પસંદ થઈ!", toastLoginSuccess:"સ્વાગત છે! તમારી પ્રોફાઇલ ભરો.", toastProfileSaved:"પ્રોફાઇલ સાચવાઈ!", toastForgot:"પાસવર્ડ રીસેટ લિંક તમારા ઈમેલ પર મોકલી છે.", toastGoogle:"Google સાઇન-ઇન પર રીડાયરેક્ટ કરી રહ્યું છે...", resetTitle:"પાસવર્ડ રીસેટ કરો",
resetSub:"નવો પાસવર્ડ બનાવો અને તેની પુષ્ટિ કરો",
newPasswordLabel:"નવો પાસવર્ડ",
newPasswordPlaceholder:"નવો પાસવર્ડ દાખલ કરો",
confirmPasswordLabel:"પાસવર્ડની પુષ્ટિ કરો",
confirmPasswordPlaceholder:"પાસવર્ડ ફરીથી દાખલ કરો",
updatePasswordBtn:"પાસવર્ડ અપડેટ કરો",
backToLoginBtn:"લૉગિન પર પાછા જાઓ"},
      ta: { langTitle:"மொழியைத் தேர்ந்தெடுக்கவும்", langSub:"நீங்கள் வசதியாக உணரும் மொழியைத் தேர்ந்தெடுக்கவும்", langIndianLabel:"இந்திய மொழிகள்", langContinueBtn:'தொடரவும் <i class="ti ti-arrow-right"></i>', loginWelcome:"வரவேற்கிறோம்", loginSubtitle:"AI ஹெல்த் கார்டியனில் உள்நுழைக", lblUsername:"பயனர்பெயர்", usernameInput:"உங்கள் பயனர்பெயரை உள்ளிடவும்", lblPassword:"கடவுச்சொல்", passwordInput:"உங்கள் கடவுச்சொல்லை உள்ளிடவும்", lblForgot:"கடவுச்சொல் மறந்துவிட்டதா?", btnLogin:"உள்நுழைக", lblOr:"அல்லது", btnGoogleText:"Google உடன் தொடரவும்", profileTitle:"சுயவிவரம் உருவாக்கவும்", profileSub:"உங்கள் சுகாதார விவரங்களை வழங்கவும்", btnTakePic:"புகைப்படம் எடுக்க", btnFromGallery:"கேலரியிலிருந்து தேர்ந்தெடுக்க", lblEmail:"மின்னஞ்சல்", email_ph:"example@mail.com", lblAge:"வயது", age_ph:"ஆண்டுகள்", lblGender:"பாலினம்", optMale:"ஆண்", optFemale:"பெண்", optOther:"மற்றவை", lblDob:"பிறந்த தேதி", lblFamily:"குடும்ப தொடர்பு எண்கள்", lblFamilyTitle:"குடும்ப உறுப்பினர்கள்", lblFam1:"குடும்ப உறுப்பினர் 1", lblFam2:"குடும்ப உறுப்பினர் 2", lblFam3:"குடும்ப உறுப்பினர் 3", lblFamilyEmailTitle:"குடும்ப உள்நுழைவு மின்னஞ்சல்கள்", lblFam1Email:"குடும்ப உறுப்பினர் 1 மின்னஞ்சல்", lblFam2Email:"குடும்ப உறுப்பினர் 2 மின்னஞ்சல்", lblFam3Email:"குடும்ப உறுப்பினர் 3 மின்னஞ்சல்", lblEmergency:"அவசர தொடர்பு எண்கள்", lblEmergencyTitle:"விரைவு சேவைகள்", lblAmbulance:"ஆம்புலன்ஸ்", lblFire:"தீயணைப்பு படை", lblDoctor:"குடும்ப மருத்துவர்", lblBlood:"இரத்த வகை", lblState:"மாநிலம்", lblSelectState:"உங்கள் மாநிலத்தைத் தேர்ந்தெடுக்கவும்", lblCity:"நகரம்", city_ph:"நகரத்தை உள்ளிடவும்", lblAddress:"முகவரி", address_ph:"முழு முகவரியை உள்ளிடவும்", btnSave:'<i class="ti ti-checkbox"></i> சுயவிவரத்தை சேமி', toastLangSaved:"மொழி வெற்றிகரமாக தேர்ந்தெடுக்கப்பட்டது!", toastLoginSuccess:"வரவேற்கிறோம்! உங்கள் சுயவிவரத்தை நிரப்பவும்.", toastProfileSaved:"சுயவிவரம் சேமிக்கப்பட்டது!", toastForgot:"கடவுச்சொல் மீட்டமைப்பு இணைப்பு உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டது.", toastGoogle:"Google உள்நுழைவுக்கு திருப்பப்படுகிறது...", resetTitle:"கடவுச்சொல்லை மீட்டமைக்கவும்",
resetSub:"புதிய கடவுச்சொல்லை உருவாக்கி உறுதிப்படுத்தவும்",
newPasswordLabel:"புதிய கடவுச்சொல்",
newPasswordPlaceholder:"புதிய கடவுச்சொல்லை உள்ளிடவும்",
confirmPasswordLabel:"கடவுச்சொல்லை உறுதிப்படுத்தவும்",
confirmPasswordPlaceholder:"கடவுச்சொல்லை மீண்டும் உள்ளிடவும்",
updatePasswordBtn:"கடவுச்சொல்லை புதுப்பிக்கவும்",
backToLoginBtn:"உள்நுழைவிற்கு திரும்பவும்"},
      te: { langTitle:"భాషను ఎంచుకోండి", langSub:"మీకు సౌకర్యవంతమైన భాషను ఎంచుకోండి", langIndianLabel:"భారతీయ భాషలు", langContinueBtn:'కొనసాగించండి <i class="ti ti-arrow-right"></i>', loginWelcome:"స్వాగతం", loginSubtitle:"AI హెల్త్ గార్డియన్‌లో సైన్ ఇన్ చేయండి", lblUsername:"యూజర్‌నేమ్", usernameInput:"మీ యూజర్‌నేమ్ నమోదు చేయండి", lblPassword:"పాస్‌వర్డ్", passwordInput:"మీ పాస్‌వర్డ్ నమోదు చేయండి", lblForgot:"పాస్‌వర్డ్ మర్చిపోయారా?", btnLogin:"సైన్ ఇన్", lblOr:"లేదా", btnGoogleText:"Google తో కొనసాగించండి", profileTitle:"ప్రొఫైల్ సృష్టించండి", profileSub:"దయచేసి మీ ఆరోగ్య వివరాలను అందించండి", btnTakePic:"ఫోటో తీయండి", btnFromGallery:"గ్యాలరీ నుండి ఎంచుకోండి", lblEmail:"ఇమెయిల్ చిరునామా", email_ph:"example@mail.com", lblAge:"వయస్సు", age_ph:"సంవత్సరాలు", lblGender:"లింగం", optMale:"పురుషుడు", optFemale:"స్త్రీ", optOther:"ఇతరం", lblDob:"పుట్టిన తేదీ", lblFamily:"కుటుంబ సంప్రదింపు నంబర్లు", lblFamilyTitle:"కుటుంబ సభ్యులు", lblFam1:"కుటుంబ సభ్యుడు 1", lblFam2:"కుటుంబ సభ్యుడు 2", lblFam3:"కుటుంబ సభ్యుడు 3", lblFamilyEmailTitle:"కుటుంబ లాగిన్ ఇమెయిల్‌లు", lblFam1Email:"కుటుంబ సభ్యుడు 1 ఇమెయిల్", lblFam2Email:"కుటుంబ సభ్యుడు 2 ఇమెయిల్", lblFam3Email:"కుటుంబ సభ్యుడు 3 ఇమెయిల్", lblEmergency:"అత్యవసర సంప్రదింపు నంబర్లు", lblEmergencyTitle:"త్వరిత సేవలు", lblAmbulance:"అంబులెన్స్", lblFire:"అగ్నిమాపక దళం", lblDoctor:"కుటుంబ డాక్టర్", lblBlood:"రక్త వర్గం", lblState:"రాష్ట్రం", lblSelectState:"మీ రాష్ట్రాన్ని ఎంచుకోండి", lblCity:"నగరం", city_ph:"నగరం నమోదు చేయండి", lblAddress:"చిరునామా", address_ph:"పూర్తి చిరునామా నమోదు చేయండి", btnSave:'<i class="ti ti-checkbox"></i> ప్రొఫైల్ సేవ్ చేయండి', toastLangSaved:"భాష విజయవంతంగా ఎంచుకోబడింది!", toastLoginSuccess:"స్వాగతం! మీ ప్రొఫైల్‌ను పూరించండి.", toastProfileSaved:"ప్రొఫైల్ సేవ్ చేయబడింది!", toastForgot:"పాస్‌వర్డ్ రీసెట్ లింక్ మీ ఇమెయిల్‌కు పంపబడింది.", toastGoogle:"Google సైన్-ఇన్‌కి దారిమళ్లిస్తోంది...", resetTitle:"పాస్‌వర్డ్‌ను రీసెట్ చేయండి",
resetSub:"కొత్త పాస్‌వర్డ్‌ను సృష్టించి నిర్ధారించండి",
newPasswordLabel:"కొత్త పాస్‌వర్డ్",
newPasswordPlaceholder:"కొత్త పాస్‌వర్డ్‌ను నమోదు చేయండి",
confirmPasswordLabel:"పాస్‌వర్డ్‌ను నిర్ధారించండి",
confirmPasswordPlaceholder:"పాస్‌వర్డ్‌ను మళ్లీ నమోదు చేయండి",
updatePasswordBtn:"పాస్‌వర్డ్‌ను అప్‌డేట్ చేయండి",
backToLoginBtn:"లాగిన్‌కు తిరిగి వెళ్లండి"},
      kn: { langTitle:"ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ", langSub:"ನೀವು ಆರಾಮವಾಗಿರುವ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", langIndianLabel:"ಭಾರತೀಯ ಭಾಷೆಗಳು", langContinueBtn:'ಮುಂದುವರಿಸಿ <i class="ti ti-arrow-right"></i>', loginWelcome:"ಸ್ವಾಗತ", loginSubtitle:"AI ಹೆಲ್ತ್ ಗಾರ್ಡಿಯನ್‌ಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ", lblUsername:"ಬಳಕೆದಾರಹೆಸರು", usernameInput:"ನಿಮ್ಮ ಬಳಕೆದಾರಹೆಸರನ್ನು ನಮೂದಿಸಿ", lblPassword:"ಪಾಸ್‌ವರ್ಡ್", passwordInput:"ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ", lblForgot:"ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?", btnLogin:"ಸೈನ್ ಇನ್", lblOr:"ಅಥವಾ", btnGoogleText:"Google ನೊಂದಿಗೆ ಮುಂದುವರಿಸಿ", profileTitle:"ಪ್ರೊಫೈಲ್ ರಚಿಸಿ", profileSub:"ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆರೋಗ್ಯ ವಿವರಗಳನ್ನು ಒದಗಿಸಿ", btnTakePic:"ಫೋಟೋ ತೆಗೆಯಿರಿ", btnFromGallery:"ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ", lblEmail:"ಇಮೇಲ್ ವಿಳಾಸ", email_ph:"example@mail.com", lblAge:"ವಯಸ್ಸು", age_ph:"ವರ್ಷಗಳು", lblGender:"ಲಿಂಗ", optMale:"ಪುರುಷ", optFemale:"ಮಹಿಳೆ", optOther:"ಇತರೆ", lblDob:"ಜನ್ಮ ದಿನಾಂಕ", lblFamily:"ಕುಟುಂಬ ಸಂಪರ್ಕ ಸಂಖ್ಯೆಗಳು", lblFamilyTitle:"ಕುಟುಂಬ ಸದಸ್ಯರು", lblFam1:"ಕುಟುಂಬ ಸದಸ್ಯ 1", lblFam2:"ಕುಟುಂಬ ಸದಸ್ಯ 2", lblFam3:"ಕುಟುಂಬ ಸದಸ್ಯ 3", lblFamilyEmailTitle:"ಕುಟುಂಬ ಲಾಗಿನ್ ಇಮೇಲ್‌ಗಳು", lblFam1Email:"ಕುಟುಂಬ ಸದಸ್ಯ 1 ಇಮೇಲ್", lblFam2Email:"ಕುಟುಂಬ ಸದಸ್ಯ 2 ಇಮೇಲ್", lblFam3Email:"ಕುಟುಂಬ ಸದಸ್ಯ 3 ಇಮೇಲ್", lblEmergency:"ತುರ್ತು ಸಂಪರ್ಕ ಸಂಖ್ಯೆಗಳು", lblEmergencyTitle:"ತ್ವರಿತ ಸೇವೆಗಳು", lblAmbulance:"ಆಂಬ್ಯುಲೆನ್ಸ್", lblFire:"ಅಗ್ನಿಶಾಮಕ ದಳ", lblDoctor:"ಕುಟುಂಬ ವೈದ್ಯ", lblBlood:"ರಕ್ತದ ಗುಂಪು", lblState:"ರಾಜ್ಯ", lblSelectState:"ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ", lblCity:"ನಗರ", city_ph:"ನಗರ ನಮೂದಿಸಿ", lblAddress:"ವಿಳಾಸ", address_ph:"ಪೂರ್ಣ ವಿಳಾಸ ನಮೂದಿಸಿ", btnSave:'<i class="ti ti-checkbox"></i> ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ', toastLangSaved:"ಭಾಷೆ ಯಶಸ್ವಿಯಾಗಿ ಆಯ್ಕೆಯಾಗಿದೆ!", toastLoginSuccess:"ಸ್ವಾಗತ! ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಭರ್ತಿ ಮಾಡಿ.", toastProfileSaved:"ಪ್ರೊಫೈಲ್ ಉಳಿಸಲಾಗಿದೆ!", toastForgot:"ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.", toastGoogle:"Google ಸೈನ್-ಇನ್‌ಗೆ ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ...", resetTitle:"ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ",
resetSub:"ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ ಮತ್ತು ದೃಢೀಕರಿಸಿ",
newPasswordLabel:"ಹೊಸ ಪಾಸ್‌ವರ್ಡ್",
newPasswordPlaceholder:"ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
confirmPasswordLabel:"ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
confirmPasswordPlaceholder:"ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಮತ್ತೆ ನಮೂದಿಸಿ",
updatePasswordBtn:"ಪಾಸ್‌ವರ್ಡ್ ನವೀಕರಿಸಿ",
backToLoginBtn:"ಲಾಗಿನ್‌ಗೆ ಹಿಂತಿರುಗಿ"},
      bn: { langTitle:"ভাষা নির্বাচন করুন", langSub:"আপনি সবচেয়ে স্বাচ্ছন্দ্য বোধ করেন এমন ভাষা নির্বাচন করুন", langIndianLabel:"ভারতীয় ভাষা", langContinueBtn:'চালিয়ে যান <i class="ti ti-arrow-right"></i>', loginWelcome:"স্বাগতম", loginSubtitle:"AI হেলথ গার্ডিয়ানে সাইন ইন করুন", lblUsername:"ব্যবহারকারীর নাম", usernameInput:"আপনার ব্যবহারকারীর নাম লিখুন", lblPassword:"পাসওয়ার্ড", passwordInput:"আপনার পাসওয়ার্ড লিখুন", lblForgot:"পাসওয়ার্ড ভুলে গেছেন?", btnLogin:"সাইন ইন", lblOr:"অথবা", btnGoogleText:"Google দিয়ে চালিয়ে যান", profileTitle:"প্রোফাইল তৈরি করুন", profileSub:"অনুগ্রহ করে আপনার স্বাস্থ্য তথ্য দিন", btnTakePic:"ছবি তুলুন", btnFromGallery:"গ্যালারি থেকে নির্বাচন করুন", lblEmail:"ইমেল ঠিকানা", email_ph:"example@mail.com", lblAge:"বয়স", age_ph:"বছর", lblGender:"লিঙ্গ", optMale:"পুরুষ", optFemale:"মহিলা", optOther:"অন্যান্য", lblDob:"জন্ম তারিখ", lblFamily:"পারিবারিক যোগাযোগ নম্বর", lblFamilyTitle:"পরিবারের সদস্য", lblFam1:"পরিবারের সদস্য ১", lblFam2:"পরিবারের সদস্য ২", lblFam3:"পরিবারের সদস্য ৩", lblFamilyEmailTitle:"পারিবারিক লগইন ইমেল", lblFam1Email:"পরিবারের সদস্য ১ ইমেইল", lblFam2Email:"পরিবারের সদস্য ২ ইমেইল", lblFam3Email:"পরিবারের সদস্য ৩ ইমেইল", lblEmergency:"জরুরি যোগাযোগ নম্বর", lblEmergencyTitle:"দ্রুত পরিষেবা", lblAmbulance:"অ্যাম্বুলেন্স", lblFire:"দমকল বাহিনী", lblDoctor:"পারিবারিক ডাক্তার", lblBlood:"রক্তের গ্রুপ", lblState:"রাজ্য", lblSelectState:"আপনার রাজ্য নির্বাচন করুন", lblCity:"শহর", city_ph:"শহর লিখুন", lblAddress:"ঠিকানা", address_ph:"সম্পূর্ণ ঠিকানা লিখুন", btnSave:'<i class="ti ti-checkbox"></i> প্রোফাইল সংরক্ষণ করুন', toastLangSaved:"ভাষা সফলভাবে নির্বাচিত হয়েছে!", toastLoginSuccess:"স্বাগতম! আপনার প্রোফাইল পূরণ করুন.", toastProfileSaved:"প্রোফাইল সংরক্ষিত হয়েছে!", toastForgot:"পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেলে পাঠানো হয়েছে.", toastGoogle:"Google সাইন-ইনে পুনর্নির্দেশ করা হচ্ছে...", resetTitle:"পাসওয়ার্ড রিসেট করুন",
resetSub:"নতুন পাসওয়ার্ড তৈরি করুন এবং নিশ্চিত করুন",
newPasswordLabel:"নতুন পাসওয়ার্ড",
newPasswordPlaceholder:"নতুন পাসওয়ার্ড লিখুন",
confirmPasswordLabel:"পাসওয়ার্ড নিশ্চিত করুন",
confirmPasswordPlaceholder:"পাসওয়ার্ড আবার লিখুন",
updatePasswordBtn:"পাসওয়ার্ড আপডেট করুন",
backToLoginBtn:"লগইনে ফিরে যান"},
      pa: { langTitle:"ਭਾਸ਼ਾ ਚੁਣੋ", langSub:"ਉਹ ਭਾਸ਼ਾ ਚੁਣੋ ਜਿਸ ਵਿੱਚ ਤੁਸੀਂ ਸਭ ਤੋਂ ਆਰਾਮਦਾਇਕ ਹੋ", langIndianLabel:"ਭਾਰਤੀ ਭਾਸ਼ਾਵਾਂ", langContinueBtn:'ਜਾਰੀ ਰੱਖੋ <i class="ti ti-arrow-right"></i>', loginWelcome:"ਜੀ ਆਇਆਂ ਨੂੰ", loginSubtitle:"AI ਹੈਲਥ ਗਾਰਡੀਅਨ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ", lblUsername:"ਯੂਜ਼ਰਨੇਮ", usernameInput:"ਆਪਣਾ ਯੂਜ਼ਰਨੇਮ ਦਰਜ ਕਰੋ", lblPassword:"ਪਾਸਵਰਡ", passwordInput:"ਆਪਣਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ", lblForgot:"ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?", btnLogin:"ਸਾਈਨ ਇਨ ਕਰੋ", lblOr:"ਜਾਂ", btnGoogleText:"Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ", profileTitle:"ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ", profileSub:"ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਸਿਹਤ ਜਾਣਕਾਰੀ ਦਿਓ", btnTakePic:"ਫੋਟੋ ਖਿੱਚੋ", btnFromGallery:"ਗੈਲਰੀ ਤੋਂ ਚੁਣੋ", lblEmail:"ਈਮੇਲ ਪਤਾ", email_ph:"example@mail.com", lblAge:"ਉਮਰ", age_ph:"ਸਾਲ", lblGender:"ਲਿੰਗ", optMale:"ਪੁਰਸ਼", optFemale:"ਔਰਤ", optOther:"ਹੋਰ", lblDob:"ਜਨਮ ਮਿਤੀ", lblFamily:"ਪਰਿਵਾਰਕ ਸੰਪਰਕ ਨੰਬਰ", lblFamilyTitle:"ਪਰਿਵਾਰ ਦੇ ਮੈਂਬਰ", lblFam1:"ਪਰਿਵਾਰਕ ਮੈਂਬਰ 1", lblFam2:"ਪਰਿਵਾਰਕ ਮੈਂਬਰ 2", lblFam3:"ਪਰਿਵਾਰਕ ਮੈਂਬਰ 3", lblFamilyEmailTitle:"ਪਰਿਵਾਰਕ ਲਾਗਇਨ ਈਮੇਲ", lblFam1Email:"ਪਰਿਵਾਰਕ ਮੈਂਬਰ 1 ਈਮੇਲ", lblFam2Email:"ਪਰਿਵਾਰਕ ਮੈਂਬਰ 2 ਈਮੇਲ", lblFam3Email:"ਪਰਿਵਾਰਕ ਮੈਂਬਰ 3 ਈਮੇਲ", lblEmergency:"ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ ਨੰਬਰ", lblEmergencyTitle:"ਤੁਰੰਤ ਸੇਵਾਵਾਂ", lblAmbulance:"ਐਂਬੂਲੈਂਸ", lblFire:"ਫਾਇਰ ਬ੍ਰਿਗੇਡ", lblDoctor:"ਪਰਿਵਾਰਕ ਡਾਕਟਰ", lblBlood:"ਖੂਨ ਦਾ ਗਰੁੱਪ", lblState:"ਰਾਜ", lblSelectState:"ਆਪਣਾ ਰਾਜ ਚੁਣੋ", lblCity:"ਸ਼ਹਿਰ", city_ph:"ਸ਼ਹਿਰ ਦਰਜ ਕਰੋ", lblAddress:"ਪਤਾ", address_ph:"ਪੂਰਾ ਪਤਾ ਦਰਜ ਕਰੋ", btnSave:'<i class="ti ti-checkbox"></i> ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ', toastLangSaved:"ਭਾਸ਼ਾ ਸਫਲਤਾਪੂਰਵਕ ਚੁਣੀ ਗਈ!", toastLoginSuccess:"ਜੀ ਆਇਆਂ ਨੂੰ! ਆਪਣੀ ਪ੍ਰੋਫਾਈਲ ਭਰੋ.", toastProfileSaved:"ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਹੋ ਗਈ!", toastForgot:"ਪਾਸਵਰਡ ਰੀਸੈੱਟ ਲਿੰਕ ਤੁਹਾਡੀ ਈਮੇਲ 'ਤੇ ਭੇਜਿਆ ਗਿਆ ਹੈ.", toastGoogle:"Google ਸਾਈਨ-ਇਨ 'ਤੇ ਰੀਡਾਇਰੈਕਟ ਕਰ ਰਿਹਾ ਹੈ...", resetTitle:"ਪਾਸਵਰਡ ਰੀਸੈਟ ਕਰੋ",
resetSub:"ਨਵਾਂ ਪਾਸਵਰਡ ਬਣਾਓ ਅਤੇ ਪੁਸ਼ਟੀ ਕਰੋ",
newPasswordLabel:"ਨਵਾਂ ਪਾਸਵਰਡ",
newPasswordPlaceholder:"ਨਵਾਂ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ",
confirmPasswordLabel:"ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
confirmPasswordPlaceholder:"ਪਾਸਵਰਡ ਮੁੜ ਦਰਜ ਕਰੋ",
updatePasswordBtn:"ਪਾਸਵਰਡ ਅਪਡੇਟ ਕਰੋ",
backToLoginBtn:"ਲੌਗਿਨ ਤੇ ਵਾਪਸ ਜਾਓ"}
    };

    let selectedLangCode = "en";
    let streamRef = null;

    function showToast(message) {
      const toast = document.getElementById('toastNotification');
      document.getElementById('toastMessage').innerText = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }

    function setText(id, val) { const el = document.getElementById(id); if (el) el.innerHTML = val; }
    function setPh(id, val) { const el = document.getElementById(id); if (el) el.placeholder = val; }

    function applyLocalization(lang) {
      selectedLangCode = lang;
      const d = translations[lang] || translations.en;
      document.documentElement.lang = lang;
      // Lang card
      setText('langTitle', d.langTitle);
      setText('langSub', d.langSub);
      setText('langIndianLabel', d.langIndianLabel);
      setText('langContinueBtn', d.langContinueBtn);
      // Login
      setText('loginWelcome', d.loginWelcome);
      setText('loginSubtitle', d.loginSubtitle);
      setText('lblUsername', d.lblUsername);
      setPh('usernameInput', d.usernameInput);
      setText('lblPassword', d.lblPassword);
      setPh('passwordInput', d.passwordInput);
      setText('lblForgot', d.lblForgot);
      setText('btnLogin', d.btnLogin);
      setText('lblOr', d.lblOr);
      setText('btnGoogleText', d.btnGoogleText);
      // Profile
      setText('profileTitle', d.profileTitle);
      setText('profileSub', d.profileSub);
      setText('btnTakePic', d.btnTakePic);
      setText('btnFromGallery', d.btnFromGallery);
      setText('lblEmail', d.lblEmail);
      setPh('email', d.email_ph);
      setText('lblAge', d.lblAge);
      setPh('age', d.age_ph);
      setText('lblGender', d.lblGender);
      setText('optMale', d.optMale);
      setText('optFemale', d.optFemale);
      setText('optOther', d.optOther);
      setText('lblDob', d.lblDob);
      setText('lblFamily', d.lblFamily);
      setText('lblFamilyTitle', d.lblFamilyTitle);
      setText('lblFam1', d.lblFam1);
      setText('lblFam2', d.lblFam2);
      setText('lblFam3', d.lblFam3);
      setText('lblFamilyEmailTitle', d.lblFamilyEmailTitle);
      setText('lblFam1Email', d.lblFam1Email);
      setText('lblFam2Email', d.lblFam2Email);
      setText('lblFam3Email', d.lblFam3Email);
      setText('lblEmergency', d.lblEmergency);
      setText('lblEmergencyTitle', d.lblEmergencyTitle);
      setText('lblAmbulance', d.lblAmbulance);
      setText('lblFire', d.lblFire);
      setText('lblDoctor', d.lblDoctor);
      setText('lblBlood', d.lblBlood);
      setText('lblState', d.lblState);
      setText('lblSelectState', d.lblSelectState);
      setText('lblCity', d.lblCity);
      setPh('city', d.city_ph);
      setText('lblAddress', d.lblAddress);
      setPh('address', d.address_ph);
      setText('btnSave', d.btnSave);
      // Forgot Password Page
setText('resetTitle', d.resetTitle);
setText('resetSub', d.resetSub);

setText('newPasswordLabel', d.newPasswordLabel);
setText('confirmPasswordLabel', d.confirmPasswordLabel);

setPh('newPasswordInput', d.newPasswordPlaceholder);
setPh('confirmPasswordInput', d.confirmPasswordPlaceholder);

setText('updatePasswordBtn', d.updatePasswordBtn);
setText('backToLoginBtn', d.backToLoginBtn);
    }

    applyLocalization('en');

    function selectLang(el, langCode) {
      document.querySelectorAll('.lang-card').forEach(c => c.classList.remove('selected'));
      el.classList.add('selected');
      applyLocalization(langCode);
      goToLoginPage();
    }

    function goToLoginPage() {
      localStorage.setItem("selectedLanguage", selectedLangCode);
      const d = translations[selectedLangCode] || translations.en;
      showToast(d.toastLangSaved);
      document.getElementById('langCard').classList.remove('active');
      document.getElementById('loginCard').classList.add('active');
    }

    let selectedUserType = 'user';

    function selectUserType(type) {
      selectedUserType = type;
      document.getElementById('tabUser').classList.toggle('active', type === 'user');
      document.getElementById('tabAdmin').classList.toggle('active', type === 'admin');

      document.getElementById('langCard').classList.remove('active');
      document.getElementById('forgotCard') && document.getElementById('forgotCard').classList.remove('active');
      document.getElementById('profileCard').classList.remove('active');
      document.getElementById('adminCard').classList.remove('active');
      document.getElementById('loginCard').classList.add('active');

      document.getElementById('userFieldUsername').style.display = (type === 'user') ? 'flex' : 'none';
      document.getElementById('adminFieldsWrap').style.display = (type === 'admin') ? 'flex' : 'none';

      if (type === 'admin') {
        document.getElementById('loginWelcome').textContent = 'Welcome Admin';
        document.getElementById('loginSubtitle').textContent = 'Sign in to Admin Panel';
        document.getElementById('lblPassword').textContent = 'Password';
        document.getElementById('passwordInput').placeholder = 'Enter your password';
        document.getElementById('lblForgot').textContent = 'Forgot password?';
        document.getElementById('btnLogin').textContent = 'Sign in';
      } else {
        applyLocalization(selectedLangCode);
      }
    }

    function handleSignIn() {

    const formData = new FormData();

    if (selectedUserType === "user") {

        formData.append("username", document.getElementById("usernameInput").value);
        formData.append("password", document.getElementById("passwordInput").value);

        fetch("/login", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {

            if (data === "success") {

                // जुन्या user चा localStorage delete करा
                localStorage.removeItem("userProfile");

                goToProfilePage();
                loadLoggedUser();

            } else {
                alert(data);
            }
        });

    } else {

        formData.append("username", document.getElementById("adminName").value);
        formData.append("email", document.getElementById("adminEmail").value);
        formData.append("mobile", document.getElementById("adminMobile").value);
        formData.append("password", document.getElementById("passwordInput").value);

        fetch("/admin_login", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {

            if (data === "success") {
                goToAdminPage();
            } else {
                alert(data);
            }

        });

    }

}
    function handleSignIn() {

    const username = document.getElementById("usernameInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();

    // Validation फक्त User Login साठी
    if (selectedUserType === "user") {

        if (username === "") {
            alert("Please enter username.");
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;

        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters long and contain at least one alphabet.");
            return;
        }
    }

    const formData = new FormData();

    if (selectedUserType === "user") {

        formData.append("username", username);
        formData.append("password", password);

        fetch("/login", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {

            if (data === "success") {
                localStorage.removeItem("userProfile");
                goToProfilePage();
                loadLoggedUser();
            } else {
                alert(data);
            }
        });

    } else {

        formData.append("username", document.getElementById("adminName").value);
        formData.append("email", document.getElementById("adminEmail").value);
        formData.append("mobile", document.getElementById("adminMobile").value);
        formData.append("password", document.getElementById("passwordInput").value);

        fetch("/admin_login", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {

            if (data === "success") {
                goToAdminPage();
            } else {
                alert(data);
            }

        });

    }
}
  
    function goToAdminPage() {

    document.getElementById("loginCard").classList.remove("active");
    document.getElementById("adminCard").classList.add("active");

    loadAdminUsers();
}
    let demoAppUsers = [];

    function loadAdminUsers() {

    fetch("/get_users")
    .then(response => response.json())
    .then(users => {

        demoAppUsers = users;

        document.getElementById("statTotalUsers").innerText = users.length;

        // Active Users
        const activeUsers = users.filter(u => u.status === "Active").length;
        document.getElementById("statActiveUsers").innerText = activeUsers;

        // New Users
        document.getElementById("statNewUsers").innerText = users.length;

        // Inactive Users
        const inactiveUsers = users.filter(u => u.status === "Inactive").length;
        document.getElementById("statInactiveUsers").innerText = inactiveUsers;

        renderAdminTable(users);

    });

}

  function renderAdminTable(users) {

    const tbody = document.getElementById("adminUserTableBody");

    tbody.innerHTML = "";

    users.forEach(user => {

        tbody.innerHTML += `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.status}</td>
                <td>${user.last_login}</td>
            </tr>
        `;

    });

}

    function filterAdminUsers(type) {

    let filtered = demoAppUsers;
    let label = "Showing all users";

    const cardIds = {
        total: "cardTotal",
        online: "cardActive",
        new: "cardNew",
        inactive: "cardInactive"
    };

    document.querySelectorAll(".admin-stat-box").forEach(c =>
        c.classList.remove("selected")
    );

    if (cardIds[type]) {
        document.getElementById(cardIds[type]).classList.add("selected");
    }

    if (type === "online") {

        filtered = demoAppUsers.filter(user => user.status === "Active");
        label = "Showing Active Users";

    }
    else if (type === "new") {

        // सध्या created_at वापरत नसल्यामुळे
        filtered = demoAppUsers;
        label = "Showing New Users";

    }
    else if (type === "inactive") {

        filtered = demoAppUsers.filter(user => user.status === "Inactive");
        label = "Showing Inactive Users";

    }

    document.getElementById("adminFilterLabel").textContent = label;
    document.getElementById("adminFilterReset").style.display =
        (type === "total") ? "none" : "flex";

    renderAdminTable(filtered);
}

    function adminLogout() {
      document.getElementById('adminCard').classList.remove('active');
      document.getElementById('loginCard').classList.add('active');
    }

    function goToProfilePage() {

    const d = translations[selectedLangCode] || translations.en;
    showToast(d.toastLoginSuccess);

    document.getElementById('loginCard').classList.remove('active');
    document.getElementById('profileCard').classList.add('active');

    loadLoggedUser();   
}
    function loadLoggedUser() {

    fetch("/get_logged_user")
    .then(response => response.json())
    .then(data => {

        console.log(data);

        document.getElementById("loggedUsername").innerText = data.username;

        // Profile dropdown मध्येही नाव दाखवायचं असेल तर
        document.getElementById("profileName").innerText = data.username;
        document.getElementById("profileUsernameValue").innerText = data.username;

    });

}
    function handleForgotPassword() {
  applyLocalization(selectedLangCode);

  document.getElementById('loginCard').classList.remove('active');
  document.getElementById('forgotCard').classList.add('active');
}
    function continueWithGoogle() {
      const d = translations[selectedLangCode] || translations.en;
      showToast(d.toastGoogle);
      setTimeout(() => { window.open('https://accounts.google.com/signin', '_blank'); }, 600);
    }

    function triggerGallery() { document.getElementById('galleryInput').click(); }

    function loadGalleryImage(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.getElementById('avatarImage');
        img.src = e.target.result;
        img.style.display = 'block';
        document.getElementById('avatarPlaceholder').style.display = 'none';
      };
      reader.readAsDataURL(file);
    }

    async function openCameraModal() {
      const modal = document.getElementById('cameraModal');
      modal.classList.add('active');
      const video = document.getElementById('webcam');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        streamRef = stream;
        video.srcObject = stream;
      } catch (err) {
        document.getElementById('videoContainer').innerHTML = '<div class="camera-fallback-msg">Webcam not accessible.<br/>A simulated avatar will be generated.</div>';
      }
    }

    function closeCameraModal() {
      document.getElementById('cameraModal').classList.remove('active');
      if (streamRef) streamRef.getTracks().forEach(t => t.stop());
      streamRef = null;
    }

    function capturePhoto() {
      const video = document.getElementById('webcam');
      const img = document.getElementById('avatarImage');
      const canvas = document.createElement('canvas');
      if (streamRef && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth; canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      } else {
        const emojis = ["🩺","❤️","🧬","🧪","🏥"];
        canvas.width = 150; canvas.height = 150;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1A56DB'; ctx.fillRect(0,0,150,150);
        ctx.fillStyle = '#fff'; ctx.font = '64px Arial';
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText(emojis[Math.floor(Math.random()*emojis.length)], 75, 75);
      }
      img.src = canvas.toDataURL('image/png');
      img.style.display = 'block';
      document.getElementById('avatarPlaceholder').style.display = 'none';
      closeCameraModal();
    }

    function backToLogin() {
  document.getElementById('forgotCard').classList.remove('active');
  document.getElementById('loginCard').classList.add('active');
}

async function resetPassword() {

  const username = document.getElementById("usernameInput").value.trim();
  const newPass = document.getElementById("newPasswordInput").value;
  const confirmPass = document.getElementById("confirmPasswordInput").value;

  if (!username || !newPass || !confirmPass) {
    alert("Please fill all fields");
    return;
  }

  if (newPass !== confirmPass) {
    alert("Passwords do not match");
    return;
  }

  const response = await fetch("/update_password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      new_password: newPass
    })
  });

  const data = await response.json();

  if (data.success) {
    alert("Password Updated Successfully!");

    document.getElementById("forgotCard").classList.remove("active");
    document.getElementById("loginCard").classList.add("active");
  } else {
    alert(data.message);
  }
}
    function updateDobYear(age) {
      if (age === "" || isNaN(age)) return;
      const dobInput = document.getElementById('dob');
      const targetYear = new Date().getFullYear() - parseInt(age, 10);
      const existing = dobInput.value ? dobInput.value.split('-') : null;
      const month = existing ? existing[1] : '01';
      const day = existing ? existing[2] : '01';
      dobInput.value = `${targetYear}-${month}-${day}`;
    }

    function saveProfile(event) {

    event.preventDefault();

    const genderChecked = document.querySelector('input[name="gender"]:checked');

    const requiredFields = [
      document.getElementById("email").value,
      document.getElementById("age").value,
      document.getElementById("dob").value,
      document.getElementById("family1").value,
      document.getElementById("family2").value,
      document.getElementById("family3").value,
      document.getElementById("state").value,
      document.getElementById("city").value,
      document.getElementById("address").value,
      document.getElementById("ambulance").value,
      document.getElementById("fire").value,
      document.getElementById("doctor").value
    ];

    if (!genderChecked || requiredFields.some(v => v.trim() === "")) {
      showToast("Please fill your information");
      return;
    }

    const formData = new FormData();

    formData.append("email", document.getElementById("email").value);
    formData.append("age", document.getElementById("age").value);
    formData.append("gender", genderChecked.value);
    formData.append("dob", document.getElementById("dob").value);
    formData.append("family_contact1", document.getElementById("family1").value);
    formData.append("family_contact2", document.getElementById("family2").value);
    formData.append("family_contact3", document.getElementById("family3").value);
    formData.append("family_email_1", document.getElementById("family1Email").value);
    formData.append("family_email_2", document.getElementById("family2Email").value);
    formData.append("family_email_3", document.getElementById("family3Email").value);
    formData.append("state", document.getElementById("state").value);
    formData.append("city", document.getElementById("city").value);
    formData.append("address", document.getElementById("address").value);
    formData.append("ambulance_contact", document.getElementById("ambulance").value);
    formData.append("fire_contact", document.getElementById("fire").value);
    formData.append("doctor_contact", document.getElementById("doctor").value);
     
    fetch("/save_profile", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {

        if(data === "success"){

            const d = translations[selectedLangCode] || translations.en;
            showToast(d.toastProfileSaved);

            setTimeout(() => {

                if(localStorage.getItem("fromSwitchAccount") === "true"){

                    localStorage.removeItem("fromSwitchAccount");
                    window.location.href = "/main";

                }else{

                    window.location.href = "/permission";

                }

            },1500);

        }else{

            alert(data);

        }

    });

}
