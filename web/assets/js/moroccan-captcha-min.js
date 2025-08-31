/**
 * Moroccan Cultural CAPTCHA System
 * @package CIN Framework
 * @author Mawi Man
 * @license Proprietary - All rights reserved to Ayoub Alarjani
 */

/**
 * CIN Framework questions database with bilingual support
 * @type {Object}
 */
const cinQuestions = {
    ar: [
        {
            question: "أي جيل من الويب يستهدفه CIN Framework؟",
            options: ["Web 1", "Web 2", "Web 3", "Web 4"],
            correct: 3
        },
        {
            question: "في أي دولة تم إنشاء CIN Framework؟",
            options: ["فرنسا", "امريكا", "المغرب", "إسبانيا"],
            correct: 2
        },
        {
            question: "في أي مدينة تم إنشاء CIN Framework؟",
            options: ["الرباط", "مراكش", "فاس", "طنجة"],
            correct: 2
        },
        {
            question: "ما هو اسم مطور CIN Framework؟",
            options: ["إيلون ماسك", "مارك زوكربيرغ", "تشانغ يي مينغ", "ماوي مان"],
            correct: 3
        },
        {
            question: "ما هي اللغة الأساسية التي يعتمد عليها CIN Framework؟",
            options: ["Python", "Java", "PHP", "Ruby"],
            correct: 2
        },
        {
            question: "ما هو اللون الأساسي في تصميم موقع CIN Framework؟",
            options: ["أخضر", "أحمر", "أزرق", "أصفر"],
            correct: 2
        },
        {
            question: "ما هو الشعار الرسمي لـ CIN Framework؟",
            options: ["Fast and Secure", "Web 3 Revolution", "CIN FRAMEWORK – WEB 4 – POWERED BY LOCAL SELF-SUFFICIENCY AND AGGRESSIVE SECURITY", "Powered by AI"],
            correct: 2
        },
        {
            question: "ما هو البريد الإلكتروني للدعم الفني في CIN Framework؟",
            options: ["admin@cin-framework.com", "support@cin-framework.com", "dev@cin-framework.com", "help@cin-framework.com"],
            correct: 1
        },
        {
            question: "ما هو إسم لوحة أوامر الخاص بـ CIN FRAMEWORK؟",
            options: ["Terminal", "Power Shell", "CIN CIL", "VS CODE"],
            correct: 2
        }
    ],
    en: [
        {
            question: "Which generation of the web does CIN Framework target?",
            options: ["Web 1", "Web 2", "Web 3", "Web 4"],
            correct: 3
        },
        {
            question: "In which country was CIN Framework created?",
            options: ["France", "America", "Morocco", "Spain"],
            correct: 2
        },
        {
            question: "In which city was CIN Framework created?",
            options: ["Rabat", "Marrakech", "Fez", "Tangier"],
            correct: 2
        },
        {
            question: "What is the name of CIN Framework's developer?",
            options: ["Elon Musk", "Mark Zuckerberg", "Zhang Yiming", "Mawi Man"],
            correct: 3
        },
        {
            question: "What is the main programming language that CIN Framework relies on?",
            options: ["Python", "Java", "PHP", "Ruby"],
            correct: 2
        },
        {
            question: "What is the primary color in CIN Framework website design?",
            options: ["green", "red", "blue", "yellow"],
            correct: 2
        },
        {
            question: "What is the official slogan of CIN Framework?",
            options: ["Fast and Secure", "Web 3 Revolution", "CIN FRAMEWORK – WEB 4 – POWERED BY LOCAL SELF-SUFFICIENCY AND AGGRESSIVE SECURITY", "Powered by AI"],
            correct: 2
        },
        {
            question: "What is the technical support email for CIN Framework?",
            options: ["admin@cin-framework.com", "support@cin-framework.com", "dev@cin-framework.com", "mawi@cin-framework.com"],
            correct: 1
        },
        {
            question: "What is the name of the command panel for CIN FRAMEWORK?",
            options: ["Terminal", "Power Shell", "CIN CLI", "VS CODE"],
            correct: 2
        }
    ]
};

