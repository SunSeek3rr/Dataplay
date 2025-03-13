"use strict";
let genres = [];

let genreSelected = "";
let firstArtistSelected = "";
let secondArtistSelected = "";

let genreContainer = document.querySelector(".section__div--chooseGenre");
let artistContainer = document.querySelector(".section__div--chooseArtist");
let btnRock = document.querySelector(".div__btn--rock");
let btnRapUS = document.querySelector(".div__btn--rapUs");
let actualData = "";
let firstData = 0;
let secondData = 0;

let headerImg = document.querySelector(".div__img");

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
    artistContainer.scrollIntoView({behavior: 'smooth'});
    SelectCharacter();
}

let artistSelectedAll = [];
function SelectCharacter(){
    artistSelectedAll = [];
    console.log(artistSelectedAll);
    artistContainer.classList.remove("hidden");
    let chooseArtistBtn = document.querySelectorAll(".div__btn--artist");
    
        chooseArtistBtn.forEach(button =>{
            button.disabled = false;
            button.addEventListener("click", function(){
                if(artistSelectedAll.length < 2 && !button.classList.contains("hidden")){
                    artistSelectedAll.push(button.getAttribute("value"));
                    button.classList.add("clicked");
                    button.disabled = true;

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
    const divVersus = document.createElement("div");
    divVersus.classList.add("section__div--versus");
    const firstArtistDiv = document.createElement("div");
    firstArtistDiv.classList.add("div__div--firstArtist");
    const secondArtistDiv = document.createElement("div");
    secondArtistDiv.classList.add("div__div--secondArtist");
    divVersus.appendChild(firstArtistDiv);
    divVersus.appendChild(secondArtistDiv);
    sectionResults.appendChild(divVersus);
    sectionResults.classList.add("visible");
    sectionResults.scrollIntoView({behavior: 'smooth'});
    
    for(let i = 0; i < artistSelectedAll.length; i++){
        let firstArtist = document.querySelector(".div__div--firstArtist");
        let secondArtist = document.querySelector(".div__div--secondArtist");
        console.log(i);
        const H2 = document.createElement("h2");
        H2.innerText = genres['genre'][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        if(i<1){
            if (window.devicePixelRatio > 1 || window.innerWidth >= 1440){
                firstArtist.style.backgroundImage = `url('${genres['genre'][genreSelected][artistSelectedAll[i]]['image2x-link']}')`;
            }else{
                firstArtist.style.backgroundImage = `url('${genres['genre'][genreSelected][artistSelectedAll[i]]['image-link']}')`;
    
            }
            firstArtist.appendChild(H2);
        }else{
            if (window.devicePixelRatio > 1 || window.innerWidth >= 1440){
                secondArtist.style.backgroundImage = `url('${genres['genre'][genreSelected][artistSelectedAll[i]]['image2x-link']}')`;
            }else{
                secondArtist.style.backgroundImage = `url('${genres['genre'][genreSelected][artistSelectedAll[i]]['image-link']}')`;
            }
            secondArtist.appendChild(H2);
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
        firstData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[0]}`]["album-total"];
        secondData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[1]}`]["album-total"];
        firstData = Number(firstData);
        secondData = Number(secondData);
        const img = document.createElement("img");
        img.classList.add("figure__img");
        if(i<1){
            div.appendChild(divPContainer);
        }
        const figure = document.createElement("figure");
        figure.classList.add("div__figure");
        divPContainer.appendChild(figure);
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span");
        
        const p = document.createElement("p");
        p.innerText = " has created " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["album-total"] + " albums since " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["start-year"];
        p.classList.add("figure__p");
        p.insertBefore(span, p.firstChild);
        figure.appendChild(img);
        figure.appendChild(p);
        if(i<1){
            if (firstData > secondData){
                img.setAttribute("src", "assets/images/AlbumCount-disk-winner.svg");
                p.classList.add("data--winner");
            }else{
                img.setAttribute("src", "assets/images/AlbumCount-disk-loser.svg");
            }
        }else if(i = 1){
            if (secondData > firstData){
                img.setAttribute("src", "assets/images/AlbumCount-disk-winner.svg");
                p.classList.add("data--winner");
            }else{
                img.setAttribute("src", "assets/images/AlbumCount-disk-loser.svg");
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
        firstData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[0]}`]["albums-sell"];
        secondData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[1]}`]["albums-sell"];
        firstData = firstData.replaceAll(/,/g, "");
        secondData = secondData.replaceAll(/,/g, "");
        firstData = Number(firstData);
        secondData = Number(secondData);
        console.log(firstData, secondData);
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
        }
        let firstDataClass = document.querySelector(".div__div--firstDataDiv");
        let secondDataClass = document.querySelector(".div__div--secondDataDiv");
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
            }
        }else if(i = 1){
            if (secondData > firstData){
                p.classList.add("data--winner");
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
        firstData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[0]}`]["streams-total"];
        secondData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[1]}`]["streams-total"];
        firstData = firstData.replaceAll(/,/g, "");
        secondData = secondData.replaceAll(/,/g, "");
        firstData = Number(firstData);
        secondData = Number(secondData);
        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
        }
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
        firstDataClass.style.color = "#e94d4d";
    }else{
        firstDataClass.style.color = "#ececec";
    }
    if (secondData > firstData){
        secondDataClass.style.color = "#e94d4d";
    }else{
        secondDataClass.style.color = "#ececec";
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
        firstData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[0]}`]["awards"];
        secondData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[1]}`]["awards"];
        firstData = Number(firstData);
        secondData = Number(secondData);
        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
        }
        const dataDiv = document.createElement("div");
        dataDiv.classList.add("div__div--data");
        let divContainer = document.querySelector(".section__div--awards .div__div--container");
        
        const pData = document.createElement("p");
        pData.classList.add("div__p--dataVis");
        pData.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["awards"];
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span");
        
        const p = document.createElement("p");
        p.innerText = " has received " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["awards"] + " awards throughout his career";
        p.classList.add("div__p");
        p.insertBefore(span, p.firstChild);
        dataDiv.appendChild(pData);
        dataDiv.appendChild(p);
        divContainer.appendChild(dataDiv);
        if(i<1){
            if (firstData > secondData){
                dataDiv.classList.add("data--winner");
            }
        }else if(i = 1){
            if (secondData > firstData){
                dataDiv.classList.add("data--winner");
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
        firstData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[0]}`]["certifications"];
        secondData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[1]}`]["certifications"];
        firstData = Number(firstData);
        secondData = Number(secondData);
        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
        }
        const dataDiv = document.createElement("div");
        dataDiv.classList.add("div__div--data");
        let divContainer = document.querySelector(".section__div--certifications .div__div--container");
        
        const pData = document.createElement("p");
        pData.classList.add("div__p--dataVis");
        pData.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["certifications"];
        const span = document.createElement("span");
        span.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`].name;
        span.classList.add("p__span");
        
        const p = document.createElement("p");
        p.innerText = " has received a total of " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["certifications"] + " certifications " + genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["certifications-split"];
        p.classList.add("div__p");
        p.insertBefore(span, p.firstChild);
        dataDiv.appendChild(pData);
        dataDiv.appendChild(p);
        divContainer.appendChild(dataDiv);
        if(i<1){
            if (firstData > secondData){
                dataDiv.classList.add("data--winner");
            }
        }else if(i = 1){
            if (secondData > firstData){
                dataDiv.classList.add("data--winner");
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
        firstData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[0]}`]["music-time-total"];
        secondData = genres["genre"][`${genreSelected}`][`${artistSelectedAll[1]}`]["music-time-total"];
        firstData = Number(firstData);
        secondData = Number(secondData);
        const divPContainer = document.createElement("div");
        divPContainer.classList.add("div__div--container");
        if(i<1){
            div.appendChild(divPContainer);
        }
        let divContainer = document.querySelector(".section__div--totalTime .div__div--container");
        const divData = document.createElement("div");
        divData.classList.add("div__div--dataVis");
        const spanDataVis = document.createElement("span");
        spanDataVis.classList.add("p__span");
        spanDataVis.innerText = genres["genre"][`${genreSelected}`][`${artistSelectedAll[i]}`]["music-time-total"];
        const pDataVis = document.createElement("p");
        pDataVis.classList.add("div__p","div__p--dataVis");
        pDataVis.innerText = "minutes";
        pDataVis.insertBefore(spanDataVis, pDataVis.firstChild);
        divData.appendChild(pDataVis);
        divContainer.appendChild(divData);
        
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
                divData.classList.add("data--winner");
                p.classList.add("data--winner");
            }
        }else if(i = 1){
            if (secondData > firstData){
                divData.classList.add("data--winner");
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
    let score = firstScore + "-" + secondScore;
    let divScore = document.querySelectorAll(".section--results .section__div");
    const p = document.createElement("p");
    p.innerText = score;
    p.classList.add("div__p", "div__p--score");
    divScore.forEach((div) => {
        div.appendChild(p);
    })
}

function displayWinner(){
    let sectionResults = document.querySelector(".section--results");
    const div = document.createElement("div");
    div.classList.add("section__div--winner");
    const p = document.createElement("p");
    const pName = document.createElement("p");

    p.classList.add("div__p");
    pName.classList.add("div__p");
    if(firstScore === secondScore){
        p.innerText = "Draw";
        div.style.backgroundColor = "#e94d4d";
    }else if(firstScore > secondScore){
        if (window.devicePixelRatio > 1 || window.innerWidth >= 1440){
            div.style.backgroundImage = `url('${genres['genre'][genreSelected][artistSelectedAll[0]]['image2x-winner-link']}')`;
        }else{
            div.style.backgroundImage = `url('${genres['genre'][genreSelected][artistSelectedAll[0]]['image-winner-link']}')`;

        }
        p.innerText = "Winner";
        pName.innerText = genres['genre'][`${genreSelected}`][`${artistSelectedAll[0]}`].name;
    }else{
        if (window.devicePixelRatio > 1 || window.innerWidth >= 1440){
            div.style.backgroundImage = `url('${genres['genre'][genreSelected][artistSelectedAll[1]]['image2x-winner-link']}')`;
        }else{
            div.style.backgroundImage = `url('${genres['genre'][genreSelected][artistSelectedAll[1]]['image-winner-link']}')`;

        }
        p.innerText = "Winner";
        pName.innerText = genres['genre'][`${genreSelected}`][`${artistSelectedAll[1]}`].name;
    }
    div.appendChild(p);
    div.appendChild(pName);
    sectionResults.appendChild(div);
    let btnRestart = document.querySelector(".main__btn--restart");
    btnRestart.classList.remove("hidden");
    let sectionDiv = document.querySelectorAll('.section__div');
    let sectionDivText = document.querySelectorAll('.section__div--text');
    let observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=> {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
        }
    });
    }, {
    threshold: 0.1
    });
    sectionDiv.forEach(function (element) {
    observer.observe(element);
    });
    sectionDivText.forEach(function (element) {
        console.log("ouais");
        observer.observe(element);
        });
}

