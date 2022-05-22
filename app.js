const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const container = document.querySelector('.container');
const nelements = document.querySelector('.nelements');
const search = document.querySelector('.search input');
let success = 0;

document.getElementById("alert").style.display = "none";

//Count Elements

let countElements = () => {
    var count = list.getElementsByTagName("li").length;
    for(var i = 0; i < list.length ; i++){
        count++;
    };
    nelements.innerHTML = count;
};

//add HTML template
const generateTemplate = (todo) => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>
  `;

  list.innerHTML += html;

};

//add element
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if(todo.length) {
    generateTemplate(todo);
    addForm.reset();
    countElements();
    }
    else {
        alert("Scrivi qualcosa");
    }

});

//remove element
list.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove()
        countElements();
    }
})

//reset list
container.addEventListener('click', e => {
    if(e.target.classList.contains('reset')){
        list.innerHTML = ' ';
        countElements();
    }
})

const filterTodos = (term) => {

    Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));

    if(list.getElementsByTagName("li").length ===  Array.from(list.children).filter((todo) => !todo.textContent.toLowerCase().includes(term)).length){
        document.getElementById("alert").style.display = "block";
    } else {
        document.getElementById("alert").style.display = "none";
    }
};

//keyup event
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});
