import React from 'react';
import Card from 'react-bootstrap/Card';

const Instructions = () => {
  return(    
    <Card className="instructions">
      <Card.Header className="text-center">Upload a TMX file and display segments as a table</Card.Header>
      <Card.Body>        
        <Card.Text>
          <ol>
            <li>Click on the 'Choose file' button</li>
            <li>Select a TMX file; make sure it has the correct extension (.tmx)</li>
            <li>Click on 'Show segments'</li>
            <li>Once the segments are displaying, simply click on 'Copy All' to copy all segments in a format ready to be pasted in an Excel file</li>
            <li>To upload another file, click on 'Upload another file'</li>
         </ol>
        </Card.Text>
        
      </Card.Body>      
    </Card>          
  )
}

export default Instructions;