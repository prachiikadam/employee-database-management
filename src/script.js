console.log('js file start');

(async function(){
    const data=await fetch(`./src/data.json`);
    //console.log(data);
    const res=await data.json();
    //console.log(res);
    let employees=res;
    let selectedEmployeeId=res[0].id
    let selectedEmployee=res[0];
    const employeeList=document.querySelector(".employees__names--list");
    const employeeInfo=document.querySelector(".employees__single--info");

    //add employee
    const createEmployee=document.querySelector(".createEmployee");
    const addEmployeeModal=document.querySelector(".addEmployee");

    createEmployee.addEventListener('click',()=>{
        console.log('button clicked')
        addEmployeeModal.style.display="flex"
    })
    addEmployeeModal.addEventListener('click',(e)=>{
        console.log('e.target.className',e.target.className)
        if(e.target.className==='addEmployee'){
            addEmployeeModal.style.display="none" 
        }
    })
    //selecting employee
    employeeList.addEventListener('click',(e)=>{
        if(e.target.tagName==="SPAN" && selectedEmployee.id!=e.target.id){
            console.log(e.target)
           
            selectedEmployeeId=e.target.id;
            renderEmployees();
            console.log(selectedEmployee)
            //render single employee
            renderSingleEmployee()
        }
    })

    const renderSingleEmployee=()=>{
        employeeInfo.innerHTML = `
            <img src=${selectedEmployee.imageUrl} alt='selected employee image'/>
            <span class="employees__single--heading">
            ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
            </span>
            <span>${selectedEmployee.address}</span>
            <span>${selectedEmployee.email}</span>
            <span>Mobile - ${selectedEmployee.contactNumber}</span>
            <span>DOB - ${selectedEmployee.dob}</span>
        `
       
    }

    //rendering employee
    const renderEmployees=()=>{
        employeeList.innerHTML="";
        employees.forEach(emp => {
            const employee=document.createElement("span")
            employee.classList.add("employees__names--item")
            if(parseInt(selectedEmployeeId,10)===emp.id){
                employee.classList.add("selected")
                selectedEmployee=emp
            }
            employee.setAttribute("id",emp.id)
            employee.innerHTML=`${emp.firstName} ${emp.lastName}`+" ❌";
            employeeList.append(employee)
        });
    }
    renderEmployees()

})();