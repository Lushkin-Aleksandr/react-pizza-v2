import React, {createContext, useState} from "react";
import './scss/app.scss';
import Header from "./components/Header";
import Main from "./pages/Main";
import {Routes, Route} from 'react-router-dom';
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

export const SearchContext = createContext({});

function App() {
    const [searchValue, setSearchValue] = useState('');



    return (
        <div className="wrapper">

            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path='/' element={<Main/>}/>
                            <Route path='/cart' element={<Cart/>}/>
                            <Route path='*' element={<NotFound/>}/>
                        </Routes>
                    </div>
                </div>
            </SearchContext.Provider>


        </div>
    );
}

export default App;
