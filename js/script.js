//char-stats variables 
let url = "https://swapi.dev/api/people/?search="


//function for retrieving character data 
const getCharStats = () => {
    //pull from api url
    $.ajax(url + "lando")
    //success: 
    .then(function(stats) {
        console.log(stats)
    }, 
    //error:
    function(error) {
        console.log(error)
    })
}