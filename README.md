﻿# knowledgeBase-information-security-chatbot

## Overview
The InfoSec Chatbot is a web-based application designed to provide information and guidance on various information security topics. It uses HTML, CSS (with Bootstrap), and JavaScript to create an interactive chatbot interface that responds to user queries about cybersecurity best practices.

## Features
- **Responsive Design**: Works on both desktop and mobile devices
- **Interactive Chat Interface**: Realistic conversation flow with typing indicators
- **Information Security Topics**:
  - Password best practices
  - Phishing detection
  - Two-factor authentication (2FA)
  - VPN benefits
  - Malware protection
  - Data encryption
- **Quick Suggestions**: Pre-defined question buttons for common topics
- **Visual Distinction**: Clear differentiation between user and bot messages

## Technologies Used
- **Frontend**:
  - HTML5
  - CSS3 (with custom styling)
  - Bootstrap 5 (for responsive layout and components)
  - JavaScript (for chat functionality)
- **Dependencies**:
  - Bootstrap CSS/JS (CDN)
  - Font Awesome (for icons)

## Installation
No installation required! This is a client-side only application. Simply open the `index.html` file in any modern web browser.

### Alternative: Hosting on a Web Server
1. Clone or download the repository
2. Upload all files to your web server:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Access the application via your server's URL

## Usage
1. Open `index.html` in a web browser
2. Type your information security question in the input field or click one of the suggestion buttons
3. Press Enter or click the send button
4. The bot will respond with relevant security information

## Customization
### Adding More Topics
To expand the chatbot's knowledge:
1. Open `script.js`
2. Add new entries to the `knowledgeBase` object following the same format:
   ```javascript
   'your topic keyword': `
       <strong>Topic Title</strong>
       <p>Description or information about the topic</p>
       <ul>
           <li>Point 1</li>
           <li>Point 2</li>
       </ul>
   `,
   ```
3. Update the `getBotResponse()` function to recognize your new keywords

### Styling Changes
Modify `styles.css` to:
- Change colors, fonts, or layout
- Adjust message bubble appearance
- Modify the typing indicator animation

## Security Considerations
- User input is sanitized by using `textContent` instead of `innerHTML` for user messages
- Only trusted bot responses (from the knowledge base) are rendered as HTML
- No user data is stored or transmitted

## Limitations
- Currently only handles pre-defined topics in the knowledge base
- No persistent conversation history (resets on page refresh)
- No backend integration (pure client-side implementation)

## Future Enhancements
- Add more security topics to the knowledge base
- Implement natural language processing for better question understanding
- Add a backend for conversation history and user accounts
- Include multimedia content (images, videos) in responses
- Add multilingual support

## Screenshot
![image](https://github.com/user-attachments/assets/e59860db-3bad-4468-b7f6-a8ac3ee83b3a)



![image](https://github.com/user-attachments/assets/359d3f68-214c-4422-9230-3561bd8582b6)


## License
This project is open-source and available under the MIT License.
