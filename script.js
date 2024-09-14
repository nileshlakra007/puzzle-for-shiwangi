let selectedWords = [];

function selectWord(wordElement) {
    // Add the word to the selectedWords array if not already selected
    if (!selectedWords.includes(wordElement)) {
        selectedWords.push(wordElement);
        wordElement.style.backgroundColor = '#b68d40'; // Highlight selected word
    }
}

function getSelectedWordsOrder() {
    // Combine selected words into a single string
    return selectedWords.map(word => word.textContent).join(' ').toLowerCase().trim();
}

function checkAnswer(currentStep) {
    const answers = {
        1: 'a symbol of change',
        2: 'carries beauty unseen',
        3: 'transformation'
    };

    let userResponse;
    if (currentStep === 2) {
        userResponse = getSelectedWordsOrder();
    } else {
        userResponse = document.getElementById(`userResponse${currentStep}`).value.toLowerCase().trim();
    }

    const feedbackElement = document.getElementById(`feedback${currentStep}`);

    if (userResponse === answers[currentStep]) {
        feedbackElement.textContent = 'Correct! Moving to the next step...';
        feedbackElement.style.color = '#388e3c';

        setTimeout(() => {
            document.getElementById(`step${currentStep}`).classList.add('hidden');
            
            if (currentStep < 3) {
                document.getElementById(`step${currentStep + 1}`).classList.remove('hidden');
            } else {
                document.getElementById('finalStep').classList.remove('hidden');
            }
        }, 1000);
    } else {
        feedbackElement.textContent = 'Try again!';
        feedbackElement.style.color = '#d32f2f';

        // Reset the selection for puzzle 2
        if (currentStep === 2) {
            selectedWords.forEach(word => word.style.backgroundColor = '#d3b8ae');
            selectedWords = [];
        }
    }
}

function checkFinalAnswer() {
    const finalAnswer = document.getElementById('finalRiddleAnswer').value.toLowerCase().trim();
    const finalFeedbackElement = document.getElementById('finalFeedback');

    if (finalAnswer === 'butterfly') {
        finalFeedbackElement.textContent = 'Correct! You found the final answer!';
        finalFeedbackElement.style.color = '#388e3c';

        setTimeout(() => {
            document.getElementById('finalStep').classList.add('hidden');
            document.getElementById('final').classList.remove('hidden');
        }, 1000);
    } else {
        finalFeedbackElement.textContent = 'Try again!';
        finalFeedbackElement.style.color = '#d32f2f';
    }
}

function showNote() {
    document.getElementById('final').classList.add('hidden');
    document.getElementById('fullNote').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    const words = document.querySelectorAll('#reorder-words span');
    let draggedElement = null;

    words.forEach(word => {
        word.addEventListener('dragstart', () => {
            draggedElement = word;
        });

        word.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        word.addEventListener('drop', () => {
            if (draggedElement) {
                const temp = draggedElement.textContent;
                draggedElement.textContent = word.textContent;
                word.textContent = temp;
                draggedElement = null;
            }
        });
    });
});
