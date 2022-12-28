import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const Uploader = () => {
  const [file, setFile] = useState(null);
  const [originColumn, setOriginColumn] = useState([]);
  const [targetColumn, setTargetColumn] = useState([]);
  const [showSegments, setShowSegments] = useState(false);
  const [isTmx, setIsTmx] = useState(true);

  const handleChange = (event) => {        
    const reader = new FileReader();

    // Check that the file is a TMX file
    let fileName = event.target.files[0].name;
    let fileExtension = fileName.substring(fileName.length-4);
    if(fileExtension == '.tmx'){
      reader.onload = (event) => {
        setFile(event.target.result);
      }  
      reader.readAsText(event.target.files[0]);
    } else {
      console.log('this is it');
      setIsTmx(false);
    }
  }
  
  const showSegmentsClick = () => {
    setShowSegments(true);
  }

  useEffect(() => {
    if (file!=null){      
      segmentExtractor(file);      
    }
  },[file])

  const createTable = (originArr, targetArr) => {
    return(
      <div>
        <table>
          <thead>
            {
              originArr.map((element, index) => {
                if(index == 0){
                  return(                  
                    <tr key={index}>
                      <th>
                        {element}
                      </th>
                      <th>
                        {targetArr[index]}
                      </th>
                    </tr>                  
                  )
                }
              })
            }
          </thead>
          <tbody>
          {
              originArr.map((element, index) => {
                if(index == 0){
                  return;
                } else {
                  return(
                    <tr key={index}>
                      <td>{element}</td>
                      <td>{targetArr[index]}</td>
                    </tr>
                  )
                }
              })
            }
          </tbody>
        </table>
        <button onClick={resetUpload} >Upload another file</button>
      </div>
    )
  }

  const segmentExtractor = (tmx) => {
    
    // Capture origin and target language
    let originLangStart = tmx.indexOf('xml:lang="');
    let originLangEnd = tmx.indexOf('">', originLangStart);
    let originLang = tmx.substring(originLangStart + 10, originLangEnd);
    originColumn.push(originLang.toLowerCase());

    let targetLangStart = tmx.indexOf('lang="', originLangEnd);
    let targetLangEnd = tmx.indexOf('">', targetLangStart);
    let targetLang = tmx.substring(targetLangStart + 6, targetLangEnd);
    targetColumn.push(targetLang.toLowerCase());
    
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


  }

  const resetUpload = () => {
    setFile(null);
    setShowSegments(false);
    setOriginColumn([]);
    setTargetColumn([]);
  }


  return(
    <div>
      <h3>This will upload a file</h3>      
      { !file && <input type='file' accept='.tmx' onChange={handleChange} />}
      { !isTmx && <p>Select a valid .tmx file.</p> }
      { showSegments ? createTable(originColumn, targetColumn) : file ? <button onClick={showSegmentsClick} >Show segments</button> : "" }
    </div>
  )
  
}

export default Uploader;