const humburger = document.querySelector('.humburger'),
    menu = document.querySelector('.menu'),
    close = document.querySelector('.menu__close');

humburger.addEventListener('click', () => {
    menu.classList.add('active');
});

close.addEventListener('click', () => {
    menu.classList.remove('active');
});
