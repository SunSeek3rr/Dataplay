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
            console.log(response);
            return response.json();
        })
        .then(function(data){
            JSON.stringify(data);
            console.log(data);
            genres = data;
            console.log("data fetched");
            //afficher(genres);
        })
        .catch((error)=>{
            console.log("impossible de charger les données");
        });
    }
function generateArtistsButtons(){
/*Ici on doit faire en sorte que ça génère des boutons en fonction du genre, on cache le séléctionné via CSS*/
    console.log(genres);
    artistContainer.innerHTML = "";
    for(var x in genres['genre'][`${genreSelected}`]){
        let artistBtn = document.createElement("button");
        artistBtn.setAttribute("data-text", genres['genre'][`${genreSelected}`][x].name);
        artistBtn.setAttribute("value", genres['genre'][`${genreSelected}`][x].value);
        artistBtn.innerText = genres['genre'][`${genreSelected}`][x].name;
        artistBtn.classList.add("div__btn");
        artistBtn.classList.add("div__btn--artist");
        artistBtn.classList.add("artist");
        artistContainer.appendChild(artistBtn);
    }
    selection = true;
    console.log(selection);
    SelectCharacter();
}

function afficher(){
    console.log(genres);
    displayArtist.innerHTML ="";
    displayArtist.style.opacity = "1";
    let myH2 = document.createElement("h2");
    myH2.innerText = genres['genre'][`${genreSelected}`].name;
    //Console.log(genres['genre']['rock'].name)
    displayArtist.appendChild(myH2);
    for (var x in genres['genre'][`${genreSelected}`][`${artistSelected}`]){
        let p = document.createElement("p");
        p.innerText = genres['genre'][`${genreSelected}`][`${artistSelected}`][x];
        displayArtist.appendChild(p);
        
    }
    
}
function SelectCharacter(){
    /*console.log(genres);
    displayArtist.innerHTML ="";
    displayArtist.style.opacity = "1";

    let myH2 = document.createElement("h2");
    myH2.innerText = genres['genre']['rock'].name;*/
    let chooseArtistBtn = document.querySelectorAll(".div__btn--artist");
    let artistSelectedAll = [];
    /*for(let i = 0; i<chooseArtistBtn.length; i++){
        chooseArtistBtn[i].addEventListener("click", ()=>{
            if(firstArtistSelected === ""){
                chooseArtistBtn[i].classList.add("hidden");
                firstArtistSelected = chooseArtistBtn[i].value;
                console.log(firstArtistSelected);
            }else{
                console.log(firstArtistSelected);
                chooseArtistBtn[i].classList.add("hidden");
                secondArtistSelected = chooseArtistBtn[i].value;
            }
            });
        }*/
        chooseArtistBtn.forEach(button =>{
            button.addEventListener("click", function(){
                if(artistSelectedAll.length < 2 && !button.classList.contains("hidden")){
                    artistSelectedAll.push(button.getAttribute("value"));
                    button.classList.add("hidden");

                    if(artistSelectedAll.length === 2){
                        console.log("values in", artistSelectedAll);
                        setInterval(function(){
                            //artistContainer.classList.remove("visible");
                            artistContainer.classList.add("hidden");
                        }, 500);
                        chooseArtistBtn.forEach(btn =>{
                            btn.disabled = true;
                        });
                    }
                }
            });
        });

}



/*Change querySelector(".btnDrake") par querySelectorAll(".btn");
-> btn.forEach((btn)){
 getValue;
}
*/
window.addEventListener("DOMContentLoaded", ()=>{
    fetchData();
});

