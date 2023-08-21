import React from "react";
import {useNavigate} from "react-router-dom";
import "./DiaryItem.css";
import {getEmotionImgById} from "../util";
import Button from "./Button";

const DiaryItem = ({id, emotionId, content, date}) => {
    const navigate = useNavigate();

    // 이미지 섹션 클릭 시 상세 페이지 호출
    const goDetail = () => {
        navigate(`/diary/${id}`);
    };

    // 수정 하기 페이지 호출
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="DiaryItem">

            {/*이미지 섹션*/}
            <div onClick={goDetail}
                 className={["img_section", `img_section_${emotionId}`].join(" ")}>
                <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)}/>
            </div>

            {/*내용 섹션*/}
            <div onClick={goDetail} className="info_section">
                <div className="date_wrapper">
                    {new Date(parseInt(date)).toLocaleDateString()}
                </div>
                {/*일기 내용은 25자까지만 표현*/}
                <div className="content_wrapper">{content.slice(0, 25)}</div>
            </div>

            {/*수정 섹션*/}
            <div className="button_section">
                <Button onClick={goEdit} text={"수정하기"}/>
            </div>
        </div>
    );
};

export default React.memo(DiaryItem);