// Quiz data
const quizQuestions = [
    // Unit 1 Questions
    {
        question: "Which Act of India defines 'environment' as including water, air, land, and their interrelationships with living beings and property?",
        options: ["Wildlife Protection Act, 1972", "Water (Prevention and Control of Pollution) Act, 1974", "Environment (Protection) Act, 1986", "Air (Prevention and Control of Pollution) Act, 1981"],
        answer: "Environment (Protection) Act, 1986",
        explanation: "The Environment (Protection) Act, 1986 provides a broad definition of environment to cover various aspects."
    },
    {
        question: "What is the primary driver of environmental pollution according to the definition provided?",
        options: ["Natural disasters", "Introduction of contaminants that cause adverse change", "Climate patterns", "Human population growth"],
        answer: "Introduction of contaminants that cause adverse change",
        explanation: "Environmental pollution is fundamentally about harmful contaminants altering the natural environment."
    },
    {
        question: "Which of the following is NOT a biotic component of the environment?",
        options: ["Producers", "Consumers", "Hydrosphere", "Decomposers"],
        answer: "Hydrosphere",
        explanation: "The hydrosphere refers to all water on Earth, which is an abiotic (non-living) component."
    },
    // Unit 2 Questions
    {
        question: "The Montreal Protocol is an international treaty primarily designed to protect against:",
        options: ["Global warming", "Climate change", "Ozone layer depletion", "Deforestation"],
        answer: "Ozone layer depletion",
        explanation: "The Montreal Protocol specifically targets substances that deplete the ozone layer, such as CFCs and halons."
    },
    {
        question: "Which of these is a primary greenhouse gas responsible for global warming?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"],
        answer: "Carbon dioxide",
        explanation: "Carbon dioxide (CO₂) is the most significant anthropogenic greenhouse gas contributing to global warming."
    },
    {
        question: "The Paris Agreement aims to limit global warming to well below which temperature target compared to pre-industrial levels?",
        options: ["3.0°C", "2.5°C", "2.0°C, preferably 1.5°C", "1.0°C"],
        answer: "2.0°C, preferably 1.5°C",
        explanation: "The Paris Agreement sets an ambitious goal to keep global temperature rise well under 2°C, and ideally at 1.5°C."
    },
    // Unit 3 Questions
    {
        question: "Environmental degradation refers to the deterioration of the environment through all of the following EXCEPT:",
        options: ["Depletion of resources", "Ecosystem restoration", "Habitat destruction", "Extinction of wildlife"],
        answer: "Ecosystem restoration",
        explanation: "Ecosystem restoration is a strategy to *reverse* degradation, not a cause of it."
    },
    {
        question: "Which Indian legal mechanism allows any person to approach the court for protection of public interest, including environmental concerns?",
        options: ["Habeas Corpus", "Mandamus", "Public Interest Litigation (PIL)", "Quo Warranto"],
        answer: "Public Interest Litigation (PIL)",
        explanation: "PIL has been instrumental in environmental protection in India, allowing citizens to bring matters of public importance to court."
    },
    {
        question: "The 'Polluter Pays Principle' states that:",
        options: ["The government pays for environmental damage", "The polluter should bear the costs of preventing and controlling pollution", "Future generations pay for environmental damage", "International bodies are solely responsible for pollution costs"],
        answer: "The polluter should bear the costs of preventing and controlling pollution",
        explanation: "The 'Polluter Pays Principle' assigns responsibility for environmental costs to those who cause pollution."
    },
    // Unit 4 Questions
    {
        question: "The ancient Indian concept of 'Vasudhaiva Kutumbakam' emphasizes:",
        options: ["Individual prosperity", "The world as one family, highlighting interconnectedness", "Human dominance over nature", "Strict adherence to rituals"],
        answer: "The world as one family, highlighting interconnectedness",
        explanation: "'Vasudhaiva Kutumbakam' promotes a holistic view of the world and emphasizes the unity and interdependence of all beings."
    },
    {
        question: "Sacred groves in ancient India were primarily protected due to their:",
        options: ["Economic value", "Military significance", "Religious and cultural importance", "Proximity to urban centers"],
        answer: "Religious and cultural importance",
        explanation: "Sacred groves were traditionally preserved out of reverence and spiritual beliefs, leading to their ecological protection."
    },
    {
        question: "Which ancient Indian text contains the 'Bhumi Sukta' (Hymn to Earth) emphasizing environmental conservation?",
        options: ["Rigveda", "Yajurveda", "Atharvaveda", "Samaveda"],
        answer: "Atharvaveda",
        explanation: "The Atharvaveda's Bhumi Sukta is a profound hymn dedicated to Mother Earth and highlights the importance of protecting her."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; // To store user's answers for review
let quizStarted = false; // Flag to indicate if quiz has started

function startQuiz() {
    quizStarted = true;
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = Array(quizQuestions.length).fill(null); // Initialize with null for unanswered questions
    document.getElementById('quiz-intro').classList.add('hidden');
    document.getElementById('quiz-questions').classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const questionData = quizQuestions[currentQuestionIndex];
        document.getElementById('current-question').textContent = currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = quizQuestions.length;
        document.getElementById('score').textContent = score;
        document.getElementById('question-text').textContent = questionData.question;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = ''; // Clear previous options
        questionData.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('block', 'w-full', 'text-left', 'py-2', 'px-4', 'rounded-md', 'border', 'border-gray-300', 'hover:bg-gray-100', 'transition', 'duration-200', 'mb-2');
            button.onclick = () => selectOption(index);
            optionsContainer.appendChild(button);

            // Highlight if already answered (for navigating back and forth)
            if (userAnswers[currentQuestionIndex] !== null) {
                if (index === userAnswers[currentQuestionIndex]) {
                    if (option === questionData.answer) {
                        button.classList.add('bg-green-200', 'border-green-500');
                    } else {
                        button.classList.add('bg-red-200', 'border-red-500');
                    }
                } else if (option === questionData.answer) {
                    // Highlight correct answer even if it wasn't selected by user
                    button.classList.add('bg-green-200', 'border-green-500');
                }
                button.disabled = true; // Disable options after answering
            }
        });

        updateQuizNavigationButtons();
        hideFeedback();
        // Show feedback immediately if the question was already answered
        if (userAnswers[currentQuestionIndex] !== null) {
            const selectedOptionText = questionData.options[userAnswers[currentQuestionIndex]];
            showQuizFeedback(selectedOptionText === questionData.answer, questionData.explanation, questionData.answer);
        }
    } else {
        showQuizResults();
    }
}

