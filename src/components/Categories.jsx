import React, {useState} from "react";

function Categories() {

    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

    const handleCategoryClick = index => {
        setActiveCategoryIndex(index);
    }

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]


    return (
        <div className="categories">
            <ul>
                {categories.map((value, i) => {
                    return <li key={value} onClick={() => handleCategoryClick(i)} className={activeCategoryIndex == i ? 'active' : ''}>{value}</li>
                })}
            </ul>
        </div>
    )
}

export default Categories;