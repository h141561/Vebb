
class node {
    constructor(value) {
        this.val = value;
        this.next = null;
    }
}
class doubleNode{
    constructor(value){
        this.val = value;
        this.next = null;
        this.prev = null;
    }
}
class linkedList{
    constructor(){
        this.head = null;
    }
    isEmpty(){
        console.log("isEmpty er lik" + this.head == null);
        if(this.head == null){
            console.log("isempty er true ")
            return true;
            
        }else {
            console.log("isempty() er false fordi " 
                + this.head.val 
                + " er sist, det er eit "
                + typeof(this.head.val));
            return false;
        }
    }
    push(value){
        let newNode = new node(value);
        //tom liste
        if(this.head == null){
            this.head = newNode;
        }else{
            newNode.next = this.head;
            this.head = newNode;
        }
    }
    append(value){
        if(value == null)
            return;
        let newNode = new node(value);
        if(!this.head){
            this.head = newNode;
            return;
        }
        let current = this.head;
        while(current.next){
            current = current.next;
        }
        current.next = newNode;
    }
    //gjer tilbake fyrste elementet
    pop_front(){
        if(this.head == null)
        {
            //lista er tom/uinitialisert
            console.log("pop_front brukt på tome liste");
            return null;
        }else{
            let ret = this.head.val;
            this.head = this.head.next;
            return ret;
        }
    }
    peek_front(){
        if(this.head == null){
            return null;
        }else{
            return this.head.val;
        }
    }
    peek_back(){
        let curr = this.head;
        if(curr == null){
            console.error("peek_back() brukt på tom liste");
            return null;
        }
        while(curr.next){
            curr = curr.next;
        }
        return curr.val;

    }
    pop(){
        var current = this.head;
        if(current == null){
            console.log("Tom liste");
            return null;
        }else if(current.next == null){
            let returnval = current.val;
            this.head = null;
            return returnval;
        }
        let nestsiste = current;
        while(current.next){
            nestsiste = current;
            current = current.next;
            if(current.next == null)
            {
                break;
            }
        }
        if(current == this.head){
            this.head = null;
        }
        //console.log("Nestsiste: " + nestsiste.val + " current = " + current.val)
        nestsiste.next = null;
        return current.val;
    }

    printList(){

		let current = this.head
		let result = "[";

		while(current){
			
            result += current.val
            if(current.val == null)
                result += "NULL";
            if(current.next)
                result += ',';    
			current = current.next;
		}
		result += "]"
        console.log(result);
	}
}

class queue{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    append(value){
        var newNode = new doubleNode(value);
    //om head og tail er tomme er også køa tom, då må vi initialisaere
        if(!(this.head || this.tail)){
            //tom liste
            this.head = newNode;
            this.tail = newNode;
        }else{
            //sett på elementet sist
            this.head.next = newNode;
            newNode.prev = this.head;
            this.head = newNode;
            console.log("lagt til: " + value + " i kø")
        }
    }
    pop(){
        
        if((this.head == null) || (this.tail == null)){
            console.log("Tom liste");
            return;
        }
        if(this.head == this.tail){
            //lista har eitt element og blir no tømt
            console.log("head == tail");
            let ret = this.tail.val
            this.head = null;
            this.tail = null;
            return ret;
        }else{
            let retVal = this.tail.val;
            this.tail = this.tail.next;
            this.tail.prev = null;
            return retVal;
        }
    }
    /*Visar siste element i lista men fjernar det ikkje frå lista
     *
     */
    peek(){
        if(this.tail){
            return this.tail.val
        }else{
            return null;
        }
        
    }
    printList(){
        
	    let current = this.head
	    let result = "[";

		while(current){
			
            result += current.val 
            if(current.prev)
                result += ',';    
			current = current.prev;
		}
		result += "]"
        console.log(result);
	
        if(this.head)
            console.log("Head = " + this.head.val + ", Tail = " + this.tail.val);
    }

}
function isNumber(input){
   
    return (!isNaN(parseFloat(input)) && isFinite(input));
}
function isOperator(token){
    return !isNumber(token);
}
    
