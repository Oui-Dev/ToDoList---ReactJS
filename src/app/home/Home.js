import './Home.scss'
import { useState, useRef } from 'react'

export default function Home() {
    const dragItem = useRef()
    const [todoList, setTodoList] = useState([])
    const [doingList, setDoingList] = useState([])
    const [doneList, setDoneList] = useState([])

    // localStorage.clear()

    if (localStorage.getItem('todoList') && JSON.parse(localStorage.getItem('todoList')).length > 0 && todoList.length === 0)
        setTodoList(JSON.parse(localStorage.getItem('todoList')))
    if (localStorage.getItem('doingList') && JSON.parse(localStorage.getItem('doingList')).length > 0 && doingList.length === 0)
        setDoingList(JSON.parse(localStorage.getItem('doingList')))
    if (localStorage.getItem('doneList') && JSON.parse(localStorage.getItem('doneList')).length > 0 && doneList.length === 0)
        setDoneList(JSON.parse(localStorage.getItem('doneList')))

    console.table(todoList)
    console.table(doingList)
    console.table(doneList)

    function onDrag(list, i) {
        switch (list) {
            case 1:
                dragItem.current = todoList[i]
                todoList.splice(i, 1)
                localStorage.setItem('todoList', JSON.stringify(todoList))
                break
            case 2:
                dragItem.current = doingList[i]
                doingList.splice(i, 1)
                localStorage.setItem('doingList', JSON.stringify(doingList))
                break
            case 3:
                dragItem.current = doneList[i]
                doneList.splice(i, 1)
                localStorage.setItem('doneList', JSON.stringify(doneList))
                break
            default:
                console.log('Error')
        }
    }
    function onDragOver(e) {
        e.preventDefault()
    }
    function onDrop(list) {
        const item = dragItem.current

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

    function addTask(e, list) {
        const newItem = e.target.previousElementSibling.value.trim()
        if (newItem !== '') {
            e.target.previousElementSibling.value = ''
            switch (list) {
                case 1:
                    localStorage.setItem('todoList', JSON.stringify([...todoList, newItem]))
                    setTodoList([...todoList, newItem])
                    break
                case 2:
                    localStorage.setItem('doingList', JSON.stringify([...doingList, newItem]))
                    setDoingList([...doingList, newItem])
                    break
                case 3:
                    localStorage.setItem('doneList', JSON.stringify([...doneList, newItem]))
                    setDoneList([...doneList, newItem])
                    break
                default:
                    console.log('Error')
            }
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
                <div className="boxFooter">
                    <input type="text"></input>
                    <box-icon name="plus" color="white" onClick={(e) => addTask(e, 1)} />
                </div>
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
                <div className="boxFooter">
                    <input type="text"></input>
                    <box-icon name="plus" color="white" onClick={(e) => addTask(e, 2)} />
                </div>
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
                <div className="boxFooter">
                    <input type="text"></input>
                    <box-icon name="plus" color="white" onClick={(e) => addTask(e, 3)} />
                </div>
            </div>
        </div>
    )
}
