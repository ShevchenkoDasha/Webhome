import React from 'react';
import {useState} from 'react';

function Pagination({totalComments, commentsPerPage, paginate,portionSize}) {

    const pageNumbers = [];
    let pageCount = Math.ceil(totalComments / commentsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }
    let portionCount = Math.ceil(pageCount/portionSize);
    let [portionNumber,setPortionNumber]  = useState(1)
    let leftPortionPageNumber = (portionNumber-1)*portionSize+1;
    let rightPortionPageNumber = portionNumber*portionSize;

    return (
        <>
            {
            portionNumber>1&&<button className='btn btn-prev' onClick={()=>{setPortionNumber(portionNumber-1)}}>
                Предыдущая
            </button>
        }
            <ul className='pagination' onClick={(event) => paginate(event)} >
                {
                    pageNumbers
                        .filter(item=> item>=leftPortionPageNumber && item<=rightPortionPageNumber)
                        .map(item => (
                        <li className='page-item page-line' key={item}>
                            <a href="!#" className="page-link">{item}</a>
                        </li>
                    ))
                }
            </ul>
            { portionCount>portionNumber && <button className='btn btn-next' onClick={()=>{setPortionNumber(portionNumber+1)}}>
                Следующая
            </button> }
        </>
    )
}

export default Pagination;