import Header from "../component/Header";
import {useNavigate} from "react-router-dom";
import Button from "../component/Button";
import Editor from "../component/Editor";
import {useContext, useEffect} from "react";
import {DiaryDispatchContext} from "../App";
import {setPageTitle} from "../util";

const New = () => {

    const {onCreate} = useContext(DiaryDispatchContext);
    const navigate = useNavigate();

    // 페이지 제목 설정
    useEffect(() => {
        setPageTitle("새 일기 쓰기")
    }, []);
    
    const goBack = () => {
        navigate(-1);
    };

    // 작성 완료
    const onSubmit = (data) => {
        const {date, content, emotionId} = data;
        onCreate(date, content, emotionId);
        navigate("/", {replace: true});
    };

    return (
        <div>
            <Header
                title={"새 일기 쓰기"}
                leftChild={<Button text={"< 뒤로 가기"} onClick={goBack}/>}
            />
            <Editor onSubmit={onSubmit}/>
        </div>
    )
};

export default New;