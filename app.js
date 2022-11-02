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
    inputName: document.querySelector('[data-inputid = "name"]')
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
    });

    this.myVariable.closeButton.addEventListener("click", () => {
      this.myVariable.callbackForm.classList.remove("active-feedback");
      this.myVariable.body.classList.remove("no-scroll");
      this.myVariable.callbackContentOrder.classList.remove("active-feedback");
    });

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
      }; 
    });

    this.myVariable.closeButton2.addEventListener("click", () => {
      this.myVariable.callbackForm.classList.remove("active-feedback");
      this.myVariable.body.classList.remove("no-scroll");
      this.myVariable.callbackContentOrder.classList.remove("active-feedback");
    });
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
        for(index in number) { 
          if(number[index] >= 0 || number[index] === "+") {
            this.myVariable.flagNumber = 0;
            this.myVariable.warningNumber.innerText = "";
          }
          else {
            this.myVariable.warningNumber.innerText = "В данном поле должны быть только цифры";
            this.myVariable.flagNumber = 1;
          };
        };
      };
    };
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
    };
  },
};

myCallbackForm.setEvents();
