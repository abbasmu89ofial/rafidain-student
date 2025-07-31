document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const code = document.getElementById("code").value.trim().toUpperCase();
    const grade = document.getElementById("grade").value.trim();

    if (!code || !grade) {
      alert("يرجى إدخال الكود والصف.");
      return;
    }

    // تأكد أن ملف data.js مرفق ويحوي مصفوفة students
    if (typeof students === "undefined" || !Array.isArray(students)) {
      alert("حدث خطأ في تحميل البيانات.");
      return;
    }

    const student = students.find(
      (s) => s.code === code && s.grade === grade
    );

    if (!student) {
      alert("الكود أو الصف غير صحيح.");
      return;
    }

    localStorage.setItem("student", JSON.stringify(student));
    window.location.href = "dashboard.html";
  });
});
