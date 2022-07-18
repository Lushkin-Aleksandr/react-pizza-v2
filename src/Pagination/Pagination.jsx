import React from 'react';
import RcPagination from 'rc-pagination';
import './Pagination.scss'
import { useDispatch } from 'react-redux';
import { setCurrentPage } from 'redux/slices/filterSlice';

const Pagination = ({currentPage}) => {
    const dispatch = useDispatch()
    return (
        <RcPagination
            current={currentPage}
            onChange={page => dispatch(setCurrentPage(page))}
            pageSize={4}
            total={10}/>
    );
};

export default Pagination;

