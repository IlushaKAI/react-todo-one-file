// Импортируем хук useState из React для управления состоянием компонента
import { useState } from "react"
// Импортируем файл стилей для оформления приложения
import "./styles.css"

// Основной компонент приложения списка дел
export default function App() {
  // Создаем состояние для хранения текста новой задачи
  // newItem - текущий текст, setNewItem - функция для его обновления
  const [newItem, setNewItem] = useState("")
  
  // Создаем состояние для хранения списка всех задач
  // todos - массив задач, setTodos - функция для его обновления
  const [todos, setTodos] = useState([])

  // Функция-обработчик отправки формы при создании новой задачи
  function handleSubmit(e) {
    // Предотвращаем стандартное поведение браузера (перезагрузку страницы)
    e.preventDefault()
    
    // Обновляем список задач, добавляя новую задачу
    setTodos(currentTodos => {
      return [
        ...currentTodos, // Сохраняем все существующие задачи
        { 
          id: crypto.randomUUID(), // Генерируем уникальный идентификатор
          title: newItem, // Заголовок из поля ввода
          completed: false // По умолчанию задача не выполнена
        },
      ]
    })
    
    // Очищаем поле ввода после добавления задачи
    setNewItem("")
  }
  
  // Функция для изменения статуса выполнения задачи
  function toggleTodo(id, completed) {
    // Обновляем список задач, изменяя статус выбранной задачи
    setTodos(currentTodos => {
      // Возвращаем новый массив с обновленной задачей
      return currentTodos.map(todo => {
        // Если это задача, которую нужно изменить
        if (todo.id === id) {
          // Возвращаем новый объект с обновленным статусом
          return { ...todo, completed }
        }
        
        // Остальные задачи возвращаем без изменений
        return todo
      })
    })
  }
  
  // Функция для удаления задачи
  function deleteTodo(id) {
    // Обновляем список задач, удаляя выбранную задачу
    setTodos(currentTodos => {
      // Фильтруем массив, исключая задачу с указанным id
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  // Рендеринг интерфейса приложения
  return (
    <>
      {/* Форма для добавления новой задачи */}
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          {/* Метка для поля ввода */}
          <label htmlFor="item">New Item</label>
          {/* Поле ввода для текста задачи
              - value привязывает содержимое к состоянию
              - onChange обновляет состояние при вводе */}
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        {/* Кнопка для отправки формы */}
        <button className="btn">Add</button>
      </form>
      
      {/* Заголовок списка задач */}
      <h1 className="header">Todo List</h1>
      
      {/* Список задач */}
      <ul className="list">
        {/* Если список пуст, показываем сообщение */}
        {todos.length === 0 && "No Todos"}
        
        {/* Преобразуем массив задач в элементы списка */}
        {todos.map(todo => {
          return (
            // Элемент списка с уникальным ключом для React
            <li key={todo.id}>
              <label>
                {/* Чекбокс для отметки выполнения задачи */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                {/* Текст задачи */}
                {todo.title}
              </label>
              {/* Кнопка удаления задачи */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}