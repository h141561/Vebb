var y = 10;
let x = 11;
function foo() {
    console.log(y + " " + x);
    z = 12;
    var w = 13;
}
function bar(){
    console.log(z);
    console.log(w);
}
foo();
bar();
