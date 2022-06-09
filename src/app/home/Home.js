import './Home.scss'
import { useState, useRef } from 'react'

export default function Home() {
    const dragItem = useRef()
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')))
    const [doingList, setDoingList] = useState(JSON.parse(localStorage.getItem('doingList')))
    const [doneList, setDoneList] = useState(JSON.parse(localStorage.getItem('doneList')))

    function onDrag(list, i) {
        dragItem.index = i

        switch (list) {
            case 1:
                dragItem.array = [...todoList]
                todoList.splice(i, 1)
                setTodoList(todoList)
                break
            case 2:
                dragItem.array = [...doingList]
                doingList.splice(i, 1)
                setDoingList(doingList)
                break
            case 3:
                dragItem.array = [...doneList]
                doneList.splice(i, 1)
                setDoneList(doneList)
                break
            default:
                console.log('Error')
        }
    }
    function onDragOver(e) {
        e.preventDefault()
    }
    function onDrop(list) {
        const item = dragItem.array[dragItem.index]

        switch (list) {
            case 1:
                localStorage.setItem('todoList', JSON.stringify([...todoList, item]))
                setTodoList([...todoList, item])
                break
            case 2:
                localStorage.setItem('doingList', JSON.stringify([...doingList, item]))
                setDoingList([...doingList, item])
                break
            case 3:
                localStorage.setItem('doneList', JSON.stringify([...doneList, item]))
                setDoneList([...doneList, item])
                break
            default:
                console.log('Error')
        }
    }

    return (
        <div className="homeContent">
            <div id="todo" className="itemBox">
                <h3>ToDo</h3>
                <div className="flex-grow" onDrop={() => onDrop(1)} onDragOver={(e) => onDragOver(e)}>
                    {todoList &&
                        todoList.map((item, index) => (
                            <div className="item" onDragStart={() => onDrag(1, index)} key={index} draggable>
                                {item}
                            </div>
                        ))}
                </div>
                <button type="button">
                    <box-icon name="plus" color="white" />
                    <p>Ajouter</p>
                </button>
            </div>
            <div id="doing" className="itemBox">
                <h3>Doing</h3>
                <div className="flex-grow" onDrop={() => onDrop(2)} onDragOver={(e) => onDragOver(e)}>
                    {doingList &&
                        doingList.map((item, index) => (
                            <div className="item" onDragStart={() => onDrag(2, index)} key={index} draggable>
                                {item}
                            </div>
                        ))}
                </div>
                <button type="button">
                    <box-icon name="plus" color="white" />
                    <p>Ajouter</p>
                </button>
            </div>
            <div id="done" className="itemBox">
                <h3>Done</h3>
                <div className="flex-grow" onDrop={() => onDrop(3)} onDragOver={(e) => onDragOver(e)}>
                    {doneList &&
                        doneList.map((item, index) => (
                            <div className="item" onDragStart={() => onDrag(3, index)} key={index} draggable>
                                {item}
                            </div>
                        ))}
                </div>
                <button type="button">
                    <box-icon name="plus" color="white" />
                    <p>Ajouter</p>
                </button>
            </div>
        </div>
    )
}
