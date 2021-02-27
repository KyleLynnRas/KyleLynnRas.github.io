//char-stats variables 
let url = "https://swapi.dev/api/people/?search="
let $input = $(".char-input")
let inputVal
let charStats 
let $charName = $(".char-name")


//event listener func on submit button
$(".submit").on("click", getCharStats)

//event listener for retrieving character data 
function getCharStats(e) {
    //prevent page refresh
    e.preventDefault()
    //char name from input
    inputVal = $input.val()
    //pull from api url
    $.ajax(url + inputVal)
    //success: 
    .then(function(stats) {
        console.log(stats)
        charStats = stats
        addName()
    }, 
    //error:
    function(error) {
        console.log(error)
    })
}

//change h2 to character's name
function addName() {
    $charName.text(charStats.results[0].name)
}