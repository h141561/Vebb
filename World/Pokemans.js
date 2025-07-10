var PokeList = null;
var abilityList = {};
async function populatePokemons(params) {
    //return om pokelist er dar
    if(PokeList){return;}
    PokeList = new Array();
    let alleJson = await getMons();

}
async function teiknPokemon(){
    for(pokemon of PokeList){
        let pokemonkort = await kortlagar(pokemon);
        dg("pokemonBeholdar").appendChild(pokemonkort);
    }
}
async function kortlagar(pokemon){
    let kort = document.createElement("kort");
        
    let bilete = document.createElement("img");
        bilete.src = pokemon.bilete;
        kort.appendChild(bilete);


        //kort.appendChild(skrift);
    
        kort.appendChild(getPokemonIconDiv(pokemon));

    for(ability of pokemon.abilities){
        let hidden = ability.is_hidden;
        ability = ability.ability;
        if(!abilityList[ability.name]){
            await loadAbility(ability.name, ability.url);
        }
        let abil = document.createElement("details");
            let summ = document.createElement("summary");
                abil.appendChild(summ);
                summ.innerText = ability.name;
                if(hidden){
                    summ.style.color = "grey";
                    summ.innerText += "(hidden)";
                }
            let description = document.createElement("p")
                description.innerText = abilityList[ability.name];
                abil.appendChild(description);
        kort.appendChild(abil);

    }
    return kort;
}
async function loadAbility(namn, link) {
    let description = await fetch(link)
        .then((res) => (res.json()))
        .then((ability) =>{
            console.log(ability);
            for(entry of ability.effect_entries){
                if(entry.language.name == "en")
                    return entry.effect;
            }
        });
    abilityList[namn] = description;
}

async function getMons(){
    let json = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=3')
        .then((res) => (res.json()))
        .then((pokemons) =>{
            console.log(pokemons);
            for(pokemon of pokemons.results){
                
                PokeList.push(pokemon);
            }
        }); 
    for(pokemon of PokeList){
        pokemon.info = await fetchInfo(pokemon.url);
        pokemon.bilete = pokemon.info.sprites.other['official-artwork'].front_default;
        pokemon.abilities = pokemon.info.abilities;
    }
}
async function fetchInfo(url) {
    let info = await fetch(url)
        .then((res) => (res.json()))
        .then(pokemon => {
            //
            return pokemon;
        });
    //console.log(info);
    return info;
}
async function displayMoveList(url){
    let div = dg("moveBeholdar");

    let move = await getMoveInfo("https://pokeapi.co/api/v2/move/13/");
    console.log(move);
    div.appendChild(move);
}

async function getMoveInfo(url){
    let move = await fetch(url)
        .then((res) => (res.json()))
        .then((info) => {
            return info;
        });
    let entry = document.createElement("moveEntry");
    
    let infoDiv = document.createElement("div");
        infoDiv.style.backgroundColor = getPokemonTypeColor(move.type.name);
        infoDiv.classList.add("moveOversikt")

    let overskrift = document.createElement("h2");
        overskrift.innerText = move.names[7].name;
        infoDiv.appendChild(overskrift);

    let ikon = document.createElement("img");
        ikon.src = `pokemonIkon/${move.type.name}.svg`;
        ikon.classList.add("pokeIkon");
        infoDiv.appendChild(ikon);

    return infoDiv;

}

/**
 * returnerar ein linear gradient som samsvarar i frarge til typen pokemin
 * @param {pokemon} pokemon pokemon-objektet til den pokemonen som det skal lagast overskrift til
 * @returns linear-gradienten som rein CSS-tekst
 */
function getPokemonBackground(pokemon){
    let color1 = pokemon.info.types[0].type.name;
    let color2 = color1;
    if(pokemon.info.types[1] != undefined)
        color2 = pokemon.info.types[1].type.name;
    
    return `linear-gradient(to right, ${getPokemonTypeColor(color1)}, ${getPokemonTypeColor(color2)})`;
}



