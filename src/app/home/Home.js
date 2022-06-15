import './Home.scss'
import {useRef, useEffect, useReducer} from 'react'

const initialState = {todo: [], doing: [], done: []}
const KEY_SET = 'KEY_SET',
    KEY_ONDRAG = 'KEY_ONDRAG',
    KEY_ONDROP = 'KEY_ONDROP',
    KEY_ADD = 'KEY_ADD',
    KEY_REMOVE = 'KEY_REMOVE'

export default function Home() {
    // localStorage.clear()
    const dragItem = useRef()
    const [todoList, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (localStorage.getItem('todoList')) {
            const data = JSON.parse(localStorage.getItem('todoList'))
            dispatch({type: KEY_SET, data})
        }
    }, [])

    function reducer(todoList, action) {
        let tmp, newState
        switch (action.type) {
            case KEY_SET:
                newState = {...todoList, ...action.data}
                break
            case KEY_ONDRAG:
                dragItem.current = action.item
                todoList[action.list].splice(action.index, 1)
                localStorage.setItem('todoList', JSON.stringify(todoList))
                return todoList
            case KEY_ONDROP:
                tmp = todoList[action.list]
                if (dragItem.current !== null && dragItem.current !== undefined) {
                    tmp.push(dragItem.current)
                }
                newState = {...todoList, [action.list]: tmp}
                break
            case KEY_ADD:
                const newItem = action.input.value.trim()
                tmp = todoList[action.list]
                if (newItem !== '') {
                    tmp.push(newItem)
                    action.input.value = ''
                }
                newState = {...todoList, [action.list]: tmp}
                break
            case KEY_REMOVE:
                tmp = todoList[action.list]
                tmp.splice(action.index, 1)
                newState = {...todoList, [action.list]: tmp}
                break
            default:
                return todoList
        }
        localStorage.setItem('todoList', JSON.stringify(newState))
        return newState
    }

    function onDragOver(e) {
        e.preventDefault()
    }

    const ItemBox = ({title, list}) => {
        return (
            <div className="itemBox">
                <h3>{title}</h3>
                <div
                    className="flex-grow"
                    onDrop={() => dispatch({type: KEY_ONDROP, list})}
                    onDragOver={(e) => onDragOver(e)}>
                    {todoList[list] &&
                        todoList[list].map((item, index) => (
                            <div
                                className="item"
                                onDragStart={() => dispatch({type: KEY_ONDRAG, list, index, item})}
                                key={index}
                                draggable>
                                {item}
                                <i className="bx bx-trash" onClick={() => dispatch({type: KEY_REMOVE, list, index})} />
                            </div>
                        ))}
                </div>
                <div className="boxFooter">
                    <input type="text"></input>
                    <i
                        className="bx bx-plus"
                        onClick={(e) => dispatch({type: KEY_ADD, list, input: e.target.previousElementSibling})}
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
