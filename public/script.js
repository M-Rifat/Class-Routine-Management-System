const inputFields = document.querySelectorAll('input');
const editAbleInput = document.querySelectorAll('.allInput');
const updateBtn = document.querySelector('.updateButton');
const updateDiv = document.querySelector('.updateDiv');
const issueDate = document.querySelector('.issueDate');
const loginBtn = document.querySelector('.login');
const selectBox = document.getElementById("selectYear");
const teacherSelectBox = document.querySelector('#selectTeacher');
const yearClass = document.querySelectorAll('.year');
const noOfClass = document.querySelector('.noOfClass');
const noOfClassP = document.querySelector('.noOfClassP');

if(noOfClassP) noOfClassP.classList.add('hidden');

if (inputFields && (window.location.pathname === '/' || window.location.pathname === '/update')) {
  inputFields.forEach(el => {
    el.disabled = true;
  });
}

if (editAbleInput) {
  editAbleInput.forEach(el => {
    el.value = el.placeholder;
    el.placeholder = '';

    //new code
    //console.log(el.id);
    el.style.color = 'white';
    if (el.id.charAt(2) == '1') {
      el.style.backgroundColor = '#716E6E';
    }
    else if (el.id.charAt(2) == '2') {
      el.style.backgroundColor = '#6563e5'
    } else if (el.id.charAt(2) == '3') {
      el.style.backgroundColor = '#ba2e43';
    } else {
      el.style.backgroundColor = '#5d1a24'
    }
  });
}

//new added
if (yearClass) {
  yearClass.forEach(el => {
    el.style.color = 'white';
    if (el.id.includes('1st')) {
      el.style.backgroundColor = '#716E6E';
    }
    else if (el.id.includes('2nd')) {
      el.style.backgroundColor = '#6563e5'
    } else if (el.id.includes('3rd')) {
      el.style.backgroundColor = '#ba2e43';
    } else {
      el.style.backgroundColor = '#5d1a24'
    }
  })
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
    el.style.backgroundColor = 'white';
    el.style.color = '#9A8F8F'
  });
  editAbleInput.forEach(el => {
    el.classList.remove('filter');
    el.style.backgroundColor = 'white';
    el.style.color = '#9A8F8F'
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

if (selectBox) {
  selectBox.addEventListener('change', ele => {
    teacherSelectBox.value = 'Teacher';
    removeFilterTeacher();
    removeFilterYear();
    addFilterYear(ele.target.value);
  });
}

if (teacherSelectBox) {
  teacherSelectBox.addEventListener('change', ele => {
    selectBox.value = '0';
    removeFilterYear();
    removeFilterTeacher();
    console.log(ele.target.value);
    let cnt = 0;
    editAbleInput.forEach(elem => {
      if (elem.value.includes(ele.target.value)) {
        elem.classList.add('filter');
        cnt++;
      }
    });
    noOfClass.textContent = cnt;
    noOfClassP.classList.remove('hidden');
  });
}

//download as pdf
const btn = document.querySelector(".headDown img");
if (btn) {
  window.jsPDF = window.jspdf.jsPDF;
  var docPDF = new jsPDF();
  btn.onclick = function () {
    var elementHTML = document.getElementById("full-content");
    docPDF.html(elementHTML, {
      callback: function (docPDF) {
        docPDF.save('Routine.pdf');
      },
      x: 20,
      y: 0,
      width: 170,
      windowWidth: screen.width
    });
  }
}

//loginButton

if (loginBtn) {
  loginBtn.addEventListener('click', el => {
    window.location.pathname = '/login';
  });
}

const loginSubmit = document.querySelector('#loginBTN');
if (loginSubmit) {
  loginSubmit.addEventListener('click', el => {
    el.preventDefault();
    const userId = document.querySelector('#userid');
    const password = document.querySelector('#password');
    if (userId.value === 'admin' && password.value === 'admin') {
      window.location.pathname = '/update';
    }
    else {
      window.location.pathname = '/';
    }
  });
}

// admin
if (window.location.pathname == '/update') {
  loginBtn.textContent = "Admin";
  loginBtn.disabled = true;
}


