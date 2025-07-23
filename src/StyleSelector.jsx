import './Style-selector.css'

import styleDots from './assets/style_dots.png'
import styleSquare from './assets/style_square.png'
import styleClassy from './assets/style_classy.png'
import styleRounded from './assets/style_rounded.png'
import styleCornerDots from './assets/style_corner_dots.png'
import styleCornerSquare from './assets/style_corner_square.png'

function StyleSelector({type, selected, onclickHandler}) {

        const getSrc = (type) => {
                switch(type) {
                        case "dots":
                                return styleDots;
                        case "square":
                                return styleSquare;
                        case "classy":
                                return styleClassy;
                        case "corner-dots":
                                return styleCornerDots;
                        case "corner-square":
                                return styleCornerSquare;
                        default:
                                return styleRounded;
                }
        }

    return <button className={"style-selector " + (selected ? "with-border" : "no-border")}
            onClick={onclickHandler}
            >
                <img src={getSrc(type)}/>
        </button>
}

export default StyleSelector;