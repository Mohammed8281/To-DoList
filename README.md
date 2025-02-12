Todo App
This project is a simple React-based Todo application where users can add, delete, and mark tasks as completed. The tasks are stored in the browser's local storage, ensuring that the data persists even after a page reload.

Features
Add Todo: Users can add a new task with a title and description.
Delete Todo: Users can delete a task.
Mark as Complete: Users can mark a task as completed.
Toggle View: Users can toggle between viewing all tasks and only completed tasks.
Local Storage: Tasks are stored in the browser's local storage.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/todo-app.git
cd todo-app
Install dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
npm start
File Structure
src/App.js: The main component containing the logic and UI for the Todo app.
src/App.css: The CSS file for styling the application.
public/index.html: The HTML template.
Component Breakdown
App.js
State Variables:

isCompleteScreen: Boolean to toggle between todo list and completed list views.
allTodos: Array to store all todos.
newTitle: String to store the new todo title.
newDescription: String to store the new todo description.
completedTodos: Array to store completed todos.
Functions:

handleAddTodo(): Adds a new todo to the list and updates local storage.
handleDeleteTodo(index): Deletes a todo from the list and updates local storage.
handleComplete(index): Marks a todo as completed, moves it to the completed list, and updates local storage.
Effects:

useEffect(): Loads todos from local storage when the component mounts.
JSX Structure:

Input fields for adding new todos.
Buttons to toggle between the todo list and completed list views.
Lists for displaying todos and completed todos.
Usage
Add a Todo:

Enter the title and description in the input fields and click the "Add" button.
Delete a Todo:

Click the delete icon next to the todo you want to delete.
Mark a Todo as Complete:

Click the check icon next to the todo you want to mark as complete.
View Completed Todos:

Click the "Completed" button to view all completed todos.
View All Todos:

Click the "Todo" button to view all todos.
Dependencies
React: JavaScript library for building user interfaces.
React Icons: Library for including icons in the application.
Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any features, bug fixes, or enhancements.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
This project was bootstrapped with Create React App.
