//GET UL CONTAINER
const listContainer = document.querySelector("#list-container");

//CHECK FOR A SAVED TODOS OR MAKE AN EMPTY ARRAY
let todoList = loadSavedTodos();

//CHECK IF TODO HAS VALUE || SHORT CURCUIT EXPRESSION
let listId = todoList.length || 0;

function loadSavedTodos() {
  //GET LOCAL STORAGE SAVE
  let savedTodos = JSON.parse(localStorage.getItem("todoList"));

  //CHECK IF NULL OR NOT
  if (savedTodos == null) {
    //RETURNS AN EMPTY ARRAY
    return [];
  } else {
    //CREATE LIST COMPONENTS
    createSavedTodos(savedTodos);
    //RETURNS TODOLIST VALUES
    return savedTodos;
  }
}

//creates saved todos
function createSavedTodos(savedTodos) {
  //creates null list variable
  let listComponent = null;

  // MAKES LIST FOR EVERY ARRAY VALUES
  for (let i = 0; i < savedTodos.length; i++) {
    listComponent = `<li class="user-todo" id="listId${i}"><p>${savedTodos[i]}</p><button id="listId${i}" class="remove-btn" onclick="deleteTodo(this)">Remove</button></li>`;

    //APPEND LIST IN INNER HTML OF UL / LIST CONTAINER
    listContainer.innerHTML += listComponent;
  }
}




function addList() {
  //CREATE A NEW LIST WITH INPUT IN IT
  let input = document.getElementById("context").value;

  //CHECKS IF INPUT IS NULL
  if (input) {
    let todoComponent = createTodoComponent();
    //APPEND NODE TO LIST CONTAINER
    listContainer.innerHTML += todoComponent;
  } else {
    alert("invalid task!");
  }
}



function createTodoComponent() {
  //GET TEXT INPUT
  let input = document.getElementById("context");
  let userInput = input.value;

  listId++;
  let listComponent = `<li class="user-todo" id="listId${listId}"><p>${userInput}</p><button id="listId${listId}" class="remove-btn" onclick="deleteTodo(this)">Remove</button></li>`;

  // currentTodoContainer.push(userInput);
  todoList.push(userInput);


  //SAVES NEW TASK IN LOCAL DATA
  localStorage.setItem("todoList", JSON.stringify(todoList));
  //CLEARS INPUT ELEMENT
  input.value = "";

  //RETURNS CREATED LIST
  return listComponent;
}


function deleteTodo(button) {

   //GETS THE LIST ID OF BUTTON 
  let listId = button.getAttribute("id");

  //GETS THE LAST NUMBER OF LIST ID
  let indexNum = parseInt(listId.substring(6));


    let selectedList = document.getElementById(`${listId}`);

  console.log("🚀 ~ selectedList:", selectedList)
  //REMOVES SELECTED TASK ON ARRAY
  todoList.splice(indexNum, 1);

    //SAVES ARRAY
  localStorage.setItem("todoList", JSON.stringify(todoList));

  //REMOVE LIST COMPONENT
  selectedList.remove();
}

function deleteAll() {
  //WHILE LIST CONTAINER HAS CHILD(TRUE)
  while (listContainer.hasChildNodes()) {
    //LIST CONTAINER REMOVE FIRST CHILD
    listContainer.removeChild(listContainer.firstChild);
  }
  localStorage.clear();
}
