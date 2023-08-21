import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import Button from "../component/Button";
import Header from "../component/Header";
import { getMonthRangeByDate } from "../util";
import DiaryList from "../component/DiaryList";

const Home = () => {
    
    // 날짜에 따라 일기 필터링을 위한 일기 데이터 호출 변수
    const data = useContext(DiaryStateContext);
    // Date 객체의 State 초기 값 = 현재 날짜
    const [pivotDate, setPivotDate] = useState(new Date());
    const headerTitle = `${pivotDate.getFullYear()}년 ${
        pivotDate.getMonth() + 1
    }월`;
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (data.length >= 1) {
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter(
                    (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
                )
            );
        } else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    // pivotDate의 값을 한달 후로 업데이트
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
    
    // pivotDate의 값을 한달 전으로 업데이트
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };
    
    return (
        <div>
            <Header
                title={headerTitle}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
                rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
            />
            {/*diary List를 HOME 컴포넌트의 자식으로 배치 후 Props로 필터링된 일기 데이터 전송*/}
            <DiaryList data={filteredData} />
        </div>
    );
};
export default Home;