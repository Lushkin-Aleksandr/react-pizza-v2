import React, {useEffect, useState} from "react";
import './scss/app.scss';
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";
import PizzaBlockLoader from "./components/PizzaBlock/PizzaBlockLoader";
import Main from "./pages/Main";
import {Routes, Route} from 'react-router-dom';
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";


function App() {
    const [searchValue, setSearchValue] = useState('');


    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path='/' element={<Main searchValue={searchValue}/>} />
                        <Route path='/cart' element={<Cart/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>


        </div>
    );
}

export default App;
