let studentData = null;

// جلب البيانات
async function fetchData() {
    const res = await fetch("data.json");
    studentData = await res.json();
}

function getStudentByCodeAndGrade(code, grade) {
    return studentData.find(s => s.code.toLowerCase() === code.toLowerCase() && s.class === grade);
}

function displayDashboard(student) {
    localStorage.setItem("student", JSON.stringify(student));
    window.location.href = "dashboard.html";
}

function renderDashboard() {
    const student = JSON.parse(localStorage.getItem("student"));
    if (!student) return;
    document.getElementById("studentName").innerText = student.name;
    document.getElementById("studentClass").innerText = `${student.class} / ${student.section}`;
    document.getElementById("studentMessage").innerText = student.message;

    // الدرجات
    const gradesContainer = document.getElementById("gradesContainer");
    let html = "";
    for (let subject in student.grades) {
        const g = student.grades[subject];
        html += \`<table><thead><tr><th colspan="6">\${subject}</th></tr><tr><th>شهر 1</th><th>شهر 2</th><th>شهر 3</th><th>نصف السنة</th><th>السعي السنوي</th><th>النهائي</th></tr></thead><tbody><tr>\`;
        html += \`<td class="\${g.m1 < 50 ? 'low' : ''}">\${g.m1}</td>\`;
        html += \`<td class="\${g.m2 < 50 ? 'low' : ''}">\${g.m2}</td>\`;
        html += \`<td class="\${g.m3 < 50 ? 'low' : ''}">\${g.m3}</td>\`;
        html += \`<td class="\${g.mid < 50 ? 'low' : ''}">\${g.mid}</td>\`;
        html += \`<td>\${g.annual}</td>\`;
        html += \`<td class="\${g.final < 50 ? 'low' : ''}">\${g.final}</td>\`;
        html += "</tr></tbody></table>";
    }
    gradesContainer.innerHTML = html;

    // الجدول
    const tableContainer = document.getElementById("timetableContainer");
    let thtml = "<table><thead><tr><th>اليوم</th><th>الدروس</th></tr></thead><tbody>";
    for (let day in student.timetable) {
        thtml += \`<tr><td>\${day}</td><td>\${student.timetable[day].join(", ")}</td></tr>\`;
    }
    thtml += "</tbody></table>";
    tableContainer.innerHTML = thtml;
}

// صفحة تسجيل الدخول
document.addEventListener("DOMContentLoaded", async () => {
    if (location.pathname.includes("index.html") || location.pathname === "/" || location.pathname === "/index.html") {
        await fetchData();
        document.getElementById("loginForm").addEventListener("submit", function(e) {
            e.preventDefault();
            const code = document.getElementById("code").value.trim();
            const grade = document.getElementById("grade").value;
            const student = getStudentByCodeAndGrade(code, grade);
            if (student) {
                displayDashboard(student);
            } else {
                document.getElementById("error").innerText = "الكود أو الصف غير صحيح.";
            }
        });
    } else {
        renderDashboard();
    }
});