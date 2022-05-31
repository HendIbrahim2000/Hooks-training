import React, {useState} from 'react'



const Todo = props => {
    const [todoName, setTodoName] = useState('');
    const [todoList, addTodoList] = useState([])

    // const [todoState, setTodoState] = useState({todoInput: '', todoList: []})

    const onchangeHandler = event => {

        // setTodoState({
        //     todoInput: event.target.value,
        //     todoList: todoState.todoList
        // })

        setTodoName(event.target.value)
    }

    const addListItem = () => {
        // setTodoState({
        //     todoInput: todoState.todoInput,
        //     todoList: todoState.todoList.concat(todoState.todoInput)
        // })

        addTodoList(todoList.concat(todoName))
    }

    return (<React.Fragment>
        <input type='text' defaultValue={todoName} onChange={onchangeHandler} />
        <button onClick={addListItem}>Add List</button>
        <ul>
            {todoList.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </React.Fragment>)
}

export default Todo