import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

function Designation() {

  const [designation, SetDesignation] = useState(null);
  const [designationForm, setDesignationForm] = useState({});

  useEffect(() => {
    getAll();
  }, [])

  function getAll() {
    axios.get("https://localhost:44361/api/Designation").then((d) => {
      SetDesignation(d.data);
      //  console.log(d.data);         
    })

  }

  function renderDesignations() {
    //   debugger;
    let DesignationsRows = [];
    designation?.map((item) => {
      DesignationsRows.push(
        <tr>
          <td>{item.dsgName}</td>

          <td>
            <button
              onClick={() => editClick(item)}
              className='btn btn-info' data-toggle='modal' data-target="#editModal">edit</button>
            <button
              onClick={() => deleteClick(item.id)}
              className='btn btn-danger'>Delete</button>
          </td>
        </tr>
      )
    })

    return DesignationsRows;
  }

  const ChangeHandler = (event) => {
    setDesignationForm({ ...designationForm, [event.target.name]: event.target.value });
    console.log(designationForm);
  }

  const saveClick = () => {
    axios.post("https://localhost:44361/api/Designation/", designationForm).then(() => {
      alert("Data Saved Successfully");
      getAll();
    }).catch((e) => {
      alert("api DID not Working Properly")
    })
  }

//above it everything working fine Tomorrow i will start here again

 // debugger;
  function editClick(item) {
    console.log(item);
    setDesignationForm(item)
  }
 // debugger;
  const updateClick = () => {
    axios.put("https://localhost:44361/api/Designation/",designationForm) 

      getAll();
      alert("data updated successfully");

  }




//above it everything working fine Tomorrow i will start here again

  function deleteClick(id1) 
  { 
      axios.delete("https://localhost:44361/api/Designation/"+id1).then((d)=>{
        getAll();
      })
  }

  return (
    <div>
      <div className='row'>
        <div className='col-10'>
          <h2 className='text-primary text-left'>Designation List</h2>
        </div>
        <div className='col-2'>
          <button className="btn btn-primary" data-toggle="modal" data-target="#newModal">New Designation</button>
        </div>
      </div>
      <div className='col-10 offset-1'>
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Designation</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderDesignations()}
            {/* <tr>
                 <td>Android</td>
               
                <td>
                  <button className='btn btn-info'  data-toggle="modal" data-target="#editModal">Edit</button>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>  */}
          </tbody>
        </table>
      </div>
      {/* save */}
      <form>
        <div className='modal' id="newModal" role="dialog">
          <div className='modal-dialog'>
            <div className='modal-content'>
              {/* header */}
              <div className="modal-header">
                <div className='modal-title'>
                  New Designation
                </div>
                <button className='close' data-dismiss="modal">
                  <span>
                    &times;
                  </span>
                </button>
              </div>
              {/* body */}
              <div className='modal-body'>
                <div className='form-group row'>
                  <label for="dsgName" className='col-sm-4'>Name</label>
                  <div className='col-sm-8'>
                    <input onChange={ChangeHandler} className='form-control' name='dsgName' type="text" id="dsgName" placeholder='Designation Name'></input>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button className='btn btn-success'
                  onClick={saveClick}
                  data-dismiss='modal'>Save</button>
                <button className='btn btn-danger'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* edit */}
      <form>
        <div className='modal' id="editModal" role="dialog">
          <div className='modal-dialog'>
            <div className='modal-content'>
              {/* header */}
              <div className="modal-header">
                <div className='modal-title'>
                  Update Designation
                </div>
                <button className='close' data-dismiss="modal">
                  <span>
                    &times;
                  </span>
                </button>
              </div>
              {/* body */}
              <div className='modal-body'>
                <div className='form-group row'>
                  <label for="dsgName" className='col-sm-4'>Name</label>
                  <div className='col-sm-8'>
                    <input
                      onChange={ChangeHandler}
                      name='dsgName' value={designationForm.dsgName} className='form-control' type="text" id="dsgName" placeholder='Designation Name'></input>
                  </div>
                </div>

              </div>
              <div className='modal-footer'>
                <button
                  onClick={updateClick}
                  className='btn btn-success'>Update</button>
                <button className='btn btn-danger'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}

export default Designation