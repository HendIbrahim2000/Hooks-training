import React from 'react'

const List = (props) => {
    return (
        <ul>
            {props.items.map(item => <li key={item.id} onClick={props.removeItem.bind(this, item.id)}>{item.item}</li>)}
        </ul>
    )
}

export default List