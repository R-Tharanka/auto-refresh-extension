from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.conf import settings
from .forms import FeedbackForm

def feedback_view(request):
    """
    Handle feedback form submission and rendering.
    """
    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            # Save feedback to the database
            feedback_instance = form.save()
            
            # Attempt to send an email notification
            try:
                send_mail(
                    subject='New Feedback Submission',  # Email subject
                    message=(
                        f"Feedback received from {feedback_instance.name} "
                        f"({feedback_instance.email}):\n\n{feedback_instance.message}"
                    ),
                    from_email=settings.EMAIL_HOST_USER,  # Sender email (from settings)
                    recipient_list=['wattakkahutta123@gmail.com'],  # Recipient email(s)
                    fail_silently=False,
                )
                print("Email sent successfully")
            except Exception as e:
                print(f"Error sending email: {e}")  # Log email errors
            
            # Redirect to the thank-you page
            return redirect('feedback_thank_you')
    else:
        # Render an empty feedback form for GET requests
        form = FeedbackForm()

    return render(request, 'feedback/feedback_form.html', {'form': form})


def thank_you_view(request):
    """
    Render the thank-you page after feedback submission.
    """
    return render(request, 'feedback/thank_you.html', {
        'message': 'Thank you for your feedback!'
    })

