import React from 'react'
import { members, tithes } from '../dummyData'
import { Link } from 'react-router-dom'

const TitheList = () => {

    const findMember = (tithe, query) => {
        const member = members.find(member => member.id == tithe.member)
        if (query == "firstName"){
            return member.firstName
        } else {
            return member.lastName
        }  
    }

  return (

    <>
        <div class="container-fluid">
            <div class="row">
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <div className="d-flex mt- align-items-center">
                    <h2 className='fw-normal'>Tithes</h2>
                    <Link to={'/newTithe'} className="btn btn-outline-primary btn-sm ms-3 h-75 ">Add New Tithe Info</Link>
                </div>


                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tithes?.map((tithe) => (
                            <tr>
                                <td>{tithe.id}</td>
                                <td>{tithe.date}</td>
                                <td>{findMember(tithe, "firstName")}</td>
                                <td>{findMember(tithe, "lastName")}</td>
                                <td>$ {tithe.amount}</td>
                                <td><Link className='btn btn-primary btn-sm' to={`/tithe/${tithe.id}`}>Edit</Link><button className="btn btn-danger btn-sm ms-sm-1" data-bs-toggle="modal" data-bs-target="#deleteTitheModal">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                    </table>

                    {/* Modal Component */}
                    <div class="modal fade" id="deleteTitheModal" tabindex="-1" role="dialog" aria-labelledby="saveModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="saveModalLongTitle">Delete Tithe Info</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete this Tithe Info ?
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

export default TitheList