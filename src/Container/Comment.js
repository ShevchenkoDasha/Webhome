import React from 'react';
import {useState, useEffect} from 'react';
import CommentList from "../Component/CommentList";
import Pagination from "../Component/Pagination";

function Comment() {

    const [comment, setComment] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(10);
    const [totalComments, setTotalComments] = useState(0);
    let portionSize = 10;

    const [formValid, setFormValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const [textValid, setTextValid] = useState(false);

    const [statusSend, setStatusSend] = useState('');

    useEffect(() => {
        fetch(`https://jordan.ashton.fashion/api/goods/30/comments`)
            .then(response => response.json())
            .then((response) => {
                    setIsLoaded(true);
                    setComment(response.data);
                    setTotalComments(response.total);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const paginate = (event) => {

        let pageNumber = currentPage;

        {
            if (event.target.classList.contains('btn')) {
                pageNumber = +currentPage + 1;
            } else {
                pageNumber = event.target.innerHTML;
            }
        }

        setCurrentPage(pageNumber);

        fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${pageNumber}`)
            .then(response => response.json())
            .then((response) => {
                setComment(response.data) //
            })
    }

    function formHandler(event) {
        event.preventDefault();

        let name = event.target.elements.name.value;
        let comment = event.target.elements.comment.value;
        console.log(name);
        console.log(comment);
        fetch('https://jordan.ashton.fashion/api/goods/30/comments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, text: comment})
        })
            .then(response => response.json())
            .then(response => {
                setStatusSend('Комментарий отправился')
            })
    }

    function changeHandler(event) {
        if (!event.target.classList.contains('dataToSend')) return;

        let checkField = event.target.name;
        switch (checkField) {
            case 'name':
                setNameValid(event.target.value !== '');
                break;
            case 'comment':
                setTextValid(event.target.value.length !== 0);
                break;
            default:
                break;
        }

        setFormValid(textValid && nameValid);

    }

    return (
        <>
            <form action="" className='form ' onSubmit={formHandler}>
                <h2>Написать комментарий</h2>
                <div className='flx comment'>
                    <p>Имя</p>
                    <input type="text" className='dataToSend' name='name' placeholder='Алла Покачалова'
                           onChange={changeHandler}/>
                </div>
                <div className='flx comment mb-40'>
                    <p>Комментарий</p>
                    <textarea className='dataToSend' name='comment' onChange={changeHandler}/>
                </div>
                <button type='submit' className='btn-send' disabled={!formValid}> Отправить</button>
                <p className='mt-3'>{statusSend}</p>
            </form>

            <h3>Комментарии</h3>

            <p className='describe-page'>Текущая страница {currentPage}</p>
            {currentPage < (totalComments / commentsPerPage) &&
            <button className="btn right" onClick={(event) => paginate(event)}>Показать еще</button>}

            <CommentList comment={comment} error={error} isLoaded={isLoaded}/>

            <div className="pagination-box flx">

                <Pagination totalComments={totalComments} commentsPerPage={commentsPerPage} currentPage={currentPage}
                            paginate={paginate} portionSize={portionSize}/>

            </div>
        </>
    )
}

export default Comment;