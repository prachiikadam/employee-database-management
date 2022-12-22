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
    const addEmployeeForm=document.querySelector(".addEmployee__create")
    createEmployee.addEventListener('click',()=>{
        //console.log('button clicked')
        addEmployeeModal.style.display="flex"
    })
    const dobInput=document.querySelector(".addEmployee__create--dob")
    
    dobInput.max=`${new Date().getFullYear()-18}-${new Date().toISOString().slice(5,10)}`
    console.log('dobInput',dobInput.max)
    addEmployeeModal.addEventListener('click',(e)=>{
        //console.log('e.target.className',e.target.className)
        if(e.target.className==='addEmployee'){
            addEmployeeModal.style.display="none" 
        }
    })
    addEmployeeForm.addEventListener('submit',(e)=>{
        e.preventDefault()

        const formData=new FormData(addEmployeeForm)
        //console.log("formData",formData)
        const values=[...formData.entries()]
        console.log('values',values)
        let empData={}
        values.forEach((val)=>{
            empData[val[0]]=val[1]
        })
        
        empData.id=employees[employees.length-1].id+1;
        empData.age=new Date().getFullYear()-new Date(empData.dob).getFullYear();
        empData.imageUrl =empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        //console.log(empData)
        employees.push(empData)
        renderEmployees();
        addEmployeeForm.reset();
        addEmployeeModal.style.display = "none";
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