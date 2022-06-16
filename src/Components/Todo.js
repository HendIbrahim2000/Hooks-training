import React, { useState, useEffect, useReducer, useRef, useMemo} from 'react'
import axios from 'axios'

import List from './List'



const Todo = props => {
    // const [todoName, setTodoName] = useState('');
    // const [submitTodoList, setSubmitTodoList] = useState(null)
    const [validation, setValidation] = useState(false)
    const todoRef = useRef()
    
    // const [todoList, addTodoList] = useState([])

    // const [todoState, setTodoState] = useState({todoInput: '', todoList: []})

    useEffect(()=> {
        axios.get('https://dailytask-9ebe8-default-rtdb.firebaseio.com/todos.json')
        .then( res => {
            const result = res.data;
            const initialList = []
            for(const key in result) {
                initialList.push({id: key, item: result[key].item})
            }
            
            dispatch({type: 'SET', payload: initialList})
            // addTodoList(initialList)
            console.log(initialList)
        })
        .catch( err => {
            // console.log(err)
        })
    }, [])
    const validationHandler = (event) => {
        if(event.target.value.trim !== '') {
            setValidation(true)
        } else {
            setValidation(false)
        }
    }

    // useEffect(()=> {
    //     if(submitTodoList) {
    //         // addTodoList(todoList.concat(submitTodoList))
    //         dispatch({type: 'ADD', payload: submitTodoList})
    //     }
    // }, [submitTodoList])

    const todoReducer = (state, action) => {
        switch(action.type) {
            case 'SET':
                return action.payload
            case 'ADD':
                return state.concat(action.payload)
            case 'REMOVE':
                return state.filter((item) => item.id !== action.payload)
            default: 
                return state
        }
    }

    const [state, dispatch] = useReducer(todoReducer, [])

    // const onchangeHandler = event => {

    //     // setTodoState({
    //     //     todoInput: event.target.value,
    //     //     todoList: todoState.todoList
    //     // })

    //     setTodoName(event.target.value)
    // }

    const addListItem = () => {
        // setTodoState({
        //     todoInput: todoState.todoInput,
        //     todoList: todoState.todoList.concat(todoState.todoInput)
        // })
        const todoName = todoRef.current.value
        axios.post('https://dailytask-9ebe8-default-rtdb.firebaseio.com/todos.json', {item: todoName})
        .then(res => {
            setTimeout(()=>{
                console.log(res)
                const todoItem = {id: res.data.name, item: todoName}
                dispatch({type: 'ADD', payload: todoItem})
            }, 3000)
            
        })
        .catch(err => {
            // console.log(err)
        })
    }

    const removeItem = id => {
        axios.delete(`https://dailytask-9ebe8-default-rtdb.firebaseio.com/todos/${id}.json`)
        .then((res)=> {
            dispatch({type: 'REMOVE' , payload: id})
        })
        .catch(err => {
            // console.log(err)
        })
        
    }


    return (<React.Fragment>
        <input type='text' ref={todoRef} onChange={validationHandler} style={{background : validation? 'transparent' : '#f8e6e6'}} />
        <button onClick={addListItem}>Add List</button>
        {useMemo( ()=> <List items={state} removeItem={removeItem}/>, [state])}
    </React.Fragment>)
}

export default Todo