const ris = parseInt(localStorage.getItem("corrette")) || 0;
const totalQuestions = parseInt(localStorage.getItem("lunghezzaQuestions")) || 0;
console.log(ris);
const wrongAnswers = totalQuestions - ris;

Chart.register({
  id: "TextPlugin", // Identificatore del testo che andremo a inserire graficamente all'interno del diagramma
  // Funzione che viene chiamata prima che il grafico venga disegnato
  beforeDraw: (chart) => {
    // Recupera i dati dal grafico
    const dataset = chart.data.datasets[0].data; // Ottiene i dati dal primo dataset del grafico

    // Testi predefiniti
    let texts = [
      { text: "Congratulations!", sectionClass: "correctText1" },
      { text: "You passed the exam!", sectionClass: "correctText2" },
      { text: "We'll send you the certificate in few minutes. Check your email (including promotions/ spam folder)", sectionClass: "correctText3" }
    ];

    // Condizione per cambiare i testi
    if (dataset[0] >= dataset[1]) {
      texts = [
        { text: "You failed the exam", sectionClass: "wrongText1" },
        { text: "Study more and try again.", sectionClass: "wrongText2" },
        { text: "Stay strong and keep pushing forward in your learning journey.", sectionClass: "wrongText3" }
      ];
    }

    // questa è la sintassi di destructuring di js avanzato che ci permette di estrarre dall'oggetto i valori che ci interessano.
    const {
      ctx,
      chartArea: { width, height }, // questa sarà la grandezza del grafico all'interno del diagramma
    } = chart; // Ottiene il contesto di disegno e le dimensioni dell'area del grafico
    ctx.save();

    const totalResponses = dataset.reduce((total, currentValue) => Math.floor(total + currentValue, 0)); // Calcola il totale delle risposte (corrette + sbagliate) e restituisce un valore intero
    const correctResponses = dataset[0]; // Supponiamo che il primo valore sia il numero di risposte corrette
    const incorrectResponses = dataset[1];
    const percentageCorrect = Math.floor((correctResponses / totalResponses) * 100); // Calcola la percentuale di risposte corrette
    const percentageIncorrect = 100 - percentageCorrect;

    // Imposta i testi delle percentuali nei rispettivi elementi <p figli diretti>
    document.querySelector(".container-percentuale.right .firstP").innerText = percentageCorrect.toFixed(0) + "%";
    document.querySelector(".container-percentuale.left .firstP").innerText = percentageIncorrect.toFixed(0) + "%";
    // Imposta i testi del contatore di risposte && massimeDomande nei rispettivi elementi <p secondi figli >
    document.querySelector(".container-percentuale.right .secP span").innerText =
      correctResponses + "/" + totalResponses + " Questions";
    document.querySelector(".container-percentuale.left .secP span").innerText =
      incorrectResponses + "/" + totalResponses + " Questions";

    // Funzione per disegnare il testo e gestire l'andare a capo se necessario
    function drawText(ctx, texts, x, y, maxWidth) {
      const lineHeight = 16;

      for (let i = 0; i < texts.length; i++) {
        const { text, sectionClass } = texts[i];

        // applicazione degli stili in base al testo
        switch (sectionClass) {
          case "correctText1":
            ctx.font = "bold 1.3em Outfit";
            ctx.fillStyle = "white";
            break;
          case "correctText2":
            ctx.font = "bold 1.3em Outfit";
            ctx.fillStyle = "#00ffff";
            break;
          case "correctText3":
            ctx.font = "lighter 1em Outfit";
            ctx.fillStyle = "white";
            break;
          case "wrongText1":
            ctx.font = "bold 1.3em Outfit";
            ctx.fillStyle = "#d20094";
            break;
          case "wrongText2":
            ctx.font = "bold 1em Outfit";
            ctx.fillStyle = "white";
            break;
          case "wrongText3":
            ctx.font = "lighter 1em Outfit";
            ctx.fillStyle = "white";
            break;
        }

        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        const words = text.split(" ");
        let line = ""; // svuota il disegno

        for (let n = 0; n < words.length; n++) {
          // Costruisce una linea di testo provvisoria aggiungendo la parola corrente a 'line' e uno spazio
          const testLine = line + words[n] + " ";
          // Misura la larghezza in pixel della linea di testo provvisoria
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          // Verifica se la larghezza della linea supera 'maxWidth' e se non siamo alla prima parola
          if (testWidth > maxWidth && n > 0) {
            // Disegna la linea corrente sul canvas a coordinate (x, y)
            ctx.fillText(line, x, y);
            // Resetta 'line' con la parola corrente seguita da uno spazio per iniziare una nuova linea
            line = words[n] + " ";
            // Incrementa 'y' per passare alla riga successiva
            y += lineHeight;
          } else {
            // Se la larghezza della linea è ancora accettabile, aggiorna 'line' con la linea di testo provvisoria
            line = testLine;
          }
        }
        // Alla fine del ciclo, disegna l'ultima linea rimanente sul canvas a coordinate (x, y)
        ctx.fillText(line, x, y);
        // Incrementa y per separare visivamente i testi
        y += lineHeight * 2; // Aumento di 2 righe per distanza tra i testi
      }
    }

    const textX = width / 2; // Posizione X per centrare il testo
    const textY = height / 2.5; // Posizione Y per centrare verticalmente il testo
    const maxWidth = width - 160; // Imposta una larghezza massima per il testo (20px padding)

    // Disegna il testo
    drawText(ctx, texts, textX, textY, maxWidth);
    ctx.restore(); // Ripristina lo stato precedente del contesto di rendering
    if (percentageCorrect <= 50) {
      let audio1 = new Audio("../assets/media/golfclap.mp3");
      audio1.play();
      audio1.volume = 0.1;
      console.log("Launching confetti!",);
      const duration = 2 * 300;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 7,
          angle: 70, // Angle for the left side
          spread: 60,
          startVelocity: 90,
          origin: { x: 0 }, // Start from the left
        });
        confetti({
          particleCount: 7,
          angle: 110, // Angle for the right side
          spread: 60,
          startVelocity: 90,
          origin: { x: 1 }, // Start from the right
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  },
});



// Configurazione dei dati per il grafico
const data = {
  datasets: [
    {
      data: [wrongAnswers, ris], // Esempio: 4 risposte corrette e 6 risposte sbagliate
      backgroundColor: [
        // Blu per risposte corrette
        "#D20094",
        "#00FFFF"// Rosso per risposte sbagliate
      ],
      hoverOffset: 2, // Aumenta l'offset al passaggio del mouse su un segmento del grafico
      borderWidth: 0, // Imposta il bordo a 0 per il dataset così non viene visualizzato il bordo predefinito
    },
  ],
};



// Configurazione del grafico
const config = {
  type: "doughnut", // Tipo di grafico, la ciambella
  data: data, // Dati da utilizzare per il grafico
  options: {
    plugins: {
      // Aggiungi il plugin personalizzato per gestire il colore di sfondo del canvas del grafico
      customCanvasBackgroundColor: {
        beforeDraw: (chart, options) => {
          const { ctx } = chart; // Ottiene il contesto di disegno dal grafico
          ctx.save(); // Salva lo stato corrente del contesto di rendering
          ctx.fillStyle = options.color || "transparent"; // Colore di sfondo trasparente, così da poter visualizzare l'immagine di sfondo
          ctx.restore(); // Ripristina lo stato precedente del contesto di rendering
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0, // Rimuove il bordo degli archi del grafico
      },
    },
    cutout: 130, // Teoricamente dovrebbe ridimensionare la grandezza dello spessore del cerchio
  },
  plugins: ["TextPlugin"], // Registrazione del plugin personalizzato
};


// Crea un nuovo grafico Chart.js con l'elemento canvas e la configurazione fornita
let myChart = new Chart(document.getElementById("responsesDiagram"), config);


