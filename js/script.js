//char-stats variables 
let url = "https://swapi.dev/api/people/?search="
let $input = $(".char-input")
let inputVal
let charStats 
let $charName = $(".char-name")
let $ul = $(".char-stat-list")
let shipStats 

//event listener func on submit button
$(".submit").on("click", getCharStats)
//event listener for buttons
$(".char-stats").on("click", addStats)

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
        //change h2 to char's name
        addName()
        //clear input
        $input.val("")
    }, 
    //error:
    function(error) {
        console.log(error)
    })
}

//changes h2 to character's name
function addName() {
    $charName.text(charStats.results[0].name)
}

//function to retrieve ship stats 
function getShipStats() {
    $.ajax("https://swapi.dev/api/starships/12/")
    //success
    .then(function(stats) {
        shipStats = stats
        // console.log(shipStats.name)
        }, 
        //error
        function(error) {
        console.log(error)
        })
    }

//event listener func, adds basic stats to DOM when stats button clicked 
function addStats() {
    getShipStats()
    $ul.html(
        `<li> Height: ${charStats.results[0].height} </li>
        <li> Birth year: ${charStats.results[0].birth_year} </li>
        <li> Starship: ${shipStats.name} </li>`)
}

