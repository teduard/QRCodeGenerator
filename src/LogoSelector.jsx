import "./LogoSelector.css";

import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import gmailLogo from "./assets/gmail.svg";
import naLogo from "./assets/na.svg";
import uploadLogo from "./assets/upload.svg";

function LogoSelector({
  logoName,
  selected,
  onclickHandler,
  imgSrc,
  hidden = false,
}) {
  function getLogoPath(logoName) {
    switch (logoName) {
      case "react":
        return reactLogo;
      case "gmail":
        return gmailLogo;
      case "na":
        return naLogo;
      case "upload":
        return uploadLogo;
      default:
      case "vite":
        return viteLogo;
    }
  }

  if (hidden) return <></>;

  return (
    <button
      className={"logo-selector " + (selected ? "with-border" : "no-border")}
      onClick={onclickHandler}
    >
      {imgSrc && <img src={imgSrc} width={30} height={30} />}
      {!imgSrc && <img src={getLogoPath(logoName)} width={30} height={30} />}
    </button>
  );
}

export default LogoSelector;
