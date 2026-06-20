async function testFlow() {
  try {
    // 1. Forgot Password
    const forgotRes = await fetch("https://almeida-photography-1.onrender.com/api/auth/forgotpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@example.com" }) // assuming an admin exists, or we need to register one
    });
    const forgotData = await forgotRes.json();
    console.log("Forgot Data:", forgotData);

    if (!forgotData.resetUrl) {
      console.log("Failed to get reset URL. Creating a test user first.");
      await fetch("https://almeida-photography-1.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Tester", email: "test@example.com", password: "password", phone: "123" })
      });
      
      const retryForgot = await fetch("https://almeida-photography-1.onrender.com/api/auth/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" })
      });
      const retryData = await retryForgot.json();
      console.log("Retry Forgot Data:", retryData);
      forgotData.resetUrl = retryData.resetUrl;
    }

    if (forgotData.resetUrl) {
      const token = forgotData.resetUrl.split("/").pop();
      console.log("Extracted token:", token);

      // 2. Reset Password
      const resetRes = await fetch(`https://almeida-photography-1.onrender.com/api/auth/resetpassword/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: "newpassword" })
      });
      const resetData = await resetRes.json();
      console.log("Reset Response:", resetData);
    }
  } catch (err) {
    console.error(err);
  }
}
testFlow();
