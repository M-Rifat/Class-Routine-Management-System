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
