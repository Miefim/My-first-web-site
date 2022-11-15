"use strict";

const myHeaderSlider = {

  headerButtonPrev: document.querySelector(".left"),
  headerButtonNext: document.querySelector(".right"),
  listBanners: document.querySelectorAll("#banner-top > div"),
  index: 0,

  init() {
    this.events();
  },

  events() {
    this.headerButtonNext.addEventListener('click', () => {
      this.index = (this.index + 1) % this.listBanners.length;
      this.updateSelection();
    });
    this.headerButtonPrev.addEventListener('click', () => {
      this.index = (this.index + this.listBanners.length - 1) % this.listBanners.length; 
      this.updateSelection();
    });
  },

  updateSelection() {
    const active = document.querySelector('#banner-top > div.active');
    if(active) {
      active.classList.remove('active');
      this.listBanners[this.index].classList.add('active');
    }
  }
}

myHeaderSlider.init();

const myContractAnimation = {

  init() {
    const contractButtonArray = document.querySelectorAll('.xz > div > .butt');
    const changeContentVar = this.changeContent.bind(this);    
    contractButtonArray.forEach((button) => button.addEventListener('click', changeContentVar));
  },
  
  changeContent() {
    const id = event.currentTarget.dataset.butid;
    const nowActiveContentBlock = document.querySelector(".video-contant > .active");
    if(nowActiveContentBlock.dataset.contid !== id) {
      nowActiveContentBlock.classList.remove('active');
      document.querySelector('.xz > div > .active').classList.remove('active');
      document.querySelector(`[data-butid="${id}"]`).classList.add('active');
      document.querySelector(`[data-contid="${id}"]`).classList.add('active');
    }
  }
}

myContractAnimation.init();

const myProjectSlider = {
  
  indexProject: 0,
  tapeTransformation: 0,
  mouseDown: 0,
  galleryTape: document.querySelector('.gallery'),
  imageArray: document.querySelectorAll('.gal'),
  imageWidth: document.querySelector('.gal').clientWidth,
  move: null,

  init() {
    this.move = this.swipeMove.bind(this);
    this.events();
  },

  events() {
    const start = this.swipeStart.bind(this);
    const end = this.swipeEnd.bind(this);
    this.galleryTape.addEventListener('mousedown', start);  
    this.galleryTape.addEventListener('mouseup', end);
  },

  switchLeft() {
    if(this.indexProject !== 0) {
      this.indexProject--;
    }
    this.tapeTransformation = this.indexProject * this.imageWidth;
    this.galleryTape.style.transform = `translate3d(-${this.tapeTransformation}px, 0px, 0px)`;
  },

  switchRight() {
    if(this.indexProject !== this.imageArray.length - 1) {
      this.indexProject++;
     }
     this.tapeTransformation = this.indexProject * this.imageWidth;
     this.galleryTape.style.transform = `translate3d(-${this.tapeTransformation}px, 0px, 0px)`;
  },

  swipeStart() {
    this.mouseDown = event.clientX;
    this.galleryTape.addEventListener('mousemove', this.move);
  },

  swipeMove() {
    this.galleryTape.style.transition = 'none';
    this.swipeShift = this.mouseDown - event.clientX;
    if(this.indexProject === this.imageArray.length - 1) {
      if(this.swipeShift > 0) {
        this.swipeShift = Math.log(this.swipeShift);
      }
    }
    else if(this.indexProject === 0) {
      if(this.swipeShift < 0) {
        this.swipeShift = -Math.log(Math.abs(this.swipeShift));
      } 
    }
    this.galleryTape.style.transform = `translate3d(${-this.tapeTransformation - this.swipeShift}px, 0px, 0px)`;
  },

  swipeEnd() {
    let swipeLength = 0;
    this.galleryTape.removeEventListener('mousemove', this.move);
    this.galleryTape.style.transition = '0.3s'; 
    swipeLength = this.mouseDown - event.clientX;
    if(swipeLength > 0) {
      this.switchRight();       
    }
    else if (swipeLength < 0) { 
      this.switchLeft();    
    } 
  },
}

myProjectSlider.init();

