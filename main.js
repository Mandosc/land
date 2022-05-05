let oneCli = document.querySelector(".pixelTrack");
let onePage = document.querySelector(".page-one");
let mainDiv = document.querySelector(".main");
let twoCli = document.querySelector(".kartra_button1");
let twoPage = document.querySelector(".page-2");
let threeCli = document.querySelector(".but-2");
let threePage = document.querySelector(".page-3");




oneCli.addEventListener("click",()=>{
    mainDiv.remove();
    onePage.style.display = "block";
})

twoCli.addEventListener("click",()=>{
    onePage.remove();
    twoPage.style.display = "block";
})
threeCli.addEventListener("click",()=>{
    twoPage.remove();
    threePage.style.display = "block";
})



console.log(oneCli);
console.log(onePage);