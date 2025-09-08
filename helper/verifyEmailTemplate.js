export default function verifyEmailTemplate(name, otp) {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification OTP</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
  </style>
</head>

<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #ffffff;">
  <section
    style="width: 450px; max-width: 100vw; margin: 2rem auto; padding: 2rem; border-radius: 8px; background-color: #3d2eaf;">
    <table style="width: 100%; border-spacing: 0; border-collapse: collapse;">
      <!-- Header Section -->
      <tr>
        <td>
          <table width="100%">
            <tr>
              <td align="center">
                <img src="https://img.freepik.com/premium-vector/shopping-cart-logo-icon_567288-1132.jpg" alt="Logo"
                  style="width: 5rem; object-fit: contain;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Content Section -->
      <tr>
        <td>
          <table>
            <tr>
              <td>
                <h2 style="font-size: 2rem; margin: 2rem 0 1rem; color: #ffffff;">
                  Hi ${name},
                </h2>
              </td>
            </tr>
            <tr>
              <td>
                <p style="font-size: 1rem; line-height: 2rem; margin: 0; padding: 0; color: #ffffff;">
                  You are just one step away from verifying your email address.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="font-size: 1rem; margin: 0; padding: 0; color: #ffffff;">
                  Please use the One Time Password (OTP) below to verify your email for
                  <strong style="font-size: 1.25rem; color: #ffffff;">Shop Cart</strong>.
                </p>
              </td>
            </tr>
          </table>

          <!-- OTP Box -->
          <div style="
                margin: 2rem 0 1rem;
                display: flex;
                gap: 1rem;
                align-items: center;
              ">
            <p style="
                  font-size: 2em;
                  font-weight: 600;
                  background-color: #ffffff;
                  color: #3d2eaf;
                  padding: 1rem 1.5rem;
                  display: inline-block;
                  border-radius: 8px;
                  letter-spacing: 1rem;
                  text-align: center;
                  cursor: pointer;
                  user-select: text;
                " title="Click to copy OTP">
              ${otp}
            </p>
            <p style="font-size: 1rem; color: #ffffff;" class="message"></p>
          </div>

          <p style="font-size: 1rem; color: #ffffff;">
            OTP will expire in <strong>10 minutes</strong>.
          </p>
        </td>
      </tr>

      <!-- Footer Section -->
      <tr>
        <td style="text-align: center; margin: 2rem; ">
          <p style="margin-top: 4rem; color: #ffffff;">
            &copy; 2024 Shop Cart. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </section>

  <script>
    const otpBox = document.querySelector("p[title='Click to copy OTP']");
    const message = document.querySelector(".message");

    otpBox.addEventListener("click", () => {
      window.navigator.clipboard.writeText(otpBox.innerHTML.trim());
      message.innerHTML = "Copied To Clipboard";
      message.style.visibility = "visible";

      // Hide the message after 5 seconds
      setTimeout(() => {
        message.style.visibility = "hidden";
      }, 5000);
    });
  </script>
</body>

</html>`;
}
