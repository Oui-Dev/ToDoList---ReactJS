import './Home.scss'
import React, { useState, useRef } from 'react'

export default function Home() {
    const dragItem = useRef()
    const dropInList = useRef()
    const [todoList, setTodoList] = useState(['todo 1', 'todo 2', 'todo 3', 'todo 4', 'todo 5', 'todo 6'])
    const [doingList, setDoingList] = useState(['doing 1', 'doing 2', 'doing 3', 'doing 4', 'doing 5', 'doing 6'])
    const [doneList, setDoneList] = useState(['done 1', 'done 2', 'done 3', 'done 4', 'done 5', 'done 6'])

    const onDrag = (e, item) => {
        console.log(e.target)
        dragItem.current = item
    }
    const onDragOver = (e) => {
        e.preventDefault()
    }
    const onDrop = (e, item) => {
        console.log(e.target)
        dropInList.current = item
    }

    return (
        <div className="homeContent">
            <div id="todo" className="itemBox" onDrop={(e) => onDrop(e, 1)} onDragOver={(e) => onDragOver(e)}>
                <h3>ToDo</h3>
                <div>
                    {todoList.map((item, index) => (
                        <div className="item" onDragStart={(e) => onDrag(e, index)} key={index} draggable>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div id="doing" className="itemBox" onDrop={(e) => onDrop(e, 2)} onDragOver={(e) => onDragOver(e)}>
                <h3>Doing</h3>
                <div>
                    {doingList.map((item, index) => (
                        <div className="item" onDragStart={(e) => onDrag(e, index)} key={index} draggable>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div id="done" className="itemBox" onDrop={(e) => onDrop(e, 3)} onDragOver={(e) => onDragOver(e)}>
                <h3>Done</h3>
                <div>
                    {doneList.map((item, index) => (
                        <div className="item" onDragStart={(e) => onDrag(e, index)} key={index} draggable>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
