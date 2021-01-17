const button = document.querySelector('button');
const randomTexts = document.querySelector('.random-quotes');
const authorBox = document.querySelector('.author a');
var audioElement = new Audio('audio/batchbug-sweet-dreams.mp3');


function timeChange() {
    let d = new Date();
    let hr = d.getHours();

    const time = document.querySelector('.time');
    if (hr < 12) {
        time.innerText = 'morning';
    } else if (hr >= 12 && hr <= 17) {
        time.innerText = 'afternoon';
    } else if (hr > 17 && hr < 24) {
        time.innerText = 'eveining';
    } else {
        time.innerText = 'day';
    }
}
timeChange();
function generateQuote(e){
    axios
    .get('https://type.fit/api/quotes')
    .then(res => showOutput(res))
    .catch(err => console.error(err));
    audioElement.play();
}
    
function showOutput(res){
    const datas = res.data[Math.floor(Math.random() * res.data.length)];
    let randomQuotes = `"${datas['text']}"`;  
    let quoteAuthors = `\`${datas['author']}\``; 
    randomTexts.innerText = randomQuotes;
    if(datas['author'] !== null){
        authorBox.innerText = quoteAuthors;
    }else {
        authorBox.innerText = 'Regular';
    }
    authorBox.href = `https://www.wikipedia.org/wiki/${quoteAuthors.replace(/[`]/g, '')}`;
        randomTexts.className += ' fadeout';
        authorBox.className += ' fadeout';
        setTimeout(() => {
            randomTexts.classList.remove('fadeout');
            authorBox.classList.remove('fadeout');
        }, 4000)
}
audioElement.addEventListener('loadeddata', (e) => {
    e.preventDefault()
    audioElement.volume = 0.1;
})        
button.addEventListener('click', generateQuote);
