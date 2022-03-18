
// Table object acts as a database table for storing table data
let Table = {
    assignments: 5, // number of assignments in total
    records : [
        {
            name: "Miranda A. Eley",
            id: randomId(), // generate a random id 
            assignments: randomGrades(), // random grades
            avg: 0
        },
        {
            name: "Mike J. McNealy",
            id: randomId(),
            assignments: randomGrades(),
            avg: 0
        },
        {
            name: "Larry M. Murray",
            id: randomId(),
            assignments: randomGrades(),
            avg: 0
        },
        {
            name: "Pamela C. Rivera",
            id: randomId(),
            assignments: randomGrades(),
            avg: 0
        },
        {
            name: "Michelle K. Johnson",
            id: randomId(),
            assignments: randomGrades(),
            avg: 0
        },
        {
            name: "Jonathan P. Randall",
            id: randomId(),
            assignments: randomGrades(),
            avg: 0
        },
        {
            name: "Richard A. Curnutt",
            id: randomId(),
            assignments: randomGrades(),
            avg: 0
        },
        {
            name: "Tony C. Yarnell",
            id: randomId(),
            assignments: randomGrades(),
            avg: 0
        },
        {
            name: "Sandra R. Gaines",
            id: randomId(),
            assignments: randomGrades(),
            avg: 0
        },
        {
            name: "David E. Briscoe",
            id: randomId(),
            assignments: randomGrades(),
            avg: 0
        }
    ]
}

let index = 0; // used for keeping track of headers and grade scales

// when some data is changed, this function udpates the table cells with the new data
function populateTable(items) {
    const table = document.getElementById("record");
    items.forEach((item, index) => {
        let ncol = 1;
        let nrow = index+1;
        let row = table.insertRow();
        row.insertCell(0).innerHTML = createCell((nrow), (ncol++), item.name);
        row.insertCell(1).innerHTML = createCell((nrow), (ncol++), item.id);
        for (let i = 2; i < Table.assignments+2; i++) {
            row.insertCell(i).innerHTML = createCell((nrow), (ncol++), item.assignments[i-2]);
        }
        row.insertCell(Table.assignments+2).innerHTML = createCell((nrow), (ncol++), item.avg, true);
    });
    rightAlign()
    addEventToTextAreas()
}

// adding new row to the table
// with random name and id
function appendRow() {
    const r1 = Math.floor(Math.random()*Table.records.length);
    const r2 = Math.floor(Math.random()*Table.records.length);
   
    Table.records.push({
        name:  Table.records[r1].name.split(" ")[0] +" "+ Table.records[r2].name.split(" ")[0],
        id: randomId(),
        assignments: new Array(Table.assignments).fill("-"),
        avg: 0
    })
    updateHeadings()
    populateTable(Table.records)
    updateUnSubmitted()
    updateAvgGrades()
    updateScales()
    // console.log(Table)
}

// adding new column to the table
function appendColumn() {
    // if (Table.assignments >= 5) return;
    const table = document.getElementById("record");
    let newTh = document.createElement('th');
    table.rows[0].appendChild(newTh);
    newTh.innerHTML = 'Assignment '+(Table.assignments+1);
    for (let i = 1; i < table.rows.length; i++) {
        var newCell = table.rows[i].insertCell(-1);
        newCell.innerHTML = "-"
    }
    Table.assignments++;

    for (let p of Table.records) {
        p.assignments.push("-")
    }
    updateHeadings()
    populateTable(Table.records)
    total = updateUnSubmitted()
    updateAvgGrades()
    updateScales()

    // document.getElementById("unsubmitted").innerHTML = total + Table.records.length


    // console.log(Table)
}


// heading needs updating after new assignmetn is added
function updateHeadings(index = 2) {
    const table = document.getElementById("record");
    let newHeadings = "<tr><th>Student Name</th><th>Student ID</th>";
    for (let i = 1; i <= Table.assignments; i++) {
        newHeadings += "<th>Assignment " + i + "</th>"
    }
    newHeadings += "<th>Average (%)</th></tr>";
    table.innerHTML = newHeadings
}

