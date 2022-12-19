document.addEventListener("DOMContentLoaded", addHandlers);

function addHandlers() {
    let add = document.querySelector('#svgPlus');

    add.addEventListener('click', addField);
}

function addAnswer(e) {
    e.preventDefault();
    let cont = e.target.parentElement.parentNode.nextElementSibling;
    let answer = cont.firstElementChild.cloneNode(true);
    let t = document.querySelector('div#answerService').firstElementChild;
    let reg = RegExp(`form-(\\d){1}-`, 'g');
    let arr = Array.from(cont.querySelectorAll('.answer')).filter(
        (e) => { return e.className === 'answer' });
    let num = arr.length;
    let ch = cont.querySelector('.add');
    ch.classList.remove('hidden');

    answer.innerHTML = answer.innerHTML.replace(
        reg, `form-${num}-`);
    t.value = ++num;
    answer.classList.remove('hidden');
    cont.insertBefore(answer, ch)




}

function removeAnswer(e) {
    e.preventDefault();
    let a = Array.from(document.querySelectorAll('.answer'));
    let par = this.parentElement.parentNode;
    let reg = RegExp(`form-(\\d){1}-`, 'g');
    let total = document.querySelector(
        '#answerService').children['id_form-TOTAL_FORMS'];
    let root = par.parentNode;
    let ind = a.indexOf(par);

    if (a.length <= 1) {
        root.removeChild(par);
        total.setAttribute('value', `${a.length}`);
    } else {
        if (ind < a.length - 1) {
            root.removeChild(par);
            Array.from(root.children).slice(ind).map((e) => {
                e.innerHTML = e.innerHTML.replace(
                    reg,
                    `form-${ind - 1}-`
                );
                e.children[0].firstElementChild.value = `Answer ${ind}`;
                ind++;
            });
            total.setAttribute('value', `${a.length}`);
        } else {
            root.removeChild(par);
            total.setAttribute('value', `${a.length}`);
        }
    }
}

function fieldManager() {
    let res = {};

    res.fields = document.querySelectorAll('.formItem');
    res.form = document.querySelector('#form-main');
    res.totalFields = document.querySelector(
        '#fieldService').children['id_form-TOTAL_FORMS'];

    return res;
}

function answerManager() {
    let res = {};

    res.reg = RegExp(`form-(\\d){1}-`, 'g');
    res.total = document.querySelector(
        '#answerService').children['id_form-TOTAL_FORMS'];
    let n1 = p2.nextSibling.cloneNode(true);


}

function addField(e) {
    e.preventDefault();

    let obj = fieldManager();
    let fieldNum = obj.fields.length - 1;
    let newField = obj.fields[fieldNum].cloneNode(true);
    let reg = RegExp(`form-(\\d){1}-`, 'g');

    newField.classList.remove('hidden');
    newField.innerHTML = newField.innerHTML.replace(
        reg, `form-${fieldNum}-`);
    fieldNum++;

    obj.form.append(newField);

    obj.totalFields.setAttribute('value', `${fieldNum + 1}`);
    newField.children[0].lastElementChild.addEventListener(
        'input', addAnswer);
    newField.getElementsByClassName('addAns')[0].addEventListener(
        'click',
        addAnswer
    )
}
