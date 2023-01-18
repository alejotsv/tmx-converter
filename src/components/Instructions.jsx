import React from 'react';
import Card from 'react-bootstrap/Card';

const Instructions = () => {
  return(    
    <Card className="instructions">
      <Card.Header className="text-center">TMX to CSV converter (<em>v4.1</em>)</Card.Header>
      <Card.Body>                
          <ul>
            <li>Click on the 'Choose file' button</li>
            <li>Select a TMX file; make sure it has the correct extension (.tmx)</li>
            <li>Click on 'Show segments' to see all segments; once they are displaying, you can click on 'Copy All'</li>
            <li>Click on 'Generate CSV' to get the segments in a .csv file</li>
            <li>To start again, click on 'Upload another file'</li>
         </ul>        
      </Card.Body>      
    </Card>          
  )
}

export default Instructions;