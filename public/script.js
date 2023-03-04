const inputFields=document.querySelectorAll('input');
const editAbleInput=document.querySelectorAll('.allInput');
const updateBtn = document.querySelector('.updateButton');
const updateDiv = document.querySelector('.updateDiv');
const issueDate = document.querySelector('.issueDate');

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

if(updateDiv && window.location.pathname === '/'){
  updateDiv.classList.add('hidden');
}

if(updateBtn && window.location.pathname === '/update'){
  updateBtn.addEventListener('click',async e =>{
    e.preventDefault();
    editAbleInput.forEach(el=>{
      el.placeholder = el.value;
    });
    const date = new Date().toJSON().slice(0,10).split('-').reverse().join('.');
    issueDate.textContent = date;
    const html = document.documentElement.outerHTML;
    //console.log(html);
    const data = {
        html:html
    };
    const resp = await fetch('/submit',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    //const txt = await resp;
    //console.log(resp);
    if(resp.statusText==='OK'){
      alert('updated successfully');
    }
    window.location.reload();
  });
}

const removeFilterTeacher  = ()=>{
  editAbleInput.forEach(el=>{
    el.classList.remove('filter');
  });
}

const removeFilterYear = ()=>{
  const years = document.querySelectorAll('.year');
  years.forEach(el=>{
    el.classList.remove('filter');
  });
  editAbleInput.forEach(el=>{
    el.classList.remove('filter');
  });
}

const addFilterYear = year =>{
  const years = document.querySelectorAll('.year');
  years.forEach(el=>{
    if(el.id.startsWith(year)){
      el.classList.add('filter');
    }
  });
  editAbleInput.forEach(el=>{
    if(el.id.charAt(2)===year){
      el.classList.add('filter');
    }
  });
}

//window.onload = function () {
  const selectBox = document.getElementById("selectYear");
  selectBox.addEventListener('change', changeFunc);
  function changeFunc() {
    if(this.value == 0){
      removeFilterYear();
    }
    else if (this.value == 1) {
      removeFilterYear();
      addFilterYear('1');
    }
    else if (this.value == 2) {
      removeFilterYear();
      addFilterYear('2');
    }
    else if (this.value == 3) {
      removeFilterYear();
      addFilterYear('3');
    }
    else{
      removeFilterYear();
      addFilterYear('4');
    }
  }
  //}
