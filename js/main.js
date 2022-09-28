
$(".nav-link").eq(0).click(function(){
    $("#p1").css("transform" , "translateX(200%)") ;
    $("#p2").css("transform" , "translateX(200%)") ;
    $("#p3").css("transform" , "translateX(200%)") ;
    $("#p4").css("transform" , "translateX(200%)") ;
    $("#p5").css("transform" , "translateX(200%)") ;
    $("#p6").css("transform" , "translateX(200%)") ;
    $("#p7").css("transform" , "translateX(200%)") ;
    $(".surahsContainer").css("transform" , "translateX(200%)")
})
$(".nav-link").eq(1).click(function(){
    $("#p2").css("transform" , "translateX(-222%)") ;
    $("#p1").css("transform" , "translateX(200%)") ;
    $("#p3").css("transform" , "translateX(200%)") ;
    $("#p4").css("transform" , "translateX(200%)") ;
    $("#p5").css("transform" , "translateX(200%)") ;
    $("#p6").css("transform" , "translateX(200%)") ;
    $("#p7").css("transform" , "translateX(200%)") ;
    $(".surahsContainer").css("transform" , "translateX(200%)")
})
$(".nav-link").eq(2).click(function(){
    $("#p2").css("transform" , "translateX(200%)") ;
    $("#p1").css("transform" , "translateX(200%)") ;
    $("#p3").css("transform" , "translateX(-222%)") ;
    $("#p4").css("transform" , "translateX(200%)") ;
    $("#p5").css("transform" , "translateX(200%)") ;
    $("#p6").css("transform" , "translateX(200%)") ;
    $("#p7").css("transform" , "translateX(200%)") ;
    $(".surahsContainer").css("transform" , "translateX(200%)")
})
$(".nav-link").eq(3).click(function(){
    $("#p2").css("transform" , "translateX(200%)") ;
    $("#p1").css("transform" , "translateX(200%)") ;
    $("#p3").css("transform" , "translateX(200%)") ;
    $("#p4").css("transform" , "translateX(-222%)") ;
    $("#p5").css("transform" , "translateX(200%)") ;
    $("#p6").css("transform" , "translateX(200%)") ;
    $("#p7").css("transform" , "translateX(200%)") ;
    $(".surahsContainer").css("transform" , "translateX(200%)")
})
$(".nav-link").eq(4).click(function(){
    $("#p2").css("transform" , "translateX(200%)") ;
    $("#p1").css("transform" , "translateX(200%)") ;
    $("#p3").css("transform" , "translateX(200%)") ;
    $("#p4").css("transform" , "translateX(200%)") ;
    $("#p5").css("transform" , "translateX(-222%)") ;
    $("#p6").css("transform" , "translateX(200%)") ;
    $("#p7").css("transform" , "translateX(200%)") ;
    $(".surahsContainer").css("transform" , "translateX(200%)")
})
$(".nav-link").eq(5).click(function(){
    $("#p2").css("transform" , "translateX(200%)") ;
    $("#p1").css("transform" , "translateX(200%)") ;
    $("#p3").css("transform" , "translateX(200%)") ;
    $("#p4").css("transform" , "translateX(200%)") ;
    $("#p5").css("transform" , "translateX(200%)") ;
    $("#p6").css("transform" , "translateX(-222%)") ;
    $("#p7").css("transform" , "translateX(200%)") ;
    $(".surahsContainer").css("transform" , "translateX(200%)")
})
$(".nav-link").eq(6).click(function(){
    $("#p2").css("transform" , "translateX(200%)") ;
    $("#p1").css("transform" , "translateX(200%)") ;
    $("#p3").css("transform" , "translateX(200%)") ;
    $("#p4").css("transform" , "translateX(200%)") ;
    $("#p5").css("transform" , "translateX(200%)") ;
    $("#p6").css("transform" , "translateX(200%)") ;
    $("#p7").css("transform" , "translateX(-222%)") ;
    $(".surahsContainer").css("transform" , "translateX(200%)")
})
let surahsContainer = document.querySelector(".surahsContainer") ;
let quranFinal ;
async function getQuran()
{
    let quran  = await fetch(`http://api.alquran.cloud/v1/meta`) ;
    let quran2 = await quran.json() ;
    quranFinal = quran2.data.surahs.references; 
   
    displayAyat() ;
    getIndexOf()
}
getQuran() ;
function displayAyat(){
    
 let aya = "" ;
 for(let i = 0 ; i < quranFinal.length ; i++)
 {
    aya+=`<div class="sura col-md-4 col-lg-3 col-xl-2">
         
          <p>${quranFinal[i].name}</p>
          <span>${quranFinal[i].englishName}</span>
         </div>`;
 } ;
       document.getElementById("creatData").innerHTML = aya ;
}
let CurrentOfIndex  ;
function getIndexOf(){
  
    let col2 = Array.from(document.querySelectorAll("#creatData .sura p"));
    console.log(col2);
    for(let i = 0 ; i < col2.length ; i++)
    {
        col2[i].addEventListener("click",function(e){
          
           CurrentOfIndex  =   col2.indexOf(e.target);
           getSurahs(CurrentOfIndex) ;
           $(".surahsContainer").css("transform" , "translateX(-222%)")

        })
    }
}
let quranData ;
async function getSurahs()
{
    let ofSurahs = await fetch (`https://api.alquran.cloud/v1/surah/${CurrentOfIndex+1}`) ;
    let isSurahs = await ofSurahs.json() ;
    quranData =  isSurahs.data.ayahs;
    createSurahs();
}
function createSurahs()
{
    let tmp = `` ;

    for( let i = 0 ; i < quranData.length; i++)
    {
        tmp+=`
             <p>${quranData[i].text}</p>
        ` ;
    }
    surahsContainer.innerHTML = tmp ;
}
let dataOfHadith ;
async function getHadith(){

    let hadith = await fetch (`https://ahadith-api.herokuapp.com/api/chapter/all/ar`) ;
    let ofHadith = await hadith.json() ;
    dataOfHadith = ofHadith.AllChapters ;
    displayHadith() ;
}
getHadith() ;


