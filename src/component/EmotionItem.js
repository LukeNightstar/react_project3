import "./EmotionItem.css"

// 감정 이미지 선택 기능 구현
const EmotionItem = ({id, img, name, onClick, isSelected}) => {
    const handleOnClick = () => {
        onClick(id);
    };

    return (
        <div className={[
            "EmotionItem",
            isSelected ? 'EmotionItem_on_$(id)' : 'EmotionItem_off',
        ].join(" ")} onClick={handleOnClick}>
            <img alt={'emotions$(id)'} src={img}/>
            <span>{name}</span>
        </div>
    );
};

export default EmotionItem;