let restartBtn = document.querySelector(".main__btn--restart");
if(restartBtn){
    console.log(restartBtn);
    restartBtn.addEventListener("click", ()=>{
        restartBtn.classList.add("hidden");
        restart();
    });
}
function restart(){
    let sectionResults = document.querySelector(".section--results");
    sectionResults.classList.remove("visible");
    sectionResults.innerHTML="";
    let chooseArtist = document.querySelector(".section__div--chooseArtist");
    let chooseGenre = document.querySelector(".section__div--chooseGenre");
    chooseArtist.classList.remove("visible");
    chooseGenre.classList.remove("hidden");
    SelectCharacter();
    let btnRestart = document.querySelector(".main__btn--restart");
    btnRestart.classList.add("hidden");
    firstScore = 0;
    secondScore = 0;
}
/*function generateArtistsButtons(){
    
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
}*/
//console.log(genres['genre'].rock);
function changeHeaderImage(){
    let rockArtists = [];
    let rapUsArtists = [];
    let allArtists= [];
    for (var x in genres['genre']['rock']) {
        rockArtists.push(x);
    }
    for (var x in genres['genre']['rapUs']) {
        rapUsArtists.push(x);
    }
    allArtists = rockArtists.concat(rapUsArtists);
    let randomNumber = Math.floor(Math.random() * 12);
    let randomArtist = allArtists[randomNumber];
        if(randomNumber <= 5){
            headerImg.src = genres['genre']['rock'][randomArtist]['headerImageSrc'];
            headerImg.srcset = genres['genre']['rock'][randomArtist]['headerImageSrcset'];
        }else{
            headerImg.src = genres['genre']['rapUs'][randomArtist]['headerImageSrc'];
            headerImg.srcset = genres['genre']['rapUs'][randomArtist]['headerImageSrcset'];
        }
        headerImg.style.animation = "headerImg 0.3s ease";
        setTimeout(()=>{
            headerImg.style.animation = "";
        }, 300);
}
let sectionDivText = document.querySelectorAll('.section__div--text');
    let observer2 = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=> {
    if (entry.isIntersecting) {
      entry.target.classList.add('animateRight');
        }
    });
    }, {
    threshold: 0.1
    });
    sectionDivText.forEach(function (element) {
        console.log("ouais");
        observer2.observe(element);
        });

window.addEventListener("DOMContentLoaded", ()=>{
    fetchData();
    setInterval(changeHeaderImage, 2000);

});


