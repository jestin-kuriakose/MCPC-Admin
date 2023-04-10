import React from 'react'
import { members, tithes } from '../dummyData'
import { Link } from 'react-router-dom'

const MembersList = () => {
  return (
    <>
        <div class="container-fluid">
            <div class="row">
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <div className="d-flex mt- align-items-center">
                    <h2 className='fw-normal'>Members</h2>
                    <Link to={'/newMember'} className="btn btn-outline-primary btn-sm ms-3 h-75">Add a New Member</Link>
                </div>

                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">City</th>
                        <th scope="col">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members?.map((member) => (
                            
                            <tr>
                                <td>{member.id}</td>
                                <td>{member.firstName}</td>
                                <td>{member.lastName}</td>
                                <td>{member.city}</td>
                                <td>{member.active ? "Yes" : "No"}</td>
                                <td><Link className='btn btn-primary btn-sm' to={`/member/${member.id}`}>Edit</Link><button type='button' data-bs-toggle="modal" data-bs-target="#deleteMemberModal" className='btn btn-danger btn-sm ms-1' to={`/member/${member.id}`}>Delete</button></td>
                            </tr>
                            
                        ))}
                    </tbody>
                    </table>

                    {/* Modal Component */}
                    <div class="modal fade" id="deleteMemberModal" tabindex="-1" role="dialog" aria-labelledby="saveModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="saveModalLongTitle">Delete Member</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete this member ?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger">Delete</button>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
                </main>
            </div>
        </div>
    </>
  )
}

export default MembersList