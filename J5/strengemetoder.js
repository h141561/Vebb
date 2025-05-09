function snitt(){
    let streng = document.getElementById("p1");
    //console.log(find_last_of(streng.value, " "));
    console.log(find_last_of(streng.innerHTML,' '));
    find_second_last_of(streng.innerHTML, ' ');
    console.log(streng.innerHTML.slice(
        find_second_last_of(streng.innerHTML, ' '),
        find_last_of(streng.innerHTML, ' ')
            
    ));
}
function find_last_of(streng, char){
    let ret = 0;
    let siste = 0;
    for(let i = 0; i < streng.length; i++){
        if(streng[i] == char){
            ret = i;
            console.log("samme");
        }
    }
    return ret;
}

function find_second_last_of(streng, char){
    let siste =  find_last_of(streng, char);
    let substr = streng.slice(0, siste);
    let nestsiste = find_last_of(substr, char);

    console.log("siste = " + siste + " nestSiste = " + nestsiste);
    return nestsiste;
}

function length(){
    let streng = document.getElementById("p2").innerHTML;
    console.log("P2 er " + streng.length + " bokstavar lång");
    
}

function smol(){
    let streng = document.getElementById("p4").textContent;
    console.log(streng);
    document.getElementById("p4").innerHTML = streng.toLowerCase();
}
function store(){
    let streng = document.getElementById("p3").innerHTML;
    console.log(streng);
    document.getElementById("p3").textContent = streng.toUpperCase();
}

function bytt(){
    let streng = document.getElementById("p5").textContent;
    streng = streng.replace("Pompel","Pilt");
    console.log(streng);
    document.getElementById("p5").textContent = streng;
}