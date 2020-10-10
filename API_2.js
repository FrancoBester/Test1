
async function load_steam(){
    let steam_url = "https://cors-anywhere.herokuapp.com/" 
    const steam_response = await fetch(steam_url + "http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=89C2835E21B28EDD4E98FED3AEAD8508&steamid=76561198969742452&include_appinfo=true&include_played_free_games=true&appids_filter=730")
    const steam_data = await steam_response.json()
    load_steamdata(steam_data)
    // console.log(steam_data.response)
}

async function load_github(){
    const git_url =  "https://api.github.com/users/FrancoBester" 
    const git_response = await fetch(git_url)
    const git_data = await git_response.json()
    // console.log(git_data)
    load_gitdata(git_data)
}

async function load_spaceX(){
    const space_url = "https://api.spacexdata.com/v3/launches/latest?pretty=true"
    const space_response = await fetch(space_url)
    const space_data = await space_response.json()
    load_spacedata(space_data)
    // console.log(space_data.rocket)
}


// load_steam();
// load_github()
// load_spaceX()

let games = [];
function load_steamdata(steamdata){
    game_count = steamdata.response.game_count
    games = steamdata.response.games
    let innerHtml_steam = '<p> Steam account information </p>';

    for(i = 0;i < 5 && i < game_count;i++){
        let img_src = "'http://media.steampowered.com/steamcommunity/public/images/apps/" + games[i].appid +"/" + games[i].img_logo_url + ".jpg'"
        innerHtml_steam = innerHtml_steam + 
        "<div style='float:left; margin-top:0px; padding-left: 3rem; width:45rem; margin-left: 1rem; margin-bottom: 0.1rem' class ='background_api'>"+
        "<h4 style='float:left; margin-top:2rem'>"+games[i].name+ "<div>"+
        "<h5>Playtime: "+ games[i].playtime_forever +" hours "+ 
        "<img src="+ img_src+'class="game_img"/>'+"</div>"
        +"</div>" 
        // "<img src="+ img_src+'class="game_img"/>'
        
    }
    
    // console.log(innerHtml_steam)
    innerHtml_steam = innerHtml_steam + "</div>"
    document.getElementById("Steam").innerHTML=innerHtml_steam
}

function load_gitdata(githubdata){
    document.getElementById("Github").innerHTML=`
    <p>Github account information</p>
    <div class="background_api">
    <img src="${githubdata.avatar_url}" class="git_img"/>
    <p>Account name: ${githubdata.login}</p>
    <p>Account type: ${githubdata.type}</p>
    <a href="${githubdata.html_url}">repository link</a>
    <p>Lastest upload: ${githubdata.updated_at.slice(0,10) + " " + githubdata.updated_at.slice(11,19)}</p>
    </div>
    `
    // <p>Following: ${githubdata.following_url}</p>
}

function load_spacedata(spacedata){
    document.getElementById("SpaceX").innerHTML=`
    <p> <a href='https://www.spacex.com/'>Latest SpaceX information</a></p>
    <div class="background_api" style="padding-bottom:0.5rem">
    <img src='https://www.spacex.com/static/images/backgrounds/starlink_11_dekstop.jpg' class="space_img"/>
    <p>Fight number : ${spacedata.flight_number}</p>
    <p>Mission name : ${spacedata.mission_name}</p>
    <p>Current local launch date: ${spacedata.launch_date_local.slice(0,10) +" "+spacedata.launch_date_local.slice(11,19)} </p>
    <p>Rocket id: ${spacedata.rocket.rocket_id}</p>
    <p>Rocket name: ${spacedata.rocket.rocket_name}</p>
    <p>Rocket type: ${spacedata.rocket.rocket_type}</p>
    <p>Rocket manufactorer: ${spacedata.rocket.second_stage.payloads[0].manufacturer}</p>
    <p>Rocket payload: ${spacedata.rocket.second_stage.payloads[0].payload_type}</p>
    </div>
    <div style="height:2.1rem"></div>
    `
}

// https://www.spacex.com/static/images/backgrounds/starlink_11_dekstop.jpg