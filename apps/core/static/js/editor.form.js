document.addEventListener(
    "DOMContentLoaded",
    () => _('#svgPlus').addEventListener(
        'click', addField)
    );

function _(s) {
    return document.querySelector(s);
}

function a(s) {
    return document.querySelectorAll(s);
}

function traverse(ch, ind) {
    let reg = RegExp(`form-(\\d){1}-`, 'g');


    while(ch !== null) {
        ch.innerHTML = ch.innerHTML.replaceAll(
            reg, `form-${ind}-`);
        ch = ch.nextElementSibling;
    }
}

function addAnswer(e) {
    if (e.target.value === 'Choice') {
        add1(e);
    }
    if (e.target.className === 'addAns') {
        add2(e);
    }

}

function add1(e) {
        let cont = e.target.parentNode.parentNode.nextElementSibling,
            n = cont.firstElementChild.cloneNode(true),
            ch = cont.lastElementChild,
            ind = a('.answer[data-num]').length,
            input = n.firstElementChild.firstElementChild,
            add = cont.querySelector('.addAns');

        n.classList.remove('hidden');
        n.setAttribute('data-num', `${ind}`);
        input.setAttribute('maxlength', '50');
        n.lastElementChild.remove();
        traverse(n.firstElementChild, ind);
        add.addEventListener('click', addAnswer);
        _('#answerService').firstElementChild.setAttribute(
            'value', `${++ind}`);
        cont.insertBefore(n, ch);
        ch.classList.remove('hidden');
}

function add2(e) {
        let cont = e.target.parentElement.parentElement.parentElement,
            n = cont.firstElementChild.cloneNode(true),
            prev = parseInt(cont.parentElement.dataset.num),
            ch = cont.lastElementChild;
        
        n.classList.remove('hidden');
        n.setAttribute('data-num', `${ind}`);
        n.lastElementChild.addEventListener('click', removeAnswer);
        traverse(n.firstElementChild, ind);
        _('#answerService').firstElementChild.setAttribute(
            'value', `${++ind}`);
        cont.insertBefore(n, ch);
}

function removeField(e) {
    let cont = e.target.parentNode.parentNode,
        ind = parseInt(cont.firstElementChild.dataset.num),
        fields = Array.prototype.slice.call(
            a('.field[data-num]'), ind + 1);

    for (let i of fields) {
        ind = --i.dataset.num;
        traverse(i.firstElementChild, ind);
    }
    cont.parentNode.remove();
    _('#fieldService').firstElementChild.setAttribute(
        'value', a('.field[data-num]').length
    )
}

function copyField(e) {
    let cont = e.target.parentNode.parentNode,
        copy = cont.cloneNode(true),
        next = cont.parentNode.nextElementSibling,
        div = document.createElement('div'),
        p = _('#form-main');

    div.classList.add('items');
    div.appendChild(copy);
    if (next) {
        p.insertBefore(div, next);
        let fields = Array.prototype.slice.call(
            a(
                '.field[data-num]'),
            next.firstElementChild.firstElementChild.dataset.num);
        for (let i of fields) {
            traverse(i.firstElementChild, ++i.dataset.num);
        }
    } else {
        ++copy.firstElementChild.dataset.num;
        _('#fieldService').firstElementChild.setAttribute(
            'value', a('.field[data-num]').length
        )
        p.appendChild(div);
    }
}

function removeAnswer(e) {
    let cont = e.target.parentNode.parentNode,
        ind = parseInt(cont.dataset.num),
        answers = Array.prototype.slice.call(a('.answer[data-num]'), ind + 1);

    for ( let i of answers ) {
        traverse(i, --i.dataset.num);
    }
    --_('#answerService').firstElementChild.value;
    cont.remove();
}

function addField(e) {

    let f = _('.formItem, [data-state="0"]'),
        n = f.cloneNode(true),
        p = f.parentNode.parentNode,
        ch = n.firstElementChild.firstElementChild,
        btnDel = n.querySelector('#delBtn'),
        btnCopy = n.querySelector('#copyBtn'),
        ind = a('.field[data-num]').length,
        div = document.createElement('div'),
        options = _('#options'),
        opNew = options.cloneNode(true);

    div.classList.add('items');
    btnDel.addEventListener('click', removeField);
    btnCopy.addEventListener('click', copyField);
    n.classList.remove('hidden');
    n.firstElementChild.setAttribute('data-num', `${ind}`);
    traverse(ch, ind);
    n.querySelector('.type').addEventListener('input', addAnswer);
    ++ind;
    div.appendChild(n);
    p.appendChild(div);
    options.remove();
    opNew.addEventListener('click', addField);
    _('#fieldService').firstElementChild.setAttribute(
        'value', `${ind}`);
    setTimeout(() => {
        p.lastElementChild.appendChild(opNew);
        document.querySelector(
            '#form-main').lastElementChild.lastElementChild.scrollIntoView(
                {behavior: 'smooth', block: 'start'});
    }, 500);

}
