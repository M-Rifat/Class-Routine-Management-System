var dis=document.querySelectorAll('input');
var ena=document.querySelectorAll('.time1')

// dis.forEach(element => {
//     element.disabled = true;
// });
ena.forEach(element => {
    element.disabled = false;
});


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