// a utility function which returns a table cell which is a textarea
function createCell(clas, id, text = "-", readonly=false) {
    let textfield = `<textarea ` + (readonly ? "readonly ":" ")
    textfield += `class = ${clas} id=${id} name="cell" rows="1" `;

    if (id == 1) {
        textfield += 'cols="20"'
    } else {
        textfield += 'cols="10"'
    }
    if (id > 2 && id <= Table.assignments+2) {
        if (text == "-") {
            textfield +=  `style="text-align:center;background-color:yellow;"`
        } else {
            textfield +=  `style="text-align:center;background-color:white;"`
        }
    }
    textfield += `>${text}</textarea>`
    // console.log(textfield)
    return textfield
}

// adding events to all the cells except headings so it envokes certain functions
function addEventToTextAreas() {
    const ta = document.getElementsByTagName("textarea" )

    for (let t of ta) {
        // console.log(t.className, t.id)
        let row = (t.className*1)-1
        let col = (t.id*1)-1
        // console.log(row, col)

        let event = undefined
        if (col == 0) {
            event = function(evt) {
                Table.records[row].name = evt.target.value
                // console.log(Table.records[row].name)
            }
        } else if (col == 1) {
            event = function(evt) {
                Table.records[row].id = evt.target.value
                // console.log(Table.records[row].id)
            }
        } else if (col > 1 && col < Table.assignments+2) {
            event = function(evt) {
                if (isNaN(evt.target.value)) {
                    evt.target.value = "-"
                    evt.target.style = "background-color:yellow;text-align:center;"
                    Table.records[row].assignments[col-2] = "-"
                } else {
                    let n = evt.target.value *1
                    if (n >= 0 && n <= 100) {
                        evt.target.style = "background-color:white;text-align:right;"
                        Table.records[row].assignments[col-2] = evt.target.value
                    } else {
                        evt.target.value = "-"
                        evt.target.style = "background-color:yellow;text-align:center;"
                        Table.records[row].assignments[col-2] = "-"
                    }
                }
                
                updateUnSubmitted()
                updateAvgGrades()
                // console.log(Table.records[row].assignments[col-2])
            }
        }

        t.addEventListener("input", event)
    }
}


// this function is called when a cell data is changed, so that avg grade can be updated
function updateAvgGrades() {
    for (let i = 0; i < Table.records.length; i++) {
        let avg = 0;
        Table.records[i].assignments.forEach(e => {
            if (!isNaN(e)) { // checking if is a number
                avg += e*1
            }
        })
        const ta = document.getElementsByClassName(`${i+1}`)
        avg = Math.round(avg/Table.assignments)
        Table.records[i].avg = avg;
        ta[ta.length-1].innerHTML = avg
        if (avg < 60) {
            ta[ta.length-1].style = "text-align:right;color: white; background-color:red;"
        } else {
            ta[ta.length-1].style = "text-align:right;color: black; background-color:white;"
        }
    }
}


// counts the total number of unsubmitted assignments
function updateUnSubmitted() {
    let total = 0
    for (let r of Table.records) {
        total += r.assignments.filter(e => isNaN(e)).length
    }
    document.getElementById("unsubmitted").innerHTML = total
    return total
    // console.log(document.getElementsByTagName("table"))
}


// aligns number cell to the right
function rightAlign() {
    const ta = document.getElementsByTagName("textarea" )

    for (let t of ta) {
        let row = (t.className*1)-1
        let col = (t.id*1)-1
        // console.log(row, col)
        if (col > 1 && col < Table.assignments+3) {
            // console.log("inner html " + t.innerHTML)
            if (t.innerHTML != "-") {
                t.style.textAlign = "right"
                // console.log("align")
            } else {
                t.style.textAlign = "center"
            }

        }
    }
}



