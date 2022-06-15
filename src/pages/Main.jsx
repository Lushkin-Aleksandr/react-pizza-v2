import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockLoader from "../components/PizzaBlock/PizzaBlockLoader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

const Main = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://62a23032cc8c0118ef5e8d7c.mockapi.io/items')
            .then((response) => response.json())
            .then(json => {
                setItems(json);
                setIsLoading(false);
            })
        window.scroll(0, 0)
    }, [])

    return (
        <div className='container'>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? new Array(10).fill(<PizzaBlockLoader/>)
                    : items.map((obj) => {
                        return <PizzaBlock key={obj.id} {...obj} />
                    })}

            </div>
        </div>
    );
};

export default Main;