const myCompetencyAnimation = {

  init() {
    const eventVar = this.events.bind(this);
    const competencyButtonArray = document.querySelectorAll('.comp-button');
    competencyButtonArray.forEach(eventVar);
  },
 
  events(button) {
    const changeContentVar = this.changeContent.bind(this);
    button.addEventListener('mousemove', changeContentVar);
  },

  changeContent() {
    const id = event.currentTarget.dataset.butId;
    if(document.querySelector('.comp-button1 > .active').dataset.contId !== id) {
      document.querySelector('.comp-button1 > .active').classList.remove('active');
      document.querySelector(`[data-cont-id="${id}"]`).classList.add('active');
    }
  }
}

myCompetencyAnimation.init();

const myBlogSlider = {

  widthBlog: null,
  numberPicturesScreen: null,
  indexBlog: 0,
  transf: 0,
   
  async init() {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?albumId=1');
    const result = await response.json();
    this.resultProcessing(result);
    this.widthBlog = document.querySelector(".blog-contant-body-unit").clientWidth;
    this.numberPicturesScreen = Math.trunc(window.innerWidth/this.widthBlog);
    this.events();
  },

  resultProcessing(result) {
    const blogUnit = document.querySelector("#unit");
    let clone;
    let key;
    for(key in result) {
      clone = blogUnit.cloneNode(true);
      document.querySelector(".blog-contant-body").append(clone);
      document.querySelector("#unit").dataset.id = `${result[key].id}`;
      document.querySelector("#unit").id = "";
      document.querySelector(`[data-id="${result[key].id}"] > div > .blog-imag-desc`).innerText = `${result[key].title}`;
      document.querySelector(`[data-id="${result[key].id}"] > .blog-but`).innerText = `${result[key].id}`;
      document.querySelector(`[data-id="${result[key].id}"] > div > img`).src = `${result[key].url}`;
      document.querySelector(`[data-id="${result[key].id}"]`).classList.remove("no-display");
    }
  },

  events() {
    const buttonBlogRight = document.querySelector(".blog-contant-header-buttons-right");
    const buttonBlogLeft = document.querySelector(".blog-contant-header-buttons-left");
    const indexUpVar = this.indexUp.bind(this);
    const indexDownVar = this.indexDown.bind(this);
    buttonBlogRight.addEventListener('click', indexUpVar);
    buttonBlogLeft.addEventListener('click', indexDownVar);
  },

  indexUp() {
    const arrayBlog = document.querySelectorAll('.blog-contant-body > div');
    const maxIndexBlog = (arrayBlog.length - this.numberPicturesScreen)/this.numberPicturesScreen;
    if(this.indexBlog < maxIndexBlog) {
      this.indexBlog++;
    }
    if (this.indexBlog > maxIndexBlog) {
      this.indexBlog = maxIndexBlog;
    }
      this.moveBlogRight(this.indexBlog);
  },

  indexDown() {
    if(this.indexBlog > 0) {
      this.indexBlog--;
    }
    if(this.indexBlog < 0) {
      this.indexBlog = 0;
    }
      this.moveBlogLeft(this.indexBlog);
  },

  moveBlogRight(indexBlog) {
    this.transf = indexBlog * (this.widthBlog * this.numberPicturesScreen);
    document.querySelector(".blog-contant-body").style.transform = `translate3d(-${this.transf}px, 0px, 0px)`;
  },

  moveBlogLeft(indexBlog) {
    this.transf = indexBlog * (this.widthBlog * this.numberPicturesScreen);
    document.querySelector(".blog-contant-body").style.transform = `translate3d(-${this.transf}px, 0px, 0px)`;
  }
}

myBlogSlider.init();

