const App = (function (Drag, Tasks) {
  const createElement = (element) => document.createElement(element);

  const createTask = (task) => {
    const content = createElement("div");
    content.classList.add("content");
    content.innerHTML = task.content;

    let bars = [];
    bars = task.status.map((item) => {
      let status = createElement("div");
      status.classList.add("status");
      status.classList.add(item);
      return status;
    });

    const card = createElement("div");
    card.setAttribute("draggable", true);
    card.classList.add("card");
    bars.map((bar) => card.appendChild(bar));

    card.appendChild(content);
    return card;
  };

  const initTasks = (tasks) => {
    return new Promise((resolve, reject) => {
      const toDo = document.querySelector(".todo .dropzone");
      tasks.todo.forEach((item) => {
        toDo.appendChild(createTask(item));
      });

      const doing = document.querySelector(".doing .dropzone");
      tasks.doing.forEach((item) => {
        doing.appendChild(createTask(item));
      });

      const done = document.querySelector(".done .dropzone");
      tasks.done.forEach((item) => {
        done.appendChild(createTask(item));
      });
      resolve();
    });
  };

  initTasks(Tasks).then(() => new Drag(".card", ".dropzone"));
})(Drag, Tasks);
