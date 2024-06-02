        // Load projects from local storage
        var projects = JSON.parse(localStorage.getItem('projects')) || [];
        var projectSelector = document.getElementById("projectSelector");

        function updateProjectSelector() {
            projectSelector.innerHTML = "";
            projects.forEach(function (project) {
                var option = document.createElement("option");
                option.text = project;
                projectSelector.add(option);
            });
        }

        function addProject() {
            var projectName = document.getElementById("projectName").value;
            if (projectName.trim() === "") {
                alert("Please enter a project name.");
                return;
            }

            projects.push(projectName);
            localStorage.setItem('projects', JSON.stringify(projects));
            updateProjectSelector();

            document.getElementById("projectName").value = "";
        }

        // Load activities from local storage
        var activities = JSON.parse(localStorage.getItem('activities')) || [];

        function addActivity() {
            var activityName = document.getElementById("activityName").value;
            var startTime = document.getElementById("startTime").value;
            var endTime = document.getElementById("endTime").value;
            var date = document.getElementById("date").value;
            var selectedProject = projectSelector.options[projectSelector.selectedIndex].text;

            if (activityName.trim() === "") {
                alert("Please enter an activity name.");
                return;
            }

            if (startTime === "" || endTime === "") {
                alert("Please enter both start and end times.");
                return;
            }

            var startDateTime = new Date("2000-01-01T" + startTime + ":00Z");
            var endDateTime = new Date("2000-01-01T" + endTime + ":00Z");
            var durationInHours = (endDateTime - startDateTime) / (1000 * 60 * 60); // in hours

            if (durationInHours < 0) {
                alert("End time should be later than start time.");
                return;
            }

            var currentDate = new Date();
            var dateString = date || currentDate.toDateString(); // Use the entered date or the current date

            var activityList = document.getElementById("activityList");
            var newRow = activityList.insertRow(0); // Display newest activity at the top
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);
            var cell6 = newRow.insertCell(5);
            var cell7 = newRow.insertCell(6);

            cell1.innerHTML = selectedProject;
            cell2.innerHTML = activityName;
            cell3.innerHTML = startTime;
            cell4.innerHTML = endTime;
            cell5.innerHTML = Math.round(durationInHours); // Display duration as a whole number
            cell6.innerHTML = dateString;
            cell7.innerHTML = '<button class="delete-btn" onclick="deleteActivity(this)">Delete</button>';

            // Save activity to local storage
            activities.unshift({
                project: selectedProject,
                activity: activityName,
                startTime: startTime,
                endTime: endTime,
                duration: Math.round(durationInHours), // Save duration as a whole number
                date: dateString
            });
            localStorage.setItem('activities', JSON.stringify(activities));

            document.getElementById("activityName").value = "";
            document.getElementById("startTime").value = "";
            document.getElementById("endTime").value = "";
            document.getElementById("date").value = "";
        }

        function deleteActivity(button) {
            var row = button.parentNode.parentNode;
            var index = row.rowIndex;
            activities.splice(index - 1, 1); // Subtract 1 because the header row is not included in activities array
            localStorage.setItem('activities', JSON.stringify(activities));
            row.parentNode.removeChild(row);
        }

        function closeModal(modalId) {
            var modal = document.getElementById(modalId);
            modal.style.display = "none";
        }

        function showModalActivity() {
            var modalActivity = document.getElementById("activityModal");
            modalActivity.style.display = "block";
        }

        window.onclick = function (event) {
            var modalActivity = document.getElementById("activityModal");
            if (event.target === modalActivity) {
                modalActivity.style.display = "none";
            }
        };

        function navigateToOverview() {
            window.location.href = "overview.html";
        }

        // Initial project selector population
        updateProjectSelector();

        // Load existing activities on page load
        activities.forEach(function (activity) {
            var activityList = document.getElementById("activityList");
            var newRow = activityList.insertRow(0);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);
            var cell6 = newRow.insertCell(5);
            var cell7 = newRow.insertCell(6);

            cell1.innerHTML = activity.project;
            cell2.innerHTML = activity.activity;
            cell3.innerHTML = activity.startTime;
            cell4.innerHTML = activity.endTime;
            cell5.innerHTML = activity.duration;
            cell6.innerHTML = activity.date;
            cell7.innerHTML = '<button class="delete-btn" onclick="deleteActivity(this)">Delete</button>';
        });