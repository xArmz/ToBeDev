
//function show content when click a button
function FuncShowContent() {
    //selector div by id


    /**
     * comment
     * multiple
     * line
     */

    //variable const vs var
    const a = 10;
    var b = "hi";
    b = "a message";

    console.log(a);
    console.log(b);

    //Javascript Block
    var isCorrect = true;
    if(isCorrect) {
        console.log("This is a correct message")
    }
    
    //selector div by id
    const content = Selector("content");
    console.log(content);

    //pass value to HTML Element with property .innerHTML
    var strContent = "Hello Javascript"
    content.innerHTML = BuildContent()

    //set CSS class to div with property .className
    content.className = classList.add("content-font")
}

function BuildContent() {

    var strContent = "<h1>Hi Friday!!</h1>";
        strContent += "<p>We are aleepy</p>"
}


function FuncResetStyle() {
    const content = document.getElementById("content")
    content.classList.remove = ("content-font")
}

//function  getElementByID
function Selector(ElementID) {
    return document.getElementById(ElementID)
}