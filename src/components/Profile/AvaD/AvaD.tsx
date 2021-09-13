import classes from "./AvaD.module.css";
import React from "react";

export const AvaD = () => {
    return (
        <div className={classes.avaD}>
            <div className={classes.ava}>
                <img
                    src="https://pristor.ru/wp-content/uploads/2020/03/%D0%90%D0%B2%D0%B0-%D0%B2-%D0%B2%D0%BA-%D0%B2-%D0%BE%D1%82%D0%BF%D1%83%D1%81%D0%BA%D0%B5-%D0%BE%D1%87%D0%B5%D0%BD%D1%8C-%D0%BF%D1%80%D0%B8%D0%BA%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-2.jpg"
                    alt=""/>
            </div>
            <div className={classes.d}>
                <div>Фамилия: Царик</div>
                <div> Имя: Денис</div>
                <div>Дата рождения: 14.10.1993</div>
                <div> Город: Островец</div>
                <div>Место работы: АО "Атомтехэнерго"</div>
            </div>
        </div>
    )
}