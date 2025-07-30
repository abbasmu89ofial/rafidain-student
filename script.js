function login() {
  const code = document.getElementById("codeInput").value.trim();
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
      document.body.innerHTML = "<h2>خطأ: لم يتم العثور على البيانات.</h2>";
      return;
    }
    const student = data[code];

    document.getElementById("studentName").innerText = student["الاسم"];
    document.getElementById("studentInfo").innerText =
      "الصف: " + student["الصف"] + " – الشعبة: " + student["الشعبة"];

    const gradesTable = document.getElementById("gradesTable");
    for (const [subject, scores] of Object.entries(student["الدرجات"])) {
      const row = document.createElement("tr");
      const grades = Object.entries(scores)
        .map(([label, val]) => `<strong>${label}:</strong> ${val}`)
        .join("<br>");
      row.innerHTML = `<td>${subject}</td><td>${grades}</td>`;
      gradesTable.appendChild(row);
    }

    const scheduleTable = document.getElementById("scheduleTable");
    student["الجدول الأسبوعي"].forEach(day => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${day["اليوم"]}</td><td>${day["الدروس"].join(" – ")}</td>`;
      scheduleTable.appendChild(row);
    });

    const footer = document.querySelector(".footer-message");
    if (footer) footer.innerText = student["رسالة الإدارة"];
  }
});