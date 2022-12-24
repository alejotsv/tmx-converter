import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const Uploader = () => {
  const [file, setFile] = useState(null);

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

  const languageExtractor = (tmx, startPos) => {
    
  }
  
  const segmentExtractor = (tmx, lang) => {

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