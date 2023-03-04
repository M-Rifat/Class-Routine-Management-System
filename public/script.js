const inputFields=document.querySelectorAll('input');
const editAbleInput=document.querySelectorAll('.allInput');

if(inputFields){
  inputFields.forEach(el=>{
    el.disabled = true;
  });
}

if(editAbleInput){
  editAbleInput.forEach(el=>{
    el.value = el.placeholder;
    el.placeholder = '';
  });
}

if(editAbleInput && window.location.pathname === '/update'){
  editAbleInput.forEach(el=>{
    el.disabled = false;
  });
}


window.onload = function () {
    var selectBox = document.getElementById("selectYear");
    selectBox.addEventListener('change', changeFunc);
    function changeFunc() {
      if (this.value == 2) {
        let two = document.getElementById('2nd');
        two.classList.add("filter");
      }
    }
  }