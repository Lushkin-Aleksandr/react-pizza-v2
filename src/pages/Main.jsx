import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockLoader from "../components/PizzaBlock/PizzaBlockLoader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../Pagination/Pagination";
import {SearchContext} from "../App";

const Main = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности (desc)',
        sortProperty: 'rating'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const {searchValue} = useContext(SearchContext);


    const loaders = new Array(4).fill(<PizzaBlockLoader/>);
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);


    useEffect(() => {
        const category = categoryIndex ? `&category=${categoryIndex}` : '';
        const sort = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';
        const page = `&page=${currentPage}&limit=4`

        setIsLoading(true);
        fetch(`https://62a23032cc8c0118ef5e8d7c.mockapi.io/items?sortBy=${sort}&order=${order}${category}${search}${page}`)
            .then((response) => response.json())
            .then(json => {
                setItems(json);
                setIsLoading(false);
            })
        window.scroll(0, 0)
    }, [categoryIndex, sortType, searchValue, currentPage])

    return (
        <div className='container'>
            <div className="content__top">
                <Categories value={categoryIndex} onChangeCategory={(i) => setCategoryIndex(i)}/>
                <Sort value={sortType} onChangeSortType={(sortItem) => setSortType(sortItem)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? loaders : pizzas}
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
};

export default Main;