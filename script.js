document.addEventListener('DOMContentLoaded', () => {
    let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

    function updateLocalStorage() {
        localStorage.setItem('subjects', JSON.stringify(subjects));
    }

    function updateAttendance(index) {
        let subject = subjects[index];
        let perc = subject.total === 0 ? 100 : ((subject.attended / subject.total) * 100).toFixed(2);
        document.querySelector(`#attendance-${index}`).innerHTML = `${perc}%`;
        updateLocalStorage();
    }

    function attendedClass(index) {
        subjects[index].attended++;
        subjects[index].total++;
        updateAttendance(index);
    }

    function missedClass(index) {
        subjects[index].total++;
        updateAttendance(index);
    }

    function renderSubjects() {
        let container = document.getElementById('subjects-container');
        container.innerHTML = '';
        subjects.forEach((subject, index) => {
            let subjectDiv = document.createElement('div');
            subjectDiv.classList.add('subject-card');
            subjectDiv.innerHTML = `
                <div class="subject-name">
                    <span class="title">${subject.name}</span>
                    <span class="attendance" id="attendance-${index}">100%</span>
                </div>
                <div class="buttons">
                    <button class="yes" onclick="attendedClass(${index})">Yes</button>
                    <button class="no" onclick="missedClass(${index})">No</button>
                </div>
            `;
            container.appendChild(subjectDiv);
            updateAttendance(index);
        });
    }

    document.getElementById('add-subject').addEventListener('click', () => {
        let subjectName = prompt("Enter subject name:");
        if (subjectName) {
            subjects.push({ name: subjectName, attended: 0, total: 0 });
            updateLocalStorage();
            renderSubjects();
        }
    });

    window.attendedClass = attendedClass;
    window.missedClass = missedClass;
    
    renderSubjects();
});
