import './Home.scss'
import {useRef, useEffect, useReducer} from 'react'
let isStarting = true

export default function Home() {
    // localStorage.clear()
    const dragItem = useRef()
    const initialState = {todo: [], doing: [], done: []}
    const [todoList, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (isStarting) {
            isStarting = false
            if (localStorage.getItem('todoList')) {
                const data = JSON.parse(localStorage.getItem('todoList'))
                dispatch({type: 'set', data: data})
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
            case 'rem':
                todoList[action.list].splice(action.index, 1)
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

    const ItemBox = ({title, list}) => {
        return (
            <div className="itemBox">
                <h3>{title}</h3>
                <div
                    className="flex-grow"
                    onDrop={() => dispatch({type: 'onDrop', list: list})}
                    onDragOver={(e) => onDragOver(e)}>
                    {todoList[list] &&
                        todoList[list].map((item, index) => (
                            <div
                                className="item"
                                onDragStart={() => dispatch({type: 'onDrag', list: list, index: index, item: item})}
                                key={index}
                                draggable>
                                {item}
                                <i
                                    className="bx bx-trash"
                                    onClick={() => dispatch({type: 'rem', list: list, index: index})}
                                />
                            </div>
                        ))}
                </div>
                <div className="boxFooter">
                    <input type="text"></input>
                    <i
                        className="bx bx-plus"
                        onClick={(e) => dispatch({type: 'add', list: list, input: e.target.previousElementSibling})}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="homeContent">
            <ItemBox title="ToDo" list="todo" />
            <ItemBox title="Doing" list="doing" />
            <ItemBox title="Done" list="done" />
        </div>
    )
}
