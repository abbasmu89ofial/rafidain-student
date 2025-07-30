
function login() {
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  const grade = document.getElementById("gradeSelect").value.trim();
  if (!data[code]) {
    alert("الكود غير صحيح، يرجى المحاولة مرة أخرى.");
    return;
  }
  if (data[code]["الصف"] !== grade) {
    alert("الصف لا يتطابق مع الكود.");
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
    document.getElementById("adminNote").innerText = student["رسالة من الإدارة"];

    // عرض الدرجات
    const gradesTable = document.getElementById("gradesTable");
    for (const subject in student["الدرجات"]) {
      const row = document.createElement("tr");
      const subjectCell = document.createElement("td");
      subjectCell.textContent = subject;
      row.appendChild(subjectCell);
      const subjectData = student["الدرجات"][subject];
      const keys = [
        "الشهر الأول", "الشهر الثاني", "الشهر الثالث", "السعي الأول", "نصف السنة",
        "الشهر الأول 2", "الشهر الثاني 2", "الشهر الثالث 2", "السعي الثاني",
        "السعي السنوي", "درجة الورقة الامتحانية", "الدرجة النهائية", "الدرجة النهائية بعد الإكمال"
      ];
      for (const key of keys) {
        const td = document.createElement("td");
        let val = subjectData[key];
        if (typeof val === "number") {
          val = Math.round(val % 1 >= 0.6 ? val + 0.4 : val); // التقريب
          if (val < 50) td.style.color = "red"; // تمييز الراسب
        }
        td.textContent = val ?? "-";
        row.appendChild(td);
      }
      gradesTable.appendChild(row);
    }

    // عرض الجدول الأسبوعي
    const scheduleTable = document.getElementById("scheduleTable");
    const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"];
    const schedule = student["جدول الأسبوع"];
    for (let i = 0; i < schedule.length; i++) {
      const row = document.createElement("tr");
      const dayCell = document.createElement("td");
      dayCell.textContent = days[i];
      row.appendChild(dayCell);
      for (const lesson of schedule[i]) {
        const lessonCell = document.createElement("td");
        lessonCell.textContent = lesson;
        row.appendChild(lessonCell);
      }
      scheduleTable.appendChild(row);
    }
  }
});
