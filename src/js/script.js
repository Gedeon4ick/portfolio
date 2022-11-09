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
        console.log(anchor.href)

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
            console.log(sidepanel.childNodes);
            console.log(sidepanel.childNodes[0].childNodes[0].childNodes);

            sidepanel.childNodes[0].childNodes[0].childNodes[0].setAttribute("fill", "#000");
            sidepanel.childNodes[1].childNodes[0].childNodes[0].setAttribute("fill", "#000");
            sidepanel.childNodes[2].childNodes[0].childNodes[0].setAttribute("fill", "#000");
            sidepanel.childNodes[4].style.color = "black";
            sidepanel.childNodes[3].style.backgroundColor =  "black";
        });
    } else {
        hamSpan.forEach(element => {
            element.style.background = 'white';
            sidepanel.childNodes[0].childNodes[0].childNodes[0].setAttribute("fill", "white");
            sidepanel.childNodes[1].childNodes[0].childNodes[0].setAttribute("fill", "white");
            sidepanel.childNodes[2].childNodes[0].childNodes[0].setAttribute("fill", "white");
            sidepanel.childNodes[3].style.backgroundColor =  "white";
            sidepanel.childNodes[4].style.color =  "white";


        });

    }
});

$('form').submit(function(e) {
    e.preventDefault();
    
    // if(!$(this).valid()) {
    //     return;
    // }
    
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('form').trigger('reset');
    });
    return false;
});