/**
 * Current CAPTCHA state
 * @type {Object}
 */
let captchaState = {
    currentQuestion: null,
    isVerified: false,
    attempts: 0,
    maxAttempts: 3,
    currentLanguage: 'ar'
};

/**
 * CAPTCHA interface text translations
 * @type {Object}
 */
const captchaTexts = {
    ar: {
        title: '🇲🇦 التحقق المغربي الأصيل',
        subtitle: 'أجب على السؤال التالي لإثبات أنك مغربي أصيل',
        submitButton: 'تأكيد الإجابة',
        refreshButton: 'سؤال جديد',
        attemptsText: 'المحاولات المتبقية:',
        selectAnswer: 'يرجى اختيار إجابة',
        wrongAnswer: '❌ إجابة خاطئة. المحاولات المتبقية:',
        correctAnswer: '🎉 ممتاز! تم التحقق بنجاح. أهلاً وسهلاً بك أخي المغربي!',
        maxAttempts: '❌ تم استنفاد جميع المحاولات. يرجى المحاولة لاحقاً.',
        emailError: 'يرجى إدخال بريد إلكتروني صحيح.'
    },
    en: {
        title: '🇲🇦 Authentic Moroccan Verification',
        subtitle: 'Answer the following question to prove you are an authentic Moroccan',
        submitButton: 'Confirm Answer',
        refreshButton: 'New Question',
        attemptsText: 'Remaining attempts:',
        selectAnswer: 'Please select an answer',
        wrongAnswer: '❌ Wrong answer. Remaining attempts:',
        correctAnswer: '🎉 Excellent! Verification successful. Welcome, my Moroccan brother!',
        maxAttempts: '❌ All attempts exhausted. Please try again later.',
        emailError: 'Please enter a valid email address.'
    }
};

/**
 * Initializes the Moroccan CAPTCHA system
 * @returns {void}
 */
function initMoroccanCaptcha() {
    createCaptchaModal();
}

/**
 * Creates the CAPTCHA modal interface
 * @returns {void}
 */
