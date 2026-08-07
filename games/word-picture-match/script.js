const items = [
    {
        id: "kalyana-seve",
        words: ["ಕಲ್ಯಾಣ ಸೇವೆ"],
        image: "images/kalyana-seve.jpg"
    },
    {
        id: "kadale",
        words: ["ಪುಟ್ಟಾಣಿ", "ಕಡಲೆ"],
        image: "images/kadale.jpg"
    },
    {
        id: "puri",
        words: ["ಪುರಿ"],
        image: "images/puri.jpg"
    },
    {
        id: "goli",
        words: ["ಗೋಲಿ"],
        image: "images/goli.jpg"
    },
    {
        id: "balapa",
        words: ["ಬಳಪ"],
        image: "images/balapa.jpg"
    },
    {
        id: "patasu-petlu",
        words: ["ಪಟಾಸು ಪೆಟ್ಲು"],
        image: "images/patasu-petlu.jpg"
    }
];

const praises = [
    "ಅದ್ಭುತ! 🌟",
    "ಭೇಷ್! 👏",
    "ಭಲೇ ಭಲೇ! 🎉",
    "ಚೆನ್ನಾಗಿದೆ! 😊",
    "ಸೂಪರ್! ⭐"
];

const feedback =
    document.getElementById("feedback");

let draggedWord = null;
let selectedWord = null;
let matchedCount = 0;

const playAgainButton =
    document.getElementById("play-again-button");

function getRandomPraise() {
    return praises[
        Math.floor(Math.random() * praises.length)
    ];
}

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

const pictureArea =
    document.getElementById("picture-area");

const wordArea =
    document.getElementById("word-area");


function createPictures() {

    pictureArea.innerHTML = "";

    const shuffledItems = shuffle(items);

    shuffledItems.forEach(item => {

        const card =
            document.createElement("div");

        card.className = "picture-card";
        card.dataset.id = item.id;

        // TAP / CLICK MATCHING
        card.addEventListener("click", function () {

            if (!selectedWord) {
                return;
            }

            if (selectedWord.dataset.id === card.dataset.id) {

                feedback.textContent =
                    getRandomPraise();

                card.classList.add("matched");

                selectedWord.classList.add("matched-word");
                selectedWord.classList.remove("selected");

                selectedWord.draggable = false;
                selectedWord = null;

                checkCompletion();

            } else {

                feedback.textContent =
                    "ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ 😊";
            }
        });


        // DRAG-AND-DROP MATCHING
        card.addEventListener("dragover", function (event) {
            event.preventDefault();
        });

        card.addEventListener("drop", function (event) {

            event.preventDefault();

            if (!draggedWord) {
                return;
            }

            if (draggedWord.dataset.id === card.dataset.id) {

                feedback.textContent =
                    getRandomPraise();

                card.classList.add("matched");
                draggedWord.classList.add("matched-word");

                draggedWord.draggable = false;
                draggedWord = null;

                checkCompletion();

            } else {

                feedback.textContent =
                    "ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ 😊";
            }
        });


        // CREATE IMAGE
        const image =
            document.createElement("img");

        image.src = item.image;
        image.alt = "ಚಿತ್ರ";

        card.appendChild(image);

        pictureArea.appendChild(card);
    });
}


function createWords() {

    wordArea.innerHTML = "";

    const shuffledItems = shuffle(items);

    shuffledItems.forEach(item => {

        const word =
            document.createElement("div");

        word.className = "word";
        word.draggable = true;

        word.dataset.id = item.id;

        // Show the first name for now
        word.textContent = item.words[0];


        // DRAG-AND-DROP
        word.addEventListener("dragstart", function () {
            draggedWord = word;
        });


        // TAP / CLICK
        word.addEventListener("click", function () {

            // Ignore already matched words
            if (word.classList.contains("matched-word")) {
                return;
            }

            // Remove previous selection
            document.querySelectorAll(".word").forEach(w => {
                w.classList.remove("selected");
            });

            selectedWord = word;

            word.classList.add("selected");

            feedback.textContent =
                "ಈಗ ಸರಿಯಾದ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ 😊";
        });


        // ADD WORD TO PAGE
        wordArea.appendChild(word);
    });
}

function createWords() {

    wordArea.innerHTML = "";

    const shuffledItems = shuffle(items);

    shuffledItems.forEach(item => {

        const word =
            document.createElement("div");

        word.className = "word";
        word.draggable = true;

        word.dataset.id = item.id;

        // Show the first name for now
        word.textContent = item.words[0];

        // Drag-and-drop
        word.addEventListener("dragstart", function () {
            draggedWord = word;
        });

        // Tap / click
        word.addEventListener("click", function () {

            // Ignore words that are already matched
            if (word.classList.contains("matched-word")) {
                return;
            }

            // Remove selection from previously selected word
            document.querySelectorAll(".word").forEach(w => {
                w.classList.remove("selected");
            });

            selectedWord = word;
            word.classList.add("selected");

            feedback.textContent =
                "ಈಗ ಸರಿಯಾದ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ 😊";
        });

        wordArea.appendChild(word);
    });
}

function checkCompletion() {

    matchedCount++;

    if (matchedCount === items.length) {

        feedback.textContent =
            "🎉 ಅದ್ಭುತ! ಎಲ್ಲವನ್ನೂ ಸರಿಯಾಗಿ ಹೊಂದಿಸಿದ್ದೀರಿ! 🎉";

        playAgainButton.hidden = false;
    }
}

playAgainButton.addEventListener("click", function () {

    matchedCount = 0;
    draggedWord = null;
    selectedWord = null;

    feedback.textContent = "";

    playAgainButton.hidden = true;

    createPictures();
    createWords();
});

createPictures();
createWords();
