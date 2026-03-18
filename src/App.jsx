import { useState, useRef, useEffect } from "react";
import Separator from "./Separator";
import ColorSelector from "./ColorSelector";
import StyleSelector from "./StyleSelector";
import LogoSelector from "./LogoSelector";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import gmailLogo from "./assets/gmail.svg";
import uploadLogo from "./assets/upload.svg";
import QRCodeStyling from "qr-code-styling";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./AppReset.css";
import "./App.css";

let colors = ["#000000", "#2196f3", "#ff9800", "#f44336", "#4caf50", "#ff00ff"];

const dotStyles = ["square", "dots", "classy", "rounded"];
const cornerStyles = ["dot", "square"];

function App() {
  const fileInputRef = useRef(null);
  const previewImgRef = useRef(null);
  const [fileFormat, setFileFormat] = useState("jpg");
  const [selectedColor, setSelectedColor] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);
  const [selectedLogo, setSelectedLogo] = useState([
    false,
    false,
    false,
    true,
    false,
  ]);
  const [selectedStyle, setSelectedStyle] = useState([true, false, false, false]);

  const [selectedCorner, setSelectedCorner] = useState([true, false]);

  let initialLogos = [viteLogo, reactLogo, gmailLogo, "", uploadLogo];

  const [logos, setLogos] = useState(initialLogos);

  const [qrCodeText, setQRCodeText] = useState("http://drive.google.com");

  const handleSelectedCorner = (index) => {
    let s = [false, false];
    s[index] = true;
    setSelectedCorner(s);
  };

  const ref = useRef(null);
  const qrCode = new QRCodeStyling({
    width: 400,
    height: 400,
    image: logos[selectedLogo.indexOf(true)],
    dotsOptions: {
      color: colors[selectedColor.indexOf(true)],
      type: dotStyles[selectedStyle.indexOf(true)],
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20,
    },
    cornersSquareOptions: {
      type: cornerStyles[selectedCorner.indexOf(true)],
      color: colors[selectedColor.indexOf(true)],
    },

    cornersDotOptions: {
      type: cornerStyles[selectedCorner.indexOf(true)],
      color: colors[selectedColor.indexOf(true)],
    },
  });

  useEffect(() => {
    qrCode.append(ref.current);
  }, [
    qrCodeText,
    selectedColor,
    selectedStyle,
    fileFormat,
    selectedLogo,
    logos,
    selectedCorner,
  ]);

  useEffect(() => {
    qrCode.update({
      data: qrCodeText,
    });
  }, [
    qrCodeText,
    selectedColor,
    selectedStyle,
    fileFormat,
    selectedLogo,
    logos,
    selectedCorner,
  ]);

  const handleFileFormatChange = (e) => {
    setFileFormat(e);
  };

  const handleDownloadQRCode = () => {
    let extension = "jpg";
    let contentType = "image/jpeg";

    if (fileFormat == "png") {
      contentType = "image/png";
      extension = "png";
    } else if (fileFormat == "webp") {
      contentType = "image/webp";
      extension = "webp";
    } else if (fileFormat == "svg") {
      contentType = "image/svg+xml";
      extension = "svg";
    }
    qrCode.download({
      extension: extension,
    });
  };

  const handleSelectedColor = (index) => {
    let availableColors = [false, false, false, false, false];
    availableColors[index] = true;

    if (!parseInt(index)) {
      colors[5] = index;
      availableColors[5] = true;
    }

    setSelectedColor(availableColors);
  };

  const handleLogoSelected = (index) => {
    let availableLogos = [false, false, false, false, false];
    availableLogos[index] = true;

    setSelectedLogo(availableLogos);
  };

  const handleSelectedStyle = (index) => {
    let availableStyles = [false, false, false, false, false];
    availableStyles[index] = true;

    setSelectedStyle(availableStyles);
  };

  const handleFileUploadClicked = () => {
    fileInputRef.current.click();
    handleLogoSelected(4);
  };

  const handleFileUpload = (e) => {
    let uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previewImgRef.current.src = event.target.result;

        let auxLogo = initialLogos;
        auxLogo[4] = event.target.result;

        setLogos(auxLogo);
      };

      reader.readAsDataURL(uploadedFile);
    } else {
      previewImgRef.current.src = "";
    }
  };

  return (
    <>
      <div id="content">
        <div id="qrcode" className={"flex-item"}>
          <div ref={ref} />
        </div>

        <div
          id="controls"
          className={"flex-item"}
          style={{ textAlign: "left" }}
        >
          <Typography variant="h3">Generate QR Code</Typography>
          <hr />
          <br />
          <FormLabel>Text</FormLabel>
          <br />
          <TextField
            id="outlined-basic"
            label=""
            value={qrCodeText}
            variant="outlined"
            onChange={(e) => setQRCodeText(e.target.value)}
            style={{ width: "100%" }}
          />
          <Separator />
          <FormLabel>Dots Style</FormLabel>
          <br />
          <StyleSelector
            type="square"
            selected={selectedStyle[0]}
            onclickHandler={() => handleSelectedStyle(0)}
          />
          <StyleSelector
            type="dots"
            selected={selectedStyle[1]}
            onclickHandler={() => handleSelectedStyle(1)}
          />
          <StyleSelector
            type="classy"
            selected={selectedStyle[2]}
            onclickHandler={() => handleSelectedStyle(2)}
          />
          <StyleSelector
            type="rounded"
            selected={selectedStyle[3]}
            onclickHandler={() => handleSelectedStyle(3)}
          />
          <Separator />
          <FormLabel>Corner Style</FormLabel>
          <br />
          <StyleSelector
            type="corner-dots"
            selected={selectedCorner[0]}
            onclickHandler={() => handleSelectedCorner(0)}
          />
          <StyleSelector
            type="corner-square"
            selected={selectedCorner[1]}
            onclickHandler={() => handleSelectedCorner(1)}
          />
          <Separator />
          <FormLabel>Color</FormLabel>
          <br />
          <ColorSelector
            color={colors[0]}
            selected={selectedColor[0]}
            onclickHandler={() => handleSelectedColor(0)}
          />
          <ColorSelector
            color={colors[1]}
            selected={selectedColor[1]}
            onclickHandler={() => handleSelectedColor(1)}
          />
          <ColorSelector
            color={colors[2]}
            selected={selectedColor[2]}
            onclickHandler={() => handleSelectedColor(2)}
          />
          <ColorSelector
            color={colors[3]}
            selected={selectedColor[3]}
            onclickHandler={() => handleSelectedColor(3)}
          />
          <ColorSelector
            color={colors[4]}
            selected={selectedColor[4]}
            onclickHandler={() => handleSelectedColor(4)}
          />
          {/* <ColorPicker/> */}
          <ColorSelector
            color={colors[5]}
            selected={selectedColor[5]}
            onclickHandler={handleSelectedColor}
            colorPicker={true}
          />
          <Separator />
          <FormLabel>Logo</FormLabel>
          <br />
          <LogoSelector
            logoName={"na"}
            selected={selectedLogo[3]}
            onclickHandler={() => handleLogoSelected(3)}
          />
          <LogoSelector
            logoName={"vite"}
            selected={selectedLogo[0]}
            onclickHandler={() => handleLogoSelected(0)}
          />
          <LogoSelector
            logoName={"react"}
            selected={selectedLogo[1]}
            onclickHandler={() => handleLogoSelected(1)}
          />
          <LogoSelector
            logoName={"gmail"}
            selected={selectedLogo[2]}
            onclickHandler={() => handleLogoSelected(2)}
          />
          <input
            node="image"
            node-data-field="files"
            id="form-image-file"
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileUpload}
          ></input>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="outlined"
            onClick={handleFileUploadClicked}
            style={{
              lineHeight: "40px",
              marginTop: "2px",
              display: "inline-block",
              verticalAlign: "top",
              textAlign: "right",
            }}
          >
            Upload Custom
          </Button>
          <LogoSelector
            logoName={"upload"}
            selected={selectedLogo[4]}
            onclickHandler={() => handleLogoSelected(4)}
            imgSrc={logos[4]}
            hidden={logos[4] == uploadLogo}
          />
          <img
            style={{ width: "42px", height: "42px", display: "none" }}
            ref={previewImgRef}
          />
          <Separator />
          <FormLabel>File Format</FormLabel>
          <br />
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fileFormat}
              onChange={(e) => handleFileFormatChange(e.target.value)}
            >
              <MenuItem value="jpg">JPG</MenuItem>
              <MenuItem value="png">PNG</MenuItem>
              <MenuItem value="svg">SVG</MenuItem>
              <MenuItem value="webp">WEBP</MenuItem>
            </Select>
          </FormControl>
          <Separator />
          <br />
          <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
            <Button variant="outlined" onClick={handleDownloadQRCode}>
              Download
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
