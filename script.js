
function handleLogin() {
  const code = document.getElementById("codeInput").value.trim();
  if (encryptedStudents.hasOwnProperty(code)) {
    const decrypted = atob(encryptedStudents[code]);
    localStorage.setItem("studentData", decrypted);
    window.location.href = "dashboard.html";
  } else {
    alert("الكود غير صحيح!");
  }
}
