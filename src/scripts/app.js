"use strict";
let Data1 = document.querySelector(".data1");
let Data2 = document.querySelector(".data2");
let Data3 = document.querySelector(".data3");
let Data4 = document.querySelector(".data4");
let Data5 = document.querySelector(".data5");
let Data6 = document.querySelector(".data6");
let genres = [];
let displayArtist = document.querySelector(".artist");

let genreSelected = "";
let firstArtistSelected = "";
let secondArtistSelected = "";

let genreContainer = document.querySelector(".section__div--chooseGenre");
let artistContainer = document.querySelector(".section__div--chooseArtist");
let btnRock = document.querySelector(".div__btn--rock");
let btnRapUS = document.querySelector(".div__btn--rapUs");
let selection = false;
let actualData = "";
let firstData = 0;
let secondData = 0;
btnRock.addEventListener("click", function(){
    genreSelected = btnRock.value;
    genreContainer.classList.toggle("hidden");
    artistContainer.classList.toggle("visible");
    console.log(genreSelected);
    generateArtistsButtons();
});
btnRapUS.addEventListener("click", function(){
    genreSelected = btnRapUS.value;
    genreContainer.classList.toggle("hidden");
    artistContainer.classList.toggle("visible");
    console.log(genreSelected);
    generateArtistsButtons();
});



/*let btnDrake = document.querySelector(".btnDrake");
btnDrake.addEventListener("click", function(){
    artistSelected = btnDrake.value;
    fetchData();
    });*/
    function fetchData (){
        fetch("assets/data/data.json")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            JSON.stringify(data);
            genres = data;
            console.log("data fetched");
            //afficher(genres);
        })
        .catch((error)=>{
            console.log("impossible de charger les données");
        });
    }
function generateArtistsButtons(){

    artistContainer.innerHTML = "";
    for(var x in genres['genre'][`${genreSelected}`]){
        let artistBtn = document.createElement("button");
        artistBtn.setAttribute("data-text", genres['genre'][`${genreSelected}`][x].name);
        artistBtn.setAttribute("value", genres['genre'][`${genreSelected}`][x].value);
        artistBtn.innerText = genres['genre'][`${genreSelected}`][x].name;
        artistBtn.classList.add("div__btn", "div__btn--artist", "artist");
        //artistBtn.classList.add("div__btn--artist");
        //artistBtn.classList.add("artist");
        artistContainer.appendChild(artistBtn);
    }
    selection = true;
    console.log(selection);
    SelectCharacter();
}

