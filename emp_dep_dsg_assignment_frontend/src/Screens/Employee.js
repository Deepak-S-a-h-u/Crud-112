import axios from "axios";
import React, { useEffect, useState } from "react";
function Employee() {
  var employeeInit = {
    name: "",
    address: "",
    department: [],
    designation: 0,
  };

  const [employee, SetEmployee] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeForm, setEmployeeForm] = useState(employeeInit);
  const [employeeDataUpd, setEmployeeDataUpd] = useState([]);

  useEffect(() => {
    getAll();
    getDesignationList();
    getDepartmentList();
  }, []);

  // useEffect(() => {
  //   console.log("employeeDataUpd state value", employeeDataUpd);
  // }, [setEmployeeDataUpd]);

  function getAll() {
    axios.get("https://localhost:44361/api/Employee").then((d) => {
      SetEmployee(d.data);
      console.log("setEMploy byapi data", d.data);
      setEmployeeForm(employeeInit);
      //
    });
  }

  const saveClick = () => {
    console.log(employeeForm);
    axios
      .post("https://localhost:44361/api/Employee/", employeeForm)
      .then(() => {
        alert("Data Saved Successfully");
        getAll();
        setEmployeeForm(employeeInit);
        setDepartmentList([]);
        window.location.reload(true);
      })
      .catch((e) => {
        alert("api DID not Working Properly");
      });
  };

  // render in Employee.js return
  // function renderEmployees() {
  //   //   debugger;
  //   let EmployeesRows = [];
  //   employee?.map((item) => {
  //    function iterateDepartment(depList)
  //       {
  //         let departments=[];
  //         depList.map((item)=>{
  //           departments.push(
  //             <div>{item}</div>
  //           )
  //         })
  //         return departments;
  //       }

  //      EmployeesRows.push(
  //       <tr>
  //         <td>{item.id}</td>
  //         <td>{item.name}</td>
  //         <td>{item.address}</td>
  //         <td>{item.designation}</td>
  //         <td>{iterateDepartment(item.departments)}</td>

  //         <td>
  //           <button
  //               onClick={() => editClick(item)}
  //             className='btn btn-info' data-toggle='modal' data-target="#editModal">edit</button>
  //           <button
  //               onClick={() => deleteClick(item.id)}
  //             className='btn btn-danger' >Delete</button>
  //         </td>
  //       </tr>
  //     )
  //   })

  //   return EmployeesRows;
  //         // }, {})

  // }

  const ChangeHandler = (event) => {
    setEmployeeForm({
      ...employeeForm,
      [event.target.name]: event.target.value,
    });
    //setEmploy2({ ...employ2, [event.target.name]: event.target.value });
    console.log(employeeForm);
  };

  const ChangeHandlerCheckbox = (event) => {
     debugger
    let val = parseInt(event.target.value);
  //find and remove on index 
    if (employeeForm.department.includes(val)) {
      var emp = {...employeeForm};
      var index = employeeForm.department.findIndex(
        (x) => x == val
      );
      //const index = emp.indexOf(val);
if (index > -1) 
{ // only splice array when item is found
  var x=employeeForm.department.splice(index, 1); // 2nd parameter means remove one item only
}



      //emp.department.pop(parseInt(event.target.value));
    //  setDepArray(department);
      setEmployeeForm(employeeForm);
      // setEmployeeForm({ ...employeeForm,department: department });
       console.log(employeeForm);
    } else {
      var emp = {...employeeForm};
      emp.department.push(parseInt(event.target.value)); 
     // setDepArray(department);
      setEmployeeForm(emp);
       console.log(employeeForm);
    }
  };

  function getDesignationList() {
    axios.get("https://localhost:44361/api/Designation").then((d) => {
      setDesignationList(d.data);
      //  console.log(d.data);
    });
  }

  function renderDesignation() {
    let DesignationRows = [];
    // debugger
    designationList?.map((itm) => {
      // console.log(itm.id)
      DesignationRows.push(
        <option
          value={parseInt(itm.id)}
          name="designation"
          onSelect={ChangeHandler}
        >
          {itm.dsgName}
        </option>
      );
    });
    return DesignationRows;
  }

  function getDepartmentList() {
    axios.get("https://localhost:44361/api/Department").then((d) => {
      console.log("dData get data ", d.data);
      setDepartmentList(d.data);
      // groupById(d.data)
    });
  }

  function renderDepartmentsCheckbox() {
    //   debugger;
    let DepartmentsRows = [];
    departmentList?.map((item) => {
      DepartmentsRows.push(
        <div className="row">
          <input
            multiple
            type="checkbox"
            id={parseInt(item.id)}
            name="departments"
            value={item.id}
            onChange={ChangeHandlerCheckbox}
          ></input>

          <label>{item.depName}</label>
        </div>
        // <checkbox>{item.depName}</checkbox>
      );
    });
    return DepartmentsRows;
  }

  function editClick(data) {
    getEmployeeDataUpd(data.id);
    setEmployeeForm(employeeDataUpd);
    //setEmployeeForm(employeeForm);
    //  setEmployeeForm({id:data.id, name:data.name, address:data.address, department:data.departments, designation:data.designationID })
    console.log(employeeForm);
  }

  function getEmployeeDataUpd(id) {
    axios.get("https://localhost:44361/api/Employee/" + id).then((d) => {
      console.log("dData get data ", d.data);
      setEmployeeForm(d.data);
      // setEmployeeDataUpd(d.data);
      // setEmploy2({ ...employ2, departments: d.data})
      // setEmployeeForm({ ...employeeForm, department: departmentListUpd });
      console.log(employeeForm);
    });
  }

  // function renderDepartmentsCheckboxUpdate() {
  //   let DepartmentsRows = [];
  //   departmentList?.map((item) => {
  //     //debugger
  //     var flag = false;
  //     if (Array.isArray(departmentListUpd)) {
  //       var index = departmentListUpd.findIndex((x) => x == item.id);

  //       if (index > -1) {
  //         flag = true;
  //       } else {
  //         flag = undefined;
  //       }
  //     }
  //     DepartmentsRows.push(
  //       <div>
  //         <input
  //           multiple
  //           type="checkbox"
  //           id={item.id}
  //           name="department"
  //           value={item.id}
  //           defaultChecked={flag}
  //           onChange={ChangeHandlerCheckbox}
  //         ></input>
  //         <label>{item.depName}</label>
  //       </div>
  //     );
  //   });
  //   return DepartmentsRows;
  // }
  function UpdateClick() {
    console.log(employeeForm);
    axios
      .put("https://localhost:44361/api/Employee/",employeeForm)
      .then((d) => {
        {
          alert("data updated successfully");
          getAll();
         // window.location.reload(true);
         // setEmployeeForm(employeeInit);
          // getAll();
        }
      });
  }

  function deleteClick(id) {
    alert(
      "if you delete data in one row whole information of user will be deleted you can add again it by clicking 'NEW EMPLOYEE' button in right top side "
    );
    // console.log(id)
    axios
      .delete("https://localhost:44361/api/Employee/" + id)
      .then(() => {
        getAll();
        alert("data deleted");
      })
      .catch((e) => {
        alert("wrong Api");
      });
  }

  return (
    <div>
      <div className="row">
        <div className="col-10">
          <h2 className="text-primary text-left" >Employee List</h2>
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#newModal"
            onClick={() => setEmployeeForm(employeeInit)}
          >
            New Employee
          </button>
        </div>
      </div>

      {/* //data display code starts */}
      <div className="col-10 offset-1">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <td>EmployeeID</td>
              <th>Name</th>
              <th>Address</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {renderEmployees()} */}
            {employee.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.designation}</td>
                <td>
                  {item.departments.map((e) => (
                    //  `${e} , `
                    <div>{e}</div>
                  ))}
                </td>
                <td>
                  <button
                    onClick={() => editClick(item)}
                    className="btn btn-info"
                    data-toggle="modal"
                    data-target="#editModal"
                  >
                    edit
                  </button>

                  <button
                    onClick={() => deleteClick(item.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* //data display code ended */}

      {/* save */}
      <form>
        <div className="modal" id="newModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* header */}
              <div className="modal-header">
                <div className="modal-title">New Employee</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              {/* body */}
              <div className="modal-body">
                <div className="form-group row">
                  <label for="Name" className="col-sm-4">
                    Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      onChange={ChangeHandler}
                      className="form-control"
                      value={employeeForm.name}
                      name="name"
                      type="text"
                      id="Name"
                      placeholder="Employee Name"
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="Address" className="col-sm-4">
                    Address
                  </label>
                  <div className="col-sm-8">
                    <input
                      onChange={ChangeHandler}
                      value={employeeForm.address}
                      className="form-control"
                      name="address"
                      type="text"
                      id="Address"
                      placeholder="Employee Address"
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="Department" className="col-sm-4">
                    Name
                  </label>
                  <div className="col-sm-8">
                    <div className="left-section">
                      {renderDepartmentsCheckbox()}
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="DesignationD" className="col-sm-4">
                    Designation
                  </label>
                  <div className="col-sm-8">
                    <select
                      onChange={ChangeHandler}
                      className="form-control"
                      value={employeeForm.designation}
                      name="designation"
                      type="text"
                      id="DesignationD"
                      placeholder="Employee Address"
                    >
                      <option>Select Designation</option>
                      {renderDesignation()}
                    </select>
                  </div>
                </div>
              </div>
              {/* body ended */}
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={saveClick}
                  data-dismiss="modal"
                >
                  Save
                </button>
                <button className="btn btn-danger">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* save code ended */}

      {/* edit */}
      <form>
        <div className="modal" id="editModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* header */}
              <div className="modal-header">
                <div className="modal-title">edit Employee</div>
                <button className="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              {/* body */}
              <div className="modal-body">
                <div className="form-group row">
                  <label for="Name" className="col-sm-4">
                    Name
                  </label>
                  <div className="col-sm-8">
                    {/* <input onChange={ChangeHandler} className='form-control' */}
                    <input
                      onChange={ChangeHandler}
                      className="form-control"
                      value={employeeForm.name}
                      name="name"
                      type="text"
                      id="Name"
                      placeholder="Employee Name"
                    ></input>
                    
                  </div>
                </div>

                <div className="form-group row">
                  <label for="Address" className="col-sm-4">
                    Address
                  </label>
                  <div className="col-sm-8">
                    <input
                      onChange={ChangeHandler}
                      className="form-control"
                      value={employeeForm.address}
                      name="address"
                      type="text"
                      id="Address"
                      placeholder="Employee Address"
                    ></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="Department" className="col-sm-4">
                    Department
                  </label>
                  <div className="col-sm-8">
                    <div className="left-section">
                      {/* {renderDepartmentsCheckboxUpdate()} */}
                      {departmentList?.map((item) => {
                        //debugger
                        var flag = false;
                        if (Array.isArray(employeeForm.department)) {
                          var index = employeeForm.department.findIndex(
                            (x) => x == item.id
                          );

                          if (index > -1) {
                            flag = true;
                          } 
                          else {
                            flag = undefined;
                          }
                        }
                        return (
                          <div>
                            <input
                              type="checkbox"
                              id={item.id}
                              name="departments"
                              value={item.id}
                              defaultChecked={flag}
                              onClick={ChangeHandlerCheckbox}
                            ></input>
                            <label>{item.depName}</label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="DesignationD" className="col-sm-4">
                    Designation
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-control"
                      name="designation"
                      type="text"
                      id="DesignationD"
                      onChange={ChangeHandler}
                    >
                      {/* {renderDesignationUpdate()} */}

                      {designationList?.map((itm) => (
                        <option
                          value={parseInt(itm.id)}
                          selected={
                            itm.id == employeeForm.designationID ? true : false
                          }
                        >
                          {itm.dsgName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* body ended */}
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={UpdateClick}
                  data-dismiss="modal"
                >
                  Update
                </button>
                <button className="btn btn-danger">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Employee;
