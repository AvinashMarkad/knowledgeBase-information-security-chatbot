document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');

    // Knowledge base for information security topics
    const knowledgeBase = {
        'password best practices': `
            <strong>Password Best Practices:</strong>
            <ul>
                <li>Use long passwords (at least 12 characters)</li>
                <li>Include a mix of uppercase, lowercase, numbers, and special characters</li>
                <li>Avoid common words or personal information</li>
                <li>Don't reuse passwords across different accounts</li>
                <li>Consider using a password manager</li>
                <li>Change passwords immediately if a breach is suspected</li>
            </ul>
        `,
        'how to spot phishing': `
            <strong>How to Spot Phishing Attempts:</strong>
            <ul>
                <li>Check the sender's email address carefully</li>
                <li>Look for poor grammar and spelling mistakes</li>
                <li>Be wary of urgent or threatening language</li>
                <li>Hover over links to see the actual URL before clicking</li>
                <li>Watch for requests for personal or financial information</li>
                <li>Be suspicious of unexpected attachments</li>
                <li>When in doubt, contact the organization directly through official channels</li>
            </ul>
        `,
        'what is 2fa': `
            <strong>Two-Factor Authentication (2FA):</strong>
            <p>2FA adds an extra layer of security beyond just a password. It requires:</p>
            <ol>
                <li>Something you know (your password)</li>
                <li>Something you have (like your phone or a security key)</li>
            </ol>
            <p>Common 2FA methods include:</p>
            <ul>
                <li>Text message codes (SMS)</li>
                <li>Authenticator apps (Google Authenticator, Microsoft Authenticator, Authy)</li>
                <li>Biometric verification (fingerprint, facial recognition)</li>
                <li>Physical security keys</li>
            </ul>
            <p>2FA significantly reduces the risk of unauthorized access even if your password is compromised.</p>
        `,
        'vpn benefits': `
            <strong>Benefits of Using a VPN:</strong>
            <ul>
                <li><strong>Encrypts your internet traffic</strong> - protects data from eavesdroppers</li>
                <li><strong>Hides your IP address</strong> - enhances privacy and anonymity</li>
                <li><strong>Secures public Wi-Fi connections</strong> - essential when using coffee shops, airports, etc.</li>
                <li><strong>Bypasses geographic restrictions</strong> - access content that might be restricted in your region</li>
                <li><strong>Prevents bandwidth throttling</strong> - some ISPs throttle certain types of traffic</li>
                <li><strong>Protects against some forms of tracking</strong> - makes it harder for advertisers to track you</li>
            </ul>
            <p>Note: Not all VPNs are equal. Choose a reputable provider with a no-logs policy.</p>
        `,
        'malware protection': `
            <strong>Malware Protection Tips:</strong>
            <ul>
                <li>Keep your operating system and software updated</li>
                <li>Use reputable antivirus/anti-malware software</li>
                <li>Be cautious with email attachments and downloads</li>
                <li>Avoid pirated software which often contains malware</li>
                <li>Regularly back up your important data</li>
                <li>Enable firewalls on your devices and network</li>
                <li>Be wary of removable media from untrusted sources</li>
                <li>Use standard user accounts rather than administrator accounts for daily use</li>
            </ul>
        `,
        'data encryption': `
            <strong>Data Encryption Information:</strong>
            <p>Encryption converts data into a coded form that can only be read with the correct key.</p>
            <p><strong>Types of encryption:</strong></p>
            <ul>
                <li><strong>At-rest encryption:</strong> Protects stored data (e.g., full disk encryption)</li>
                <li><strong>In-transit encryption:</strong> Protects data being transmitted (e.g., HTTPS, TLS)</li>
            </ul>
            <p><strong>Common encryption tools:</strong></p>
            <ul>
                <li>BitLocker (Windows)</li>
                <li>FileVault (Mac)</li>
                <li>VeraCrypt (cross-platform)</li>
                <li>PGP/GPG for email and files</li>
            </ul>
            <p>Remember: Encryption is only as strong as your password/key management practices.</p>
        `,
        'default': `
            I'm not sure I understand your question about information security. Could you try rephrasing it or 
            ask about something more specific? Here are some topics I can help with:
            <ul>
                <li>Password security and management</li>
                <li>Recognizing and avoiding phishing scams</li>
                <li>Malware prevention and removal</li>
                <li>Secure browsing practices</li>
                <li>Data protection and encryption</li>
                <li>Network security fundamentals</li>
            </ul>
        `
    };

    // Add event listener for form submission
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendMessage();
    });

    // Add event listeners for suggestion buttons
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            userInput.value = this.textContent;
            sendMessage();
        });
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Process after a short delay to simulate thinking
        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Get bot response
            const response = getBotResponse(message);
            
            // Add bot response to chat
            addMessage(response, 'bot');
            
            // Scroll to bottom
            scrollToBottom();
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }

    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`, 'mb-3');
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content', 'p-3', 'rounded');
        if (sender === 'user') {
            contentDiv.classList.add('bg-primary', 'text-white');
            // For user messages, always treat as text (don't parse HTML)
            contentDiv.textContent = content;
        } else {
            contentDiv.classList.add('bg-light');
            // For bot messages, check if it contains HTML tags
            if (/<[a-z][\s\S]*>/i.test(content)) {
                contentDiv.innerHTML = content;
            } else {
                contentDiv.textContent = content;
            }
        }
        
        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time', 'text-muted', 'small', 'mt-1');
        
        const now = new Date();
        timeDiv.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        chatMessages.appendChild(messageDiv);
        
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'mb-3');
        typingDiv.id = 'typing-indicator';
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content', 'bg-light', 'p-3', 'rounded');
        
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        
        contentDiv.appendChild(typingIndicator);
        typingDiv.appendChild(contentDiv);
        chatMessages.appendChild(typingDiv);
        
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific topics
        if (lowerMessage.includes('password') || lowerMessage.includes('passphrase')) {
            return knowledgeBase['password best practices'];
        } else if (lowerMessage.includes('phish') || lowerMessage.includes('scam')) {
            return knowledgeBase['how to spot phishing'];
        } else if (lowerMessage.includes('2fa') || lowerMessage.includes('two-factor') || lowerMessage.includes('multi-factor')) {
            return knowledgeBase['what is 2fa'];
        } else if (lowerMessage.includes('vpn') || lowerMessage.includes('virtual private network')) {
            return knowledgeBase['vpn benefits'];
        } else if (lowerMessage.includes('malware') || lowerMessage.includes('virus') || lowerMessage.includes('ransomware')) {
            return knowledgeBase['malware protection'];
        } else if (lowerMessage.includes('encrypt') || lowerMessage.includes('cipher')) {
            return knowledgeBase['data encryption'];
        } else {
            return knowledgeBase['default'];
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Auto-focus input on load
    userInput.focus();
});