import React from 'react';
import {Alert} from 'reactstrap'

const alert = () => {
  return(
    <div style={{marginTop: '10px'}}>
      <Alert color="danger" >
        API rate limit exceeded
      </Alert>
    </div>
    
  )
}

export default alert;