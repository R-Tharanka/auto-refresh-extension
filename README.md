# Auto Refresh Extension

A Chrome browser extension that automatically refreshes web pages based on customizable time intervals and refresh counts, with an integrated feedback system.

## Features

- **Custom Refresh Settings**: Set specific time intervals (in milliseconds) and number of refreshes
- **Flexible Control**: Start, stop, pause, and resume page refreshing
- **User Interface**: Clean, dark-themed popup with intuitive controls
- **Feedback System**: Integrated Django backend for collecting user feedback

## Project Structure

```
auto-refresh-extension/
│
├── Extension Files
│   ├── manifest.json       # Extension configuration
│   ├── popup.html          # UI for the extension popup
│   ├── popup.js            # Controls the popup behavior
│   ├── background.js       # Handles the refresh functionality
│   ├── content.js          # Interacts with web page content
│   └── icons/              # Extension icons
│
└── Backend (Django)
    ├── backend/            # Django project settings
    ├── feedback/           # Feedback application
    │   ├── models.py       # Database models for feedback
    │   ├── views.py        # Views handling feedback submission
    │   ├── forms.py        # Form definitions
    │   └── templates/      # HTML templates
    └── static/             # Static files (CSS, images)
```

## Installation

### Chrome Extension

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked" and select the extension directory
5. The extension icon should appear in your browser toolbar

### Backend Server (for feedback system)

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install required packages:
   ```
   pip install -r requirements.txt
   ```

3. Run migrations:
   ```
   python manage.py migrate
   ```

4. Start the server:
   ```
   python manage.py runserver
   ```

## Usage

1. Click on the extension icon in your browser toolbar
2. Enter the desired refresh time (in milliseconds) and number of refreshes
3. Use the control buttons to:
   - Start refreshing
   - Stop refreshing
   - Pause/Resume refreshing
4. Click the support icon to submit feedback

## Configuration

You can modify the default settings in the following files:

- `background.js`: Change default refresh time and count
- `popup.html`: Modify the UI design
- `manifest.json`: Update extension permissions and metadata

## Notes

- The extension cannot refresh certain Chrome system pages (URLs starting with `chrome://` or `edge://`)
- For security reasons, some pages may restrict script execution

