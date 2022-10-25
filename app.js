const headerButtonLeft = document.querySelector(".left")
const headerButtonRight = document.querySelector(".right")
const headerBackground = document.querySelector(".header")
const headerTitle = document.querySelector(".header-title")


headerButtonLeft.addEventListener("click", () => {
    headerBackground.style.backgroundImage = "url(images/bg2.jpg)"
   // headerBackground.classList.add("hidden")
    headerTitle.classList.add("hidden")
    setTimeout(()=>{
        headerTitle.classList.remove("hidden")
        headerTitle.innerText = "ГРЯЗНЫЕ\nПОМЕЩЕНИЯ"
        //headerBackground.classList.remove("hidden")
    },400)
})

headerButtonRight.addEventListener("click", () => {
    headerBackground.style.backgroundImage = "url(images/bg3.jpg)"
    //headerBackground.classList.add("hidden")
    headerTitle.classList.add("hidden")
    setTimeout(()=>{
        //headerBackground.classList.remove("hidden")
        headerTitle.classList.remove("hidden")
        headerTitle.innerText = "ЧИСТЫЕ\nПОМЕЩЕНИЯ"
    },400)
})


