document.getElementById("feedbackForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    emailjs.send("service_id", "template_id", {
        user_name: name,
        user_email: email,
        user_message: message,
    }).then(
        (response) => {
            document.getElementById("status").innerText = "Thank you for your feedback!";
            document.getElementById("feedbackForm").reset();
        },
        (error) => {
            document.getElementById("status").innerText = "Failed to send feedback. Please try again.";
        }
    );
});
