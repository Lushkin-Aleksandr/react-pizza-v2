import React, { useContext, useEffect, useState } from 'react';
import Categories from "../components/Categories";
import Sort, { sortItems } from "../components/Sort";
import PizzaBlockLoader from "../components/PizzaBlock/PizzaBlockLoader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setFilters } from 'redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { fetchPizzas, selectPizzaData, setItems } from 'redux/slices/pizzaSlice';

const Main = () => {

    const [needRerender, setNeedRerender] = useState(false);
    const navigate = useNavigate();
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const dispatch = useDispatch();
    const { items, status } = useSelector(selectPizzaData);
    const {categoryId, sort: {sortProperty: sortType}, currentPage, searchValue} = useSelector(selectFilter);

    


    // Запрос на получение пицц
    const getPizzas = async () => {
        const category = categoryId ? `&category=${categoryId}` : '';
        const sort = sortType.replace('-', '');
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';
        const page = `&page=${currentPage}&limit=4`


        dispatch(fetchPizzas({
            sort,
            order,
            category,
            search,
            page
        }))
    }

    // Парсинг строки поиска
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sortObj = sortItems.find((elem) => elem.sortProperty === params.sortType)


            if (+params.categoryId === categoryId &&
                params.sortType === sortType &&
                +params.currentPage === currentPage) {
                setNeedRerender(true);
            }

            dispatch(setFilters({
                ...params,
                sort: sortObj
            }));

            isSearch.current = true;

        }

    }, [])

    // Формирование строки поиска из выбранных фильтров
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sortType,
                currentPage
            });

            navigate('?' + queryString);
        }

        isMounted.current = true;
    }, [categoryId, sortType, currentPage]);

    // Отправка запроса за пиццами
    useEffect(() => {
        window.scroll(0, 0)

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;

    }, [categoryId, sortType, searchValue, currentPage, needRerender])


    // Массив пицц-скелетонов
    const loaders = new Array(4).fill(null).map((item, i) => <PizzaBlockLoader key={i} />);
    // Массив реальных пицц    
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);


    return (
        <div className='container'>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => dispatch(setCategoryId(i))} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error'
                ? <div className='content__error'>
                    <h2>
                        Произошла ошибка <icon>😕</icon>
                    </h2>
                    <p>
                        Не удалось получить пиццы...
                    </p>
                </div>
                : <div className="content__items">
                    {status === 'loading' ? loaders : pizzas}
                </div>
            }


            <Pagination currentPage={currentPage} />
        </div>
    )
};

export default Main;