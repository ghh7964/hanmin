let i = 0;

setInterval(() => {
    document.getElementsByClassName("slide")[i].classList.toggle("opacity");
    if(i <= 3) i++;
    else i = 0;
    document.getElementsByClassName("slide")[i].classList.toggle("opacity");
}, 5000);

async function loadMeal() {
    const url = 'https://scmeal.ml/%ED%95%9C%EB%AF%BC%EA%B3%A0';
    const response = await fetch(url);
    const data = await response.json();

    let textBreakfast = "";
    let textLunch = "";
    let textDinner = "";

    for(let i=0; i<data.breakfast.length; i++) textBreakfast += data.breakfast[i] + "\n";
    for(let i=0; i<data.lunch.length; i++) textLunch += data.lunch[i] + "\n";
    for(let i=0; i<data.dinner.length; i++) textDinner += data.dinner[i] + "\n";

    document.getElementsByClassName("show-breakfast")[0].innerText = textBreakfast.substr(0, textBreakfast.length - 1);
    document.getElementsByClassName("show-lunch")[0].innerText = textLunch.substr(0, textLunch.length - 1);
    document.getElementsByClassName("show-dinner")[0].innerText = textDinner.substr(0, textDinner.length - 1);
}

loadMeal();