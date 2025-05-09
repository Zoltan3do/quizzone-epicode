 UNIT-1-Build-Week
Unit 1 Build Week sul Quizzone
# Web App di Feedback e Esame

## Descrizione del Progetto

Questa applicazione web è stata sviluppata per raccogliere feedback, fornire istruzioni per un esame, permettere agli utenti di completare un test e visualizzare i risultati dell'esame. L'app è composta da quattro pagine:

1. **Pagina di Benvenuto all'Esame**: Fornisce istruzioni per l'esame.
2. **Pagina del Test**: Presenta le domande dell'esame agli utenti.
3. **Pagina dei Risultati**: Mostra i risultati dell'esame completato.
4. **Pagina di Feedback**: Consente agli utenti di valutare l'esperienza e lasciare un commento.

Abbiamo deciso di mantenere una linea stilistica per tutte le pagine, mantenendo le stesse caratteristiche per l'intestazione e per i button.


## Descrizione delle singole pagine

1. **Pagina di Benvenuto all'Esame**:

Prima pagina visualizzata: in questa pagina vengono elencate le istruzioni e regole per l'esame.
Prima di poter accedere all'esame bisogna acconsentire flaggando la spunta, promettendo quindi di rispondere alle domande senza essere aiutati da nessuno. Finchè non viene dato questo consenso non si abilita il button per iniziare l'esame. Cliccando su "PROCEED" si inizializza la pagina del test.

2. **Pagina del Test**:

Seconda pagina visualizzata: vengono riportate le domande del test le quali non sono randomizzate e vengono estratte in ordine da una base dati. Al centro dello schermo possiamo selezionare le risposte, le quali sono randomizzate e all'hover del mouse, vengono risaltate dal colore impostato sul css, in modo da permettere all'utente di visualizzare meglio il campo che si sta per selezionare. Al click il campo rimarrà evidenziato consentendo l'apparizione del button "NEXT" che porterà alla domanda successiva fino al raggiungimento delle 10 domande. Nel caso in cui si cambi idea su una risposta è possibile cliccare su un altro campo e la selezione verrà sostituita evidenziando anch'essa.
Sulla destra in alto della pagina è presente un timer preimpostato a 15 secondi, al termine dei quali, se non si è effettuata una selezione, si visualizzerà la domanda successiva con conseguente penalizzazione sul punteggio finale.
In basso a sinistra abbiamo riportato un counter che indica il numero della domanda corrente.

3. **Pagina dei Risultati**:

