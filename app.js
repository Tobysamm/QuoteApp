const button = document.querySelector('button');
const randomTexts = document.querySelector('.random-quotes');
const authorBox = document.querySelector('.author');

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
}
    
function showOutput(res){
    let randomQuotes = `"${res.data[Math.floor(Math.random() * res.data.length)]['text']}"`;  
    let quoteAuthors = `\`${res.data[Math.floor(Math.random() * res.data.length)]['author']}\``; 
    randomTexts.innerText = randomQuotes;
    authorBox.innerText = quoteAuthors;
        randomTexts.className += ' fadeout';
        authorBox.className += ' fadeout';
        setTimeout(() => {
            randomTexts.classList.remove('fadeout');
            authorBox.classList.remove('fadeout');
        }, 4000)
}
        
button.addEventListener('click', generateQuote)
