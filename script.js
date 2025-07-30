
const secret = "rafidain2024";

function decryptStudent(code) {
  const encrypted = encryptedStudents[code];
  if (!encrypted) return null;

  const rawData = atob(encrypted);
  const iv = CryptoJS.enc.Utf8.parse(rawData.slice(0, 16));
  const cipherText = CryptoJS.enc.Base64.parse(encrypted);
  const key = CryptoJS.SHA256(secret);

  const decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherText }, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(jsonString);
}

function handleLogin() {
  const code = document.getElementById("codeInput").value.trim();
  const student = decryptStudent(code);
  if (!student) {
    alert("الكود غير صحيح.");
    return;
  }
  localStorage.setItem("studentData", JSON.stringify(student));
  window.location.href = "dashboard.html";
}
