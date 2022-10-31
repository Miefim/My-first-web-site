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

const contractButtonArray = document.querySelectorAll('.xz > div > .butt');
contractButtonArray.forEach((button) => button.addEventListener('click', (e) => {
  const idContract = e.currentTarget.dataset.butid;
  const nowActiveContentBlock = document.querySelector(".video-contant > .active")
    if(nowActiveContentBlock.dataset.contid !== idContract) {
      nowActiveContentBlock.classList.remove('active');
      document.querySelector('.xz > div > .active').classList.remove('active');
      document.querySelector(`[data-butid="${idContract}"]`).classList.add('active');
      document.querySelector(`[data-contid="${idContract}"]`).classList.add('active');
    };
}));