import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { TextEncoder } from 'text-encoding';

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
    const dirtyData = joinDirtyArr(dirtySegments);    

    // Encode the data to windows-1252, to make it compatible with Excel      
    const encodedDirtyData = encoder.encode(dirtyData);
      
    // Create blob
    const dirtyBlob = new Blob([encodedDirtyData], { type: 'text/csv;charset=windows-1252' });    
    // Create URL to download blob
    setDirtyUrl(URL.createObjectURL(dirtyBlob));    
  }

  // Function to create string with clean segments
  const joinArr = (array) => {
    let csvString = '';
    let originItem;
    let targetItem;   

    // Add origin and target language to the csvString
    originItem = addQuotes(array[0][0]);
    csvString += originItem + ',';        
        
    targetItem = addQuotes(array[1][0]);
    csvString += targetItem + '\n';

    // Clean dirtySegments array
    setDirtySegments([]);

    // Set origin and target language in dirtySegments array
    dirtySegments.push([array[0][0]]);
    dirtySegments.push([array[1][0]]);

    for(let i=1; i<array[0].length; i++){
      originItem = array[0][i];
      targetItem = array[1][i];

      if(originItem.includes('{') || targetItem.includes('{') || originItem.includes('<') || targetItem.includes('<') || (originItem == targetItem)
        || originItem.length<=5 || targetItem.length<=5 ){        
        dirtySegments[0].push(originItem);
        dirtySegments[1].push(targetItem);
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
      { url && <div><a href={url} download='data.csv'>Clean segments</a><a href={dirtyUrl} download='data.csv'>Dirty segments</a></div> }      
    </div>    
  )
}

export default CleanCSVButton;