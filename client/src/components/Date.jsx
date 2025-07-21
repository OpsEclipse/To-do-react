import "../index.css";
import React from "react";

export const DateDisplay = () => {
    const current = new Date();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[current.getDay()];

    const date = current.getDate();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[current.getMonth()];

    return (
        <section className="dateSection">
            <h2>{day}</h2>
            <div className="circle">
                <h1>{date}</h1>
            </div>
            <h3>{month}</h3>
        </section>
    );
};