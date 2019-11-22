import React from 'react'
import { Spinner } from 'reactstrap'

import './style.css'
const Loading = () => (
  <div className="load__component">
    <Spinner style={{ width: '3rem', height: '3rem' }} />
  </div>
)

export default Loading
