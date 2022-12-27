import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const Uploader = () => {
  const [file, setFile] = useState(null);
  const [originColumn, setOriginColumn] = useState([]);
  const [targetColumn, setTargetColumn] = useState([]);

  const handleChange = (event) => {        
    const reader = new FileReader();
    reader.onload = (event) => {
      setFile(event.target.result);
    }  
    reader.readAsText(event.target.files[0]);    
  }

  useEffect(() => {
    console.log(file);
    console.log(typeof(file));
  },[file])

  const languagesExtractor = (tmx, langArr) => {
    // Capture origin language
    let originLangStart = tmx.indexOf('xml:lang="');
    let originLangEnd = tmx.indexOf('">', originLangStart);
    let originLang = tmx.substring(originLangStart + 10, originLangEnd);
    langArr.push(originLang);

    let targetLangStart = tmx.indexOf('lang="', originLangEnd);
    let targetLangEnd = tmx.indexOf('">', targetLangStart);
    let targetLang = tmx.substring(targetLangStart + 6, targetLangEnd);
    langArr.push(targetLang);

    return langArr;
  }
  
  const segmentExtractor = (tmx) => {
    let origin = [];
    let target = [];
    
    // Capture origin and target language
    let originLangStart = tmx.indexOf('xml:lang="');
    let originLangEnd = tmx.indexOf('">', originLangStart);
    let originLang = tmx.substring(originLangStart + 10, originLangEnd);
    origin.push(originLang);

    let targetLangStart = tmx.indexOf('lang="', originLangEnd);
    let targetLangEnd = tmx.indexOf('">', targetLangStart);
    let targetLang = tmx.substring(targetLangStart + 6, targetLangEnd);
    target.push(targetLang);    

    console.log(origin);
    console.log(target);
  }


  return(
    <div>
      <h3>This will upload a file</h3>
      <input type='file' accept='.tmx' onChange={handleChange} />
      { file && <p>{file}</p> }
    </div>
  )
  
}

export default Uploader;