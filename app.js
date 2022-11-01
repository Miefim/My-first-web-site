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

const myCallbackForm = {
  flagNumber: 0,
  flagName: 0,
  callbackButton: null, 
  closeButton: null,
  orderButton: null,
  closeButton2: null,

  init: () => {
    this.callbackButton = document.querySelector(".button-item");
    this.closeButton = document.querySelector(".button-close");
    this.orderButton = document.querySelector(".order-text");
    this.closeButton2 = document.querySelector(".close-button");

    callbackButton.addEventListener("click", () => {
        document.querySelector('.warning-number').innerText = "";
        document.querySelector('.warning-name').innerText = "";
        document.querySelector('[data-inputid = "number"]').value = "";
        document.querySelector('[data-inputid = "name"]').value = "";
        document.querySelector(".feedback-form").classList.add("active-feedback");
        document.querySelector(".form-feedback-content").classList.add("active-feedback");
        document.querySelector("body").classList.add("no-scroll");
    });

    closeButton.addEventListener("click", () => {
        document.querySelector(".feedback-form").classList.remove("active-feedback");
        document.querySelector("body").classList.remove("no-scroll");
        document.querySelector(".ok").classList.remove("active-feedback");
    });

    orderButton.addEventListener("click", () => {  
        myCallbackForm.numberCheck(document.querySelector('[data-inputid = "number"]').value.replace(/\s+/g, ''));
        myCallbackForm.nameCheck(document.querySelector('[data-inputid = "name"]').value.replace(/[^a-zа-яё]/gi, ''));
    
      if(flagNumber === 0 && flagName === 0) {
        document.querySelector(".form-feedback-content").classList.remove("active-feedback");
        document.querySelector(".ok").classList.add("active-feedback");
        alert(`
        Ваше имя: ${document.querySelector('[data-inputid = "name"]').value.replace(/[^a-zа-яё]/gi, '')}
        Ваш телефон : ${document.querySelector('[data-inputid = "number"]').value.replace(/\s+/g, '')}`);
      }
      else {
        return;
      }; 
    });

    closeButton2.addEventListener("click", () => {
        document.querySelector(".feedback-form").classList.remove("active-feedback");
        document.querySelector("body").classList.remove("no-scroll");
        document.querySelector(".ok").classList.remove("active-feedback");
    });
  },

  numberCheck: (number) => {
    if(!number) {
      document.querySelector('.warning-number').innerText = "Введите номер";
      flagNumber = 1;
    }
    else{
      if(number.length < 11) {
        document.querySelector('.warning-number').innerText = "Номер должен быть длиннее";
        flagNumber = 1;
      }
      else if (number.length > 13) {
        document.querySelector('.warning-number').innerText = "Слишком длинный номер";
        flagNumber = 1;
      }
      else {
        for(index in number) { 
          if(number[index] >= 0 || number[index] === "+") {
            flagNumber = 0;
            document.querySelector('.warning-number').innerText = "";
          }
          else {
            document.querySelector('.warning-number').innerText = "В данном поле должны быть только цифры";
            flagNumber = 1;
          };
        };
      };
    };
  },

  nameCheck: (name) => {
    if(!name && document.querySelector('[data-inputid = "name"]').value) {
      document.querySelector('.warning-name').innerText = "В данном поле должны быть только буквы";
      flagName = 1;
    }
    else if (!name) {
      document.querySelector('.warning-name').innerText = "Введите свое имя";
      flagName = 1;
    }
    else if (name.length < 2) {
      document.querySelector('.warning-name').innerText = "Имя слишком короткое";
      flagName = 1;
    }
    else {
      flagName = 0;
      document.querySelector('.warning-name').innerText = "";
    };
  }
};

myCallbackForm.init();