// controls
(function() {
    const age = document.getElementById("age");
    const controls = []
    for (let i = 0; i < 6; i++) {
        controls.push({
            id: i,
            minus: document.getElementById("cb"+(i+1)+"minus"),
            plus: document.getElementById("cb"+(i+1)+"plus"),
            count: document.getElementById("cc"+(i+1)),
            counter: 0
        })
        controls[i].minus.addEventListener('click', () => {
            if (controls[i].counter > 0) {
                controls[i].counter--;
                controls[i].count.innerHTML = controls[i].counter
                updateColor(controls[i], age)
            }
        })
        controls[i].plus.addEventListener('click', function() {
            controls[i].counter++;
            controls[i].count.innerHTML = controls[i].counter
            updateColor(controls[i], age)
        })
    }

}())


// EXTRA CREDIT MATERIAL

function updateColor(control, age) {
    switch(5-control.id) {
        case 0:
            selectColorBasedOnFood(control.count, control.counter, 6, 100)
            break;
        case 1:
            selectColorBasedOnFood(control.count, control.counter, 5, 100);
            break;
        case 2:
            selectColorBasedOnFood(control.count, control.counter, age.checked ? 5 : 3, age.checked ? 5 : 3);
            break;
        case 3:
            selectColorBasedOnFood(control.count, control.counter, 2, 2);
            break;
        default:
            break;
    }
}

function selectColorBasedOnFood(item, count, start, end) {
    if (count == 0) {
        item.style.backgroundColor = "white"
        return
    }
    if (count < start) {
        item.style.backgroundColor = "yellow"
    } else if (count > end) {
        item.style.backgroundColor = "red"
    } else {
        item.style.backgroundColor = "lime"
    }
}

// date validation
function dateValidation() {
    const date = document.getElementById("today")
    let valid = false
    if (date.value.length == 10) {
        const day = date.value.substring(0, 2)
        const month = date.value.substring(3, 5)
        const year = date.value.substring(6, 10)
        if (year > 1920 && year < 2100) {
            if (month > 0 && month < 13) {
                if (day > 0) {
                    if (month == 02 && day < 29) {
                        valid = true;
                    }
                    if (month != 02 && day < 32) {
                        valid = true
                    }
                }
            }
        }
        console.log(day, month, year)
    }
    if (!valid) {
        date.value = "invalid date format"
    }
}