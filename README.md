# todo-app
Creating TODO app  
I used html for layout and JavaScript  
Also I used Bootstrap 4 for this project  
In this project we have 3 html files for people todos, in this: for me, for my husband and for my mom  
The data is saved even if you close the entire application on your device using functions __todoSaveLocalStorage__ and __todoLoadLocalStorage__: the first saves data in the local storage, the second loads data from the local storage  
## createAppTitle  
Function __createAppTitle__ takes one argument "title" and displays a specific title depending on the tab we are on  
## createTodoItemForm  
Function creates form with input field, button "Добавить дело" which created a todo  
If input field don't have text then button is disabled and if you start typing text into the field then button will become active  
## createTodoList  
Function creates list with your todos  
## createTodoItem  
This function creates a todo list item and adds Done button and Delete button for control your todo. Function takes one argument - element of array listElement  
The function also assigns event handlers for the Done and Delete buttons. When you click on Done button then the list-group-item-success class of the li element is switched and the value of the done property of listElement is also changed and saved in local storage  
When you click on the "Delete" button, the li element is deleted, as well as the corresponding element is deleted from the todoArr array, after which the updated array is saved in the local storage  ##
## createTodoApp
It is the main function. It creates TODO app and added in container.  
This function taked 4 arguments:  
* container - the DOM element in which the application will be created  
* title - tab title  
* key - the key used to save data in localStorage  
* todoArrFirst - an array of tasks that will be displayed when the application is initially loaded  

The function does the following:  
1. Creates an application title using the __createAppTitle__ function.  
2. Creates a form for adding new tasks using the __createTodoItemForm__ function.  
3. Creates a list to display tasks using the __createTodoList__ function.  
4. Adds the created elements to the specified container.  
5. Loads data from localStorage using the __todoLoadLocalStorage__ function and assigns it to the listData variable.
6. If there is data in localStorage (listData is not null and not an empty string), then assigns todoArr the value from listData, otherwise assigns todoArrFirst the value.
7. For each element in the array, todoArr creates a todo item using the __createTodoItem__ function and adds it to the todoList.
8. Adds a "submit" event handler for the task adding form. When the form is submitted, creates a new todoItemNew object with the data from the input field and generates a unique identifier using the newId function. Then it creates a todo item using the __createTodoItem__ function and adds it to the todoList. Adds a new todoItemNew object to the todoArr array. Saves the updated todoArr array to localStorage using the __todoSaveLocalStorage__ function. Clears an input field on a form.

And <a href = 'https://todo-app-prj.netlify.app/'> ___how it looks like___ </a>
