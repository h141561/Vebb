
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
export function samlingTilCol(samling, namn  = "Rad"){
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