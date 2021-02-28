//char-stats variables 
let url = "https://swapi.dev/api/people/?search="
let $input = $(".char-input")
let inputVal
let charStats 
let $charName = $(".char-name")
let $ul = $(".char-stat-list")
let shipStats 
let starShip 

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
        //error alert if it returns a blank array/char not found
        if (charStats.results.length === 0) {
            alert("character not found, please try again")
        } else {
            // console.log(charStats.results[0].starships[0])
            starShip = charStats.results[0].starships[0]
            //change h2 to char's name
            addName()
            //clear input
            $input.val("")
            //clear prior char's stats
            $ul.html("")
        }
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

//event listener func, retrieves ship stats and adds basic stats to DOM on click 
function addStats() {
    //pulls first starship's info for char chosen
    $.ajax(starShip)
    //success
    .then(function(stats) {
        shipStats = stats
        // console.log(shipStats.name)
        //add stats to DOM 
        $ul.html(
            `<li> Birth year: ${charStats.results[0].birth_year} </li>
            <li> Eye color: ${charStats.results[0].eye_color} </li>
            <li> Height: ${charStats.results[0].height} </li>
            <li> Starship: ${shipStats.name} </li>`)
        }, 
        //error
        function(error) {
        console.log(error)
        })
}
