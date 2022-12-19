document.addEventListener("DOMContentLoaded", () => {
    if (document.documentElement.offsetWidth < 700) {
        onMinimize();
    }
  });

function onInit() {
    window.addEventListener(
        "resize",
        removeNodes
    )

}

function btnSearchHandler() {
    let f = document.querySelector('#field-search');
    let btn = document.querySelector('#btn-search');
    let img = document.querySelector('#btnIcon');
    let btn2 = createCancelBtn();

    f.classList.remove('hidden');
    f.classList.add('white');
    f.style.width = '350px';
    f.style.height = '50px';

    btn.remove();
    document.querySelector('#formSearch-c').prepend(btn2);
}

function createCancelBtn() {
    let div = document.createElement('div');
    let btn = document.createElement('button');
    btn.addEventListener('click', hideSearch)
    div.className = 'btnArrow btnArrow-l';
    btn.classList.add('btnSquare', 'white');
    btn.style.border = 'none';
    btn.id = 'btn-search';
    btn.appendChild(div);
    return btn;
}

function createSearchBtn() {
    let img = document.createElement('img');
    let button = document.createElement('button');
    img.id = 'btnIcon';
    img.src = 'https://img.icons8.com/external-inkubators-basic-outline-inkubators/64/null/external-search-dashboard-ui-inkubators-basic-outline-inkubators.png';
    button.appendChild(img)
    if (document.documentElement.offsetWidth < 700) {
        button.className = 'btnSearch btnRound';
    } else button.className = 'btnSearch btnSquare';

    button.id = 'btn-search';
    button.style.border = 'none';
    button.appendChild(img);
    return button;
}

function hideSearch() {
    let arrow = document.querySelector('div.btnArrow.btnArrow-l');
    let btn = document.querySelector('#btn-search');
    let btn2 = createSearchBtn();

    btn.remove();

    document.querySelector('#field-search').classList.add('hidden');
    document.querySelector('#formSearch-c').prepend(btn2);
    document.querySelector('#btn-search').addEventListener('click', btnSearchHandler)
}

function onMinimize() {
    let btn = document.querySelector('#btn-search');
    document.querySelector('#field-search').classList.add('hidden');
    btn.classList.replace('btnSquare', 'btnRound');
    btn.addEventListener('click', btnSearchHandler);
    document.forms[0].id = 'formSearch-c';
}

function onMaximize() {
    let f = document.querySelector('#field-search')
    let btn = createSearchBtn();
    let form = document.forms[0];
    form.id = 'formSearch';
    f.classList.remove('white');
    document.querySelector('#btn-search').remove();
    form.prepend(btn);
    f.style.width = '400px';
    f.style.height = 'auto';
    f.classList.remove('hidden');
}

function removeNodes() {
    let docWidth = document.documentElement.offsetWidth;
    if (docWidth < 700) {
        if (document.forms[0].id === 'formSearch-c') {
            onMaximize();
        }
        onMinimize();
    }

    if (docWidth > 700 && document.forms[0].id === 'formSearch-c') {
        onMaximize();
    }

}