function tokenIzer(inputString){
    let tokenList = new linkedList;
    let token = "";
    for(let i = 0; i < inputString.length; i++)
    {
        //console.log(inputString[i]);
        let c = inputString[i];
        switch(c){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '.':
                token += c;
                break;
            case '+':
            case '/':
            case '(':
            case ')':
            case '*':
            case '-':
            case '^':
                console.log(token);
                if(token)
                    tokenList.append(token);
                tokenList.append(c);
                token = "";
                break;
            default:
                console.log("ugyldig teikn " + "\"" + c + "\"");

        }
    }
    tokenList.append(token);
    return tokenList;
}
function getPriority(token){
    switch(token){
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            return 1;
        case '+':
        case '-':
            return 2;
        case '/':
        case '%':
        case '*':
            return 3;
        case '^':
            return 4;
        case ')':
        case '(':
        default:
            return 0;

    }
    //katstrofal feil
    return NaN;
}
function testenkel(){
    let linkliste = new linkedList();
    linkliste.printList();
	linkliste.append(22);
	linkliste.append(23);
    linkliste.append(24);
	linkliste.printList();
    linkliste.pop();
    linkliste.printList();
}
function testDobbel(){
    console.log("PrøvardobbelListe");
    let linkliste = new queue();
    linkliste.printList();
	linkliste.append(22);
	linkliste.append(23);
    linkliste.append(24);
	linkliste.printList();
    linkliste.pop();
    linkliste.pop();
    linkliste.pop();
    linkliste.pop();
    linkliste.printList();
    console.log(linkliste.peek());
    linkliste.append(21);
    console.log(linkliste.peek());
}
function testappend(){
    let linkliste = new queue();
    linkliste.append(23);
    console.assert((linkliste.peek() == 23), "append(23) feila");
    console.assert((linkliste.pop() == 23), "pop() feila");
    console.assert(linkliste.pop() == null, "Linkliste skal være tom, men returnerar ikkje null" );

}
function TESTpriority(){
    while(1)
        {
            c = liste.pop_front();
            console.log("Token " + c + " har verdi " + getPriority(c) + " er Tal? " + isNumber(c));
            if(c == null)
            {
                break;
            }
        }
}

function evalPostfix(liste){
    let tokenArray = [];
    let len = 0;
    let stack = new linkedList();
    console.log("startar postfixeval med :");
    liste.printList();
    while(!liste.isEmpty()){
        let token = liste.pop_front();
        
        console.log("evaluerar " + token);
        if(isNumber(token)){
            stack.append(token);
        }else if(isOperator(token)){
            let rval = stack.pop();
            let lval = stack.pop();
            console.log("rval = " + rval + " lval =  " + lval);
            stack.printList();
            switch(token){
                case '+':
                    stack.append(Number(rval) + Number(lval));
                    break;
                case '-':
                    stack.append(Number(lval) - Number(rval));
                    break;
                case '*':
                    stack.append(lval * rval);
                    break;
                case '/':
                    stack.append(lval / rval);
                    break;
                case '^':
                     stack.append(Math.pow(lval, rval));
                     break;
            }
        }
    }
    stack.printList();
}

function main(){
    console.log("hei");
    let liste = tokenIzer("2^2+(2+2)");
    liste.printList();
    liste = shunter(liste);
    evalPostfix(liste);

}

function shunter(tokenList){
    console.log("Byrjar shunter med:");
    tokenList.printList();
    //liste av operatorar som blir lest in
    let operatorstack = new linkedList();

    //det ferdige utrykket som skal returnerast
    let postExpression = new linkedList();
    let c = null;

    while(!tokenList.isEmpty())
    {
        c = tokenList.pop_front();
        console.log("Shuntar med :" + c);
        if(c == null){
            console.log("C ER NULL");
            break;
            
        }

        if(isNumber(c)){
            postExpression.append(c);
        }
        else if(c == '('){
            operatorstack.append(c);
        }

        else if(c == ')'){
            while(operatorstack.peek_back() != '('){
                postExpression.append(operatorstack.pop());
            }
            operatorstack.pop();
        }
        
        else if(isOperator(c)){
            if((operatorstack.isEmpty())|| (getPriority(operatorstack.peek_back()) < getPriority(c))){
                //om operatørstacken er tome eller c har høgare presedens legger vi ganske enkelt c på toppen av stacken
                console.log("legger til " + c + " i operatorstack");
                operatorstack.append(c);    
            }else if(getPriority(operatorstack.peek_back()) >= getPriority(c)){
                console.log("operatør " + operatorstack.peek_back() + " har høgare presedens enn " + c + " så eg må byrje å poppe");
                while(
                        (!operatorstack.isEmpty()) &&
                        (getPriority(c) <= getPriority(operatorstack.peek_back()))
                        

                    ){
                        postExpression.append(operatorstack.pop());
                        
                 }
                operatorstack.append(c);
                
            }
        }
        
        else{
            console.log(c + " er korkje operator eller tal");
        }
        console.log("---Stackar---");
        operatorstack.printList();
        postExpression.printList();
        console.log("--- etter : " + c + " ---");
    }
    // pop av siste rest av operatørane
    while(!operatorstack.isEmpty()){
        console.log("Fant eit " + operatorstack.peek_back() + " og legger den til");

        //er ein feil som kan gje oss eit tomt element i stacken, finner ikkje betre måte å gjere det på
        if(operatorstack.peek_back() == "")
            break;
            
        postExpression.append(operatorstack.pop());
    }
    console.log("Postexpression");
    postExpression.printList();
    console.log("Operatorstack");
    operatorstack.printList();
    return postExpression;

}

main();