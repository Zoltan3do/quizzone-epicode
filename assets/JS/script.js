const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

// inizializzazione variabili puntatore
const domanda = document.getElementById("titolo2");
const containerAnswers = document.getElementById("container-answers");
const invioRisposta = document.getElementById("invio-risposta");
const risposteCorrette = questions.map((item) => {
  return item.correct_answer;
});
const domande = questions.map((item) => {
  return item.question;
});

// dichiarazione variabili volanti
let lunghezzaDataset = domande.length;
let timerInterval;
let domandePassate = 0;
let rispostaCorrente;
let divRisposte = [];
let risposteCorretteDiUser = [];
localStorage.setItem("lunghezzaQuestions", lunghezzaDataset);
localStorage.setItem("corrette", risposteCorretteDiUser.length);

// chiamata alla funzione che previene comportamenti funzionali prima del caricamento
window.addEventListener("load", init());

// funzione di inizializzazione
function init() {
  firstQuestionBuild();
  timerCountDown();
  nextButtonHidden();
  divRisposte = document.querySelectorAll("#container-answers div");
  clickRisposte();
}

// visualizzazione della prima domanda con annesse possibili risposte 
function firstQuestionBuild() {
  domanda.innerText = questions[0].question;

  let a = [];
  a.push(questions[0].correct_answer);
  for (let i = 0; i < questions[0].incorrect_answers.length; i++) {
    a.push(questions[0].incorrect_answers[i]);
  }

  let ar = [];
  for (let i = 0; i < a.length; i++) {
    let random = Math.floor(Math.random() * a.length);
    if (!ar.includes(a[random])) {
      ar.push(a[random]);
    } else {
      i--;
    }
  }

  for (let i = 0; i < ar.length; i++) {
    const risposta = document.createElement("div");
    risposta.innerText = ar[i];
    containerAnswers.appendChild(risposta);
  }
}

// costruzione di un array di risposte randomico (a partire dalla prima)
function randomAnswersBuild() {
  const arr = []; // --> [[], [], []]
  for (let i = 0; i < questions.length; i++) {
    arr.push([]);
    arr[i].push(questions[i].correct_answer);
    for (let j = 0; j < questions[i].incorrect_answers.length; j++) {
      arr[i].push(questions[i].incorrect_answers[j]);
    }
  }

  let randomized = [];
  for (let j = 0; j < arr.length; j++) {
    let array = [];
    for (let i = 0; i < arr[j].length; i++) {
      let random = Math.floor(Math.random() * arr[j].length);
      if (!array.includes(arr[j][random])) {
        array.push(arr[j][random]);
      } else {
        i--;
      }
    }
    randomized.push(array);
  }

  return randomized;
}

// funzione che disattiva il bottone di invio prima del click su una risposta
function nextButtonHidden() {
  invioRisposta.style.display = "none";
}

// funzione che al click su una risposta estrae il contenuto
function clickRisposte() {
  for (let i = 0; i < divRisposte.length; i++) {
    divRisposte[i].addEventListener("click", function (e) {
      const clickedElement = e.target;
      // Rimuovo la classe .selectedQuestion da tutte le risposte
      divRisposte.forEach(item => {
        item.classList.remove("selectedQuestion");
      })
      clickedElement.classList.add("selectedQuestion"); // Aggiungi la classe solo alla risposta cliccata
      handleNextButton();
      rispostaCorrente = e.target.textContent;
    });
  }
}

// funzione che rende visibile il bottone next
function handleNextButton() {
  invioRisposta.style.display = "inline-block";
}

// funzione che gestisce il tasto di invio della risposta
invioRisposta.addEventListener("click", buttonClickSelection);

// check risposta corretta e aggiunta risposta selezionata 
function checkRispostaCorretta() {
  if (risposteCorrette.includes(rispostaCorrente)) {
    risposteCorretteDiUser.push(rispostaCorrente);
    localStorage.setItem("corrette", risposteCorretteDiUser.length);
  }
}

// funzione che cambi la domanda e le risposte
// (prendendole in modo randomizzato dalla funzione apposita)
// basandosi sull'indice (domandePassate)
function onGenerateOtherQuestions() {
  changeQuestionNumber();
  domanda.innerText = questions[domandePassate].question.replace(/&#039;/g, "'"); // prossima domanda

  let risposte = randomAnswersBuild()[domandePassate]; // risposte randomiche relative alla domanda corrente

  while (containerAnswers.firstChild) {
    containerAnswers.removeChild(containerAnswers.firstChild); // rimuovo tutti i div delle risposte
  }

  for (let i = 0; i < risposte.length; i++) {
    const risposta = document.createElement("div");
    risposta.innerText = risposte[i];
    containerAnswers.appendChild(risposta);
  }
  divRisposte = document.querySelectorAll("#container-answers div");
  nextButtonHidden();
  clickRisposte();
}

//cambio contatore
function changeQuestionNumber() {
  let intQuestionNumber = domandePassate + 1;
  document.getElementById('questions-counter').innerText = intQuestionNumber;
}


// timer
function timerCountDown() {
  let time = 15;
  let initialOffset = 440;
  let i = 0;

  function updateTimer() {
    // Aggiorna il testo di tutti gli elementi h2
    document.querySelectorAll('h2').forEach(element => {
      element.textContent = time - i;
    });

    // Seleziona tutti gli elementi con la classe "circle_animation" e applica lo stile
    document.querySelectorAll('.circle_animation').forEach(element => {
      element.style.strokeDashoffset = initialOffset - (i * (initialOffset / time));
    });

    if (i - 1 === time) {
      clearInterval(timerInterval);
      simulateButtonClick();
    }

    i++;
  }

  // Esegui la prima iterazione immediatamente
  updateTimer();

  // Cancella il timer precedente se esiste
  if (typeof timerInterval !== 'undefined') {
    clearInterval(timerInterval);
  }

  // Imposta l'intervallo per le successive iterazioni
  timerInterval = setInterval(updateTimer, 1000);
}


function buttonClickSelection() {
  if (domandePassate === domande.length - 1) {
    checkRispostaCorretta();
    window.location.href = 'risultati.html';
  } else {
    timerCountDown();
    checkRispostaCorretta();
    domandePassate++;
    rispostaCorrente = "";
    onGenerateOtherQuestions();
  }
}

function simulateButtonClick() {
  invioRisposta.click();
}
