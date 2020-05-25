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

let tvShows = document.querySelector('.tv-shows');
    
tvShows.addEventListener('mouseover', (event)=> {
    let target = event.target;
    let img = target.closest('img');

    if (img) { 
        let src = event.target.src;
        event.target.src = event.target.dataset.backdrop;
        event.target.dataset.backdrop = src;
    } else {
        let src = event.relatedTarget.dataset.backdrop;
        event.relatedTarget.dataset.backdrop = event.relatedTarget.src;
        event.relatedTarget.src = src;
    }
    
});