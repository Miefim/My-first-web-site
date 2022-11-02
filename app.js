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

const buttonBlogRight = document.querySelector(".blog-contant-header-buttons-right");
const buttonBlogLeft = document.querySelector(".blog-contant-header-buttons-left");
const widthBlog = document.querySelector(".blog-contant-body-unit").clientWidth;
const arrayBlog = document.querySelectorAll('.blog-contant-body-unit');
const numberPicturesScreen = 3;
let indexBlog = 0;
const maxIndexBlog = (arrayBlog.length - numberPicturesScreen)/numberPicturesScreen;

buttonBlogRight.addEventListener('click',() => {
  if(indexBlog < maxIndexBlog) {
    indexBlog++
  };
  if (indexBlog > maxIndexBlog) {
    indexBlog = maxIndexBlog
  };
    moveBlogRight(indexBlog)
});

buttonBlogLeft.addEventListener('click',() => {
  if(indexBlog > 0) {
    indexBlog--
  };
  if(indexBlog < 0) {
    indexBlog = 0
  };
    moveBlogLeft(indexBlog);
});

function moveBlogRight(indexBlog) {
  let transf = indexBlog * (widthBlog * 3);
  document.querySelector(".blog-contant-body").style.transform = `translate3d(-${transf}px, 0px, 0px)`;
};

function moveBlogLeft(indexBlog) {
  let transf = indexBlog * (widthBlog * 3);
  document.querySelector(".blog-contant-body").style.transform = `translate3d(-${transf}px, 0px, 0px)`;
};

const competencyButtonArray = document.querySelectorAll('.comp-button');
competencyButtonArray.forEach((button) => button.addEventListener('mousemove', (e) => {
  const id = e.currentTarget.dataset.butId;
   if(document.querySelector('.comp-button1 > .active').dataset.contId !== id) {
    document.querySelector('.comp-button1 > .active').classList.remove('active');
    document.querySelector(`[data-cont-id="${id}"]`).classList.add('active');
   };
}));