const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

// Show Loading
const loading = () => {
    // hidden is an attribute that hides the object if it is true.
    loader.hidden = false;
    quoteContainer.hidden = true;
};

// Hide Loading
const complete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
};

// Show New Quote
const newRandomQuote = () => {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // If there is no quote author
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check the quote length to determine the styling. If it's a long quote the fontsize would be smaller.
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set the quote and Hide the loader
    quoteText.textContent = quote.text;
    complete();
};

// Fetch Quotes From API
const getQuotesOnline = async () => {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newRandomQuote();
    } catch (error) {
        console.log(error);
    }
};

const getQuotesLocally = () => {
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(quote);
};

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
};

// Event Listener
newQuoteBtn.addEventListener('click', newRandomQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Load api online
getQuotesOnline();

// load data locally
// getQuotesLocally();

// https://twitter.com/intent/tweet

/*

Note 1:
An asynchronous function can run at any time independently and it wont stop the browser from completing the loading of the page.

Note 2:
open a new tab : window.open(twitterUrl,'_blank')


*/