let artistSelectedAll = [];
function SelectCharacter(){
    
    let chooseArtistBtn = document.querySelectorAll(".div__btn--artist");
    
        chooseArtistBtn.forEach(button =>{
            button.addEventListener("click", function(){
                if(artistSelectedAll.length < 2 && !button.classList.contains("hidden")){
                    artistSelectedAll.push(button.getAttribute("value"));
                    button.classList.add("hidden");

                    if(artistSelectedAll.length === 2){
                        console.log("values in", artistSelectedAll);
                        chooseArtistBtn.forEach(btn =>{
                            btn.disabled = true;
                        });
                        artistContainer.classList.add("hidden");
                        displayVersus();
                    }
                }
            });
        });
}

                        
function displayVersus(){
    let sectionResults = document.querySelector(".section--results");
    let firstArtist = document.querySelector(".div__div--firstArtist");
    let secondArtist = document.querySelector(".div__div--secondArtist");
    sectionResults.classList.add("visible");
    
    for(let i = 0; i < artistSelectedAll.length; i++){
        console.log(i);
        const H2 = document.createElement("h2");
        H2.innerText = genres['genre'][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        if(i<1){
            firstArtist.appendChild(H2);
            firstArtist.style.backgroundImage = "url("+`${genres['genre'][`${genreSelected}`][`${artistSelectedAll[i]}`]['image-link']}`+")";
        }else{
            secondArtist.appendChild(H2);
            secondArtist.style.backgroundImage = "url("+`${genres['genre'][`${genreSelected}`][`${artistSelectedAll[i]}`]['image-link']}`+")";
        }

    }
    statsAlbumCount();
}
function statsAlbumCount(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div","section__div--albumCount");
    const H2 = document.createElement("h2");
    H2.innerText = "Albums count";
    H2.classList.add("div__h2");
    div.appendChild(H2);
    sectionResults.appendChild(div);
    const divPContainer = document.createElement("div");
    divPContainer.classList.add("div__div--container");
    for(let i = 0; i < artistSelectedAll.length; i++){
        actualData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["album-total"];
        const img = document.createElement("img");
        img.classList.add("figure__img");
        if(i<1){
            div.appendChild(divPContainer);
            firstData = Number(actualData);
        }
        secondData = Number(actualData);
        const figure = document.createElement("figure");
        figure.classList.add("div__figure");
        divPContainer.appendChild(figure);
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span");
        
        const p = document.createElement("p");
        p.innerText = " has created " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["album-total"] + " albums";
        p.classList.add("figure__p");
        p.insertBefore(span, p.firstChild);
        figure.appendChild(img);
        figure.appendChild(p);
        if(i<1){
            if (firstData > secondData){
                img.setAttribute("src", "assets/images/AlbumCount-disk-winner");
                p.classList.add("data--winner");
            }else{
                img.setAttribute("src", "assets/images/AlbumCount-disk-loser");
            }
        }else if(i = 1){
            if (secondData > firstData){
                img.setAttribute("src", "assets/images/AlbumCount-disk-winner");
                p.classList.add("data--winner");
            }else{
                img.setAttribute("src", "assets/images/AlbumCount-disk-loser");
            }
        }
        
        
    }
    scoreTracker();
    statsAlbumSold();
}

function statsAlbumSold(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div","section__div--albumSold");
    const H2 = document.createElement("h2");
    H2.innerText = "Albums sold";
    H2.classList.add("div__h2");
    div.appendChild(H2);
    sectionResults.appendChild(div);
    
    for(let i = 0; i < artistSelectedAll.length; i++){
        actualData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["albums-sell"];
        actualData = actualData.replaceAll(/,/g, "");
        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            const dataVisContainer = document.createElement("div");
            const firstDataDiv = document.createElement("div");
            const secondDataDiv = document.createElement("div");
            dataVisContainer.classList.add("div__div--dataVis");
            firstDataDiv.classList.add("div__div--firstDataDiv");
            secondDataDiv.classList.add("div__div--secondDataDiv");
            dataVisContainer.appendChild(firstDataDiv);
            dataVisContainer.appendChild(secondDataDiv);
            div.appendChild(dataVisContainer);
            div.appendChild(divPContainer);
            firstData = Number(actualData);
        }
        let firstDataClass = document.querySelector(".div__div--firstDataDiv");
        let secondDataClass = document.querySelector(".div__div--secondDataDiv");
        secondData = Number(actualData);
        firstDataClass.style.width = (firstData / (firstData + secondData))*100 + "%";
        secondDataClass.style.width = (secondData / (firstData + secondData))*100 + "%";
        if (firstData > secondData){
            firstDataClass.style.backgroundColor = "#e94d4d"
        }else{
            firstDataClass.style.backgroundColor = "#ececec"
        }
        if (secondData > firstData){
            secondDataClass.style.backgroundColor = "#e94d4d"
        }else{
            secondDataClass.style.backgroundColor = "#ececec"
        }

        let divContainer = document.querySelector(".section__div--albumSold .div__div--container");
        
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span");
        
        const p = document.createElement("p");
        p.innerText = " has sold " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["albums-sell"] + " albums (value as of 28/02/25)";
        p.classList.add("div__p");
        p.insertBefore(span, p.firstChild);
        divContainer.appendChild(p);
        if(i<1){
            if (firstData > secondData){
                p.classList.add("data--winner");
            }else{
            }
        }else if(i = 1){
            if (secondData > firstData){
                p.classList.add("data--winner");
            }else{
            }
        }
        
    }
    scoreTracker();
    statsNumberStreams();
}

