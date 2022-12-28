import React from 'react';

const Instructions = () => {
  return(
    <div className='instructions'>
      <h1>Upload a TMX file and display segments as a table</h1>
      <h2>Instructions:</h2>
      <ol>
        <li>Click on the 'Choose file' button</li>
        <li>Select a TMX file; make sure it has the correct extension (.tmx)</li>
        <li>Click on 'Show segments'</li>
        <li>Once the segments are displaying, simply click on 'Copy All' to copy all segments in a format ready to be pasted in an Excel file</li>
        <li>To upload another file, click on 'Upload another file'</li>
      </ol>
    </div>
  )
}