function createCaptchaModal() {
    const modal = document.createElement('div');
    modal.id = 'moroccanCaptchaModal';
    modal.className = 'moroccan-captcha-modal';
    
    const texts = captchaTexts[captchaState.currentLanguage];
    
    modal.innerHTML = `
        <div class="moroccan-captcha-container" dir="${captchaState.currentLanguage === 'ar' ? 'rtl' : 'ltr'}">
            <div class="moroccan-captcha-header">
                <div class="moroccan-captcha-language-switcher">
                    <button type="button" class="language-btn ${captchaState.currentLanguage === 'ar' ? 'active' : ''}" onclick="switchCaptchaLanguage('ar')">العربية</button>
                    <button type="button" class="language-btn ${captchaState.currentLanguage === 'en' ? 'active' : ''}" onclick="switchCaptchaLanguage('en')">English</button>
                </div>
                <img src="./assets/img/moroccan-captcha.svg" alt="Moroccan CAPTCHA">
                <h3 class="moroccan-captcha-title">${texts.title}</h3>
                <p class="moroccan-captcha-subtitle">${texts.subtitle}</p>
            </div>
            
            <div class="moroccan-captcha-content">
                <div id="questionText" class="moroccan-captcha-question"></div>
                
                <div id="optionsContainer" class="moroccan-captcha-options"></div>
                
                <div class="moroccan-captcha-actions">
                    <button id="submitCaptcha" class="moroccan-captcha-btn moroccan-captcha-btn-primary moroccan-captcha-submit">${texts.submitButton}</button>
                    <button id="refreshCaptcha" class="moroccan-captcha-btn moroccan-captcha-btn-secondary moroccan-captcha-refresh">${texts.refreshButton}</button>
                </div>
                
                <div id="captchaMessage" class="moroccan-captcha-message"></div>
                
                <div class="moroccan-captcha-attempts">
                    <span class="attempts-text">${texts.attemptsText}</span> <span id="attemptsLeft">${captchaState.maxAttempts}</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('submitCaptcha').addEventListener('click', submitCaptchaAnswer);
    document.getElementById('refreshCaptcha').addEventListener('click', generateNewQuestion);
}

/**
 * Shows the CAPTCHA modal with a new question
 * @returns {void}
 */
function showMoroccanCaptcha() {
    const modal = document.getElementById('moroccanCaptchaModal');
    if (!modal) {
        initMoroccanCaptcha();
    }
    
    captchaState.isVerified = false;
    captchaState.attempts = 0;
    generateNewQuestion();
    document.getElementById('moroccanCaptchaModal').style.display = 'flex';
    setTimeout(() => modal.classList.add('open'), 10);
}

/**
 * Generate a random question from the database based on current language
 * @returns {Object} Random question object
 */
function generateRandomQuestion() {
    const questions = cinQuestions[captchaState.currentLanguage];
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

/**
 * Switch CAPTCHA language
 * @param {string} language - Language code ('ar' or 'en')
 */
function switchCaptchaLanguage(language) {
    captchaState.currentLanguage = language;
    updateCaptchaInterface();
    generateNewQuestion();
}

/**
 * Update CAPTCHA interface text based on current language
 */
function updateCaptchaInterface() {
    const texts = captchaTexts[captchaState.currentLanguage];
    const modal = document.getElementById('moroccanCaptchaModal');
    
    if (modal) {
        const title = modal.querySelector('.moroccan-captcha-title');
        const subtitle = modal.querySelector('.moroccan-captcha-subtitle');
        const submitBtn = modal.querySelector('.moroccan-captcha-submit');
        const refreshBtn = modal.querySelector('.moroccan-captcha-refresh');
        const attemptsSpan = modal.querySelector('.attempts-text');
        
        if (title) title.textContent = texts.title;
        if (subtitle) subtitle.textContent = texts.subtitle;
        if (submitBtn) submitBtn.textContent = texts.submitButton;
        if (refreshBtn) refreshBtn.textContent = texts.refreshButton;
        if (attemptsSpan) attemptsSpan.textContent = texts.attemptsText;
        
        // Update language direction
        const container = modal.querySelector('.moroccan-captcha-container');
        if (container) {
            container.dir = captchaState.currentLanguage === 'ar' ? 'rtl' : 'ltr';
        }
        
        // Update language buttons active state
        const languageButtons = modal.querySelectorAll('.language-btn');
        languageButtons.forEach(btn => {
            btn.classList.remove('active');
            if ((btn.textContent === 'العربية' && captchaState.currentLanguage === 'ar') ||
                (btn.textContent === 'English' && captchaState.currentLanguage === 'en')) {
                btn.classList.add('active');
            }
        });
    }
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Generates a new random question
 * @returns {void}
 */
function generateNewQuestion() {
    const originalQuestion = generateRandomQuestion();
    
    // Create shuffled options with their original indices
    const optionsWithIndices = originalQuestion.options.map((option, index) => ({
        text: option,
        originalIndex: index
    }));
    
    const shuffledOptions = shuffleArray(optionsWithIndices);
    
    // Find the new position of the correct answer
    const newCorrectIndex = shuffledOptions.findIndex(option => 
        option.originalIndex === originalQuestion.correct
    );
    
    // Update current question with shuffled data
    captchaState.currentQuestion = {
        question: originalQuestion.question,
        options: shuffledOptions.map(option => option.text),
        correct: newCorrectIndex
    };
    
    document.getElementById('questionText').textContent = captchaState.currentQuestion.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    captchaState.currentQuestion.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'moroccan-captcha-option';
        
        optionDiv.innerHTML = `
            <input type="radio" name="captchaOption" value="${index}" id="option${index}">
            <label for="option${index}">${option}</label>
        `;
        
        optionsContainer.appendChild(optionDiv);
    });
    
    document.getElementById('captchaMessage').style.display = 'none';
    document.getElementById('attemptsLeft').textContent = captchaState.maxAttempts - captchaState.attempts;
}

/**
 * Submits and validates the CAPTCHA answer
 * @returns {void}
 */
function submitCaptchaAnswer() {
    const selectedOption = document.querySelector('input[name="captchaOption"]:checked');
    
    if (!selectedOption) {
        showCaptchaMessage('selectAnswer', 'error');
        return;
    }
    
    const selectedValue = parseInt(selectedOption.value);
    const messageDiv = document.getElementById('captchaMessage');
    
    if (selectedValue === captchaState.currentQuestion.correct) {
        captchaState.isVerified = true;
        showCaptchaMessage('correctAnswer', 'success');
        
        setTimeout(() => {
            closeMoroccanCaptcha();
            proceedWithEmailSubmission();
        }, 2000);
    } else {
        captchaState.attempts++;
        const remainingAttempts = captchaState.maxAttempts - captchaState.attempts;
        
        if (remainingAttempts > 0) {
            showCaptchaMessage('wrongAnswer', 'error', remainingAttempts);
            document.getElementById('attemptsLeft').textContent = remainingAttempts;
            setTimeout(generateNewQuestion, 1500);
        } else {
            showCaptchaMessage('maxAttempts', 'error');
            setTimeout(() => {
                document.getElementById('moroccanCaptchaModal').style.display = 'none';
            }, 3000);
        }
    }
}

/**
 * Shows a message in the CAPTCHA interface
 * @param {string} messageKey - Message key from translations
 * @param {string} type - The message type ('success' or 'error')
 * @param {number} remainingAttempts - Remaining attempts for error messages
 * @returns {void}
 */
function showCaptchaMessage(messageKey, type, remainingAttempts = null) {
    const texts = captchaTexts[captchaState.currentLanguage];
    const messageDiv = document.getElementById('captchaMessage');
    
    let message = texts[messageKey];
    
    // Add remaining attempts for wrong answer messages
    if (messageKey === 'wrongAnswer' && remainingAttempts !== null) {
        message += ` ${remainingAttempts}`;
    }
    
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    messageDiv.className = `moroccan-captcha-message ${type}`;
}

/**
 * Closes the Moroccan CAPTCHA modal with animation
 * @returns {void}
 */
function closeMoroccanCaptcha() {
    const modal = document.getElementById('moroccanCaptchaModal');
    if (modal) {
        modal.classList.remove('open');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

/**
 * Proceeds with email submission after successful CAPTCHA verification
 * @returns {void}
 */
function proceedWithEmailSubmission() {
    const form = document.querySelector('.cin-input-group');
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email && captchaState.isVerified) {
        handleEmailSubmit({ preventDefault: () => {}, target: form });
    }
}

/**
 * Enhanced email submit handler with CAPTCHA integration
 * @param {Event} event - The form submission event
 * @returns {void}
 */
function handleEmailSubmitWithCaptcha(event) {
    event.preventDefault();
    
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage('يرجى إدخال بريد إلكتروني صحيح.', 'error');
        return;
    }
    
    if (!captchaState.isVerified) {
        showMoroccanCaptcha();
        return;
    }
    
    handleEmailSubmit(event);
}

// Initialize CAPTCHA when DOM is loaded
document.addEventListener('DOMContentLoaded', initMoroccanCaptcha);

// Export functions for global access
window.showMoroccanCaptcha = showMoroccanCaptcha;
window.handleEmailSubmitWithCaptcha = handleEmailSubmitWithCaptcha;