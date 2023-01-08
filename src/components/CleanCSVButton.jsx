import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { textEncoder } from 'text-encoding';

const CleanCSVButton = ({ arr }) => {   
  const [url, setUrl] = useState();
  const [dirtyUrl, setDirtyUrl] = useState();
  const [dirtySegments, setDirtySegments] = useState([]);

  const createCleanCSV = () => {    
    // Generate CSV file with clean segments
    // Convert to string separated by commas    
    const data = joinArr(arr);

    // Encode the data to windows-1252, to make it compatible with Excel
    const encoder = new TextEncoder('windows-1252');
    const encodedData = encoder.encode(data);
      
    // Create blob
    const blob = new Blob([encodedData], { type: 'text/csv;charset=windows-1252' });    
    // Create URL to download blob
    setUrl(URL.createObjectURL(blob));

    // Generate CSV file with dirty segments
    // Convert to string separated by commas   
    console.log(dirtySegments);
    const dirtyData = joinDirtyArr(dirtySegments);
    console.log('dirty Data: ' + dirtyData);

    // // Encode the data to windows-1252, to make it compatible with Excel      
    // const encodedDirtyData = encoder.encode(dirtyData);
      
    // // Create blob
    // const dirtyBlob = new Blob([encodedDirtyData], { type: 'text/csv;charset=windows-1252' });    
    // // Create URL to download blob
    // setDirtyUrl(URL.createObjectURL(dirtyBlob));
    // console.log(dirtyUrl);
  }

  // Function to create string with clean segments
  const joinArr = (array) => {
    let csvString = '';
    let originItem;
    let targetItem;   

    // Clean dirtySegments array
    setDirtySegments([]);

    // Set origin and target language in dirtySegments array
    dirtySegments.push([array[0][0]]);
    dirtySegments.push([array[1][0]]);

    for(let i=0; i<array[0].length; i++){
      originItem = array[0][i];
      targetItem = array[1][i];

      if(originItem.includes('{') || targetItem.includes('{') || originItem.includes('<') || targetItem.includes('<') || (originItem == targetItem)){
        let tempArr = [originItem, targetItem];
        dirtySegments.push(tempArr);
      } else {
        originItem = addQuotes(originItem);
        csvString += originItem + ',';        
        
        targetItem = addQuotes(targetItem);
        csvString += targetItem + '\n';
      }
    }    
    return csvString;
  }

  // Function to create string with dirty segments
  const joinDirtyArr = (array) => {
    console.log('THis is the array for the dirty data');
    console.log(array);
    let csvString = '';
    let originItem;
    let targetItem;

    for(let i=0; i<array[0].length; i++){
      originItem = array[0][i];
      targetItem = array[1][i];
      
      originItem = addQuotes(originItem);
      csvString += originItem + ',';        
        
      targetItem = addQuotes(targetItem);
      csvString += targetItem + '\n';      
    }    
    return csvString;
  }

  const addQuotes = (item) => {        
    if(item.includes('"')){
      item = item.replace(/\"/g, "\"\"");
    }
    item = '"' + item + '"';
    return item;
  }

  return(
    <div className='btn-area'>      
      <Button variant='success' onClick={createCleanCSV} >Generate Clean CSV</Button>
      { url && <div><a href={url} download='data.csv'>Download clean segments</a><a href={dirtyUrl} download='data.csv'>Download dirty segments</a></div> }      
    </div>    
  )
}

export default CleanCSVButton;