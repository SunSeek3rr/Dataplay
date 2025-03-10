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
    div.classList.add("section__div--albumCount");
    sectionResults.appendChild(div);
    
    for(let i = 0; i < artistSelectedAll.length; i++){

        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
        }
        
        let divContainer = document.querySelector(".div__div--container");
        
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span")
        
        const p = document.createElement("p");
        p.innerText = " has created " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["album-total"] + " albums";
        p.classList.add("div__p")
        p.insertBefore(span, p.firstChild);
        divContainer.appendChild(p);

    }
    statsAlbumSold();
}

function statsAlbumSold(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div--albumSold");
    sectionResults.appendChild(div);
    
    for(let i = 0; i < artistSelectedAll.length; i++){

        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
        }
        
        let divContainer = document.querySelector(".div__div--container");
        
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span")
        
        const p = document.createElement("p");
        p.innerText = " has sold " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["albums-sell"] + " albums";
        p.classList.add("div__p")
        p.insertBefore(span, p.firstChild);
        divContainer.appendChild(p);

    }
    statsNumberStreams();
}

function statsNumberStreams(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div--streamNumber");
    sectionResults.appendChild(div);

    for(let i = 0; i < artistSelectedAll.length; i++){

        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
        }
        
        let divContainer = document.querySelector(".div__div--container");
        
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span")
        
        const p = document.createElement("p");
        p.innerText = " has generated over " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["streams-total"] + " streams since he started";
        p.classList.add("div__p")
        p.insertBefore(span, p.firstChild);
        divContainer.appendChild(p);

    }
    statsAwards();
}
function statsAwards(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div--awards");
    sectionResults.appendChild(div);

    for(let i = 0; i < artistSelectedAll.length; i++){

        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
        }
        
        let divContainer = document.querySelector(".div__div--container");
        
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span")
        
        const p = document.createElement("p");
        p.innerText = " has received " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["awards"] + " awards throughout his career";
        p.classList.add("div__p")
        p.insertBefore(span, p.firstChild);
        divContainer.appendChild(p);

    }
    statsCertifications();
}
function statsCertifications(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div--certifications");
    sectionResults.appendChild(div);
    
    for(let i = 0; i < artistSelectedAll.length; i++){

        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
        }
        
        let divContainer = document.querySelector(".div__div--container");
        
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span")
        
        const p = document.createElement("p");
        p.innerText = " has received a total of " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["certifications"] + " certifications " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["certifications-split"];
        p.classList.add("div__p")
        p.insertBefore(span, p.firstChild);
        divContainer.appendChild(p);

    }
    statsTotalTime();
}

function statsTotalTime(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div--totalTime");
    sectionResults.appendChild(div);
    
    for(let i = 0; i < artistSelectedAll.length; i++){

        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
        }
        
        let divContainer = document.querySelector(".div__div--container");
        
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span")
        
        const p = document.createElement("p");
        const pFirstText = document.createTextNode("If you add up every song from ");
        const pSecondText = document.createTextNode(" albums, that would represent a total of ");
        const pData = document.createTextNode(genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["music-time-total"]);
        const pThirdText = document.createTextNode(" minutes of listening time");
        p.appendChild(pFirstText);
        p.appendChild(span);
        p.appendChild(pSecondText);
        p.appendChild(pData);
        p.appendChild(pThirdText)
        p.classList.add("div__p")
        divContainer.appendChild(p);

    }
    //displayWinner();
}
/*function displayWinner(){
    let sectionResults = document.querySelector(".section--results");
    let firstArtist = document.querySelector(".div__div--firstArtist");
    let secondArtist = document.querySelector(".div__div--secondArtist");
    sectionResults.classList.add("visible");
    
    for(let i = 0; i < artistSelectedAll.length; i++){
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
}*/

window.addEventListener("DOMContentLoaded", ()=>{
    fetchData();
});

