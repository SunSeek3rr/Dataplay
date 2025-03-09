"use strict";
<<<<<<< Updated upstream

=======
/*let Data1 = document.querySelector(".data1");
let Data2 = document.querySelector(".data2");
let Data3 = document.querySelector(".data3");
let Data4 = document.querySelector(".data4");
let Data5 = document.querySelector(".data5");
let Data6 = document.querySelector(".data6");
let genres = [];
let displayArtist = document.querySelector(".artist");

let genreSelected = "";
let artistSelected = "";

let btn = document.getElementById("btn");
//btn.addEventListener("click", fetchData);
let btnRock = document.querySelector(".btnRock");
let btnRapUS = document.querySelector(".btnRapUS");
console.log(btnRock);
btnRock.addEventListener("click", function(){
    genreSelected = btnRock.value;
    console.log(genreSelected);
    console.log("clickrock");
});
btnRapUS.addEventListener("click", function(){
    genreSelected = btnRapUS.value;
    console.log(genreSelected);
    console.log("clickrap");
});
let btnDrake = document.querySelector(".btnDrake");
btnDrake.addEventListener("click", function(){
    artistSelected = btnDrake.value;
    fetchData();
});
let btnKendrick = document.querySelector(".btnKendrick");
btnKendrick.addEventListener("click", function(){
    artistSelected = btnKendrick.value;
    fetchData();
});
let btnImagine = document.querySelector(".btnImagine");
btnImagine.addEventListener("click", function(){
    artistSelected = btnImagine.value;
    fetchData();
});
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
        afficher(genres);
    })
    .catch((error)=>{
        console.log("impossible de charger les données");
    });
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
    console.log(genres);
    displayArtist.innerHTML ="";
    displayArtist.style.opacity = "1";

    let myH2 = document.createElement("h2");
    myH2.innerText = genres['genre']['rock'].name;
}

/*
Change querySelector(".btnDrake") par querySelectorAll(".btn");
-> btn.forEach((btn)){
 getValue;
}
*/
>>>>>>> Stashed changes
