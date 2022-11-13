"use strict";

const myHeaderSlider = {

  headerButtonPrev: null,
  headerButtonNext: null,
  listBanners: null,
  index: null,
  active: null,

  init() {
    this.headerButtonPrev = document.querySelector(".left");
    this.headerButtonNext = document.querySelector(".right");
    this.listBanners = document.querySelectorAll("#banner-top > div");
    this.index = 0;
    this.myEvent();
  },

  myEvent() {
    this.headerButtonNext.addEventListener('click', () => {
      this.index = (this.index + 1) % this.listBanners.length;
      this.updateSelection();
    })
    this.headerButtonPrev.addEventListener('click', () => {
      this.index = (this.index + this.listBanners.length - 1) % this.listBanners.length; 
      this.updateSelection();
    }) 
  },

  updateSelection() {
    this.active = document.querySelector('#banner-top > div.active');
    if(this.active) {
      this.active.classList.remove('active');
      this.listBanners[this.index].classList.add('active');
    }
  }
}

myHeaderSlider.init();

const myContractAnimation = {

  contractButtonArray: null,
  changeContentVar: null,
  id: null,
  nowActiveContentBlock: null,

  init() {
    this.contractButtonArray = document.querySelectorAll('.xz > div > .butt');
    this.changeContentVar = this.changeContent.bind(this)    
    this.contractButtonArray.forEach((button) => button.addEventListener('click', this.changeContentVar))
  },
  
  changeContent() {
    this.id = event.currentTarget.dataset.butid;
    this.nowActiveContentBlock = document.querySelector(".video-contant > .active");
    if(this.nowActiveContentBlock.dataset.contid !== this.id) {
      this.nowActiveContentBlock.classList.remove('active');
      document.querySelector('.xz > div > .active').classList.remove('active');
      document.querySelector(`[data-butid="${this.id}"]`).classList.add('active');
      document.querySelector(`[data-contid="${this.id}"]`).classList.add('active');
    }
  }
}

myContractAnimation.init();

const myProjectSlider = {
  
  indexProject: 0,
  tapeTransformation: 0,
  mouseDown: 0,
  swipeLength: 0,
  galleryTape: document.querySelector('.gallery'),
  imageArray: document.querySelectorAll('.gal'),
  imageWidth: document.querySelector('.gal').clientWidth,
  start: null,
  move: null,
  end: null,

  myEvent () {
    this.start = this.swipeStart.bind(this)
    this.move = this.swipeMove.bind(this)
    this.end = this.swipeEnd.bind(this)
    this.galleryTape.addEventListener('mousedown', this.start)  
    this.galleryTape.addEventListener('mouseup', this.end)
  },

  switchLeft () {
    if(this.indexProject !== 0) {
      this.indexProject--
    }
    this.tapeTransformation = this.indexProject * this.imageWidth
    this.galleryTape.style.transform = `translate3d(-${this.tapeTransformation}px, 0px, 0px)`
  },

  switchRight () {
    if(this.indexProject !== this.imageArray.length - 1) {
      this.indexProject++
     }
     this.tapeTransformation = this.indexProject * this.imageWidth
     this.galleryTape.style.transform = `translate3d(-${this.tapeTransformation}px, 0px, 0px)`
  },

  swipeStart () {
    this.mouseDown = event.clientX
    this.galleryTape.addEventListener('mousemove', this.move)
  },

  swipeMove () {
    this.galleryTape.style.transition = 'none'
    this.swipeShift = this.mouseDown - event.clientX  
    if(this.indexProject === this.imageArray.length - 1) {
      if(this.swipeShift > 0) {
        this.swipeShift = Math.log(this.swipeShift)
      }
    }
    else if(this.indexProject === 0) {
      if(this.swipeShift < 0) {
        this.swipeShift = -Math.log(Math.abs(this.swipeShift))
      } 
    }
    this.galleryTape.style.transform = `translate3d(${-this.tapeTransformation - this.swipeShift}px, 0px, 0px)`
  },

  swipeEnd () {
    this.galleryTape.removeEventListener('mousemove', this.move)
    this.galleryTape.style.transition = '0.3s' 
    this.swipeLength = this.mouseDown - event.clientX
    if(this.swipeLength > 0) {
      this.switchRight()       
    }
    else if (this.swipeLength < 0) { 
      this.switchLeft()
    } 
  },
}

