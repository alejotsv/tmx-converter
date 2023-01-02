import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const CSVButton = ({ arr }) => {   
  const [url, setUrl] = useState();

  const createCSV = () => {  
    console.log('The array is: ' + arr);
    // Convert to string separated by commas    
    const data = joinArr(arr);
      
    console.log('This is the data: ' + data);
    // Crate blob
    const blob = new Blob([data], { type: 'text/csv' });
    console.log(blob);
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

      addQuotes(originItem);
      csvString += originItem + ', ';      

      addQuotes(targetItem);
      csvString += targetItem + '\n';
      console.log(csvString)
    }
    return csvString;
  }

  const addQuotes = (item) => {
    if(item.includes(',')){
      item = '"' + item + '"';    
    }
    return item;
  }

  return(
    <div className='btn-area'>      
      <Button variant='success' onClick={createCSV} >Create CSV</Button>
      { url && <a href={url}  download='data.csv'>Download CSV file</a> }
    </div>
  )
}

export default CSVButton;