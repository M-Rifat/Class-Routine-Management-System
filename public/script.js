const inputFields = document.querySelectorAll('input');
const editAbleInput = document.querySelectorAll('.allInput');
const updateBtn = document.querySelector('.updateButton');
const updateDiv = document.querySelector('.updateDiv');
const issueDate = document.querySelector('.issueDate');

if (inputFields) {
  inputFields.forEach(el => {
    el.disabled = true;
  });
}

if (editAbleInput) {
  editAbleInput.forEach(el => {
    el.value = el.placeholder;
    el.placeholder = '';
  });
}

if (editAbleInput && window.location.pathname === '/update') {
  editAbleInput.forEach(el => {
    el.disabled = false;
  });
}

if (updateDiv && window.location.pathname === '/') {
  updateDiv.classList.add('hidden');
}

if (updateBtn && window.location.pathname === '/update') {
  updateBtn.addEventListener('click', async e => {
    e.preventDefault();
    editAbleInput.forEach(el => {
      el.placeholder = el.value;
    });
    const date = new Date().toJSON().slice(0, 10).split('-').reverse().join('.');
    issueDate.textContent = date;
    const html = document.documentElement.outerHTML;
    //console.log(html);
    const data = {
      html: html
    };
    const resp = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    //const txt = await resp;
    //console.log(resp);
    if (resp.statusText === 'OK') {
      alert('updated successfully');
    }
    window.location.reload();
  });
}

const removeFilterTeacher = () => {
  editAbleInput.forEach(el => {
    el.classList.remove('filter');
  });
}

const removeFilterYear = () => {
  const years = document.querySelectorAll('.year');
  years.forEach(el => {
    el.classList.remove('filter');
  });
  editAbleInput.forEach(el => {
    el.classList.remove('filter');
  });
}

const addFilterYear = year => {
  const years = document.querySelectorAll('.year');
  years.forEach(el => {
    if (el.id.startsWith(year)) {
      el.classList.add('filter');
    }
  });
  editAbleInput.forEach(el => {
    if (el.id.charAt(2) === year) {
      el.classList.add('filter');
    }
  });
}

const selectBox = document.getElementById("selectYear");
selectBox.addEventListener('change', ele => {
  removeFilterYear();
  addFilterYear(ele.target.value);
});

const teacherSelectBox = document.querySelector('#selectTeacher');
let cnt = 0;
if (teacherSelectBox) {
  teacherSelectBox.addEventListener('change', ele => {
    removeFilterTeacher();
    removeFilterYear();
    console.log(ele.target.value);
    editAbleInput.forEach(elem => {
      //console.log(elem.,cnt++);
      if (elem.value.includes(ele.target.value)) {
        elem.classList.add('filter');
      }
    });
  });
}


//download as pdf

window.jsPDF = window.jspdf.jsPDF;
var docPDF = new jsPDF();
const btn=document.querySelector(".headDown img");
btn.onclick=function(){
var elementHTML = document.querySelector("body");
docPDF.html(elementHTML, {
 callback: function(docPDF) {
  docPDF.save('Routine.pdf');
 },
 x: 0,
 y: 0,
 width: 170,
 windowWidth: 1380
});
}