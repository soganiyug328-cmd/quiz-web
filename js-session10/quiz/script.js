// quiz/script.js
const questions = [
    {
        question: "What does a large language model actually predict?",
        answers: ["The next token", "The next webpage", "The next computer", "The next image"],
        correct: 0
    },
    {
        question: "Which JavaScript method attaches a click handler to an element?",
        answers: ["addEventListener", "getElementById", "appendChild", "createElement"],
        correct: 0
    },
    {
        question: "What does classList.toggle('dark') do?",
        answers: [
            "Deletes the element",
            "Adds the class if missing, removes it if present",
            "Reloads the page",
            "Changes the element's id"
        ],
        correct: 1
    },
    {
        question: "In Git, which command records staged changes as a snapshot?",
        answers: ["git push", "git clone", "git commit", "git fetch"],
        correct: 2
    },
    {
        question: "Which technology controls how a web page looks?",
        answers: ["HTML", "JavaScript", "CSS", "HTTP"],
        correct: 2
    }
];

let currentQuestion = 0, score = 0, answered = false;

const questionNumberElement = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");

function showQuestion() {
    answered = false; // Reset lock
    const current = questions[currentQuestion];
    questionNumberElement.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;
    questionElement.textContent = current.question;
    answersElement.innerHTML = "";
    current.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(index);
        answersElement.appendChild(btn);
    });
}

const ADVANCE_DELAY_MS = 500; // lock stays on while feedback is shown

function checkAnswer(index) {
    if (answered) return; // Guard clause: ignore double-clicks
    answered = true;      // lock stays ON until the next question is rendered
    const buttons = answersElement.querySelectorAll("button");
    const correctIndex = questions[currentQuestion].correct;
    if (index === correctIndex) score++;
    buttons[correctIndex].classList.add("correct");
    if (index !== correctIndex) buttons[index].classList.add("wrong");
    scoreElement.textContent = "Score: " + score;
    setTimeout(() => {
        currentQuestion++;
        currentQuestion < questions.length ? showQuestion() : showFinalResult();
    }, ADVANCE_DELAY_MS);
}

function showFinalResult() {
    questionNumberElement.textContent = "Quiz Complete!";
    questionElement.textContent = "Your final score is " + score + " / " + questions.length;
    answersElement.innerHTML = "";
    messageElement.textContent = "Refresh the page to try the quiz again.";
}

showQuestion();
