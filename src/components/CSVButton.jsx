import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { TextEncoder } from 'text-encoding';

const CSVButton = ({ arr }) => {   
  const [url, setUrl] = useState();
  const [showModal, setShowModal] = useState(false);
  const [maxLength, setMaxLength] = useState(5);

  // Handle modal close
  const handleClose = () => {
    setShowModal(false);
    createCSV();
  }
  
  // Handle modal show
  const handleShow = () => setShowModal(true);

  // Handle modal change
  const handleChange = (e) => {
    const input = e.target.value;
    // Check that the input is a number with 3 or fewer digits
    if(!isNaN(input) && input.length <= 3){
      setMaxLength(input);
    }
  }



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
      {/* <Button variant='success' onClick={createCSV} >Generate CSV</Button> */}
      <Button variant='success' onClick={handleShow} >Generate CSV</Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>          
          <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Select minimum number of characters per segment</Form.Label>
              <Form.Control as="textarea" rows={1} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>          
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      { url && <a href={url} download='data.csv'>Download CSV file</a> }      
    </div>    
  )
}

export default CSVButton;