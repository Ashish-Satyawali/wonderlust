let searchbtn = document.querySelector(".search-btn")
let heart = document.querySelector(".a-heart")
window.addEventListener("resize",()=>{
if(window.innerWidth<=900){
    searchbtn.innerHTML = "<i class='fa-solid fa-magnifying-glass'></i>";
    if(window.innerWidth<=768){
        heart.innerText = "Your wishlist"
        heart.style.color = "#fe424d"
        heart.style.textDecoration = "none";
    }
    else{
        heart.innerHTML = "<i class='fa-solid fa-heart fav-heart'></i>"
    }
    }
else if(window.innerWidth>900){
    earchbtn.innerHTML = "<i class='fa-solid fa-magnifying-glass'></i>Search";
}

   
})
