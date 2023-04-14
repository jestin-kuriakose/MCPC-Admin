import React from 'react'

const Loading = () => {
  return (
    <div className='loading-screen'>
        <div className='loading-container'>
          <div class="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
            <span class="sr-only"></span>
          </div>
          <div class="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
            <span class="sr-only"></span>
          </div>
        </div>
    </div>
  )
}

export default Loading