function statsNumberStreams(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div","section__div--streamNumber");
    const H2 = document.createElement("h2");
    H2.innerText = "Number of streams";
    H2.classList.add("div__h2");
    div.appendChild(H2);
    sectionResults.appendChild(div);
    
    for(let i = 0; i < artistSelectedAll.length; i++){
        actualData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["streams-total"];
        actualData = actualData.replaceAll(/,/g, "");
        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
            firstData = Number(actualData);
        }
        secondData = Number(actualData);
        let divContainer = document.querySelector(".section__div--streamNumber .div__div--container");
        const pDataVis = document.createElement("p");
        pDataVis.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["streams-dataVis"];
        pDataVis.classList.add("div__p");
        if(i < 1){
            pDataVis.classList.add("div__p--firstDataVis");
        }else{
            pDataVis.classList.add("div__p--secondDataVis");
        }
        divContainer.appendChild(pDataVis);
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span");
        
        const p = document.createElement("p");
        p.innerText = " has generated over " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["streams-round"] + " streams since he started";
        p.classList.add("div__p")
        p.insertBefore(span, p.firstChild);
        divContainer.appendChild(p);
        if(i<1){
            if (firstData > secondData){
                pDataVis.classList.add("data--winner");
                p.classList.add("data--winner");
            }
        }else if(i = 1){
            if (secondData > firstData){
                pDataVis.classList.add("data--winner");
                p.classList.add("data--winner");
            }
        }
    }
    let firstDataClass = document.querySelector(".div__p--firstDataVis");
    let secondDataClass = document.querySelector(".div__p--secondDataVis");
    if (firstData > secondData){
        firstDataClass.style.color = "#e94d4d"
    }else{
        firstDataClass.style.color = "#ececec"
    }
    if (secondData > firstData){
        secondDataClass.style.color = "#e94d4d"
    }else{
        secondDataClass.style.color = "#ececec"
    }
    scoreTracker();
    statsAwards();
}
function statsAwards(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div","section__div--awards");
    const H2 = document.createElement("h2");
    H2.innerText = "Awards";
    H2.classList.add("div__h2");
    div.appendChild(H2);
    sectionResults.appendChild(div);
    
    for(let i = 0; i < artistSelectedAll.length; i++){
        actualData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["awards"];
        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
            firstData = Number(actualData);
        }
        secondData = Number(actualData);
        let divContainer = document.querySelector(".section__div--awards .div__div--container");
        
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span");
        
        const p = document.createElement("p");
        p.innerText = " has received " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["awards"] + " awards throughout his career";
        p.classList.add("div__p");
        p.insertBefore(span, p.firstChild);
        divContainer.appendChild(p);
        if(i<1){
            if (firstData > secondData){
                p.classList.add("data--winner");
            }
        }else if(i = 1){
            if (secondData > firstData){
                p.classList.add("data--winner");
            }
        }

    }
    scoreTracker();
    statsCertifications();
}
function statsCertifications(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div","section__div--certifications");
    const H2 = document.createElement("h2");
    H2.innerText = "Certifications";
    H2.classList.add("div__h2");
    div.appendChild(H2);
    sectionResults.appendChild(div);
    
    for(let i = 0; i < artistSelectedAll.length; i++){
        actualData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["certifications"];
        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
            firstData = Number(actualData);
        }
        secondData = Number(actualData);
        let divContainer = document.querySelector(".section__div--certifications .div__div--container");
        
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span");
        
        const p = document.createElement("p");
        p.innerText = " has received a total of " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["certifications"] + " certifications " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["certifications-split"];
        p.classList.add("div__p");
        p.insertBefore(span, p.firstChild);
        divContainer.appendChild(p);
        if(i<1){
            if (firstData > secondData){
                p.classList.add("data--winner");
            }
        }else if(i = 1){
            if (secondData > firstData){
                p.classList.add("data--winner");
            }
        }
    }
    scoreTracker();
    statsTotalTime();
}

function statsTotalTime(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div","section__div--totalTime");
    const H2 = document.createElement("h2");
    H2.innerText = "Total music time";
    H2.classList.add("div__h2");
    div.appendChild(H2);
    sectionResults.appendChild(div);
    
    for(let i = 0; i < artistSelectedAll.length; i++){
        actualData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["music-time-total"];
        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
            firstData = Number(actualData);
        }
        secondData = Number(actualData);
        let divContainer = document.querySelector(".section__div--totalTime .div__div--container");
        
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span");
        
        const p = document.createElement("p");
        const pFirstText = document.createTextNode("If you add up every song from ");
        const pSecondText = document.createTextNode(" albums, that would represent a total of ");
        let pData = document.createTextNode(genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["music-time-total"]);
        const pThirdText = document.createTextNode(" minutes of listening time");
        p.appendChild(pFirstText);
        p.appendChild(span);
        p.appendChild(pSecondText);
        p.appendChild(pData);
        p.appendChild(pThirdText);
        p.classList.add("div__p");
        divContainer.appendChild(p);
        if(i<1){
            if (firstData > secondData){
                p.classList.add("data--winner");
            }
        }else if(i = 1){
            if (secondData > firstData){
                p.classList.add("data--winner");
            }
        }
    }
    scoreTracker();
    displayWinner();
}
let firstScore = 0;
let secondScore = 0;
function scoreTracker(){

    if(firstData > secondData){
        firstScore++;
    }else{
        secondScore++;
    }
    let score = firstScore + " - " + secondScore;
    let divScore = document.querySelectorAll(".section--results .section__div");
    const p = document.createElement("p");
    p.innerText = score;
    p.classList.add("div__p", "div__p--score");
    divScore.forEach((div) => {
        div.appendChild(p);
    })
    console.log(score);
}

// Resize images on mobile, maybe to big to display.
// SCSS to design infos + reactive dataset graphs
function displayWinner(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div--winner");
    const p = document.createElement("p");
    p.classList.add("div__p");
    if(firstScore === secondScore){
        p.innerText = "Draw";
        div.style.backgroundColor = "#e94d4d";
    }else if(firstScore > secondScore){
        p.innerText = "Winner";
        div.style.backgroundImage = "url("+`${genres['genre'][`${genreSelected}`][`${artistSelectedAll[0]}`]['image-link']}`+")";
    }else{
        p.innerText = "Winner";
        div.style.backgroundImage = "url("+`${genres['genre'][`${genreSelected}`][`${artistSelectedAll[1]}`]['image-link']}`+")";
    }
    div.appendChild(p);
    sectionResults.appendChild(div);

    //secondArtist.style.backgroundImage = "url("+`${genres['genre'][`${genreSelected}`][`${artistSelectedAll[i]}`]['image-link']}`+")";
}

window.addEventListener("DOMContentLoaded", ()=>{
    fetchData();
});

