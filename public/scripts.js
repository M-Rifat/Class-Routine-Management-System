const text = document.querySelector('#text');
const btn = document.querySelector('#btn');
const whole = document.querySelector('.whole');
const allI = document.querySelectorAll('.allIn');


allI.forEach(e=>{
    e.value = e.placeholder;
});


btn.addEventListener('click',async (e)=>{
    e.preventDefault();
    text.placeholder = text.value;
    const html = document.documentElement.outerHTML;
    //console.log(html);
    const data = {
        html:html
    }
    const resp = await fetch('/submit',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    const txt = await resp;
    console.log(txt,'updated');
    console.log(window.location.href.endsWith('/'));
});
 
