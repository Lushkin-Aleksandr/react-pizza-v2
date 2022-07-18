import React, {useContext} from 'react';
import styles from './Search.module.scss'
import {SearchContext} from "../../App";
import { useRef } from 'react';
import debounce from 'lodash.debounce';
import { useState } from 'react';
import { useCallback } from 'react';

const Search = () => {
    const [value, setValue] = useState('');
    const { setSearchValue } = useContext(SearchContext);

    const searchInputRef = useRef();
    
    const onClickClear = () => {
        setValue('');
        setSearchValue('');
        searchInputRef.current.focus();
    }

    //debounce позволяет отложить выполнение функции если предыдущий вызов был ранее назначенного таймера
    //useCallback позволяет не потерять ссылку на функцию при перерендере 
    const updateSearchValue = useCallback(debounce((str) => {
        setSearchValue(str);
    }, 400), [])

    const onChangeSearchInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }


    return (
        <div className={styles.root}>
            <svg className={styles.icon} enable-background="new 0 0 32 32" id="Editable-line" version="1.1"
                 viewBox="0 0 32 32">
                <circle cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke="#000000" stroke-linecap="round"
                        stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                <line fill="none" id="XMLID_44_" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                      stroke-miterlimit="10" stroke-width="2" x1="27" x2="20.366" y1="27" y2="20.366"/>
            </svg>
            {value && <svg className={styles.clearIcon}
                 onClick={onClickClear}
                 data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200"
                 xmlns="http://www.w3.org/2000/svg"><title/>
                <path
                    d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/>
            </svg>}
            <input
                ref={searchInputRef}
                className={styles.input}
                value={value}
                onChange={onChangeSearchInput}
                placeholder='Найти пиццу...'/>
        </div>
    );
};

export default Search;