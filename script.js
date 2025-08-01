function login() {
  const code = document.getElementById("code").value.trim().toUpperCase();
  const studentClass = document.getElementById("class").value.trim();
  if (!code || !studentClass) {
    alert("يرجى إدخال الكود واختيار الصف.");
    return;
  }
  localStorage.setItem("studentCode", code);
  localStorage.setItem("studentClass", studentClass);
  window.location.href = "dashboard.html";
}