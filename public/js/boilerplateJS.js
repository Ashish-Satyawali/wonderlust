let navbarCollapse = document.querySelector("#navbarNavAltMarkup");
let container = document.querySelector(".container")
        
navbarCollapse.addEventListener("show.bs.collapse",()=>{
    container.style.marginTop = "130px"
});
navbarCollapse.addEventListener("hide.bs.collapse",()=>{
    container.style.marginTop = "5px"
});
