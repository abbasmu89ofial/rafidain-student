
function handleLogin() {
  const code = document.getElementById("codeInput").value.trim();
  if (encryptedStudents[code]) {
    const decrypted = atob(encryptedStudents[code]); // محاكاة فك التشفير
    localStorage.setItem("studentData", decrypted);
    window.location.href = "dashboard.html";
  } else {
    alert("الكود غير صحيح");
  }
}
