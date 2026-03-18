import "./Color-selector.css";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";

function ColorSelector({
  color,
  selected,
  onclickHandler,
  colorPicker = false,
}) {
  const [colorPickerColor, setColorPickerColor] = useState("#ff00ff");

  const colorPickerHandler = (e) => {
    setColorPickerColor(e.target.value);
    onclickHandler(e.target.value);
  };

  if (colorPicker) {
    return (
      <>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            width: "170px",
            textAlign: "right",
          }}
        >
          <FormLabel>Custom:</FormLabel>

          <button
            className={
              "color-selector " + (selected ? "with-border" : "no-border")
            }
            onClick={() => onclickHandler(colorPickerColor)}
            style={{ backgroundColor: colorPickerColor }}
          >
            <input
              type="color"
              id="body"
              name="body"
              value={colorPickerColor}
              onChange={colorPickerHandler}
            />
          </button>
        </div>
      </>
    );
  }

  return (
    <button
      className={"color-selector " + (selected ? "with-border" : "no-border")}
      style={{ backgroundColor: color }}
      onClick={onclickHandler}
    ></button>
  );
}

export default ColorSelector;
