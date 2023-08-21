import './App.css';
import {Route, Routes} from "react-router-dom";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Home from "./pages/Home";
import React, {useEffect, useReducer, useRef, useState} from "react";

// 목업
const mockData = [
    {
        id: "mock1",
        date: new Date().getTime() - 1,
        content: "mock1",
        emotionId: 1,
    },
    {
        id: "mock2",
        date: new Date().getTime() - 2,
        content: "mock2",
        emotionId: 2,
    },
    {
        id: "mock3",
        date: new Date().getTime() - 3,
        content: "mock3",
        emotionId: 3,
    },
];


function reducer(state, action) {
    switch (action.type) {
        case "CREATE":
            return [action.data, ...state];
        case "UPDATE":
            return state.map((it) =>
                String(it.id) === String(action.data.id) ? {...action.data} : it);
        case "DELETE":
            return state.filter((it) => String(it.id) !== String(action.targetId));
        case "INIT":
            return action.data;
        default:
            return state;
    }
}

function App() {

    // isDataLoaded = 데이터 로딩이 완료되면 기능 수행, false = 로딩 안됨
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [data, dispatch] = useReducer(reducer, []);
    const idRef = useRef(0);

    // 초기 값 설정, 목 데이터 호출
    useEffect(() => {
        dispatch({
            type: "INIT",
            data: mockData,
        });
        setIsDataLoaded(true);
    }, []);

    // 새글 작성 onCreate
    const onCreate = (date, content, emotionId) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current,
                date: new Date(date).getTime(),
                content,
                emotionId,
            },
        });
        // 새글 작성 시 아이디 중복 방지
        idRef.current += 1;
    };

    // 글 수정 기능 onUpdate
    const onUpdate = (targetId, date, content, emotionId) => {
        dispatch({
            type: "UPDATE",
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotionId,
            },
        });
    };

    // 글 삭제 기능 onDelete
    const onDelete = (targetId) => {
        dispatch({
            type: "DELETE",
            targetId,

        });
    };

    if (!isDataLoaded) {
        return <div>데이터를 불러오는 중입니다.</div>
    } else {
        return (
            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/new" element={<New/>}/>
                            <Route path="/diary/:id" element={<Diary/>}/>
                            <Route path="/edit/:id" element={<Edit/>}/>
                        </Routes>
                    </div>
                </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>

        );
    }
}

// state 값 전달
export const DiaryStateContext = React.createContext();

// 생성 수정 삭제 기능 전달
export const DiaryDispatchContext = React.createContext();

export default App;
