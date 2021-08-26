"use strict";

const obj = { 
  test: function(){
    (function(){
      console.log(this);
    })(); //немедленно вызываемая функция внутри другой функции
  }
}

console.log(`Test data`);
obj.test(); // мне говорят, что в консоль выведется obj. это неправда