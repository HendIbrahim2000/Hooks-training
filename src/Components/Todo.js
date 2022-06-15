import React, {useState, useEffect} from 'react'
import axios from 'axios'



const Todo = props => {
    const [todoName, setTodoName] = useState('');
    const [submitTodoList, setSubmitTodoList] = useState(null)
    const [todoList, addTodoList] = useState([])

    // const [todoState, setTodoState] = useState({todoInput: '', todoList: []})

    useEffect(()=> {
        axios.get('https://dailytask-9ebe8-default-rtdb.firebaseio.com/todos.json')
        .then( res => {
            const result = res.data;
            const initialList = []
            for(const key in result) {
                initialList.push({id: key, item: result[key].item})
            }
            
            addTodoList(initialList)
            console.log(initialList)
        })
        .catch( err => {
            console.log(err)
        })
    }, [])

    useEffect(()=> {
        if(submitTodoList) {
            addTodoList(todoList.concat(submitTodoList))
        }
    }, [submitTodoList])

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

        axios.post('https://dailytask-9ebe8-default-rtdb.firebaseio.com/todos.json', {item: todoName})
        .then(res => {
            setTimeout(()=>{
                console.log(res)
                const todoItem = {id: res.data.name, item: todoName}
                setSubmitTodoList(todoItem)
            }, 3000)
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (<React.Fragment>
        <input type='text' defaultValue={todoName} onChange={onchangeHandler} />
        <button onClick={addListItem}>Add List</button>
        <ul>
            {todoList.map(item => <li key={item.id}>{item.item}</li>)}
        </ul>
    </React.Fragment>)
}

export default Todo