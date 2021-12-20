import React from "react";
import styles from "./Pagination.module.css";

type propsType = {
    onPageChanged: (currentPage: number) => void
    currentPage: number,
    totalUsersCount: number,
    pageSize: number
}

export const Pagination = (props: propsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        {pages.slice(0, 10).map(t => {
            return <span
                style={{cursor: 'pointer', paddingRight: 2}}
                className={props.currentPage === t && styles.activePage || ''}
                onClick={() => {
                    props.onPageChanged(t)
                }}
            >{t}</span>
        })}
    </div>
}