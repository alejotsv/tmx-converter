import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { TextEncoder } from 'text-encoding';

const CleanCSVButton = ({ arr }) => {   
  const [showModal, setShowModal] = useState(false);
  const [showExclusionsModal, setShowExclusionsModal] = useState(false)
  const [minLength, setMinLength] = useState(5);
  const [validLength, setValidLength] = useState(true);
  const [exclusionsFile, setExclusionsFile] = useState(null);
  const [validExclusionsFile, setValidExclusionsFile] = useState(true);
  const [url, setUrl] = useState();
  const [dirtyUrl, setDirtyUrl] = useState();
  const [dirtySegments, setDirtySegments] = useState([]);
  let [isDirty, setIsDirty] = useState(false);

  // Handle modal close
  const handleClose = () => {
    setMinLength(5);      
    setShowModal(false);        
  }

  // Handle modal close via Submit button
  const handleCloseSubmit = () => {
    setShowModal(false);
    setShowExclusionsModal(true);       
  }
  
  // Handle modal show
  const handleShow = () => setShowModal(true);

  // Handle modal change
  const handleChange = (e) => {
    const input = e.target.value;

    // Check that the input is a number with 3 or fewer digits
    if(!isNaN(input) && input.length <= 3 && input >=0 && input <= 20){
      setMinLength(input);
      setValidLength(true);
    } else {
      setValidLength(false);
    }
  }

  // Handle exclusions modal close
  const handleExclusionClose = () => {
    console.log('Modal closed');
    setShowExclusionsModal(false);
  }

  // Handle exclusions modal close via Submit button
  const handleExclusionCloseSubmit = () => {   
    setShowExclusionsModal(false); 
    createCleanCSV();   
  }

  // Handle exclusions modal change
  const handleExclusionsChange = (e) => {
    const reader = new FileReader();

    const fileName = e.target.files[0].name;
    const fileExtension = fileName.substring(fileName.length-4);
    console.log(fileExtension);
    if(fileExtension == '.txt'){
      setValidExclusionsFile(true);
      console.log('File is txt')
      reader.onload = (e) => {
        setExclusionsFile(e.target.result);
      }  
      reader.readAsText(e.target.files[0]);
    } else {      
      setValidExclusionsFile(false);
      console.log('File is not txt');
    }
  }


// TODO: integrate with OpenAI to clean each segment

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

      // TODO: additional check for words uploaded by user
      isDirty = checkSegments(originItem, targetItem);

      if(isDirty){        
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

  const checkSegments = (originSegment, targetSegment) => {
    if( originSegment.includes('{') || targetSegment.includes('{') || originSegment.includes('<') || targetSegment.includes('<') || (originSegment == targetSegment) || originSegment.length<=minLength || targetSegment.length<=minLength ){  
        return true;
      } else {        
        return false;
      }
  }

  return(
    <div className='btn-area'>            
      <Button variant='success' onClick={handleShow} >Generate Clean CSV</Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Minimum Characters per Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>          
          <Form.Group
              className="mb-3"
              controlId="segment-min-length"
            >
              <Form.Label>Select the minimum number of characters per segment</Form.Label>
              <Form.Control type="number" defaultValue={minLength} onChange={handleChange} isInvalid={!validLength} maxLength={2} />
              <Form.Control.Feedback type="invalid">
                Enter a valid number between 0 and 20
              </Form.Control.Feedback>              
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>                    
          <Button variant="primary" onClick={handleCloseSubmit} disabled={!validLength} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>      
      <Modal show={showExclusionsModal} onHide={handleExclusionClose}>
        <Modal.Header closeButton>
          <Modal.Title>Exclusions file</Modal.Title>
        </Modal.Header>
        <Modal.Body>          
          <Form.Group className="mb-3">
              <Form.Label>Upload a .txt file with one character/term per line (optional)</Form.Label>
              <Form.Control type='file' accept='.txt' onChange={handleExclusionsChange} />
              <Form.Control.Feedback type="invalid">
                Upload a valid .txt file or click on Submit
              </Form.Control.Feedback>              
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>                              
          <Button variant="primary" onClick={handleExclusionCloseSubmit} >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>     
      { url && <div><a href={url} download='data.csv'>Clean segments</a><a href={dirtyUrl} download='data.csv'>Dirty segments</a></div> }      
    </div>    
  )
}

export default CleanCSVButton;
