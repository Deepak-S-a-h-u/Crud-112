import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

function Department() {

  const [department, SetDepartment] = useState(null);
  const [departmentForm, setDepartmentForm] = useState({});

  useEffect(() => {
    getAll();
  }, [])

  function getAll() {
    axios.get("https://localhost:44361/api/Department").then((d) => {
      SetDepartment(d.data);
      //  console.log(d.data);         
    })

  }

  function renderDepartments() {
    //   debugger;
    let DepartmentsRows = [];
    department?.map((item) => {
      DepartmentsRows.push(
        <tr>
          <td>{item.depName}</td>

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

    return DepartmentsRows;
  }

  const ChangeHandler = (event) => {
    setDepartmentForm({ ...departmentForm, [event.target.name]: event.target.value });
    console.log(departmentForm);
  }

  const saveClick = () => {
    axios.post("https://localhost:44361/api/Department/", departmentForm).then(() => {
      alert("Data Saved Successfully");
      getAll();
    }).catch((e) => {
      alert("api DID not Working Properly")
    })
  }

//above it everything working fine Tomorrow i will start here again

 // debugger;
  function editClick(item) {
    //console.log(data);
    setDepartmentForm(item)
  }
 // debugger;
  const updateClick = () => {
    axios.put("https://localhost:44361/api/Department/",departmentForm) 

      getAll();
      alert("data updated successfully");

  }


  function deleteClick(id1) {
  // let a=confirm("you are deleting department <br> it can affect data in employees list.do you want to continue anyway.")
  //  // alert(id1)
  //  if(a){
    axios.delete("https://localhost:44361/api/Department/"+id1).then((d)=>{
      getAll();
   })
//}
  //   else{
  //     alert("Cant delete data without confirmation")
  //   }  

  }

  return (
    <div>
      <div className='row'>
        <div className='col-10'>
          <h2 className='text-primary text-left'>Department List</h2>
        </div>
        <div className='col-2'>
          <button className="btn btn-primary" data-toggle="modal" data-target="#newModal">New Department</button>
        </div>
      </div>
      <div className='col-10 offset-1'>
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Department</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderDepartments()}
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
                  New Department
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
                  <label for="depName" className='col-sm-4'>Name</label>
                  <div className='col-sm-8'>
                    <input onChange={ChangeHandler} value={departmentForm.name} className='form-control' name='depName' type="text" id="depName" placeholder='Department Name'></input>
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
                  Update Department
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
                  <label for="depName" className='col-sm-4'>Name</label>
                  <div className='col-sm-8'>
                    <input
                      onChange={ChangeHandler}
                      name='depName' value={departmentForm.depName} className='form-control' type="text" id="depName" placeholder='Department Name'></input>
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

export default Department