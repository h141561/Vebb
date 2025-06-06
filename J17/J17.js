
/**
 * Tar in ei samling som skal gjerast om til kort
 * @param {Array} samling samling av objekt som skal gjerast om til kort
 * @param {String} kontainer IDen til Diven som skal ha kortet
 */
function samlingTilKort(samling, kontainer, namn){
    let div = dg(kontainer);
    let streng = "";
    for(element of samling){
        let noklar = Object.keys(element);
        for(nokkel of noklar){
            if(nokkel == "flag"){
                streng = `<img src="${element[nokkel]}">` + streng;
                continue;
            }
            streng += `<h3 class ="${nokkel}">${nokkel}</h3><span>${element[nokkel]}</span>`;
        }
        streng += "</kort>";
        streng = `<kort class="${namn}">` + streng;
        div.innerHTML += streng;
        streng = "";
    }
    
}
        
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
let people = [
  {
    id: 1,
    name: "Alice",
    age: 30,
    occupation: "Engineer",
    contact: {
      email: "alice@example.com",
      phone: "123-456-7890"
    },
    address: {
      city: "New York",
      country: "USA"
    }
  },
  {
    id: 2,
    name: "Bob",
    age: 25,
    occupation: "Designer",
    contact: {
      email: "bob@example.com",
      phone: "987-654-3210"
    },
    address: {
      city: "Los Angeles",
      country: "USA"
    }
  },
  {
    id: 3,
    name: "Charlie",
    age: 35,
    occupation: "Teacher",
    contact: {
      email: "charlie@example.com",
      phone: "555-555-5555"
    },
    address: {
      city: "Chicago",
      country: "USA"
    }
  },
  {
    id: 4,
    name: "Diana",
    age: 28,
    occupation: "Doctor",
    contact: {
      email: "diana@example.com",
      phone: "222-333-4444"
    },
    address: {
      city: "Houston",
      country: "USA"
    }
  }
];

const countries = [
  { name: "Japan", capital: "Tokyo", inhabitants: 126300000, flag: "https://flagcdn.com/jp.svg", funFact: "Japan is home to over 6,800 islands." },
  { name: "Canada", capital: "Ottawa", inhabitants: 38000000, flag: "https://flagcdn.com/ca.svg", funFact: "Canada has the longest coastline in the world." },
  { name: "Brazil", capital: "Brasília", inhabitants: 214000000, flag: "https://flagcdn.com/br.svg", funFact: "Brazil is the only country in South America that speaks Portuguese." },
  { name: "Australia", capital: "Canberra", inhabitants: 26000000, flag: "https://flagcdn.com/au.svg", funFact: "Australia has more kangaroos than people." },
  { name: "Germany", capital: "Berlin", inhabitants: 83000000, flag: "https://flagcdn.com/de.svg", funFact: "Germany is home to over 1,500 varieties of beer." },
  { name: "India", capital: "New Delhi", inhabitants: 1400000000, flag: "https://flagcdn.com/in.svg", funFact: "India is the world's largest democracy." },
  { name: "South Africa", capital: "Pretoria", inhabitants: 60000000, flag: "https://flagcdn.com/za.svg", funFact: "South Africa has 11 official languages." },
  { name: "Italy", capital: "Rome", inhabitants: 59000000, flag: "https://flagcdn.com/it.svg", funFact: "Rome is home to the smallest country in the world, Vatican City." },
  { name: "USA", capital: "Washington, D.C.", inhabitants: 331000000, flag: "https://flagcdn.com/us.svg", funFact: "The U.S. has the highest number of immigrants in the world." },
  { name: "France", capital: "Paris", inhabitants: 67000000, flag: "https://flagcdn.com/fr.svg", funFact: "France is the most visited country in the world." }
];

