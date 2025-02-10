// Grading function
function gradeScore(score) {
    if (score < 30) return "Fail";
    if (score < 40) return "Trial";
    if (score < 50) return "Pullup";
    if (score < 60) return "Good";
    if (score < 70) return "Pass";
    return "Above Expectation";
}

// Save student exam scores
function saveExamScores(studentId, scores, remarks) {
    let exams = JSON.parse(localStorage.getItem('exams')) || [];
    const existingExam = exams.find(exam => exam.studentId === studentId);
    if (existingExam) {
        existingExam.scores = scores;
        existingExam.remarks = remarks;
    } else {
        exams.push({ studentId, scores, remarks });
    }
    localStorage.setItem('exams', JSON.stringify(exams));
}

// Display registered students in the selection dropdown
function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentSelect = document.getElementById('studentSelect');
    studentSelect.innerHTML = '<option value="">-- Select Student --</option>';

    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.studentId;
        option.textContent = `${student.studentName} (${student.studentId})`;
        studentSelect.appendChild(option);
    });
}

// Display results for selected student
function displayExamScores(studentId) {
    const exams = JSON.parse(localStorage.getItem('exams')) || [];
    const exam = exams.find(exam => exam.studentId === studentId);

    if (exam) {
        const scores = exam.scores;
        let totalMarks = 0;
        let grades = '';

        for (let subject in scores) {
            totalMarks += parseInt(scores[subject], 10);
            grades += `<p><strong>${subject}:</strong> ${scores[subject]} - Grade: ${gradeScore(scores[subject])}</p>`;
        }

        const totalPercentage = (totalMarks / 1200) * 100;

        const report = `
            <div class="report">
                <h3>Exam Results for ${studentId}</h3>
                <p><strong>Total Marks:</strong> ${totalMarks}/1200</p>
                <p><strong>Percentage:</strong> ${totalPercentage.toFixed(2)}%</p>
                <div class="grades">${grades}</div>
                <p><strong>Teacher's Remarks:</strong> ${exam.remarks}</p>
            </div>
        `;

        document.getElementById('scoresList').innerHTML = report;
    }
}

// Print the report form
function printReport() {
    const report = document.querySelector('.report');
    if (report) {
        const printWindow = window.open('', '', 'height=500,width=800');
        printWindow.document.write('<html><head><title>Exam Report</title></head><body>');
        printWindow.document.write('<h1>Exam Report</h1>');
        printWindow.document.write(report.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    } else {
        alert('No report to print!');
    }
}

// Event listener for form submission (Exam)
document.getElementById('examForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const studentId = document.getElementById('studentSelect').value;
    const scores = {
        english: document.getElementById('english').value,
        kiswahili: document.getElementById('kiswahili').value,
        chemistry: document.getElementById('chemistry').value,
        biology: document.getElementById('biology').value,
        geography: document.getElementById('geography').value,
        science: document.getElementById('science').value,
        digitalSkills: document.getElementById('digitalSkills').value,
        commonSkills: document.getElementById('commonSkills').value,
        physics: document.getElementById('physics').value,
        CRE: document.getElementById('CRE').value,
        computer: document.getElementById('computer').value,
        agriculture: document.getElementById('agriculture').value,
        business: document.getElementById('business').value
    };

    const remarks = document.getElementById('remarks').value;

    saveExamScores(studentId, scores, remarks);
    displayExamScores(studentId);
});

// Load students and display the first student's exam results on page load
window.onload = function() {
    displayStudents();

    document.getElementById('studentSelect').addEventListener('change', function() {
        displayExamScores(this.value);
    });
};
