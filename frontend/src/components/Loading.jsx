import React from 'react'

const Loading = () => {
  return (
    <div className='loading-screen container'>
        <div className='loading-container'>
          <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="sr-only"></span>
          </div>
          <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="sr-only"></span>
          </div>
        </div>
    </div>
  )
}

export default Loading