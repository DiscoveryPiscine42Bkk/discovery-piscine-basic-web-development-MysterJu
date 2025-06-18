window.onload = function () {
  const ftList = document.getElementById('ft_list');
  const newBtn = document.getElementById('new-btn');

  // Load saved todos from cookie
  const todos = loadTodosFromCookie();
  todos.forEach(text => addTodo(text));

  newBtn.addEventListener('click', function () {
    const text = prompt("Enter your TO DO:");
    if (text && text.trim() !== "") {
      addTodo(text.trim());
      saveTodosToCookie();
    }
  });

  function addTodo(text) {
    const todo = document.createElement('div');
    todo.className = 'todo';
    todo.textContent = text;

    todo.addEventListener('click', function () {
      const confirmed = confirm("Do you want to delete this TO DO?");
      if (confirmed) {
        ftList.removeChild(todo);
        saveTodosToCookie();
      }
    });

    ftList.appendChild(todo); // Adds to top due to column-reverse
  }

  function saveTodosToCookie() {
    const items = Array.from(ftList.children).map(div => div.textContent);
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(items)) + "; path=/";
  }

  function loadTodosFromCookie() {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      let [name, value] = cookie.trim().split("=");
      if (name === "todos") {
        try {
          return JSON.parse(decodeURIComponent(value));
        } catch {
          return [];
        }
      }
    }
    return [];
  }
};
