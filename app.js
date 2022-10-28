const headerButtonPrev = document.querySelector(".left");
const headerButtonNext = document.querySelector(".right");
const listBanners = document.querySelectorAll("#banner-top > div");
let index = 0;

headerButtonNext.addEventListener('click', () => {
    index = (index + 1) % listBanners.length;
    updateSelection();
});

headerButtonPrev.addEventListener('click', () => {
    index = (index + listBanners.length - 1) % listBanners.length; 
    updateSelection();
});  

function updateSelection() {
    let active = document.querySelector('#banner-top > div.active');
    if(active) {
      active.classList.remove('active');
      listBanners[index].classList.add('active');
    };
};

function activationContent(contid) {
  const listContent = document.querySelectorAll(".video-contant > div"); 
  for(let key in listContent) {
    if(listContent.hasOwnProperty(key)) { 
      if(listContent[key].dataset.contid === contid) {     
        document.querySelector('.video-contant > .active').classList.remove('active');
        listContent[key].classList.add('active');        
      };
    };
  };
}; 

function activationButton(butid) { 
  const listButton = document.querySelectorAll(".xz > div > .butt");
  for(let key in listButton) {
    if(listButton.hasOwnProperty(key)) { 
      if(listButton[key].dataset.butid === butid) {
        document.querySelector('.xz > div > .active').classList.remove('active');
        listButton[key].classList.add('active');
      }; 
    };
  };
};

document.querySelector(".xz").addEventListener('click', (f) => {
  function searchId (f) {
    let listPath = f;
    for(let key in listPath) {
      if(listPath[key].dataset) {
        if(listPath[key].dataset.butid) {
          activationButton(listPath[key].dataset.butid);
          activationContent(listPath[key].dataset.butid);
        };
      };  
    };
  };
searchId(f.path);
});