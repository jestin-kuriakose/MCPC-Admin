import React, { useState } from 'react'

const Modal = ({handleClick, type}) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleModalButtonClick = () => {
        setIsLoading(true)
        handleClick()
        setIsLoading(false)
    }
  return (
    <div className="modal fade" id="saveModal" tabIndex="-1" role="dialog" aria-labelledby="saveModalCenterTitle" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="saveModalLongTitle">Save Changes</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                Are you sure you want to create/update this {type}?
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=>handleModalButtonClick()} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                {isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Yes"}
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Modal