Terza pagina visualizzata: viene visualizzato il sommario delle risposte rappresentato da un grafico a ciambella che mostra visivamente la percentuale di risposte giuste con il colore azzurro (#00FFFF) e quelle sbagliate con il fucsia (#c2128d). Al centro di esso verrà visualizzato l'esito positivo o negativo con una didascalia. 
A destra verrà visualizzata una sezione "Wrong" riportante una percentuale delle risposte errate e il conteggio numerico degli errori fatti. Lo stesso meccanismo è riportato sul lato sinistro con la sezione "Correct".
Alla fine del test, qualora venisse superato, appariranno animazioni di congratulazioni.

4. **Pagina di Feedback**:

Quarta pagina visulizzata: ultima pagina nella quale viene richiesta una valutazione da parte dell'utente. Le stelline reagiscono all'hover del mouse illuminandosi, permettendo la selezione con il click della stellina desiderata che rimarrà evidenziata. Al di sotto troviamo una sezione dedicata ai commenti e successivamente un button "MORE INFO" che aprirà una nuova pagina nel browser collegandosi al sito di EPICODE.


## Tecnologie Utilizzate

HTML5: Per la struttura della pagina.
CSS3: Per lo stile e il layout della pagina.
JavaScript: Per la logica del quiz e l'interazione con l'utente.
Chart.js: Per la creazione di grafici a ciambella che visualizzano i risultati del quiz.
Canvas-confetti: Per la visualizzazione dei coriandoli in caso di superamento del test.


## Struttura del Progetto

- `index.html`: Pagina di Benvenuto all'Esame
- `test.html`: Pagina del Test
- `results.html`: Pagina dei Risultati
- `feedback.html`: Pagina di Feedback
- `css/`: Directory contenente i file CSS per il design delle pagine
- `js/`: Directory contenente i file JavaScript per la logica interattiva


## Struttura del Codice

Variabili di Stato
ris: Numero di risposte corrette memorizzate nel localStorage.
totalQuestions: Numero totale di domande memorizzate nel localStorage.
wrongAnswers: Numero di risposte sbagliate calcolate sottraendo ris da totalQuestions.
questions: Array di oggetti contenenti le domande del quiz e le relative risposte.
risposteCorretteDiUser: Array che memorizza le risposte corrette date dall'utente.


## Funzioni Principali
init()
Inizializza gli stili della pagina e prepara il quiz per l'utente. Viene chiamata al caricamento della pagina.

initStyles()
Imposta gli stili iniziali per i bottoni e altri elementi dell'interfaccia.

checkbox()
Abilita il bottone di inizio quiz quando l'utente seleziona la checkbox.

firstQuestionBuild()
Costruisce la prima domanda e le relative risposte, visualizzandole nella pagina.

randomAnswersBuild()
Genera un array di risposte in ordine casuale per ogni domanda.

nextButtonHidden()
Nasconde il bottone "Next" finché l'utente non seleziona una risposta.

clickRisposte()
Gestisce l'evento di click sulle risposte, permettendo all'utente di selezionare una risposta.

handleNextButton()
Rende visibile il bottone "Next" dopo che l'utente ha selezionato una risposta.

buttonClickSelection()
Gestisce l'evento di click sul bottone "Next", controlla la risposta dell'utente e passa alla domanda successiva o mostra i risultati finali.

checkRispostaCorretta()
Controlla se la risposta selezionata dall'utente è corretta e aggiorna il contatore delle risposte corrette.

onGenerateOtherQuestions()
Cambia la domanda visualizzata e aggiorna le risposte disponibili.

changeQuestionNumber()
Aggiorna il contatore delle domande visualizzate.

timerCountDown()
Gestisce il countdown per il tempo a disposizione per rispondere a ogni domanda.

simulateButtonClick()
Simula un click sul bottone "Next" allo scadere del tempo.


## Integrazione con Chart.js

La web app utilizza Chart.js per visualizzare un grafico a ciambella dei risultati del quiz. Viene registrato un plugin personalizzato (TextPlugin) che visualizza un testo personalizzato al centro del grafico, basato sui risultati ottenuti dall'utente.


## Configurazione del grafico

data: Contiene i dati del grafico, ovvero il numero di risposte corrette e sbagliate.
config: Configurazione del grafico, tipo di grafico (doughnut) e opzioni varie come colori, dimensioni e plugin personalizzati.
Funzioni del Plugin Personalizzato
beforeDraw(chart): Funzione chiamata prima del disegno del grafico, recupera i dati e imposta i testi personalizzati da visualizzare al centro del grafico.


## Esecuzione

Inizializzazione: All'avvio della pagina, viene chiamata la funzione init() che imposta gli stili e prepara la prima domanda.

Selezione della Checkbox: L'utente deve selezionare la checkbox per abilitare il bottone di inizio quiz.

Inizio del Quiz: Alla selezione della prima risposta, viene visualizzato il bottone "Next".

Navigazione delle Domande: L'utente risponde alle domande e naviga tra di esse utilizzando il bottone "Next".

Visualizzazione dei Risultati: Al termine del quiz, i risultati vengono visualizzati tramite un grafico a ciambella creato con Chart.js.

Visualizzazione dei Coriandoli: Al termine del quiz, in caso di superamento, viene visualizzata l'animazione dei coriandoli creata con Canvas_confetti.



## Requisiti
- Un browser moderno (Chrome, Firefox, Edge)


## Installazione

**Clona il repository**:
   bash
   git clone https://github.com/Zoltan3do/UNIT-1-Build-Week
   cd [nome-della-repository]

  
## Conclusioni

Questa web app utilizza HTML, CSS, JavaScript e Chart.js per creare un'esperienza di quiz interattiva e visivamente accattivante. La logica del quiz, il salvataggio delle risposte corrette e sbagliate e la visualizzazione dei risultati sono gestiti in modo dinamico per offrire un feedback immediato all'utente.


## Progetto realizzato da

Manuel Barone
Antonio Norfo
Pietro Romano
Andrea Iemma
Sara Pavone
Gianluca Cerreta.