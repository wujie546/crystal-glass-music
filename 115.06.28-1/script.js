/* ==========================================
   ULI Personal Portfolio Webpage Script
   Handles 3D Tilt Effect & Avatar Upload
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    init3DTilt();
    initAvatarUpload();
});

/**
 * Initializes the 3D Tilt effect on the profile card
 */
function init3DTilt() {
    const card = document.getElementById('profileCard');
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Mouse coordinate relative to the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate center of the card
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation angles (Max tilt: 10 degrees)
        const maxTilt = 10;
        const rx = ((centerY - y) / centerY) * maxTilt;
        const ry = ((x - centerX) / centerX) * maxTilt;
        
        // Set custom CSS variables for rotation
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
        card.style.setProperty('--rx', `${rx}deg`);
        card.style.setProperty('--ry', `${ry}deg`);
    });

    // Reset card position smoothly on mouse leave
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease';
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
    });
}

/**
 * Handles profile picture upload and immediate update
 */
function initAvatarUpload() {
    const fileInput = document.getElementById('avatarUpload');
    const avatarImage = document.getElementById('avatarImage');
    
    if (!fileInput || !avatarImage) return;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Verify it is an image
        if (!file.type.startsWith('image/')) {
            alert('請上傳有效的圖片檔案！');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            // Apply the uploaded image
            avatarImage.src = event.target.result;
            
            // Add a subtle flash effect to indicate successful change
            avatarImage.style.opacity = '0';
            setTimeout(() => {
                avatarImage.style.transition = 'opacity 0.5s ease';
                avatarImage.style.opacity = '1';
            }, 50);
        };
        
        reader.readAsDataURL(file);
    });
}
