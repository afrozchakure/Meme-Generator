import React, { useEffect, useState } from "react";
import { Meme } from "./components/Meme";

const objectToQueryParam = (obj) => {
  // Object.entries used to destruct key-value
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

function App() {
  // Creating States
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((x) =>
      x.json().then((response) => setTemplates(response.data.memes))
    );
  }, []);

  if (meme) {
    return (
      <div style={{ textAlign: "center" }}>
        <img style={{ width: 300 }} src={meme} alt="custom meme" />
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center" }}>
      {/* If !template -> means if they have not selected 
      a template show them all the templates */}
      {template && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            // add logic to create meme from api

            const params = {
              template_id: template.id,
              text0: topText,
              text1: bottomText,
              username: "xzk03017",
              password: "xzk03017@cndps.com",
              font: "arial",
            };
            const response = await fetch(
              `https://api.imgflip.com/caption_image${objectToQueryParam(
                params
              )}`
            );
            const json = await response.json();
            setMeme(json.data.url); // url of the meme we created
            // console.log(data);
          }}
        >
          <Meme template={template} />
          <input
            placeholder="top text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
          />
          <input
            placeholder="bottom text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
          />
          <button type="submit">create meme</button>
        </form>
      )}
      {!template && (
        <>
          <h1>Pick a Template </h1>
          {templates.map((template) => {
            return (
              <Meme
                template={template}
                onClick={() => {
                  setTemplate(template);
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
