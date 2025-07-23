import { useState, useRef, useEffect } from 'react'
import Separator from './Separator'
import ColorSelector from './ColorSelector'
import StyleSelector from './StyleSelector'
import LogoSelector from './LogoSelector'
import './AppReset.css'
import './App.css'
//import { ColorPicker } from "material-ui-color";

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import gmailLogo from './assets/gmail.svg'
import naLogo from './assets/na.svg'
import uploadLogo from './assets/upload.svg'

import QRCodeStyling from "qr-code-styling";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {QRCodeCanvas, QRCodeSVG} from './qr_code'

import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

// select file format
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

let colors = [
  '#000000',
  '#2196f3',
  '#ff9800',
  '#f44336',
  '#4caf50',
  '#ff00ff'
]

const dotStyles = ['square', 'dots', 'classy', 'rounded'];
const cornerStyles = ["dot", "square"];

// dots: "dots",
// rounded: "rounded",
// classy: "classy",
// classyRounded: "classy-rounded",
// square: "square",
// extraRounded: "extra-rounded"

function App() {
  const fileInputRef = useRef(null);
  const previewImgRef = useRef(null);
  const [count, setCount] = useState(0)
  const [fileFormat, setFileFormat] = useState("jpg")
  const [selectedColor, setSelectedColor] = useState([true, false, false, false, false]);
  const [selectedLogo, setSelectedLogo] = useState([false, false, false, true, false]);
  const [selectedStyle, setSelectedStyle] = useState([true, false]);

  const [selectedCorner, setSelectedCorner] = useState([true, false]);
  
  let initialLogos = [viteLogo, reactLogo, gmailLogo, "", uploadLogo];

  const [logos, setLogos] = useState(initialLogos);

  const [qrCodeText, setQRCodeText] = useState("http://drive.google.com");
  const canvasRef = useRef(null);

 const handleSelectedCorner = (index) => { 
  console.log("corner: ", index);

    let s = [false,false];
    s[index] = true;
    setSelectedCorner(s);

 }

  //new qr code styling
  const ref = useRef(null);
  const qrCode = new QRCodeStyling({
    width: 400,
    height: 400,
    image:
      //"https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      //gmailLogo,
      logos[selectedLogo.indexOf(true)],
    dotsOptions: {
      color: colors[selectedColor.indexOf(true)],
      type: dotStyles[selectedStyle.indexOf(true)]
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20
    },
    "cornersSquareOptions": { "type": cornerStyles[selectedCorner.indexOf(true)], "color": colors[selectedColor.indexOf(true)] },
    
    "cornersDotOptions": { "type": cornerStyles[selectedCorner.indexOf(true)], "color": colors[selectedColor.indexOf(true)] },
  });

  useEffect(() => {
    qrCode.append(ref.current);
  }, [qrCodeText, selectedColor, selectedStyle,fileFormat, selectedLogo, logos, selectedCorner]);

  useEffect(() => {
    console.log("updated")
    qrCode.update({
      data: qrCodeText
    });
  }, [qrCodeText,selectedColor, selectedStyle,fileFormat, selectedLogo, logos, selectedCorner]);

  //end new qr code

  const handleFileFormatChange = (e) => {
    console.log("selected option:", e);
    setFileFormat(e);
  }

  function downloadStringAsFile(data, filename) {
    let a = document.createElement('a');
    a.download = filename;
    a.href = data;
    a.click();
  }

  const handleDownloadQRCode = (e) => {
    console.log("download button was clicked");
    console.log("generate QR Code with");
    console.log("text: ", qrCodeText);
    console.log("style type: ", selectedStyle.indexOf(true));
    console.log("color: ", selectedColor.indexOf(true));
    console.log("file format:", fileFormat);

    // const node = canvasRef.current;
    // if (node == null) {
    //     console.log("node is null");
    //   return;
    // }

    let extension = "jpg";
    let contentType = "image/jpeg";

    if(fileFormat == "png") {
      contentType = "image/png";
      extension = "png";
    } else if(fileFormat == "webp") {
      contentType = "image/webp";
      extension = "webp";
    } else if(fileFormat == "svg") {
      contentType = "image/svg+xml";
      extension = "svg";
    }
    console.log("extension = ", extension);

    // For canvas, we just extract the image data and send that directly.
    //const dataURI = node.toDataURL(contentType);

    //downloadStringAsFile(dataURI, 'qrcode-canvas.' + extension);

    qrCode.download({
      extension: extension
    });
  }

  const handleSelectedColor = (index) => {
    let availableColors = [false, false, false, false, false]
    availableColors[index] = true;

    console.log("in handleSelectedColor: " + index);

    if(!parseInt(index)) {
      colors[5] = index;
      availableColors[5] = true;
    }

    setSelectedColor(availableColors);

    console.log(colors);
  }

  const handleLogoSelected = (index) => {
    console.log("in handle selected logo");
    let availableLogos = [false, false, false, false, false]
    availableLogos[index] = true;

    setSelectedLogo(availableLogos);

    console.log("selectedLogo = ", selectedLogo);
  }

  const handleSelectedStyle = (index) => {
    let availableStyles = [false, false];
    availableStyles[index] = true;

    console.log("in handleSelectedStyle: " + index);

    setSelectedStyle(availableStyles);
  }
  
  const handleFileUploadClicked = (e) => {
    fileInputRef.current.click();
    handleLogoSelected(4);
  }

  const handleFileUpload = (e) => {
    console.log("file was uploaded");
    console.log(e.target.files[0]);

    let uploadedFile = e.target.files[0];
    if(uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log("img loaded:", event.target.result);
        previewImgRef.current.src = event.target.result;

        let auxLogo = initialLogos;
        auxLogo[4] = event.target.result;

        setLogos(auxLogo);

        //console.log("logos:", logos)

        //handleLogoSelected(4);

        //console.log("selectedLogo = ", selectedLogo);
      }

      reader.readAsDataURL(uploadedFile);
    } else {
      previewImgRef.current.src = '';
    }
  }

  return (
    <>
      <div id="content">
        <div id="qrcode" className={"flex-item"}>
          {/* <img id="qrcode-img"/> */}

          {false && <QRCodeCanvas 
            ref={canvasRef}
            value={qrCodeText}
            level={"H"}
            size={400}
            imageSettings={{
              width:400,
              height:400
            }}
            // bgColor='#fc0'
            fgColor={colors[selectedColor.indexOf(true)]}
            marginSize={0}   
          />}

        <div ref={ref} />
        </div>

        <div id="controls" className={"flex-item"} style={{textAlign:"left"}}>
          
          <Typography variant="h3">Generate QR Code</Typography>
          <hr/>
          <br/>


          <FormLabel>Text</FormLabel><br/>
          {/* <input type="text" value={qrCodeText} onChange={(e) => setQRCodeText(e.target.value)} style={{width:'100%'}}/> */}
          <TextField id="outlined-basic" label="" value={qrCodeText} variant="outlined" onChange={(e) => setQRCodeText(e.target.value)} style={{width:'100%'}} />
          <Separator/>

          <FormLabel>Dots Style</FormLabel><br/>
            <StyleSelector type="square" selected={selectedStyle[0]} onclickHandler={(e) => handleSelectedStyle(0)}/>
            <StyleSelector type="dots" selected={selectedStyle[1]} onclickHandler={(e) => handleSelectedStyle(1)}/>
            <StyleSelector type="classy" selected={selectedStyle[2]} onclickHandler={(e) => handleSelectedStyle(2)}/>
            <StyleSelector type="rounded" selected={selectedStyle[3]} onclickHandler={(e) => handleSelectedStyle(3)}/>
          <Separator/>

          <FormLabel>Corner Style</FormLabel><br/>
            <StyleSelector type="corner-dots" selected={selectedCorner[0]} onclickHandler={(e) => handleSelectedCorner(0)}/>
            <StyleSelector type="corner-square" selected={selectedCorner[1]} onclickHandler={(e) => handleSelectedCorner(1)}/>
          <Separator/>
          
          <FormLabel>Color</FormLabel><br/>
            <ColorSelector color={colors[0]} selected={selectedColor[0]} onclickHandler={(e) => handleSelectedColor(0)}/>
            <ColorSelector color={colors[1]} selected={selectedColor[1]} onclickHandler={(e) => handleSelectedColor(1)}/>
            <ColorSelector color={colors[2]} selected={selectedColor[2]} onclickHandler={(e) => handleSelectedColor(2)}/>
            <ColorSelector color={colors[3]} selected={selectedColor[3]} onclickHandler={(e) => handleSelectedColor(3)}/>
            <ColorSelector color={colors[4]} selected={selectedColor[4]} onclickHandler={(e) => handleSelectedColor(4)}/>
            {/* <ColorPicker/> */}

            <ColorSelector color={colors[5]} selected={selectedColor[5]} onclickHandler={handleSelectedColor} colorPicker={true}/>
            
            
          <Separator/>

          <FormLabel>Logo</FormLabel><br/>
          <LogoSelector logoName={"mcdonalds"} selected={selectedLogo[3]} onclickHandler={() => handleLogoSelected(3)}/>
            <LogoSelector logoName={"vite"} selected={selectedLogo[0]} onclickHandler={() => handleLogoSelected(0)}/>
            <LogoSelector logoName={"react"} selected={selectedLogo[1]} onclickHandler={() => handleLogoSelected(1)}/>
            <LogoSelector logoName={"gmail"} selected={selectedLogo[2]} onclickHandler={() => handleLogoSelected(2)}/>
            
            {/* <LogoSelector logoName={"upload"} selected={selectedLogo[4]} onclickHandler={() => handleLogoSelected(4)}/> */}
            
            
            <input node="image" node-data-field="files" id="form-image-file" type="file" hidden ref={fileInputRef}
              onChange={handleFileUpload}>

            </input>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
            <Button variant="outlined"
              onClick={handleFileUploadClicked} style={{lineHeight:"40px", marginTop:"2px", display:"inline-block", verticalAlign:"top", textAlign:"right"}}
            >Upload Custom</Button>
            
            
            
            {/* <LogoSelector logoName={"upload"} selected={selectedLogo[4]} onclickHandler={() => handleLogoSelected(4)}/> */}
            <LogoSelector logoName={"upload"} selected={selectedLogo[4]} onclickHandler={() => handleLogoSelected(4)} imgSrc={logos[4]} hidden={logos[4] == uploadLogo}/>

            <img style={{width:"42px",height:"42px", display:"none"}} ref={previewImgRef}/>
            <Separator/>

            <FormLabel>File Format</FormLabel><br/>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fileFormat}
              //label="Age"
              onChange={e => handleFileFormatChange(e.target.value)}
            >
              <MenuItem value="jpg">JPG</MenuItem>
              <MenuItem value="png">PNG</MenuItem>
              <MenuItem value="svg">SVG</MenuItem>
              <MenuItem value="webp">WEBP</MenuItem>
            </Select>
          </FormControl>
          <Separator/>

          <br/>
          {/* <button id="download" onClick={handleDownloadQRCode}>Download</button> */}
            <div style={{width:"100%",margin:"0 auto",textAlign:"center"}}>
                <Button variant="outlined" onClick={handleDownloadQRCode}>Download</Button>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
