const questions = [
    {
        before: "Spider-Man",
        after: "ಹೋದನು?",
        answer: "ಎಲ್ಲಿಗೆ"
    },
    {
        before: "ನಿನ್ನ ಗೆಳೆಯ",
        after: "?",
        answer: "ಯಾರು"
    },
    {
        before: "ನೀನು",
        after: "ನಗುತ್ತಿದ್ದೀಯ?",
        answer: "ಏಕೆ"
    },
    {
        before: "ನೀನು ಶಾಲೆಗೆ",
        after: "ಹೋಗುತ್ತೀಯ?",
        answer: "ಯಾವಾಗ"
    },
    {
        before: "ನೀನು",
        after: "ತಿಂಡಿ ತಿಂದೆ?",
        answer: "ಏನು"
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


// Display the current question
function showQuestion() {

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

});


// Check the dropped answer
dropZone.addEventListener("drop", function (event) {

    event.preventDefault();

    const correctAnswer =
        questions[currentQuestion].answer;


    if (draggedWord === correctAnswer) {

        dropZone.textContent = draggedWord;

        // Pick a random praise message
        const randomIndex =
            Math.floor(Math.random() * positiveMessages.length);

        feedback.textContent =
            positiveMessages[randomIndex];

        // Show Next only after correct answer
        nextButton.hidden = false;

    } else {

        feedback.textContent =
            "😊 ಇನ್ನೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸು";

    }

});


// Move to the next question
nextButton.addEventListener("click", function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    }

});


// Start the game
showQuestion();