function selectOption(selectedIndex) {
    const questionData = quizQuestions[currentQuestionIndex];
    const selectedOptionText = questionData.options[selectedIndex];
    userAnswers[currentQuestionIndex] = selectedIndex; // Store the selected index

    const isCorrect = selectedOptionText === questionData.answer;
    if (isCorrect) {
        score++;
    }
    document.getElementById('score').textContent = score;

    // Disable all options after selection
    Array.from(document.getElementById('options-container').children).forEach(button => {
        button.disabled = true;
    });

    showQuizFeedback(isCorrect, questionData.explanation, questionData.answer);
    updateQuizNavigationButtons(); // Update button state after answering
}

function showQuizFeedback(isCorrect, explanation, correctAnswer) {
    const correctFeedback = document.getElementById('correct-feedback');
    const incorrectFeedback = document.getElementById('incorrect-feedback');
    const correctExplanation = document.getElementById('correct-explanation');
    const incorrectExplanation = document.getElementById('incorrect-explanation');

    correctFeedback.classList.add('hidden');
    incorrectFeedback.classList.add('hidden');
    document.getElementById('feedback-container').classList.remove('hidden');

    if (isCorrect) {
        correctFeedback.classList.remove('hidden');
        correctExplanation.textContent = explanation;
    } else {
        incorrectFeedback.classList.remove('hidden');
        incorrectExplanation.textContent = `The correct answer was: "${correctAnswer}". ${explanation}`;
    }
}

function hideFeedback() {
    document.getElementById('feedback-container').classList.add('hidden');
}

function updateQuizNavigationButtons() {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    prevButton.disabled = currentQuestionIndex === 0;
    
    // Check if the current question has been answered
    const currentQuestionAnswered = userAnswers[currentQuestionIndex] !== null;

    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextButton.textContent = 'Finish Quiz';
        nextButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        nextButton.classList.add('bg-green-600', 'hover:bg-green-700');
        nextButton.disabled = !currentQuestionAnswered; // Must answer last question to finish
    } else {
        nextButton.textContent = 'Next';
        nextButton.classList.remove('bg-green-600', 'hover:bg-green-700');
        nextButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
        nextButton.disabled = !currentQuestionAnswered; // Must answer current question to proceed
    }
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showQuizResults();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function showQuizResults() {
    document.getElementById('quiz-questions').classList.add('hidden');
    document.getElementById('quiz-results').classList.remove('hidden');
    document.getElementById('final-score').textContent = score;
    document.getElementById('max-score').textContent = quizQuestions.length;

    const performanceFeedback = document.getElementById('performance-feedback');
    let feedbackText = '';
    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        feedbackText = "Excellent! You've mastered Environmental Law!";
    } else if (percentage >= 70) {
        feedbackText = "Great job! You have a strong understanding, keep reviewing key areas.";
    } else if (percentage >= 50) {
        feedbackText = "Good effort! Review the sections where you struggled for better understanding.";
    } else {
        feedbackText = "Keep studying! There's room for improvement. Focus on all units.";
    }
    performanceFeedback.textContent = feedbackText;
}

function restartQuiz() {
    quizStarted = false; // Reset quiz started flag
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = Array(quizQuestions.length).fill(null);
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-questions').classList.add('hidden'); // Ensure questions are hidden
    document.getElementById('quiz-intro').classList.remove('hidden'); // Show intro screen again
    document.getElementById('score').textContent = 0; // Reset displayed score
    hideFeedback();
    updateQuizNavigationButtons(); // Reset navigation buttons for intro state
}
