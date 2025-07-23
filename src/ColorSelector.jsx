import './Color-selector.css'
import FormLabel from '@mui/material/FormLabel';
import {useState} from "react"

function ColorSelector({color, selected, onclickHandler, colorPicker = false}) {
    
    const [colorPickerColor, setColorPickerColor] = useState("#ff00ff")

    const colorPickerHandler = (e) => {
        console.log("color picker changed");
        console.log(e);

        setColorPickerColor(e.target.value);

        onclickHandler(e.target.value);
    }

    if(colorPicker) {
        return <>
            <div style={{ display:"inline-block", verticalAlign:"top",width:"170px", textAlign:"right" }}><FormLabel>Custom:</FormLabel>


            

        <button className={"color-selector " + (selected ? "with-border" : "no-border")} onClick={(e) => onclickHandler(colorPickerColor)} 
        style={{backgroundColor: colorPickerColor}}
        ><input type="color" id="body" name="body" value={colorPickerColor} onChange={colorPickerHandler}/></button>

</div>

        </>
        
    }

    // <span>{colorPickerColor}</span>

    return <button className={"color-selector " + (selected ? "with-border" : "no-border")}
            style={{backgroundColor: color}}
            onClick={onclickHandler}
            >
        </button>
}

export default ColorSelector;