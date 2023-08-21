import {useParams} from "react-router-dom";

const Home = () => {

    const {id} = useParams();
    console.log(id);

    return (
        <div>
            <div>{id}번 일기</div>
            <div>Diary 페이지입니다</div>
        </div>
    )
};

export default Home;