import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { TextEncoder } from 'text-encoding';

const CSVButton = ({ arr }) => {   
  const [url, setUrl] = useState();

  const createCSV = () => {      
    // Convert to string separated by commas    
    const data = joinArr(arr);

    // Encode the data to windows-1252, to make it compatible with Excel
    const encoder = new TextEncoder('windows-1252');
    const encodedData = encoder.encode(data);
      
    // Create blob
    const blob = new Blob([encodedData], { type: 'text/csv;charset=windows-1252' });    
    // Create URL to download blob
    setUrl(URL.createObjectURL(blob));
  }

  const joinArr = (array) => {
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
      <Button variant='success' onClick={createCSV} >Generate CSV</Button>      
      { url && <a href={url} download='data.csv'>Download CSV file</a> }      
    </div>    
  )
}

export default CSVButton;