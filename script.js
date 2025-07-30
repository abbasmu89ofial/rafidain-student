
function login() {
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  if (!data[code]) {
    alert("الكود غير صحيح، يرجى المحاولة مرة أخرى.");
    return;
  }
  localStorage.setItem("studentCode", code);
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("dashboard.html")) {
    const code = localStorage.getItem("studentCode");
    if (!code || !data[code]) {
      document.body.innerHTML = "<h2 style='color:red;text-align:center;'>لم يتم العثور على بيانات الطالب.</h2>";
      return;
    }
    const student = data[code];
    document.getElementById("studentName").innerText = student["الاسم"];
    document.getElementById("studentInfo").innerText = "الصف: " + student["الصف"] + " – الشعبة: " + student["الشعبة"];
    document.getElementById("adminNote").innerText = student["رسالة الإدارة"];

    // عرض الدرجات
    const gradesTable = document.getElementById("gradesTable");
    for (const subject in student["الدرجات"]) {
      const row = document.createElement("tr");
      const subjectCell = document.createElement("td");
      subjectCell.textContent = subject;
      row.appendChild(subjectCell);
      const subjectData = student["الدرجات"][subject];
      for (const key of ["الشهر الأول", "الشهر الثاني", "الشهر الثالث", "السعي الأول", "نصف السنة", "الكورس الثاني", "السعي السنوي"]) {
        const td = document.createElement("td");
        td.textContent = subjectData[key] ?? "-";
        row.appendChild(td);
      }
      gradesTable.appendChild(row);
    }

    // عرض الجدول الأسبوعي
    const scheduleTable = document.getElementById("scheduleTable");
    const schedule = student["الجدول الأسبوعي"];
    for (const day of schedule) {
      const row = document.createElement("tr");
      const dayCell = document.createElement("td");
      dayCell.textContent = day["اليوم"];
      row.appendChild(dayCell);
      for (const dars of day["الدروس"]) {
        const darsCell = document.createElement("td");
        darsCell.textContent = dars;
        row.appendChild(darsCell);
      }
      scheduleTable.appendChild(row);
    }
  }
});
