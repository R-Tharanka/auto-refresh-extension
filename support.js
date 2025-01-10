// document.addEventListener("DOMContentLoaded", () => {
//     const feedbackForm = document.getElementById("feedbackForm");
//     const status = document.getElementById("status");

//     if (typeof emailjs !== "undefined") {
//         emailjs.init("4aKjN_IiCLo5XxgVV");
//         console.log("EmailJS initialized.");
//     } else {
//         console.error("EmailJS library not loaded.");
//         status.innerText = "Failed to load EmailJS. Please try again later.";
//         return;
//     }

//     feedbackForm.addEventListener("submit", (e) => {
//         e.preventDefault();

//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const message = document.getElementById("message").value;

//         emailjs
//             .send("service_1hkhisi", "template_j22bzpa", {
//                 user_name: name,
//                 user_email: email,
//                 user_message: message,
//             })
//             .then(
//                 (response) => {
//                     console.log("SUCCESS!", response);
//                     status.innerText = "Thank you for your feedback!";
//                     feedbackForm.reset();
//                 },
//                 (error) => {
//                     console.error("EmailJS Error:", error);
//                     status.innerText = "Failed to send feedback. Please try again.";
//                 }
//             );
//     });
// });
