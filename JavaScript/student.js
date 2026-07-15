const student = [{ Name: "Sai", age: 20, grade: "A+", department: "Accounts"},
{ Name: "Janani", age: 21, grade: "B+", department: "Biology"},
{ Name: "Niralya", age: 22, grade: "C+", department: "Commerce"},
{ Name: "Mohith", age: 23, grade: "A+", department: "Maths"},
{ Name: "Rakshan", age: 20, grade: "B+", department: "Computer"},
{ Name: "Varnith", age: 21, grade: "C+", department: "Biology"},
{ Name: "Hami", age: 22, grade: "A+", department: "Commerce"},
{ Name: "Mithra", age: 23, grade: "B+", department: "Maths"},
{ Name: "Manvith", age: 20, grade: "C+", department: "Computer"},
{ Name: "Ruha", age: 21, grade: "A+", department: "Accounts"}];

function groupByDepartment(student){
    const grouped={ };
    student.forEach(student =>{
        if(!grouped[student.department]){
            grouped[student.department] = [];
            }
        grouped[student.department].push(student)    
    });
    console.log("Grouped By Department",grouped)
}
groupByDepartment(student)