/**
 * gjer tilbake ein div av ikonsom representerar pokemontypen
 * @param {pokemon} pokemon 
 * @returns ein div med det eine eller begge typane til pokemonen representert som ikon
 */
function getPokemonIconDiv(pokemon){
    let overskriftDiv = document.createElement("div");
        overskriftDiv.classList.add("pokeSkrift");
        overskriftDiv.style.backgroundImage = getPokemonBackground(pokemon);
    let ikon1 = document.createElement("img");
        ikon1.src = `pokemonIkon/${pokemon.info.types[0].type.name}.svg`
        ikon1.classList.add("pokeIkon");
        overskriftDiv.appendChild(ikon1)
        ikon1.title = ikon1.alt = `${pokemon.info.types[0].type.name}`

    let skrift = document.createElement("h1");
        skrift.innerText = pokemon.name;
        overskriftDiv.appendChild(skrift);
    
    if(pokemon.info.types[1] != undefined){
        let ikon2 = document.createElement("img");
        ikon2.src = `pokemonIkon/${pokemon.info.types[1].type.name}.svg`;
        ikon2.classList.add("pokeIkon");
        ikon2.title = ikon2.alt = `${pokemon.info.types[1].type.name}`
        overskriftDiv.appendChild(ikon2);
        
    }

    return overskriftDiv;
}
//vibbekoda
function getPokemonTypeColor(type) {
    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
    };

    // Convert the input type to lowercase to match the keys in the typeColors object
    const lowerCaseType = type.toLowerCase();

    // Return the corresponding color or a default color if the type is not found
    return typeColors[lowerCaseType] || '#000000'; // Default color is black
}//vibbekoda

/** Gjer tilbake referanse til HTML-dokumentet med id som ein gjer
 *  @param {string} inp ID til noden ein vil ha
 *  
 * @returns {HTMLElement} referanse til ynskja element;
 */
function dg(inp){

        let ret  = document.getElementById(inp);
        if(ret == null)
            console.log(inp + " Lagde eit nullobjekt");
        return ret;
}

/**
 * 
 * @param tekst Streng som skal beskrive kva som har skjedd
 * 
 * @returns ingenting
 */
function Lerror(tekst){
    console.log("Lerror > " + tekst);
}

/**
 * Ein funksjon som gjer tilbake verdifeltet til eit HTML-element, bruk til
 * å kutte ned på skriving og rot i funksjonane
 * 
 * @see {dg}
 * @param {string} inp ID til noden ein vil ha
 * @returns {HTMLElement} element.value til noden
 */
function dgv(inp){
    return dg(inp).value;
}

/**
 * Gjer tilbake ei samling med tilfeldig genererte tal, lengde på arrayet, kor
 * månge desimalar tala skal ha og kor store tala skal være kan bestemmast med
 * argumenta
 * 
 * @author Leon samson Vestby
 * 
 * @param {number} antal Antal tilfeldige tal som skal genererast, default = 10
 * @param {number} desimalar Antal desimalar, default = 0
 * @param {number} maks maksimal verdi av dei genererte tala default = 100
 * 
 * @returns {Array} ferdig laga array med verdiane spesifisert
 */
function genererTilfeldig(antal = 10, desimalar = 0, maks = 100){
    let ret  = new Array();
    for(let i = 0; i < antal; i++){
        let nyttTal = (Math.random() * maks).toFixed(desimalar);
        ret.push(nyttTal);
    }
    return ret;
}

/**
 * Gjer om ei samling til tabellradar som kann leggast til innerHTML
 * i eit HTMElement
 * 
 * @param {Array} samling Arrayet som skal skrivast ut
 * @param {string} namn namn til rada som skal stå i fyrste kolonne
 * 
 * @returns {string} returnerar alle elementa i i samling som eigne td-
 *      element
 */
function samlingTilCol(samling, namn  = "Rad"){
    let streng = "<tr>";
    if(namn)
        streng += `<td>${namn}</td>`;
    for(val of samling){
        streng += `<td> ${val} </td>`;
    }
    return streng + "</tr>";
}
    

function tst(){
    samlingTilCol()
}