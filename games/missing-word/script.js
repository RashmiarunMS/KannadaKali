const questions = [
    {
        before: "Spider-Man",
        after: "ಹೋದನು?",
        answers: ["ಎಲ್ಲಿಗೆ", "ಯಾವಾಗ", "ಏಕೆ"]
    },
    {
        before: "ನಿನ್ನ ಗೆಳೆಯ",
        after: "?",
        answers: ["ಯಾರು"]
    },
    {
        before: "ನೀನು",
        after: "ನಗುತ್ತಿದ್ದೀಯ?",
        answers: ["ಏಕೆ"]
    },
    {
        before: "ನೀನು ಶಾಲೆಗೆ",
        after: "ಹೋಗುತ್ತೀಯ?",
        answers: ["ಏಕೆ", "ಯಾವಾಗ"]
    },
    {
        before: "ನೀನು",
        after: "ತಿಂಡಿ ತಿಂದೆ?",
        answers: ["ಏಕೆ", "ಏನು", "ಯಾವಾಗ"]
    }
];


// Different praise messages
const positiveMessages = [
    "🎉 ಅದ್ಭುತ!",
    "👏 ಭೇಷ್!",
    "🌟 ಭಲೇ ಭಲೇ!",
    "🙌 ಶಭಾಷ್!",
    "✨ ಸೂಪರ್!"
];


let currentQuestion = 0;
let draggedWord = "";
let attemptsForCurrentQuestion = 0;
let firstTryCorrect = 0;
let extraAttempts = 0;
let questionAnswered = false;

// Get elements from HTML
const words = document.querySelectorAll(".word");

const dropZone =
    document.getElementById("drop-zone");

const feedback =
    document.getElementById("feedback");

const sentenceBefore =
    document.getElementById("sentence-before");

const sentenceAfter =
    document.getElementById("sentence-after");

const nextButton =
    document.getElementById("next-button");

const progress =
    document.getElementById("progress");

const playAgainButton =
    document.getElementById("play-again-button");

    playAgainButton.addEventListener("click", function () {

    currentQuestion = 0;
    firstTryCorrect = 0;
    extraAttempts = 0;
    attemptsForCurrentQuestion = 0;
    questionAnswered = false;

    document.querySelector(".sentence").style.display = "";
    document.querySelector(".word-bank").style.display = "";

    playAgainButton.hidden = true;

    showQuestion();
});

// Display the current question
function showQuestion() {

    attemptsForCurrentQuestion = 0;

    questionAnswered = false;

    const question = questions[currentQuestion];

    sentenceBefore.textContent = question.before;

    sentenceAfter.textContent = question.after;

    dropZone.textContent = "______";

    feedback.textContent = "";

    progress.textContent =
        `ಪ್ರಶ್ನೆ ${currentQuestion + 1} / ${questions.length}`;

    // Hide Next until correct answer is given
    nextButton.hidden = true;
}


// Remember which word is being dragged
words.forEach(word => {

    word.addEventListener("dragstart", function () {

        draggedWord = this.textContent;

    });

});


// Allow dropping into the blank
dropZone.addEventListener("dragover", function (event) {

    event.preventDefault();
    attemptsForCurrentQuestion++;

    if (questionAnswered) {
    return;
}

});


// Check the dropped answer
dropZone.addEventListener("drop", function (event) {

    event.preventDefault();

    const correctAnswers =
    questions[currentQuestion].answers;


    if (correctAnswers.includes(draggedWord)) {

        firstTryCorrect++;
        dropZone.textContent = draggedWord;
        questionAnswered = true;

        // Pick a random praise message
        const randomIndex =
            Math.floor(Math.random() * positiveMessages.length);

        feedback.textContent =
            positiveMessages[randomIndex];

        // Show Next only after correct answer
        nextButton.hidden = false;

    } else {

        extraAttempts++;
        feedback.textContent =
            "😊 ಇನ್ನೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸು";

    }

});


// Move to the next question
nextButton.addEventListener("click", function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResults();

    }

});

function showResults() {

    document.querySelector(".sentence").style.display = "none";
    document.querySelector(".word-bank").style.display = "none";

    playAgainButton.hidden = false;
    nextButton.hidden = true;

    progress.textContent = "";

    feedback.innerHTML = `
        🎉 ಅದ್ಭುತ! ಆಟ ಮುಗಿಯಿತು! 🎉
        <br><br>
        ಎಲ್ಲಾ ${questions.length} ಪ್ರಶ್ನೆಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ!
        <br><br>
        ⭐ ಮೊದಲ ಪ್ರಯತ್ನದಲ್ಲೇ ಸರಿಯಾದ ಉತ್ತರಗಳು:
        
        ${firstTryCorrect} / ${questions.length}
        <br>
        🔄 ಹೆಚ್ಚುವರಿ ಪ್ರಯತ್ನಗಳು:
        ${extraAttempts}
        
    `;
}
// Start the game
showQuestion();