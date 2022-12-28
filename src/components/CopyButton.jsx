import React from 'react';

const CopyButton = () => {
  const copyAll = () => {
    console.log(document.getElementsByClassName('tmx-table'));    
    const table = document.getElementsByClassName('tmx-table')[0];
    const range = document. createRange();
    range.selectNodeContents(table);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
  }

  return(
    <button onClick={copyAll}>
      Copy All
    </button>
  )
}

export default CopyButton;