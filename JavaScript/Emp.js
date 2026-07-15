function EmpDetails(Emp){
    console.log(`
    EmpDetails:
    Name:${Emp.name}
    Age:${Emp.age}
    Grade:${Emp.grade}
    Department:${Emp.department}`)
    }
    
    let Emp1 = {name: "Nithya", age: 32, grade: 'A+', department: "Service"}
    let Emp2 = {name: "Shiva", age: 39, grade: 'B+', department: "HR"}
    let Emp3 = {name: "Sai", age: 38, grade: 'C+', department: "Finance"}
    let Emp4 = {name: "Nivi", age: 32, grade: 'A+', department: "Sales"}
    let Emp5 = {name: "Suganthi", age: 38, grade: 'C+', department: "IT"}
    let Emp6 = {name: "Karthik", age: 40, grade: 'B+', department: "Sales"}
    let Emp7 = {name: "Harshi", age: 33, grade: 'A+', department: "Marketing"}
    let Emp8 = {name: "Hari", age: 36, grade: 'B+', department: "Admin"}
    let Emp9 = {name: "Shek", age: 35, grade: 'C+', department: "Travel"}
    let Emp10 = {name: "Jan", age: 36, grade: 'A+', department: "Operations"}
    
    EmpDetails(Emp1);
    EmpDetails(Emp2);
    EmpDetails(Emp3);
    EmpDetails(Emp4);
    EmpDetails(Emp5);
    EmpDetails(Emp6);
    EmpDetails(Emp7);
    EmpDetails(Emp8);
    EmpDetails(Emp9);
    EmpDetails(Emp10);