// converting between different grading scales
function updateScales() {
    const tr = document.getElementById("record").firstElementChild.children
    for (let i = 1; i < tr.length; i++) {

        const all = tr[i].children
        const last = all[all.length-1]

        last.addEventListener('click', function() {
            if (index == 0) {
                tr[0].children[tr[0].children.length-1].innerHTML = "Letter Grade"
            } else if (index == 1) {
                tr[0].children[tr[0].children.length-1].innerHTML = "4.0 Scale"
            } else {
                tr[0].children[tr[0].children.length-1].innerHTML = "Average (%)"
            }
            
            flipGrade(index)
            index++
            index = index % 3
        })
    }
}

// convert a grade in percentage to letter and GPA
function flipGrade(index) {
    const tr = document.getElementById("record").firstElementChild.children
    console.log(tr)
    for (let i = 1; i < tr.length; i++) {
        const all = tr[i].children
        const last = all[all.length-1]
        const selected = last.children["0"]
        // console.log("Passing this "+Table.records[i-1].avg)
        const scales = converter(Table.records[i-1].avg)
        // console.log(scales)

        if (Table.records[i-1].avg < 60) {
            selected.style.backgroundColor = "red"
            selected.style.color = "white"
        } else {
            selected.style.backgroundColor = "white"
            selected.style.color = "black" 
        }


        if (index === 0) {
            selected.innerHTML = scales[0]
            // console.log(selected.innerHTML)       
        } else if (index === 1) {
            selected.innerHTML = scales[1]
            // console.log(selected.innerHTML)
        } else {
            selected.innerHTML = Table.records[i-1].avg 
            // console.log(selected.innerHTML)  
        }
        
    }
}


function converter(grade) {
    if (isNaN(grade)) return [null, null]
    if (grade >= 93 && grade <= 100) {
        return ["A", 4.0]
    } else if (grade >= 90 && grade <= 92) {
        return ["A-", 3.7]
    } else if (grade >= 87 && grade <= 89) {
        return ["B+", 3.3]
    }else if (grade >= 83 && grade <= 86) {
        return ["B", 3.0]
    }else if (grade >= 80 && grade <= 82) {
        return ["B-", 2.7]
    }else if (grade >= 77 && grade <= 79) {
        return ["C+", 2.3]
    }else if (grade >= 73 && grade <= 76) {
        return ["C", 2.0]
    }else if (grade >= 70 && grade <= 72) {
        return ["C-", 1.7]
    }else if (grade >= 67 && grade <= 69) {
        return ["D+", 1.3]
    }else if (grade >= 63 && grade <= 66) {
        return ["D", 1.0]
    }else if (grade >= 60 && grade <= 62) {
        return ["D-", 0.7]
    }else if (grade < 60) {
        return ["F", 0.0]
    } else {
        return ["N", -1]
    }
}


function randomId() {
    return Math.ceil(Math.random() * 10000000)
}



function roundGrade(grade) {
    return Math.round(grade)
}

// generates 5 random grades
function randomGrades() {
    const grades = []
    for (let i = 0; i < 5; i++) {
        let x = Math.round(Math.random() * 80)
        if (x % 10 == 0) {
            grades.push("-");
        } else {
            grades.push(Math.round(Math.random() * 80)+20);
        }
    }
    return grades
}


// for saving the table data
let backup = undefined
function save() {
    backup = JSON.parse(JSON.stringify(Table));
    // backup = Object.assign({}, Table);
    // backup.records = [...Table.records]
    // for (let i = 0; i < backup.records; i++) {
    //     backup.records[i].assignments = [...Table.records[i].assignments]
    // }
    alert("Saved")
    console.log(Table)
    console.log(backup)
}

// for retreiving the table data
function retreive() {
    if (backup === undefined) return alert("Save before restoring")
    Table = JSON.parse(JSON.stringify(backup));
    // Table = Object.assign({}, backup);
    // Table.records = [...backup.records]
    // for (let i = 0; i < Table.records; i++) {
    //     Table.records[i].assignments = [...backup.records[i].assignments]
    // }
    updateHeadings()
    populateTable(Table.records)
    updateUnSubmitted()
    updateAvgGrades()
    updateScales()
    console.log(Table)
    console.log(backup)
}


// main
(function() {
    updateHeadings()
    populateTable(Table.records)
    updateUnSubmitted()
    updateAvgGrades()
    updateScales()
})()
