import React from 'react';
import RcPagination from 'rc-pagination';
import './Pagination.scss'

const Pagination = ({currentPage, setCurrentPage}) => {
    return (
        <RcPagination
            current={currentPage}
            onChange={page => setCurrentPage(page)}
            pageSize={4}
            total={10}/>
    );
};

export default Pagination;

