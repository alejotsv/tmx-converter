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
    if (file!=null){
      console.log(typeof(file));
      console.log(file);
      segmentExtractor(file);      
    }
  },[file])

  const segmentExtractor = (tmx) => {
    
    // Capture origin and target language
    let originLangStart = tmx.indexOf('xml:lang="');
    let originLangEnd = tmx.indexOf('">', originLangStart);
    let originLang = tmx.substring(originLangStart + 10, originLangEnd);
    originColumn.push(originLang);

    let targetLangStart = tmx.indexOf('lang="', originLangEnd);
    let targetLangEnd = tmx.indexOf('">', targetLangStart);
    let targetLang = tmx.substring(targetLangStart + 6, targetLangEnd);
    targetColumn.push(targetLang);
    
    // Set origin and target tag to locate segments
    let originTag = '<tuv xml:lang="' + originLang + '">';
    let targetTag = '<tuv xml:lang="' + targetLang + '">';
    
    // Push orginal segments to array
    let originTagPos = 0;
    let segStart = 0;
    let segEnd = 0;
    let tempO;
    while(originTagPos>=0){    
      originTagPos = tmx.indexOf(originTag, segEnd);
      if (originTagPos<0){
        break;
      }
      segStart = tmx.indexOf('<seg>', originTagPos) + 5;
      segEnd = tmx.indexOf('</seg>', originTagPos);
      tempO = tmx.substring(segStart, segEnd);      
      originColumn.push(tempO);
    }

    // Push target segments to array
    let targetTagPos = 0;
    segStart = 0;
    segEnd = 0;
    let tempT;
    while(targetTagPos>=0){    
      targetTagPos = tmx.indexOf(targetTag, segEnd);
      if (targetTagPos<0){
        break;
      }
      segStart = tmx.indexOf('<seg>', targetTagPos) + 5;
      segEnd = tmx.indexOf('</seg>', targetTagPos);
      tempT = tmx.substring(segStart, segEnd);      
      targetColumn.push(tempT);
    }
    
    
    console.log(originColumn);
    console.log(targetColumn);    

  }


  return(
    <div>
      <h3>This will upload a file</h3>
      <input type='file' accept='.tmx' onChange={handleChange} />
    </div>
  )
  
}

export default Uploader;