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

const contractButtonProject = document.querySelector("#btn-project");
const contractButtonMounting = document.querySelector("#btn-mounting");
const contractButtonQualification = document.querySelector("#btn-qualification");
const contractButtonControl = document.querySelector("#btn-control");
const contractButtonEquipment = document.querySelector("#btn-equipment");
const contractButtonModernization = document.querySelector("#btn-modernization");
const contractButtonService = document.querySelector("#btn-service");
const contractButtonEducation = document.querySelector("#btn-education");
  
contractButtonProject.addEventListener('click', () => {
    contantSelectionContrakt(document.querySelector("#cont-project"));
    activationButton(document.querySelector("#btn-project")); 
});

contractButtonMounting.addEventListener('click', () => {
  contantSelectionContrakt(document.querySelector("#cont-mounting")); 
  activationButton(document.querySelector("#btn-mounting")); 
});

contractButtonQualification.addEventListener('click', () => {
  contantSelectionContrakt(document.querySelector("#cont-qualification"));
  activationButton(document.querySelector("#btn-qualification"));  
});

contractButtonControl.addEventListener('click', () => {
  contantSelectionContrakt(document.querySelector("#cont-control"));
  activationButton(document.querySelector("#btn-control"));  
});

contractButtonEquipment.addEventListener('click', () => {
  contantSelectionContrakt(document.querySelector("#cont-equipment"));
  activationButton(document.querySelector("#btn-equipment"));  
});

contractButtonModernization.addEventListener('click', () => {
  contantSelectionContrakt(document.querySelector("#cont-modernization"));
  activationButton(document.querySelector("#btn-modernization"));  
});

contractButtonService.addEventListener('click', () => {
  contantSelectionContrakt(document.querySelector("#cont-service"));
  activationButton(document.querySelector("#btn-service"));  
});

contractButtonEducation.addEventListener('click', () => {
  contantSelectionContrakt(document.querySelector("#cont-education"));
  activationButton(document.querySelector("#btn-education")); 
});
  
function contantSelectionContrakt(btn) {
  let activeContant = document.querySelector('.video-contant > div.active');
  
  if(activeContant) {
    activeContant.classList.remove('active');
    btn.classList.add('active');
  };
};

function activationButton(x) {

  let activeButton = document.querySelector('.menu-button1 > div.active');
  let activeButton2 = document.querySelector('.menu-button2 > div.active');
  x.className = "men-but1 active";
  x.className = "men-but2 active";
  console.log(activeButton)
  if(activeButton) {
    activeButton.classList.remove('active');
    x.classList.add('active');
  };

  if(activeButton2) {
    activeButton2.classList.remove('active');
    x.classList.add('active');
  };
}