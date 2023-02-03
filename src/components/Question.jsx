import React from "react";

export default function Question(props) {

    const arr = props.incorrect
    arr.push(props.options)

    function isChecked(event) {
        // console.log(event.target.value)
        props.change(event.target.value)
    }

    return(
        <div className="question--element">
            <h1>{props.questions}</h1><br/>
            <input type="radio" name={`"answer${props.questions}"`} onChange={isChecked} value={arr[0]} />
            <label className="radio">{arr[0]}</label>
            <input type="radio" name={`"answer${props.questions}"`} onChange={isChecked} value={arr[1]} />
            <label className="radio">{arr[1]}</label>
            <input type="radio" name={`"answer${props.questions}"`} onChange={isChecked} value={arr[2]} />
            <label className="radio">{arr[2]}</label>
            <input type="radio" name={`"answer${props.questions}"`} onChange={isChecked} value={arr[3]} />
            <label className="radio">{arr[3]}</label>
            <hr/>
        </div>
    )
}
