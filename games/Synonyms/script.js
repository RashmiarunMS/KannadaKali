const questions = [
    {
        word: "ನವಿಲು",
        synonyms: ["ಮಯೂರ", "ಶಿಖಿ", "ಸಹಸ್ರಾಕ್ಷ"]
    },
    {
        word: "ಆಕಾಶ",
        synonyms: ["ಗಗನ", "ಮುಗಿಲು"]
    },
    {
        word: "ಗೆಳೆಯ",
        synonyms: ["ಮಿತ್ರ", "ಸಖ"]
    },
    {
        word: "ಬಣ್ಣ",
        synonyms: ["ರಂಗು", "ವರ್ಣ"]
    }
];

let currentQuestion = 0;
let selectedAnswers = [];

const questionArea =
    document.getElementById("question-area");

const wordArea =
    document.getElementById("word-area");

const feedback =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("next-button");

const playAgainButton =
    document.getElementById("play-again-button");


function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] =
            [copy[j], copy[i]];
    }

    return copy;
}


function getAnswerOptions(question) {

    // Collect synonyms belonging to other questions
    const distractors = questions
        .filter(q => q.word !== question.word)
        .flatMap(q => q.synonyms);

    // Pick 3 random distractors
    const shuffledDistractors =
        shuffle(distractors).slice(0, 3);

    // Combine correct answers and distractors
    return shuffle([
        ...question.synonyms,
        ...shuffledDistractors
    ]);
}


function showQuestion() {

    const question =
        questions[currentQuestion];

    questionArea.innerHTML = "";

    wordArea.innerHTML = "";

    feedback.textContent = "";

    nextButton.hidden = true;

    selectedAnswers = [];


    const heading =
        document.createElement("h2");

    heading.textContent =
        question.word;

    questionArea.appendChild(heading);


    const answerOptions =
        getAnswerOptions(question);


    answerOptions.forEach(wordText => {

        const word =
            document.createElement("button");

        word.className =
            "answer-word";

        word.textContent =
            wordText;


        word.addEventListener("click", function () {

            // Ignore a word that has already been selected
            if (selectedAnswers.includes(wordText)) {
                return;
            }


            // Check whether this word is a correct synonym
            if (!question.synonyms.includes(wordText)) {

                feedback.textContent =
                    "ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ 😊";

                return;
            }


            // Correct answer
            selectedAnswers.push(wordText);

            word.classList.add("selected");


            // Check whether all synonyms have been found
            if (
                selectedAnswers.length ===
                question.synonyms.length
            ) {

                feedback.textContent =
                    "🎉 ಅದ್ಭುತ! ಎಲ್ಲಾ ಸಮಾನಾರ್ಥಕ ಪದಗಳನ್ನು ಕಂಡುಹಿಡಿದಿದ್ದೀರಿ! 🎉";

                nextButton.hidden = false;
            }

        });


        wordArea.appendChild(word);

    });
}

nextButton.addEventListener("click", function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        feedback.textContent =
            "🎉 ಅದ್ಭುತ! ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳನ್ನು ಮುಗಿಸಿದ್ದೀರಿ! 🎉";

        wordArea.innerHTML = "";

        nextButton.hidden = true;

        playAgainButton.hidden = false;
    }

});

playAgainButton.addEventListener("click", function () {

    currentQuestion = 0;

    selectedAnswers = [];

    playAgainButton.hidden = true;

    feedback.textContent = "";

    showQuestion();
});

showQuestion();