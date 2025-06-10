


const { channel } = require("node:diagnostics_channel");
const fs = require("node:fs");
const { off } = require("node:process");
/**
 * Bokstaven i sentrum av hjulet
 * @type {char}
 * @default  'i'
 */
let sentralbokstav = 'i';

/**
 * Øvre grense på lengde på orda, alle ord op til og med denne lengda skal takast med
 * @type {integer}
 * @default 7
 */
const ovreGrense = 7;

/**
 * Nedre grense på lengda av orda, alle ord med større eller lik lengde skal takast med
 * @type {integer}
 * @default 4
 */
const nedreGrense = 4;

/**
 * Lista med bokstavar som kan brukast i ordet
 * @type {string}
 * @default "elbtyg"
 */
let ringBokstavar = "elbtyg";

/**
 * sjekkar eit ord om det innehelder ein av karakterane
 * @param {String} ord strengen som skal sjekkast 
 * @param {string} chars streng av alle charane som skal sjekkast for
 * @returns {boolean} true om ordet har ein av charane, false vist ikkje
 */
function harBokstav(ord, chars){
    for(char of chars){
        if(ord.includes(char)){
            return true;
            
        }
    }
    return false;
}
/**
 * Sjekkar om ein streng berre innehelder charakterar frå ein annan streng
 * @param {string} ord ordet som skal sjekkast
 * @param {string} chars charane som skal sjekkast
 * @param {boolean} ersamansett true om ord berre inneholdar bokstavar frå chars,
 * false om ord har bokstavar som ikkje forekjem i chars
 */
function harAlle(ord, chars){
    for(char of ord){
        if(!chars.includes(char))
            return false;
    }
    return true;
}

/**
 * Tar in eit ord og veler om det skal behandlast om eit gyldig ord
 * @param {string} ord ordet som skal sjekkast
 * @param {boolean} log Om debug-info skal skrivast ut, default = false
 * 
 * @returns {boolean} true om ordet er gyldig, False om ordet ikkje skal takast med
 */
function velOrd(ord, log = false){
    if(ord.length > ovreGrense){
        if(log) console.log(`Ordet ${ord} er for långt, ordet har ${ord.length} som er lengre enn ${ovreGrense}`);
        return false;
    }
    if(ord.length < nedreGrense){
        if(log) console.log(`Ordet ${ord} er for kort, ordet har ${ord.length} bokstavar som er kortare enn ${nedreGrense}`);
        return false;
    }
    if(!harBokstav(ord, sentralbokstav)){
        if(log) console.log(`Ordet ${ord} har ikkje sentralbokstaven ${sentralbokstav} i seg`);
        return false;
    }
    if(!harAlle(ord, ringBokstavar + sentralbokstav)){
        if(log) console.log(`ordet ${ord} er samansett av bokstavar som ikkje inngår i ${ringBokstavar + sentralbokstav}`);
        return false;
    }
    if(log) console.log(`Ordet ${ord} har gått gjennom all testar og skal være gyldig`);
    return true;
}

function main(){
    let infil = fs.readFileSync("words.txt", "utf-8");
    let strengar = new Array();
    let ord = "";
    
    for(char of infil){
        if(char == '\n'){
            if(velOrd(ord)){
                strengar.push(ord)
            }
            ord = "";
        }else{
            ord += char.toLowerCase();
        }
    }
    let sorterte = new Array();
    for(let i = 7; i > 3; i--){
        for(ord of strengar){
            if(ord.length == i){
                sorterte.push(ord);
            }
        }
    }
    strengar = sorterte;
    for(ord of strengar){
        console.log(ord + " " + ord.length);
        
    }
}
main();

function test(){
    console.log("testar bi");
        velOrd("bi",true);
    console.log("Testar holebuarane");
        velOrd("holebuarane",true);
    console.log("testar kakle");
        velOrd("kakle", true);
    console.log("testar drikt");
        velOrd("drikt", true);
    console.log("testar bigg");
        const burde = velOrd("bigg", true);
        if(!burde) console.error("bigg er ikkje godtatt, det er ein feil");


}
