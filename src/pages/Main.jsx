import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockLoader from "../components/PizzaBlock/PizzaBlockLoader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../Pagination/Pagination";
import {SearchContext} from "../App";
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from 'redux/slices/filterSlice';
import axios from 'axios';

const Main = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const dispatch = useDispatch();
    const categoryId = useSelector(state => state.filter.categoryId)
    const sortType = useSelector(state => state.filter.sort.sortProperty)
    
    const currentPage = useSelector(state => state.filter.currentPage)

    // const [currentPage, setCurrentPage] = useState(1);
    const { searchValue } = useContext(SearchContext);


    const loaders = new Array(4).fill(<PizzaBlockLoader/>);
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);


    useEffect(() => {
        const category = categoryId ? `&category=${categoryId}` : '';
        const sort = sortType.replace('-', '');
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';
        const page = `&page=${currentPage}&limit=4`

        
        setIsLoading(true);
        axios.get(`https://62a23032cc8c0118ef5e8d7c.mockapi.io/items?sortBy=${sort}&order=${order}${category}${search}${page}`)
            .then(res => {
                setItems(res.data);
                setIsLoading(false);
            })


        
        window.scroll(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])



    return (
        <div className='container'>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => dispatch(setCategoryId(i))}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? loaders : pizzas}
            </div>
            <Pagination currentPage={currentPage}/>
        </div>
    )
};

export default Main;