
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = '6088f2de5c542a50395251fb832c15d6';

const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    modal = document.querySelector('.modal'),
    tvShowsList = document.querySelector('.tv-shows__list'),
    tvShowsItem = document.querySelector('.tv-shows__item');



const DBService = class {
    getData = async (url) => {
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Не удалось получить данные 
            по адресу ${url}`)
        }
    }

    getTestData = () => {
        return this.getData('test.json');
    }
}

// рендер карточек

const renderCard = response => {
    console.log(response);
    tvShowsList.textContent = '';

    response.results.forEach(item => {
        
        const {
            backdrop_path: backdrop,
            name: title, 
            poster_path: poster, 
            vote_average: vote
            } = item;
            console.log(backdrop);
        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        const backdropIMG = poster ? IMG_URL + backdrop : '';
        const voteElem = vote != 0 ? `<span class="tv-card__vote">${vote}</span>` : '';    

        const card = document.createElement('li');
        card.classList.add('tv-shows__item');
        card.innerHTML = `
        <a href="#" class="tv-card">
            ${voteElem}
            <img class="tv-card__img"
                    src="${posterIMG}"
                    data-backdrop="${backdropIMG}"
                    alt="Звёздные войны: Повстанцы">
            <h4 class="tv-card__head">${title}</h4>
        </a>
        `;
        tvShowsList.append(card);
        console.log(card);
    });
};

new DBService().getTestData().then(renderCard);



//Открытие/закрытие меню

hamburger.addEventListener('click', ()=>{
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

// закрытие меню вне .left-menu

document.addEventListener('click', e=> {
    if(!e.target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    };
});

//Выпадающий список в меню

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

const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    if(card) {
        const img = card.querySelector('.tv-card__img');
        if(img.dataset.backdrop){
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src]
        }
    }
};

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);


//открытие модального окна

tvShowsList.addEventListener('click', event => {
    event.preventDefault();

    const target = event.target;
    const card = target.closest('.tv-card')
    
    if (card) {
        document.body.style.overflow = "hidden"; 
        modal.classList.remove('hide');
    }
})

// закрытие модального окна

modal.addEventListener('click', event => {

    if(event.target.closest(".cross") || 
        event.target.classList.contains('modal')) {
        document.body.style.overflow = "";
        modal.classList.add('hide');
    }
});