function displayHadith()
{
    let HadithOf = `` ;
    for(let i = 0 ; i < dataOfHadith.length ; i++)
    {
        HadithOf+=`
             <div>${dataOfHadith[i].Chapter_Intro}</div>
        `
    }
    document.getElementById("hadith").innerHTML = HadithOf ;
}

let azanData ; 
async function getTimingAzan() 
{
    let azanApi = await fetch(`https://api.aladhan.com/v1/calendarByAddress?address=khouribga&method=&month=&year=`);
    let azanRespnse = await azanApi.json() ;
     azanData = azanRespnse.data ;
    displayAzanApi() ;
}
getTimingAzan() ;

function displayAzanApi()
{
    let azan = `` ;
    for( let i = 0 ; i < 1 ; i++)
    {
       azan+=`
             <div class="card col-md-3 col-lg-4 col-xl-2">${"Fajr"} <br>${azanData[i].timings.Fajr}</div>
             <div class="card col-md-3 col-lg-4 col-xl-2">${"Sunrise"} <br>${azanData[i].timings.Sunrise}</div>
             <div class="card col-md-3 col-lg-4 col-xl-2">${"Dhuhr"} <br>${azanData[i].timings.Dhuhr}</div>
             <div class="card col-md-3 col-lg-4 col-xl-2">${"Asr"} <br>${azanData[i].timings.Asr}</div>
             <div class="card col-md-3 col-lg-4 col-xl-2">${"Sunset"} <br>${azanData[i].timings.Sunset}</div>
             <div class="card col-md-3 col-lg-4 col-xl-2">${"Maghrib"} <br>${azanData[i].timings.Maghrib}</div>
             <div class="card col-md-3 col-lg-4 col-xl-2">${"Isha"} <br>${azanData[i].timings.Isha}</div>
             <div class="card col-md-3 col-lg-4 col-xl-2">${"Midnight"} <br>${azanData[i].timings.Midnight}</div>
             <div class="card col-md-3 col-lg-4 col-xl-2">${"Firstthird"} <br>${azanData[i].timings.Firstthird}</div>
             <div class="card col-md-3 col-lg-4 col-xl-2">${"Lastthird"} <br>${azanData[i].timings.Lastthird}</div>
            
       ` ; 
    }
    document.getElementById("salah").innerHTML = azan ;
}



























