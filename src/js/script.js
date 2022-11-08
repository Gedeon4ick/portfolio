const humburger = document.querySelector('.humburger'),
    menu = document.querySelector('.menu'),
    close = document.querySelector('.menu__close');

humburger.addEventListener('click', () => {
    menu.classList.add('active');
});

close.addEventListener('click', () => {
    menu.classList.remove('active');
});


const procents =  document.querySelectorAll('.tabl__wrapper_card-procent'),
    scales = document.querySelectorAll('.tabl__wrapper_card-scale span');

procents.forEach( (item, i) => {
    scales[i].style.width = item.innerHTML;
});