const myFeedbackForm = {

  flagNumber: 1,
  flagName: 1,
  warningNumber: document.querySelector('.warning-number'),
  warningName: document.querySelector('.warning-name'),
  callbackForm: document.querySelector(".feedback-form"),
  callbackContentInput: document.querySelector(".form-feedback-content"),
  callbackContentOrder: document.querySelector(".ok"),
  body: document.querySelector("body"),
  inputNumber: document.querySelector('[data-inputid = "number"]'),
  inputName: document.querySelector('[data-inputid = "name"]'),

  init() {
    this.events();
  },

  events() {
    const callbackButton = document.querySelector(".button-item");
    const closeButton = document.querySelector(".button-close");
    const orderButton = document.querySelector(".order-text");
    const closeButton2 = document.querySelector(".close-button");
    const openFeedbackFormVar = this.openFeedbackForm.bind(this);
    const orderVar = this.order.bind(this);
    const closeFeedbackFormVar = this.closeFeedbackForm.bind(this);
    const closeFeedbackFormVar2 = this.closeFeedbackForm2.bind(this);
    this.inputNumber.oninput = () => {
      this.numberCheck(this.inputNumber.value.replace(/\s+/g, ''));
    }
    this.inputName.oninput = () => {
      this.nameCheck(this.inputName.value.replace(/[^a-zа-яё]/gi, ''));
    }
    callbackButton.addEventListener("click", openFeedbackFormVar);
    closeButton.addEventListener("click", closeFeedbackFormVar);
    orderButton.addEventListener("click", orderVar);
    closeButton2.addEventListener("click", closeFeedbackFormVar2);
  },

  openFeedbackForm() {
    this.flagNumber = 1;
    this.flagName = 1;
    this.warningNumber.innerText = "";
    this.warningName.innerText = "";
    this.inputNumber.value = "";
    this.inputName.value = "";
    this.callbackForm.classList.add("active-feedback");
    this.callbackContentInput.classList.add("active-feedback");
    this.body.classList.add("no-scroll");
  },

  order() {
    if(this.flagNumber === 0 && this.flagName === 0) {
      this.callbackContentInput.classList.remove("active-feedback");
      this.callbackContentOrder.classList.add("active-feedback");
      alert(`
      Ваше имя: ${this.inputName.value.replace(/[^a-zа-яё]/gi, '')}
      Ваш телефон : ${this.inputNumber.value.replace(/\s+/g, '')}`);
    }
    else if (!this.inputNumber.value && !this.inputName.value) {
      this.warningNumber.innerText = "Введите номер";
      this.warningName.innerText = "Введите свое имя";
    } 
    else if (!this.inputNumber.value) {
      this.warningNumber.innerText = "Введите номер";
    } 
    else if (!this.inputName.value) {
      this.warningName.innerText = "Введите свое имя";
    }
  },

  closeFeedbackForm() {
    this.callbackForm.classList.remove("active-feedback");
    this.body.classList.remove("no-scroll");
    this.callbackContentOrder.classList.remove("active-feedback");
  },

  closeFeedbackForm2() {
    this.callbackForm.classList.remove("active-feedback");
    this.body.classList.remove("no-scroll");
    this.callbackContentOrder.classList.remove("active-feedback");
  },

  numberCheck(number) {
    let index
    if(!number) {
      this.warningNumber.innerText = "Введите номер";
      this.flagNumber = 1;
    }
    else{
      if(number.length < 11) {
        this.warningNumber.innerText = "Номер должен быть длиннее";
        this.flagNumber = 1;
      }
      else if (number.length > 13) {
        this.warningNumber.innerText = "Слишком длинный номер";
        this.flagNumber = 1;
      }
      else {
        for(index in number) { 
          if(number[index] >= 0 || number[index] === "+") {
            this.flagNumber = 0;
            this.warningNumber.innerText = "";
          }
          else {
            this.warningNumber.innerText = "В данном поле должны быть только цифры";
            this.flagNumber = 1;
          }
        }
      }
    }
  },
  
  nameCheck(name) {
    if(!name && this.inputName.value) {
      this.warningName.innerText = "В данном поле должны быть только буквы";
      this.flagName = 1;
    }
    else if (!name) {
      this.warningName.innerText = "Введите свое имя";
      this.flagName = 1;
    }
    else if (name.length < 2) {
      this.warningName.innerText = "Имя слишком короткое";
      this.flagName = 1;
    }
    else {
      this.flagName = 0;
      this.warningName.innerText = "";
    }
  },
}

myFeedbackForm.init();