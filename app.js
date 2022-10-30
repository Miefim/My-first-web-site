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

const competencyButtonArray = document.querySelectorAll('.comp-button');
competencyButtonArray.forEach((button) => button.addEventListener('mousemove', (e) => {
  const id = e.currentTarget.dataset.butId;
   if(document.querySelector('.comp-button1 > .active').dataset.contId !== id) {
    document.querySelector('.comp-button1 > .active').classList.remove('active');
    document.querySelector(`[data-cont-id="${id}"]`).classList.add('active');
   };
}));