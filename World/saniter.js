

const fs = require("node:fs");

/**
 * skriver ei ait array til ei fil med riktiv formatering til å bli ein
 * brukbar variabel i js
 * @param {Array} strengArray sit array av strengar vi vil skrive til fil
 * @param {string} filnamn namnet på fila vi vil skrive til
 */
function skrivTilFil(filnamn, strengArray){
    const filestream = fs.createWriteStream(filnamn);
    let ofstreng ="";
    for(streng of strengArray){
        ofstreng += streng + "\n";
        
    }
    filestream.write(ofstreng);
    //fs.writeFileSync(filnamn,strengArray );
    console.log(streng);
    
}

function main(filnamn = "words-bank.csv"){
    let infil = fs.readFileSync(filnamn, "utf-8");
    let strengar = new Array();
    let ord = "";
    console.log("hei");
    for(char of infil){
        if(char != "\n")
            ord += char ;
        else{
            //console.log(ord);
            strengar.push("\"" + ord + "\",") ;
            ord = "";
        }
    }

    for(elem of strengar){
        //console.log(elem);
    }

   skrivTilFil("gjosOrd.txt", strengar);
    
}

main();