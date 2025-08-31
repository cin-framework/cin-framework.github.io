/**
 * Early Access Email Subscription Handler
 * @package CIN Framework
 * @author Mawi Man
 * @license Proprietary - All rights reserved to Ayoub Alarjani
 */

/**
 * Handles email subscription form submission and sends data to Discord webhook
 * @param {Event} event - The form submission event
 * @returns {Promise<void>}
 */
async function handleEmailSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('subscriptionMessage');
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Disable form during submission
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        await sendToDiscord(email);
        showMessage('Thank you for subscribing! You will be notified when CIN Framework launches.', 'success');
        emailInput.value = '';
    } catch (error) {
        console.error('Subscription error:', error);
        showMessage('Something went wrong. Please try again later.', 'error');
    } finally {
        // Re-enable form
        submitButton.disabled = false;
        submitButton.textContent = 'Notify Me';
    }
}

/**
 * Sends email subscription data to Discord webhook
 * @param {string} email - The subscriber's email address
 * @returns {Promise<void>}
 */
async function sendToDiscord(email) {
    const webhookUrl = 'https://discord.com/api/webhooks/1404125958348341448/Be3r2x-xg8kLsOzhCestqF9HshyRryJnqQrGn72Dx7k9M-MdkxpejBO8kZp9J1crtgqO';
    
    const payload = {
        embeds: [{
            title: '🚀 New CIN Framework Early Access Subscription',
            description: `A new user has subscribed for early access to CIN Framework!`,
            color: 0x00ff00,
            fields: [
                 {
                     name: '📧 Email',
                     value: email,
                     inline: false
                 },
                 {
                     name: '⏰ Timestamp',
                     value: new Date().toISOString(),
                     inline: false
                 },
                 {
                     name: '🌐 Source',
                     value: 'CIN Framework Website',
                     inline: false
                 }
             ],
            footer: {
                text: 'CIN Framework Early Access System'
            }
        }]
    };
    
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
        throw new Error(`Discord webhook failed: ${response.status}`);
    }
}

/**
 * Displays subscription status message to user
 * @param {string} message - The message to display
 * @param {string} type - The message type ('success' or 'error')
 * @returns {void}
 */
function showMessage(message, type) {
    const messageDiv = document.getElementById('subscriptionMessage');
    
    messageDiv.textContent = message;
    messageDiv.className = `cin-alert cin-alert-${type === 'success' ? 'success' : 'error'}`;
    messageDiv.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}