import "./Editor.css"
import {useEffect, useState} from "react";
import {emotionList, getFormattedDate} from "../util";
import Button from "./Button";
import {useNavigate} from "react-router-dom";
import EmotionItem from "./EmotionItem";

const Editor = ({initData, onSubmit}) => {

    // 취소하기 - 뒤로 가기 이벤트 발생
    const navigate = useNavigate();
    const handleOnGoBack = () => {
        navigate(-1);
    };

    // 일기 입력 세션 저장 state
    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    // 날짜 입력 폼의 값 저장 state
    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: "",
    });

    // 날짜 변경 E 핸들러
    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    // Emotion state
    const handleChangeEmotion = (emotionId) => {
        setState({
            ...state,
            emotionId,
        });
    }

    // home 에서 받은 initdata를 state의 기본값으로 설정
    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date)))
            });
        }
    }, [initData]);

    // 작성 완료
    const handleSubmit = () => {
        onSubmit(state);
    };

    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date} onChange={handleChangeDate}/>
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem
                            key={it.id}
                            {...it}
                            onClick={handleChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea
                        placeholder="오늘은 어땠나요?"
                        value={state.content}
                        onChange={handleChangeContent}
                    />
                </div>
            </div>
            <div className="editor_section bottom_section">
                <Button text={"취소"} onClick={handleOnGoBack}/>
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit}/>
            </div>
        </div>
    );
};

export default Editor;