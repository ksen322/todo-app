(function () {
    //функция, реализующая создание заголовка относительно используемой ссылки
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    let todoArr = [];
    let listName = '';

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        button.disabled = true;

        input.addEventListener('input', function (e) {
            e.preventDefault();

            if (input.value.length > 0)
                button.disabled = false;
            else if (input.value.length === 0 && button.disabled != true) {
                button.disabled = true;
            }
        });

        return {
            form,
            input,
            button,
        };

    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(listElement) {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = listElement.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        if (listElement.done === true) {
            item.classList.add('list-group-item-success');
        }

        doneButton.addEventListener('click', function () {
            item.classList.toggle('list-group-item-success');

            if (listElement.done === false)
                listElement.done = true;
            else if (listElement.done === true) {
                listElement.done = false;
            }
            todoSaveLocalStorage(todoArr, listName);
        });

        deleteButton.addEventListener('click', function () {
            if (confirm('Вы уверены?')) {
                item.remove();

                for (let i = 0; i < todoArr.length; i++) {
                    if (todoArr[i].id === listElement.id) {
                        todoArr.splice(i, 1);
                    }
                }
                todoSaveLocalStorage(todoArr, listName);
            }

        });

        return {
            item,
            doneButton,
            deleteButton,
        };

    }

    function newId(arr) {
        let max = 0;
        for (let item of arr) {
            if (item.id > max) {
                max = item.id;
            }
        }
        return max + 1;
    }

    function todoSaveLocalStorage(data, key) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function todoLoadLocalStorage(key) {
        let jsonData = localStorage.getItem(key);
        return JSON.parse(jsonData);
    }

    function createTodoApp(container, title, key, todoArrFirst) {

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        // let todoItems = [createTodoItem('Сходить за хлебом'), createTodoItem('Купить молоко')];
        listName = key;

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        // todoList.append(todoItems[0].item);
        // todoList.append(todoItems[1].item);


        let listData = todoLoadLocalStorage(listName);

        if (listData !== null && listData !== ''){
            todoArr = listData;
        }
        else{
            todoArr = todoArrFirst;
        }

        for (let item of todoArr) {
            let todoItem = createTodoItem(item);
            todoList.append(todoItem.item);
          }

        todoItemForm.form.addEventListener('submit', function (e) {

            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }

            let todoItemNew = {
                name: todoItemForm.input.value,
                done: false,
                id: newId(todoArr)
            };

            let todoItem = createTodoItem(todoItemNew);

            todoArr.push(todoItemNew);

            todoSaveLocalStorage(todoArr, listName);

            todoList.append(todoItem.item);

            // todoList.append(createTodoItem(todoItemForm.input.value).item);
            todoItemForm.input.value = '';

        });

    }
    // document.addEventListener('DOMContentLoaded', function(){
    //     createTodoApp(document.getElementById('my-todos'), 'Мои дела');
    //     createTodoApp(document.getElementById('mom-todos'), 'Дела мамы');
    //     createTodoApp(document.getElementById('dad-todos'), 'Дела папы');
    // });

    window.createTodoApp = createTodoApp;

})();

