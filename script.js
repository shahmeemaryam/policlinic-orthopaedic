document.getElementById('sendOTPBtn').addEventListener('click', () => {
  const phone = document.getElementById('phone').value;
  sendOTP(phone);
  document.getElementById('otpSection').style.display = 'block';
});

document.getElementById('verifyOTPBtn').addEventListener('click', () => {
  const otp = document.getElementById('otp').value;
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const timeSlot = document.getElementById('timeSlot').value;

  const patientData = { name, phone, timeSlot, timestamp: Date.now() };
  verifyOTP(otp, patientData);
});
