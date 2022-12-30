const humburger = document.querySelector('.humburger')
const menu = document.querySelector('.menu')
const menuOverlay = document.querySelector('.menu__overlay')
const close = document.querySelector('.menu__close');
const promo = document.querySelector('.promo');
const sidepanel = document.querySelector('.sidepanel')


humburger.addEventListener('click', () => {
    menu.classList.add('active');
    document.body.style.overflowY = "hidden"
});

close.addEventListener('click', () => {
    closeMenu()
});

document.addEventListener('click', (e) => {
    if ((e.target) == menuOverlay) {
        closeMenu();
    }
});

const procents = document.querySelectorAll('.tabl__wrapper_card-procent'),
    scales = document.querySelectorAll('.tabl__wrapper_card-scale span');

procents.forEach((item, i) => {
    scales[i].style.width = item.innerHTML;
});

function closeMenu() {
    menu.classList.remove('active');
    document.body.style.overflowY = "auto"
}

// Работа с сылками
const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log(anchor.href)

        const blockID = anchor.getAttribute('href').substr(1)
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })

        closeMenu();
    })
});

document.addEventListener('scroll', function () {
    // let scrolling = document.scrollTop;
    const hamSpan = humburger.querySelectorAll('span');

    if (pageYOffset > promo.offsetHeight) {
        hamSpan.forEach(element => {
            element.style.background = 'black';
            // console.log(sidepanel.childNodes);
            // console.log(sidepanel.childNodes[0].childNodes[0].childNodes);

            sidepanel.childNodes[0].childNodes[0].childNodes[0].setAttribute("fill", "#000");
            sidepanel.childNodes[1].childNodes[0].childNodes[0].setAttribute("fill", "#000");
            sidepanel.childNodes[2].childNodes[0].childNodes[0].setAttribute("fill", "#000");
            sidepanel.childNodes[4].style.color = "black";
            sidepanel.childNodes[3].style.backgroundColor = "black";
        });
    } else {
        hamSpan.forEach(element => {
            element.style.background = 'white';
            sidepanel.childNodes[0].childNodes[0].childNodes[0].setAttribute("fill", "white");
            sidepanel.childNodes[1].childNodes[0].childNodes[0].setAttribute("fill", "white");
            sidepanel.childNodes[2].childNodes[0].childNodes[0].setAttribute("fill", "white");
            sidepanel.childNodes[3].style.backgroundColor = "white";
            sidepanel.childNodes[4].style.color = "white";


        });

    }
});

$('form').submit(function (e) {
    e.preventDefault();

    // if(!$(this).valid()) {
    //     return;
    // }

    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function () {
        $(this).find("input").val("");
        $('form').trigger('reset');
    });
    return false;
});

// slider
// родительский блок всего
const slider = document.querySelector('.offer');
// сами сладеры
const slides = document.querySelectorAll('.wrapperSl__slides_slide');
// главная обертка
const slidesWrapper = document.querySelector('.wrapperSl');
// поле с нашими слайдами
const slidesField = document.querySelector('.wrapperSl__slides');
const prev = document.querySelector('.offer__counter_prev');
const next = document.querySelector('.offer__counter_next');
// получение ширины окна через которые мы смотрим на слайды
const width = window.getComputedStyle(slidesWrapper).width;

// слайд индекс будет определять какой слайд
let slideIndex = 1;
// переменная которая будет говорить нам на сколько мы отступили в право и лево
let offset = 0;

slidesField.style.width = 100 * slides.length + '%';
slides.forEach(slide => {
    slide.style.width = width;
});




const indicators = document.createElement('ol');

const dots = [];
indicators.classList.add('carousel-indicators');

slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    // активное состояние dots
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}

function toNext() {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2);
    }

    if (slideIndex == slides.length) {
        // если долистали до 4 то переносим индекс до значения 1
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
}

next.addEventListener('click', () => {
    toNext()
});

function toPrev() {
    if (offset == 0) {
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
        offset -= +width.slice(0, width.length - 2);
    }

    if (slideIndex == 1) {
        // если долистали до 4 то переносим индекс до значения 1
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
}

prev.addEventListener('click', () => {
    toPrev()
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        offset = +width.slice(0, width.length - 2) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;

    });
});




const widthNumber = +width.slice(0, width.length - 2);

if (widthNumber > 720) {
    slidesField.addEventListener('mousedown', e => {
        const start = e.pageX;
        slidesField.onmousemove = function (e) {
            slidesField.onmouseup = function () {
                if (e.pageX < start) {
                    toNext()
                } else {
                    toPrev()
                }
                slidesField.onmousemove = null;
                slidesField.onmouseup = null;
            }

            slidesField.ondragstart = function () {
                return false;
            };
        }
    });
} else {
    slidesField.addEventListener('pointerdown', e => {
        const start = e.clientX;
        slidesField.onpointermove = function (e) {
            const end = e.clientX;
            if (end < start) {
                toNext();
            } else {
                toPrev();
            }
            slidesField.onpointerup = function () {
                slidesField.onpointermove = null;
                slidesField.onpointerup = null;
            }

            slidesField.ondragstart = function () {
                return false;
            };
        }
    });
}




$('.slick').slick({
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [{
        breakpoint: 800,
        settings: {
            slidesToShow: 1,
        }
    }, ]
});