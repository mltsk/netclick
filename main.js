const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger');


hamburger.addEventListener('click', ()=>{
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.addEventListener('click', e=> {
    if(!e.target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    };
});

leftMenu.addEventListener('click', e => {
    const target = e.target,
        dropDown = target.closest('.dropdown');

        if (dropDown) {
            dropDown.classList.toggle('active');
            leftMenu.classList.add('openMenu');
            hamburger.classList.add('open');

        };
});


//Смена картинок

let tvShowsImg = document.querySelectorAll('.tv-card__img');
    
tvShowsImg.forEach(img => {

    img.addEventListener('mouseover', (event)=> {
        let src = img.src;
        img.src = img.dataset.backdrop;
        img.dataset.backdrop = src;
    });
    
    img.addEventListener('mouseleave', (event)=> { 
        let src = img.dataset.backdrop;
        img.dataset.backdrop = img.src;
        img.src = src;
    });

});


