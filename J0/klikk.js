function skrivUtNamn(){
    let fNamn = document.getElementById("forNamn").value;
    let eNamn = document.getElementById("etterNamn").value;

    let utskrift = "Du heiter " + fNamn + ' ' + eNamn;

    document.getElementById("utskrift").innerHTML = utskrift;
}