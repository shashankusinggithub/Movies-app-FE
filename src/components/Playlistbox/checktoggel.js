import React from 'react'
import axios from "axios";

function Checktoggel(props) {
    const [checked, setChecked] = React.useState(false);
    const addorremove=() => {
        setChecked(e => !e)
        if (!checked) {
            console.log({ playid: props.value, movie: props.movie })
            axios.post("selfplaylist/removefromplaylist", { playid: props.value, movie: props.movie })
        } if (checked) {
            console.log({ playid: props.value, movie: props.movie }, 'remove')
            axios.post("selfplaylist/addtoplaylist", { playid: props.value, movie: props.movie })
        }  
    
      
    }

return (
    <div> <input type="checkbox" id={props.value} onClickCapture={() => addorremove()} />
        <label className="inputplaylist"  >{props.label}</label></div>
)
}

export default Checktoggel