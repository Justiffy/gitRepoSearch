import React from 'react';
import {Alert} from 'reactstrap'

import './Alert.css';

const alert = () => {
  return(
    <div className="AlertMassage">
      <Alert color="danger" >
        API rate limit exceeded
      </Alert>
    </div>
    
  )
}

export default alert;