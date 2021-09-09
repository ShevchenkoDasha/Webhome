import React from 'react';
import dateFormat from 'dateformat';

function CommentList({error, isLoaded, comment}) {

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <ul className="comment-block flx">
                {comment.map((item) => (
                    <li key={item.id}>
                        <div className="top flx">
                            <p className='name'>{item.name} </p>
                            <span>•</span>
                            <p>{dateFormat(item['created_at'], "mmmm dS, yyyy")}</p>
                        </div>
                        <p className='text'>{item.text}</p>
                    </li>
                ))}
            </ul>
        );
    }
}

export default CommentList