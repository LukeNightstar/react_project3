import {useNavigate, useParams} from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import {getFormattedDate, setPageTitle} from "../util";
import Viewer from "../component/Viewer";
import {useEffect} from "react";

const Home = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const data = useDiary(id);

    // 돌아가기
    const goBack = () => {
        navigate(-1);
    };

    // 수정하기
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    // 일기 페이지 제목
    useEffect(() => {
        setPageTitle(`${id}번 일기`);
    }, []);
    
    // 일기 페이지
    if (!data) {
        return <div>일기를 불러오고 있습니다.</div>;
    } else {
        const {date, emotionId, content} = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;

        return (
            <div>
                <Header
                    title={title}
                    leftChild={<Button text={"< 뒤로 가기"} onClick={goBack}/>}
                    rightChild={<Button text={"수정하기"} onClick={goEdit}/>}
                />
                <div>
                    <div>{id}번 일기</div>
                    <div>Diary 페이지입니다</div>
                    <Viewer content={content} emotionId={emotionId}/>
                </div>
            </div>
        );
    }
};

export default Home;