/* Variables */
const question = document.getElementById('question');
const answersBox = document.getElementById('answers-box');
const quizzQuestions = document.getElementById('quizz-questions');
const scoreContainer = document.getElementById('score-container');
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

/* Questions */
const questions = [
    {
        "question": "Que tipos de dados são suportados em JavaScript?",
        "answers": [
            {
                "answer": "Int, Float, String",
                "correct": false
            },
            {
                "answer": "Number, Float, String e Boolean",
                "correct": false
            },
            {
                "answer": "String, Number, Undefined, Null and Boolean",
                "correct": true
            },
            {
                "answer": "Int, String, Null e Boolean",
                "correct": false
            }
        ]
    },
    {
        "question": `Qual seria o resultado de 3 + 2 + "7"?`,
        "answers": [
            {
                "answer": "57",
                "correct": true
            },
            {
                "answer": "12",
                "correct": false
            },
            {
                "answer": "11",
                "correct": false
            },
            {
                "answer": "327",
                "correct": false
            }
        ]
    },
    {
        "question": `O JavaScript diferencia maiúsculas de minúsculas?`,
        "answers": [
            {
                "answer": "Não, o JavaScript não diferencia maiúsculas de minusculas.",
                "correct": false
            },
            {
                "answer": "Sim, o JavaScript diferencia maiúsculas de minusculas.",
                "correct": true
            },
        ]
    },
    {
        "question": `"getElementById('idname')": utilizando essa abordagem, como um componente será obtido?`,
        "answers": [
            {
                "answer": "Utilizando essa abordagem, você pode obter todos os componentes que têm, na verdade, um nome de classe oferecido.",
                "correct": false
            },
            {
                "answer": "Utilizando essa abordagem, você pode obter todos os componentes que realmente possuem um nome de tag oferecido.",
                "correct": false
            },
            {
                "answer": "Utilizando essa abordagem, você pode obter um componente pelo nome de ID do aspecto.",
                "correct": true
            },
            {
                "answer": "Pega o seletor de design css e também retorna a classe ofericida.",
                "correct": false
            }
        ]
    },
    {
        "question": `Dentro de qual elemento HTML colocamos o JavaScript`,
        "answers": [
            {
                "answer": "<scripting>",
                "correct": false
            },
            {
                "answer": "<javascript>",
                "correct": false
            },
            {
                "answer": "<js>",
                "correct": false
            },
            {
                "answer": "<script>",
                "correct": true
            }
        ]
    },
]

/* Quiz replacement for the first question */
function init() {
    /* create the first question */
    createQuestion(0);
}

/* create a question */
function createQuestion(i) {

    /* clear the previous question */
    const oldButtons = answersBox.querySelectorAll("button");
    oldButtons.forEach(function (btn) {
        btn.remove();
    })

    /* change question text */
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    /* insert answers */
    questions[i].answers.forEach(function (answer, i) {

        /* create quiz button template */
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);


        /* remove hide and template class */
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        /* insert alternatives on screen */
        answersBox.appendChild(answerTemplate);

        /* insert click event on the button */
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });
    });

    /* increment number question */
    actualQuestion++;
}

/* Verify correct questions */
function checkAnswer(btn) {

    /* select all buttons */
    const buttons = answersBox.querySelectorAll("button");
    
    /* verify if question is correct */
    buttons.forEach(function(button) {
        if(button.getAttribute("correct-answer") === "true") {
            button.classList.add("correct-answer");

            if(btn === button) {
                points++;
            }

        } else {
            button.classList.add("wrong-answer")
        }
    });

    /* display new question */
    nextQuestion();
}

// Display the next question on quizz
function nextQuestion() {

    // Timer para ver respostas
    setTimeout(function() {

        // verifica se ainda há perguntas
        if(actualQuestion >= questions.length) {
            // apresenta a mensagem de sucesso
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion)
    }, 1500);

}

// Display final game
function showSuccessMessage() {
    
    hideOrShowQuizz();

    // trocar dados da tela de sucesso

    // calcular o score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore= document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    // Alterar o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    // alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

// Mostra ou esconde e score
function hideOrShowQuizz() {
    quizzQuestions.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// Reiniciar quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
    // zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
});

/* quiz startup */
init();