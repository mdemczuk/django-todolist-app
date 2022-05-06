function clearEmployeeModalFields() {
    $("#add-employee-modal")[0].addEventListener("hidden.bs.modal", function (event) {
        $("#first-name")[0].value = "";
        $("#last-name")[0].value = "";
        $("#email")[0].value = "";
        $("#mobile")[0].value = "";
        $("#employment-date")[0].value = "";
    })
}


function addEmployeeToTable(employee) {
    $("#employee-list").append(
        `<tr class="linked-tr" onclick="window.location='employee/${employee.id}';">
            <th scope="row">${employee.id}</th>
            <td>${employee.first_name}</td>
            <td>${employee.last_name}</td>
        </tr>`
    );
}


function getEmployeeList() {
    $.get("/api/employee", function (data) {
        for (const employee of data) {
            addEmployeeToTable(employee);
        }
    }, "json");
}


function addEmployee() {
    $.post("/api/employee/", {
        "first_name": $("#first-name")[0].value,
        "last_name": $("#last-name")[0].value,
        "email": $("#email")[0].value,
        "mobile": $("#mobile")[0].value,
        "employment_date": $("#employment-date")[0].value
    }, function (responseData) {
        addEmployeeToTable(responseData);
        $('#add-employee-modal').modal('toggle');
    });
}


function clearTaskModalFields() {
    $("#add-task-modal")[0].addEventListener("hidden.bs.modal", function (event) {
        $("#task-description")[0].value = "";
        $("#task-category")[0].value = "Category1";
        $("#due-date")[0].value = "";
        $("#task-status")[0].value = "To do";
    })
}


function addTaskToTable(task) {
    $("#task-list").append(
        `<tr>
            <th scope="row" style="display:none">${task.id}</th>
            <td>${task.description}</td>
            <td>${task.category}</td>
            <td>${task.status}</td>
            <td>${task.due_date}</td>
            <td>
                <button type="button" class="btn btn-primary float-end" style="margin-left:4px" onclick="deleteTask(${task.id})">Delete</button>
                <button type="button" class="btn btn-primary float-end" onclick="updateTaskStatus(${task.id})">Done</button>
            </td>
        </tr>`
    );
}

function filterEmployeeTasks() {
    for (const row of $("#task-list")[0].rows) {
        let pass = true;
        if ($("#task-status-filter")[0].value != "Status") {
            if ($("#task-status-filter")[0].value != row.children[3].textContent) {
                pass = false;
            }
        }

        if ($("#due-date-filter")[0].value != "") {
            if ($("#due-date-filter")[0].value != row.children[4].textContent) {
                pass = false;
            }
        }

        row.style.display = pass ? "" : "none";
    }

}

function getEmployeeTasks(employeeID) {
    $.get(`/api/task_by_owner/?owner_id=${employeeID}`, function (responseData) {
        for (const task of responseData) {
            addTaskToTable(task);
        }
    }, "json");
}


function addTask() {
    $.post("/api/task/", {
        "description": $("#task-description")[0].value,
        "status": $("#task-status")[0].value,
        "category": $("#task-category")[0].value,
        "due_date": $("#due-date")[0].value,
        "owner": employeeID
    }, function (responseData) {
        addTaskToTable(responseData);
        $('#add-task-modal').modal('toggle');
    });
}


function updateTaskStatus(taskID) {
    $.ajax({
        type: 'PATCH',
        url: `/api/task/${taskID}/`,
        data: {
            "status": "Done",
        }
    }).done(function () {
        for (const row of $("#task-list")[0].rows) {
            if (row.firstElementChild.outerText == taskID) {
                row.children[3].textContent = "Done";
            }
        }
    });
}


function deleteTask(taskID) {
    $.ajax({
        url: `/api/task/${taskID}`,
        type: 'DELETE',
        success: function (result) {
            for (const row of $("#task-list")[0].rows) {
                if (row.firstElementChild.outerText == taskID) {
                    row.remove();
                }
            }
        }
    });
}