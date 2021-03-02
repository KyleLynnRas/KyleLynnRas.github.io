////////////////////////////
//Character stats section///
///////////////////////////

//char-stats variables 
let url = "https://swapi.dev/api/people/?search="
let $input = $(".char-input")
let inputVal
let charStats 
let $charName = $(".char-name")
let $ul = $(".char-stat-list")
let shipStats 
let starShip 
let homeWorld
let homeStats
let planet
let filmsArr

//event listener func on submit button for char selection
$(".submit").on("click", getCharStats)
//event listener for button for char stats 
$(".char-btn").on("click", addStats)


//event listener for retrieving character data 
function getCharStats(e) {
    //prevent page refresh
    e.preventDefault()
    //char name from input
    inputVal = $input.val()
    //added error alert if input val empty
    if (inputVal === ("")){
        alert("please enter a character name")
    } else {
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
            //starship url (first starship)
            starShip = charStats.results[0].starships[0]
            //homeworld url
            // console.log(charStats.results[0].homeworld)
            homeWorld = charStats.results[0].homeworld
            //func to get homeworld's info 
            getHomeWorld()
            //films url array
            // console.log(charStats.results[0].films)
            filmsArr = charStats.results[0].films
            //change h2 to char's name
            addName()
            //clear input
            $input.val("")
            //clear prior char's stats
            $ul.html("")
            //clear prior ship stats
            $ulShip.html("")
            //clear prior homeworld stats
            $ulHome.html("")
            //clear prior film stats
            $ulFilm.html("")
        }
    }, 
    //error:
    function(error) {
        console.log(error)
    })
}
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
        console.log(shipStats)
        // console.log(shipStats.name)
        //add toggle effect on click, ul slides up/down
        $ul.slideToggle()
        //add stats to DOM 
        $ul.html(
            `<li> Birth year: ${charStats.results[0].birth_year} </li>
            <li> Eye color: ${charStats.results[0].eye_color} </li>
            <li> Height: ${charStats.results[0].height} </li>
            <li> Starship: ${shipStats.name} </li>
            <li> Homeworld: ${planet} </li>`)
        }, 
        //error
        function(error) {
        console.log(error)
        })
}

//function to retrieve homeWorld info 
function getHomeWorld() {
    //pull homeworld's info for char chosen 
    $.ajax(homeWorld) 
    //success
    .then(function(stats) {
        homeStats = stats
        // console.log(homeStats)
        planet = homeStats.name
        // console.log(planet)
    },
    //error
    function(error) {
        console.log(error)
    })
}

////////////////////////
// Ship stats section//
//////////////////////

//variable for ul for ship stats 
const $ulShip = $(".ship-stat-list")

//event listener func to add ship stats to DOM on click
const addShipStats = () => {
    //if char doesn't have starship stats, error alert
    if (charStats.results[0].starships.length === 0){
        alert(`${charStats.results[0].name} doesn't have a starship`)
    } else {
        //add toggle effect on click, ul slides up/down
        $ulShip.slideToggle()
        $ulShip.html(
            `<li>Name: ${shipStats.name}</li>
            <li>Model: ${shipStats.model}</li>
            <li>Manufacturer: ${shipStats.manufacturer}</li>
            <li>Starship class: ${shipStats.starship_class}</li>
            <li>Cargo capacity: ${shipStats.cargo_capacity}</li>
            <li>Length: ${shipStats.length}</li>
            <li>Hyperdrive Rating: ${shipStats.hyperdrive_rating}</li>
            <li>Crew: ${shipStats.crew}</li>`
            )
    }
}

//event listener for button for ship stats
$(".ship-btn").on("click", addShipStats)


////////////////////////////
// Homeworld stats section//
///////////////////////////
const $ulHome = $(".home-stat-list")

const addHomeStats = () => {
    //add toggle effect on click, ul slides up/down
    $ulHome.slideToggle()
    $ulHome.html(
        `<li>Name: ${planet}</li>
        <li>Roatation period: ${homeStats.rotation_period}</li>
        <li>Diameter: ${homeStats.diameter}</li>
        <li>Climate: ${homeStats.climate}</li>
        <li>Terrain: ${homeStats.terrain}</li>
        <li>Population: ${homeStats.population}</li>`
    )
}
//event listener for button for homeworld stats
$(".home-btn").on("click", addHomeStats)

////////////////////////////
// Films stats section/////
///////////////////////////

const $ulFilm = $(".film-stat-list")
//event listener func, loop through filmsArr and retrieve api info/add to DOM on click
const addFilmStats = () => {
    for (let film of filmsArr){
        // console.log(film)
        $.ajax(film)
            .then(function(filmStats) {
                // console.log(filmStats.title)
                //create new li on each loop with film title
                let $newFilm = $(`<li>Title: ${filmStats.title}</li>`)
                //render new li to DOM
                $ulFilm.append($newFilm)
            },
            function(error) {
                console.log(error)
            })
        }
    }

//event listener for button for film stats
$(".film-btn").on("click", addFilmStats)