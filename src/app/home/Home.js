import './Home.scss'
import { useRef, useEffect, useReducer } from 'react'
let isStarting = true

export default function Home() {
    // localStorage.clear()
    const dragItem = useRef()
    const initialState = {}
    const [todoList, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (isStarting) {
            isStarting = false
            if (
                localStorage.getItem('todoList') &&
                Object.keys(JSON.parse(localStorage.getItem('todoList'))).length > 0
            ) {
                const data = JSON.parse(localStorage.getItem('todoList'))
                dispatch({ type: 'set', data: data })
            }
        }
    })

    function reducer(todoList, action) {
        switch (action.type) {
            case 'set':
                todoList = action.data
                break
            case 'onDrag':
                dragItem.current = action.item
                todoList[action.list].splice(action.index, 1)
                break
            case 'onDrop':
                todoList[action.list].push(dragItem.current)
                break
            case 'add':
                const newItem = action.input.value.trim()
                if (newItem !== '') {
                    todoList[action.list].push(newItem)
                    action.input.value = ''
                }
                break
            default:
                throw new Error()
        }
        localStorage.setItem('todoList', JSON.stringify(todoList))
        return todoList
    }

    console.table(todoList)

    function onDragOver(e) {
        e.preventDefault()
    }

    return (
        <div className="homeContent">
            <div id="todo" className="itemBox">
                <h3>ToDo</h3>
                <div
                    className="flex-grow"
                    onDrop={() => dispatch({ type: 'onDrop', list: 'todo' })}
                    onDragOver={(e) => onDragOver(e)}>
                    {todoList.todo &&
                        todoList.todo.map((item, index) => (
                            <div
                                className="item"
                                onDragStart={() => dispatch({ type: 'onDrag', list: 'todo', index: index, item: item })}
                                key={index}
                                draggable>
                                {item}
                            </div>
                        ))}
                </div>
                <div className="boxFooter">
                    <input type="text"></input>
                    <box-icon
                        name="plus"
                        color="white"
                        onClick={(e) => dispatch({ type: 'add', list: 'todo', input: e.target.previousElementSibling })}
                    />
                </div>
            </div>
            <div id="doing" className="itemBox">
                <h3>Doing</h3>
                <div
                    className="flex-grow"
                    onDrop={() => dispatch({ type: 'onDrop', list: 'doing' })}
                    onDragOver={(e) => onDragOver(e)}>
                    {todoList.doing &&
                        todoList.doing.map((item, index) => (
                            <div
                                className="item"
                                onDragStart={() =>
                                    dispatch({ type: 'onDrag', list: 'doing', index: index, item: item })
                                }
                                key={index}
                                draggable>
                                {item}
                            </div>
                        ))}
                </div>
                <div className="boxFooter">
                    <input type="text"></input>
                    <box-icon
                        name="plus"
                        color="white"
                        onClick={(e) =>
                            dispatch({ type: 'add', list: 'doing', input: e.target.previousElementSibling })
                        }
                    />
                </div>
            </div>
            <div id="done" className="itemBox">
                <h3>Done</h3>
                <div
                    className="flex-grow"
                    onDrop={() => dispatch({ type: 'onDrop', list: 'done' })}
                    onDragOver={(e) => onDragOver(e)}>
                    {todoList.done &&
                        todoList.done.map((item, index) => (
                            <div
                                className="item"
                                onDragStart={() => dispatch({ type: 'onDrag', list: 'done', index: index, item: item })}
                                key={index}
                                draggable>
                                {item}
                            </div>
                        ))}
                </div>
                <div className="boxFooter">
                    <input type="text"></input>
                    <box-icon
                        name="plus"
                        color="white"
                        onClick={(e) => dispatch({ type: 'add', list: 'done', input: e.target.previousElementSibling })}
                    />
                </div>
            </div>
        </div>
    )
}
