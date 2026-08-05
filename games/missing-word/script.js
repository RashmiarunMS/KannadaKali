const words = document.querySelectorAll(".word");
const dropZone = document.getElementById("drop-zone");
const feedback = document.getElementById("feedback");

let draggedWord = "";

// When a word starts being dragged
words.forEach(word => {

    word.addEventListener("dragstart", function () {

        draggedWord = this.textContent;

    });

});


// Allow something to be dropped into the blank
dropZone.addEventListener("dragover", function (event) {

    event.preventDefault();

});


// What happens when the word is dropped
dropZone.addEventListener("drop", function (event) {

    event.preventDefault();

    const correctAnswer = "ಎಲ್ಲಿಗೆ";

    if (draggedWord === correctAnswer) {

        dropZone.textContent = draggedWord;
        feedback.textContent = "🎉 ಸರಿಯಾಗಿದೆ!";

    } else {

        feedback.textContent = "😊 ಇನ್ನೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸು";

    }

});
