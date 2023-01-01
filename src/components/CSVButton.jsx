import { useState } from 'react';

const CSVButton = () => {
  const [arr, setArr] = useState([]);  
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
  
    array.map( row => {
      row.map( (item, index) => {
        item = addQuotes(item);
        if(index == row.length - 1){                  
          csvString += item + '\n';
        } else {          
          csvString += item + ', '
        }
      } )
    });    
    return csvString;
  }

  const addQuotes = (item) => {
    if(item.includes(',')){
      item = '"' + item + '"';    
    }
    return item;
  }

  return(
    <div>
      <h1>CSV component</h1>
      <button onClick={createCSV} >Create CSV</button>
      { url && <a href={url}  download='data.csv'>Download CSV file</a> }
    </div>
  )
}

export default CSVButton;