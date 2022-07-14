import {React, useState} from "react";
import style from '../styles/Paginado.module.css'
import { useSelector } from "react-redux";

export default function Paginado({pageFunction, data, current}){
    
    const allDogs = useSelector((state) => state.dogs)
    
    const [pageDisplayed, setPageDisplayed] = useState(3)
    const [maxPageDisplayed, setMaxPageDisplayed] = useState(3)
    const [minPageDisplayed, setMinPageDisplayed] = useState(0)
    
    const pageNumbers = []
    
    const max = Math.ceil(allDogs.length/data);

    for (let i = 1; i <= max; i++){
        pageNumbers.push(i)
    }

    const movePages = (page) => {
        if(page === pageNumbers?.length){
            movePagesPrevius(0)
            setMaxPageDisplayed(3);
            setMinPageDisplayed(0)
        } else {
            if(page === 0) page = pageNumbers?.length;
            let maxi = page + pageDisplayed - 1;
            let mini = maxi - pageDisplayed;
            setMaxPageDisplayed(maxi);
            setMinPageDisplayed(mini);
        }
    }

    const movePagesPrevius = (page) => {
        if (page === 1) movePages(0)
        else if (page <= 2 && page > 0){
            setMaxPageDisplayed(3);
            setMinPageDisplayed(0);
        } else {
            if(page === 0) page = 1;
            let maxi = page + pageDisplayed - 3;
            let mini = maxi - pageDisplayed;
            setMaxPageDisplayed(maxi)
            setMinPageDisplayed(mini)
        }
    }

    const handleClick = (page) => {
        movePages(page);
        pageFunction(page)
    }

    const firstPage = (e) => {
        e.preventDefault()
        movePages(1)
        pageFunction(1)
    } 

    const lastPage = (e) => {
        e.preventDefault()
        movePages(max - 1)
        pageFunction(max)
    }

    const previous = (e, page) => {
        e.preventDefault()
        movePagesPrevius(page);
        if(page === 1){
            pageFunction(pageNumbers?.length);
        }
             else pageFunction(page + 1)
    }

    const next = (e, page) => {
        e.preventDefault()
        movePages(page);
        if(page === pageNumbers?.length){
            pageFunction(1)
        } else {
            pageFunction(page + 1)
        }
    }

    const renderPageNumber = pageNumbers?.map((pages) => {
        if(pages < maxPageDisplayed + 1 && pages > minPageDisplayed - 1){
            return <li key={pages} id={pages} className={current === pages ? style.active : null} onClick={() => handleClick(pages)}>
                <ul className={style.listaPag}>{pages}</ul>
            </li>
        } else {
            return null;
        }
    })
    

    return(
            <nav className={style.all}>
                {renderPageNumber.length > 0 ?
                <ul className={style.listaPag}>
                <button className={style.previous} onClick={(e) => firstPage(e)} disabled={current <= 1}>First</button>
                <button className={style.previous} onClick={(e) => previous(e, current)} disabled={current <= 1}>Prev</button>
                    {renderPageNumber}
                <button className={style.next} onClick={(e) => next(e, current)} disabled={current >= max} >Next</button>
                <button className={style.next} onClick={(e) => lastPage(e)} disabled={current >= max} >Last</button>
                </ul> : <div className={style.loading}>
                    <img src="https://c.tenor.com/FawYo00tBekAAAAC/loading-thinking.gif" alt="" width="300px" height="250px"/>
                <p>Loading...</p>
                </div>
                
            }  
            </nav>
    )
}