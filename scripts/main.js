const myImage = document.querySelector("img");

myImage.onclick = imgClick;

function imgClick () {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === "images/hy.jpg") {
        myImage.setAttribute("src", "images/hy2.jpg");
    } else {
        myImage.setAttribute("src", "images/hy.jpg");
    }
}

let myButton = document.querySelector("button");
myButton.onclick = setUserName;
let myHeading = document.querySelector("h1");


if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `Welcome to the communist movement, ${storedName}`;
}

function setUserName() {
    const myName = prompt("Please enter your name.");
    if (!myName) {
        setUserName();
    } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Welcome to the communist movement, ${myName}`;
    }
}