myProjectSlider.myEvent();

const myCompetencyAnimation = {

  competencyButtonArray: null,
  myEventVar: null,
  changeContentVar: null,
  id: null,

  init() {
    this.changeContentVar = this.changeContent.bind(this);
    this.myEventVar = this.myEvent.bind(this);
    this.competencyButtonArray = document.querySelectorAll('.comp-button');
    this.competencyButtonArray.forEach(this.myEventVar);
  },
 
  myEvent(button) {
    button.addEventListener('mousemove', this.changeContentVar);
  },

  changeContent() {
    this.id = event.currentTarget.dataset.butId;
    if(document.querySelector('.comp-button1 > .active').dataset.contId !== this.id) {
      document.querySelector('.comp-button1 > .active').classList.remove('active');
      document.querySelector(`[data-cont-id="${this.id}"]`).classList.add('active');
    }
  }
}

myCompetencyAnimation.init();

const myBlogSlider = {

  response: null,
  result: null,
  buttonBlogRight: null,
  buttonBlogLeft: null,
  widthBlog: null,
  arrayBlog: null,
  numberPicturesScreen: null,
  indexBlog: null,
  transf: null,
  maxIndexBlog: null,
  indexUpVar: null,
  indexDownVar: null,
  blogUnit: null,
  clone: null,
  key: null,
   
  async init() {
    this.response = await fetch('https://jsonplaceholder.typicode.com/photos?albumId=1');
    this.result = await this.response.json();
    this.resultProcessing(this.result);
    this.buttonBlogRight = document.querySelector(".blog-contant-header-buttons-right");
    this.buttonBlogLeft = document.querySelector(".blog-contant-header-buttons-left");
    this.widthBlog = document.querySelector(".blog-contant-body-unit").clientWidth;
    this.arrayBlog = document.querySelectorAll('.blog-contant-body > div');
    this.numberPicturesScreen = Math.trunc(window.innerWidth/this.widthBlog);
    this.indexBlog = 0;
    this.transf = 0;
    this.maxIndexBlog = (this.arrayBlog.length - this.numberPicturesScreen)/this.numberPicturesScreen;
    this.indexUpVar = this.indexUp.bind(this);
    this.indexDownVar = this.indexDown.bind(this);
    this.myEvent();
  },

  resultProcessing(result) {
    this.blogUnit = document.querySelector("#unit");
    for(this.key in result) {
      this.clone = this.blogUnit.cloneNode(true);
      document.querySelector(".blog-contant-body").append(this.clone);
      document.querySelector("#unit").dataset.id = `${result[this.key].id}`;
      document.querySelector("#unit").id = "";
      document.querySelector(`[data-id="${result[this.key].id}"] > div > .blog-imag-desc`).innerText = `${result[this.key].title}`;
      document.querySelector(`[data-id="${result[this.key].id}"] > .blog-but`).innerText = `${result[this.key].id}`;
      document.querySelector(`[data-id="${result[this.key].id}"] > div > img`).src = `${result[this.key].url}`;
      document.querySelector(`[data-id="${result[this.key].id}"]`).classList.remove("no-display");
    }
  },

  myEvent() {
    this.buttonBlogRight.addEventListener('click', this.indexUpVar);
    this.buttonBlogLeft.addEventListener('click', this.indexDownVar);
  },

  indexUp() {
    if(this.indexBlog < this.maxIndexBlog) {
      this.indexBlog++;
    }
    if (this.indexBlog > this.maxIndexBlog) {
      this.indexBlog = this.maxIndexBlog;
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

  myVariable: {
    flagNumber: 1,
    flagName: 1,
    callbackButton: document.querySelector(".button-item"),
    closeButton: document.querySelector(".button-close"),
    orderButton: document.querySelector(".order-text"),
    closeButton2: document.querySelector(".close-button"),
    warningNumber: document.querySelector('.warning-number'),
    warningName: document.querySelector('.warning-name'),
    callbackForm: document.querySelector(".feedback-form"),
    callbackContentInput: document.querySelector(".form-feedback-content"),
    callbackContentOrder: document.querySelector(".ok"),
    body: document.querySelector("body"),
    inputNumber: document.querySelector('[data-inputid = "number"]'),
    inputName: document.querySelector('[data-inputid = "name"]'),
    index: null
  },

  setEvents () {
    this.myVariable.inputNumber.oninput = () => {
      this.numberCheck(this.myVariable.inputNumber.value.replace(/\s+/g, ''))
    }

    this.myVariable.inputName.oninput = () => {
      this.nameCheck(this.myVariable.inputName.value.replace(/[^a-zа-яё]/gi, ''))
    }

    this.myVariable.callbackButton.addEventListener("click", () => {
      this.myVariable.flagNumber = 1;
      this.myVariable.flagName = 1;
      this.myVariable.warningNumber.innerText = "";
      this.myVariable.warningName.innerText = "";
      this.myVariable.inputNumber.value = "";
      this.myVariable.inputName.value = "";
      this.myVariable.callbackForm.classList.add("active-feedback");
      this.myVariable.callbackContentInput.classList.add("active-feedback");
      this.myVariable.body.classList.add("no-scroll");
    })

    this.myVariable.closeButton.addEventListener("click", () => {
      this.myVariable.callbackForm.classList.remove("active-feedback");
      this.myVariable.body.classList.remove("no-scroll");
      this.myVariable.callbackContentOrder.classList.remove("active-feedback");
    })

    this.myVariable.orderButton.addEventListener("click", () => {     
      if(this.myVariable.flagNumber === 0 && this.myVariable.flagName === 0) {
        this.myVariable.callbackContentInput.classList.remove("active-feedback");
        this.myVariable.callbackContentOrder.classList.add("active-feedback");
        alert(`
        Ваше имя: ${this.myVariable.inputName.value.replace(/[^a-zа-яё]/gi, '')}
        Ваш телефон : ${this.myVariable.inputNumber.value.replace(/\s+/g, '')}`);
      }
      else if (!this.myVariable.inputNumber.value && !this.myVariable.inputName.value) {
        this.myVariable.warningNumber.innerText = "Введите номер";
        this.myVariable.warningName.innerText = "Введите свое имя";
      } 
      else if (!this.myVariable.inputNumber.value) {
        this.myVariable.warningNumber.innerText = "Введите номер";
      } 
      else if (!this.myVariable.inputName.value) {
        this.myVariable.warningName.innerText = "Введите свое имя";
      }
    })

    this.myVariable.closeButton2.addEventListener("click", () => {
      this.myVariable.callbackForm.classList.remove("active-feedback");
      this.myVariable.body.classList.remove("no-scroll");
      this.myVariable.callbackContentOrder.classList.remove("active-feedback");
    })
  },

  numberCheck (number) {
    if(!number) {
      this.myVariable.warningNumber.innerText = "Введите номер";
      this.myVariable.flagNumber = 1;
    }
    else{
      if(number.length < 11) {
        this.myVariable.warningNumber.innerText = "Номер должен быть длиннее";
        this.myVariable.flagNumber = 1;
      }
      else if (number.length > 13) {
        this.myVariable.warningNumber.innerText = "Слишком длинный номер";
        this.myVariable.flagNumber = 1;
      }
      else {
        for(this.myVariable.index in number) { 
          if(number[this.myVariable.index] >= 0 || number[this.myVariable.index] === "+") {
            this.myVariable.flagNumber = 0;
            this.myVariable.warningNumber.innerText = "";
          }
          else {
            this.myVariable.warningNumber.innerText = "В данном поле должны быть только цифры";
            this.myVariable.flagNumber = 1;
          }
        }
      }
    }
  },
  
  nameCheck (name) {
    if(!name && this.myVariable.inputName.value) {
      this.myVariable.warningName.innerText = "В данном поле должны быть только буквы";
      this.myVariable.flagName = 1;
    }
    else if (!name) {
      this.myVariable.warningName.innerText = "Введите свое имя";
      this.myVariable.flagName = 1;
    }
    else if (name.length < 2) {
      this.myVariable.warningName.innerText = "Имя слишком короткое";
      this.myVariable.flagName = 1;
    }
    else {
      this.myVariable.flagName = 0;
      this.myVariable.warningName.innerText = "";
    }
  },
}

myFeedbackForm.setEvents();