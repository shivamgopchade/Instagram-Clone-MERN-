import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import imageCompression from "browser-image-compression";

const CropImage = (props) => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 4 / 5 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [caption, Setcaption] = useState("");

  const selectImage = (file) => {
    console.log("original size", file.size);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    imageCompression(file, options)
      .then((x) => {
        console.log("reduced size", x.size);
        setSrc(URL.createObjectURL(x));
      })
      .catch((e) => console.log(e));
  };

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL("image/jpeg");
    setOutput(base64Image);
    props.Setfile(base64Image);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {!output && src && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            position: "absolute",
            height: "100%",
          }}
        >
          <ReactCrop
            src={src}
            onImageLoaded={setImage}
            crop={crop}
            onChange={setCrop}
            style={{
              padding: "5px",
              objectFit: "contain",
              height: "100%",
            }}
          />
          <div>
            <button onClick={cropImageNow} className="crop-btn">
              Crop
            </button>

            <div>
              <input
                type="file"
                accept="image/*"
                id="input-file-button"
                onChange={(e) => {
                  selectImage(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>
      )}
      <br />
      <br />
      {!output && !src && (
        <div>
          <input
            type="file"
            accept="image/*"
            id="input-file-button"
            onChange={(e) => {
              selectImage(e.target.files[0]);
            }}
          />
        </div>
      )}
      {output && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            width: "80vh",
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        >
          <img src={output} alt="output image" style={{ height: "100%" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <textarea
              onChange={(e) => props.HandleChange(e)}
              name="caption"
              id=""
              cols="30"
              rows="10"
              placeholder="caption"
              style={{
                backgroundColor: "#4E4E4E",
                color: "white",
                padding: "5px",
              }}
            ></textarea>
            <button className="crop-btn" onClick={props.HandleSubmit}>
              POST
            </button>
            <button
              className="crop-btn"
              onClick={() => {
                setOutput(null);
              }}
            >
              BACK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropImage;
