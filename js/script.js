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
let charSelect 
let shipSelect
let starShipString3
let homeString3
//event listener func on submit button for char selection
$(".submit").on("click", getCharStats)

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
         //if char doesn't have starship stats, error alert
        } else if (charStats.results[0].starships.length === 0){
            alert(`${charStats.results[0].name} isn't a pilot, please select a character who flies a starship`)
        } else {
            // console.log(charStats.results[0].starships[0])
            //starship url (first starship)
            starShip = charStats.results[0].starships[0]
            // console.log(starShip)
            let starShipString = starShip.split(":")
            let starShipString2 = starShipString[0] + "s:"
            // console.log(starShipString2)
            starShipString3 = starShipString2 + starShipString[1]
            console.log(starShipString3)
            //homeworld url
            console.log(charStats.results[0].homeworld)
            homeWorld = charStats.results[0].homeworld
            let homeString = homeWorld.split(":")
            let homeString2 = homeString[0] + "s:"
            console.log(homeString2)
            homeString3 = homeString2 + homeString[1]
            console.log(homeString3)
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
            //char select for game
            charSelect = charStats.results[0].name
            // console.log(charSelect)
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

//event listener for button for char stats 
$(".char-btn").on("click", addStats)

//event listener func, retrieves ship stats and adds basic stats to DOM on click 
function addStats() {
    //pulls first starship's info for char chosen
    $.ajax(starShipString3)
    //success
    .then(function(stats) {
        shipStats = stats
        console.log(shipStats)
        shipSelect = shipStats.name
        // console.log(shipStats.name)
        //add stats to DOM 
        $ul.html(
            `<li> Birth year: ${charStats.results[0].birth_year} </li>
            <li> Eye color: ${charStats.results[0].eye_color} </li>
            <li> Height: ${charStats.results[0].height} </li>
            <li> Starship: ${shipStats.name} </li>
            <li> Home world: ${planet} </li>`)
        }, 
        //error
        function(error) {
        console.log(error)
        })
}

////slideToggle() - show/hide ul lists for stats sections/////
//hide/show list when user clicks on open/close btn for ul, el on container
$(".toggle-container").on("click", hideStats)

function hideStats(e) {
    if (e.target.className === "toggle-btn"){
    // console.log(this)
    $(this).find(".toggle").slideToggle()
    }
}

//function to retrieve homeWorld info 
function getHomeWorld() {
    //pull homeworld's info for char chosen 
    $.ajax(homeString3) 
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
        $ulShip.html(
            `<li>Name: ${shipStats.name}</li>
            <li>Model: ${shipStats.model}</li>
            <li>Class: ${shipStats.starship_class}</li>
            <li>Hyperdrive Rating: ${shipStats.hyperdrive_rating}</li>
            <li>Length: ${shipStats.length}</li>
            <li>Crew: ${shipStats.crew}</li>`
            )
    }

//event listener for button for ship stats
$(".ship-btn").on("click", addShipStats)


////////////////////////////
// Homeworld stats section//
///////////////////////////
const $ulHome = $(".home-stat-list")

const addHomeStats = () => {
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
let filmString3
const $ulFilm = $(".film-stat-list")
//event listener func, loop through filmsArr and retrieve api info/add to DOM on click
const addFilmStats = () => {
    // clear ul before, so if click title again it won't add a second set of li's
    $ulFilm.html("")
    for (let film of filmsArr){
        // console.log(film)
        let filmString = film.split(":")
        let filmString2 = filmString[0] + "s:"
        let filmString3 = filmString2 + filmString[1]
        $.ajax(filmString3)
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



////////////////////////////
// Game section////////////
///////////////////////////

let damage

class Pilot {
    constructor(name, ship, health){
        this.name = name, 
        this.ship = ship, 
        this.health = health
        this.damage = damage
    }
    fire(challenger) {
        challenger.health = challenger.health - this.damage
    }
}

//variables for two game characters
let pilot1
let vader
let $p = $(".results")
let $p2 = $(".results2")
//func to create character values for game
const charCreate = () => {
    pilot1 = new Pilot(charSelect, shipSelect, 15, 10)
    console.log(pilot1)
    vader = new Pilot("Darth Vader", "TIE fighter", 20)
    console.log(vader)
}

//event listener, charCreate on click "start game btn"
$(".game-start").on("click", charCreate)

//event listener function to run game on click
const runGame = (e) =>{ 
//    console.log(e.target)
    //move-one selected:
    if (e.target.className === "move-one move"){
        //move will cause 3 damage
        pilot1.damage = 3
        // console.log(pilot1)
    //move-two selected:
    } else if (e.target.className === "move-two move") {
        //move will cause 5 damage
        pilot1.damage = 5
        // console.log(pilot1)
    }
    //vader has a random damage value between 3-8 
    vader.damage = Math.floor(Math.random() * (8-3)) + 3
    // console.log(vader.damage)

    //run fire method for pilot1 and vader
    //pilot1 fires first 
    pilot1.fire(vader) 
    //if both have health, vader fire 
    if (pilot1.health > 0 & vader.health > 0) {
        vader.fire(pilot1)
    // if either at or below 0, game ends 
    } else if (pilot1.health <= 0 || vader.health <=0 ){
        console.log(`end of game: ${pilot1.health} ${vader.health}`)
    }

    //results to DOM 
    //if both still have health print health status
    if (pilot1.health > 0 & vader.health > 0){
        $p.text(`${pilot1.name} has ${pilot1.health} health left`).css({"font-size": "20px", "font-family": "Raleway"})
        $p2.text(`${vader.name} has ${vader.health} health left`).css({"font-size": "20px", "font-family": "Raleway"})
    } else if(pilot1.health <= 0 ){
        $p.text(`${vader.name} has defeated you with his ${vader.ship}`).css({"font-family": "Raleway"})
        $p2.text("")
    } else if(vader.health <= 0) {
        $p.text(`${pilot1.name} has won with the ${pilot1.ship}!`).css({"font-family": "Raleway"})
        $p2.text("")
    }
    // console.log(pilot1, vader)
    }


//event listener using event delegation on game-buttons container
$("div.game-buttons").on("click", "button.move", runGame)

