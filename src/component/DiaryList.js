import { useState, useEffect } from "react";
import Button from "./Button";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

// 상단 정렬 기능 구현용 state
const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
];

const DiaryList = ({ data }) => {

    // 경로 설정용
    const navigate = useNavigate();
    //  필터링 초기 값 = 최신순
    const [sortType, setSortType] = useState("latest");
    // 정렬된 일기 리스트 페이지 렌더링을 위한 데이터 관리
    const [sortedData, setSortedData] = useState([]);

    // 정렬된 일기 데이터 업데이트
    useEffect(() => {
        const compare = (a, b) => {
            if (sortType === "latest") {
                return Number(b.date) - Number(a.date);
            } else {
                return Number(a.date) - Number(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList);
    }, [data, sortType]);

    // sorttype event handler
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    // 새글 쓰기 경로 설정
    const onClickNew = () => {
        navigate("/new");
    };

    return (
        <div className="DiaryList">
            
            {/*상단부 메뉴 구현*/}
            <div className="menu_wrapper">
                
                {/*좌측부*/}
                <div className="left_col">
                    {/*필터링 구현*/}
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((it, idx) => (
                            <option key={idx} value={it.value}>
                                {it.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/*우측부*/}
                <div className="right_col">
                    <Button
                        type={"positive"}
                        text={"새 일기 쓰기"}
                        onClick={onClickNew}
                    />
                </div>
            </div>

            {/*정렬된 일기 리스트 출력*/}
            <div className="list_wrapper">
                {sortedData.map((it) => (
                    <DiaryItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );
};
export default DiaryList;