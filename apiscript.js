//spinner
function loading(){
    $('.loader').show();
    $('.quote-container').hide();
}
function complete(){
    $('.loader').hide();
    $('.quote-container').show();
}

// Get data from API
async function getQuote(){
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // author null or not
        if(data.quoteAuthor===''){
            $('#author').text("Unknown");
        }
        else{
            $('#author').text(data.quoteAuthor);
        }
        
        // add/remove class for fontsize change
        if(data.quoteText.length > 100){
            $('.quote-text').addClass("long-quote");
        }
        else{
            $('.quote-text').removeClass("long-quote");
        }

        $('#quote').text(data.quoteText);

        complete();
    }
    catch(error){
        // getQuote();
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

$('.new-quote').on('click',function(e){
    e.preventDefault;
    getQuote();
});

getQuote();