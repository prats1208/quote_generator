let quotes = [];
let quote = {};

function loading(){
    $('.loader').show();
    $('.quote-container').hide();
}
function complete(){
    $('.loader').hide();
    $('.quote-container').show();
}

function loadQuote(){
    
    loading();

    quote = quotes[Math.floor(Math.random()*quotes.length)];
    
    if(quote.author == null){
        $('#author').text("Unknown");
    }
    else{
       
        $('#author').text(quote.author);
    }

    if(quote.text.length > 100){
        $('.quote-text').addClass("long-quote");
    }
    else{
        $('.quote-text').removeClass("long-quote");
    }

    $('#quote').text(quote.text);

    complete();
}

async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
       
        const response = await fetch(apiUrl);
        quotes = await response.json();
       
        loadQuote();
        
    }
    catch(error){
        console.log(error);
    }
}



function tweet(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${$('#quote').text()} - ${$('#author').text()}`;
    window.open(tweetUrl, '_blank');
}

$('#twitter').on('click',function(e){
    e.preventDefault;
    tweet();
});




getQuotes();

$('.new-quote').on('click',function(e){
    e.preventDefault;
    loadQuote();
});