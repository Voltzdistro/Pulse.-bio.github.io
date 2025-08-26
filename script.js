class LinkInBioPage {
    constructor() {
        this.templateData = {
            profilePicture: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400',
            name: 'Voltzdistro',
            tagline: 'Digital Creator & Tech Enthusiast',
            socialLinks: [
                'https://voltzdistro/',
                'https://www.youtube.com/channel/UCUTuzzPqaFpdlyQ1DtMuZQQ',
                'https://www.reddit.com/user/DizzyNose3799/',
                'https://wa.me/+2347081427486'
            ],
            sections: [
                { name: 'Visit My Website', url: 'https://voltzdistro.github.io/?v=57766537356754' },
                { name: 'Read My Blog', url: 'https://medium.com/@voltzdistro' },
                { name: 'Shop My Products', url: '#' },
                { name: 'Contact Me', url: 'https://wa.me/+2347081427486' }
            ]
        };
        
        this.init();
        this.setupEventListeners();
        this.renderTemplate();
    }

    init() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        const savedAccentColor = localStorage.getItem('accentColor') || '#B6884B';
        this.setAccentColor(savedAccentColor);
        
        const rgbActive = localStorage.getItem('rgbBackground') === 'true';
        if (rgbActive) {
            this.toggleRGBBackground(true);
        }
    }

    setupEventListeners() {
        // Settings menu
        const settingsToggle = document.getElementById('settingsToggle');
        const settingsDropdown = document.getElementById('settingsDropdown');
        
        settingsToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsDropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            settingsDropdown.classList.remove('active');
        });

        // Settings options
        document.getElementById('themeCustomization').addEventListener('click', () => this.openThemeModal());
        document.getElementById('duplicateTemplate').addEventListener('click', () => this.duplicateTemplate());
        document.getElementById('editTemplate').addEventListener('click', () => this.openEditorModal());
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Theme modal
        document.getElementById('closeThemeModal').addEventListener('click', () => this.closeThemeModal());
        document.getElementById('accentColorPicker').addEventListener('change', (e) => this.setAccentColor(e.target.value));
        document.getElementById('backgroundUpload').addEventListener('change', (e) => this.handleBackgroundUpload(e));
        document.getElementById('rgbToggle').addEventListener('click', () => this.toggleRGBBackground());

        // Editor modal
        document.getElementById('closeEditorModal').addEventListener('click', () => this.closeEditorModal());
        document.getElementById('cancelEdit').addEventListener('click', () => this.closeEditorModal());
        document.getElementById('templateForm').addEventListener('submit', (e) => this.saveTemplate(e));
        
        // Profile picture upload
        document.getElementById('profilePictureUpload').addEventListener('change', (e) => this.handleProfilePictureUpload(e));
        
        // Dynamic form controls
        document.getElementById('addSocialLink').addEventListener('click', () => this.addSocialLinkField());
        document.getElementById('addSection').addEventListener('click', () => this.addSectionField());

        // Click effects
        this.addClickEffects();
    }

    renderTemplate() {
        // Update profile section
        document.getElementById('profileImg').src = this.templateData.profilePicture;
        document.querySelector('.profile-name').textContent = this.templateData.name;
        document.querySelector('.profile-tagline').textContent = this.templateData.tagline;

        // Render social icons
        this.renderSocialIcons();
        
        // Render main sections
        this.renderSections();
    }

    renderSocialIcons() {
        const container = document.getElementById('socialIcons');
        container.innerHTML = '';

        this.templateData.socialLinks.forEach(url => {
            if (url.trim()) {
                const icon = this.createSocialIcon(url);
                container.appendChild(icon);
            }
        });
    }

    renderSections() {
        const container = document.getElementById('linksSection');
        container.innerHTML = '';

        this.templateData.sections.forEach(section => {
            if (section.name.trim() && section.url.trim()) {
                const button = this.createSectionButton(section);
                container.appendChild(button);
            }
        });
    }

    createSocialIcon(url) {
        const link = document.createElement('a');
        link.href = url;
        link.className = 'social-icon';
        link.target = '_blank';
        link.rel = 'noopener';
        
        const icon = document.createElement('i');
        const iconClass = this.detectSocialIcon(url);
        icon.className = iconClass;
        
        link.appendChild(icon);
        link.title = this.getSocialPlatformName(url);
        
        return link;
    }

    createSectionButton(section) {
        const link = document.createElement('a');
        link.href = section.url;
        link.className = 'link-button';
        if (section.url !== '#') {
            link.target = '_blank';
            link.rel = 'noopener';
        }
        
        const icon = document.createElement('i');
        icon.className = this.detectSectionIcon(section.name, section.url);
        
        const span = document.createElement('span');
        span.textContent = section.name;
        
        link.appendChild(icon);
        link.appendChild(span);
        
        return link;
    }

    detectSocialIcon(url) {
        const domain = url.toLowerCase();
        
        if (domain.includes('github')) return 'fab fa-github';
        if (domain.includes('twitter') || domain.includes('x.com')) return 'fab fa-twitter';
        if (domain.includes('instagram')) return 'fab fa-instagram';
        if (domain.includes('facebook')) return 'fab fa-facebook';
        if (domain.includes('linkedin')) return 'fab fa-linkedin';
        if (domain.includes('youtube')) return 'fab fa-youtube';
        if (domain.includes('tiktok')) return 'fab fa-tiktok';
        if (domain.includes('discord')) return 'fab fa-discord';
        if (domain.includes('reddit')) return 'fab fa-reddit';
        if (domain.includes('whatsapp') || domain.includes('wa.me')) return 'fab fa-whatsapp';
        if (domain.includes('telegram')) return 'fab fa-telegram';
        if (domain.includes('snapchat')) return 'fab fa-snapchat';
        if (domain.includes('pinterest')) return 'fab fa-pinterest';
        if (domain.includes('twitch')) return 'fab fa-twitch';
        
        return 'fas fa-globe';
    }

    detectSectionIcon(name, url) {
        const nameL = name.toLowerCase();
        const urlL = url.toLowerCase();
        
        if (nameL.includes('website') || nameL.includes('portfolio')) return 'fas fa-globe';
        if (nameL.includes('blog') || nameL.includes('article')) return 'fas fa-blog';
        if (nameL.includes('shop') || nameL.includes('store') || nameL.includes('buy')) return 'fas fa-shopping-cart';
        if (nameL.includes('contact') || nameL.includes('email')) return 'fas fa-envelope';
        if (nameL.includes('resume') || nameL.includes('cv')) return 'fas fa-file-alt';
        if (nameL.includes('music') || nameL.includes('spotify')) return 'fas fa-music';
        if (nameL.includes('video') || nameL.includes('youtube')) return 'fas fa-video';
        if (nameL.includes('photo') || nameL.includes('gallery')) return 'fas fa-camera';
        if (nameL.includes('book') || nameL.includes('read')) return 'fas fa-book';
        if (nameL.includes('download')) return 'fas fa-download';
        if (nameL.includes('calendar') || nameL.includes('schedule')) return 'fas fa-calendar';
        if (nameL.includes('location') || nameL.includes('map')) return 'fas fa-map-marker-alt';
        
        if (urlL.includes('github')) return 'fab fa-github';
        if (urlL.includes('whatsapp') || urlL.includes('wa.me')) return 'fab fa-whatsapp';
        if (urlL.includes('medium')) return 'fab fa-medium';
        if (urlL.includes('linkedin')) return 'fab fa-linkedin';
        
        return 'fas fa-link';
    }

    getSocialPlatformName(url) {
        const domain = url.toLowerCase();
        
        if (domain.includes('github')) return 'GitHub';
        if (domain.includes('twitter') || domain.includes('x.com')) return 'Twitter';
        if (domain.includes('instagram')) return 'Instagram';
        if (domain.includes('facebook')) return 'Facebook';
        if (domain.includes('linkedin')) return 'LinkedIn';
        if (domain.includes('youtube')) return 'YouTube';
        if (domain.includes('tiktok')) return 'TikTok';
        if (domain.includes('discord')) return 'Discord';
        if (domain.includes('reddit')) return 'Reddit';
        if (domain.includes('whatsapp') || domain.includes('wa.me')) return 'WhatsApp';
        if (domain.includes('telegram')) return 'Telegram';
        if (domain.includes('snapchat')) return 'Snapchat';
        if (domain.includes('pinterest')) return 'Pinterest';
        if (domain.includes('twitch')) return 'Twitch';
        
        return 'Website';
    }

    openThemeModal() {
        const modal = document.getElementById('themeModal');
        modal.classList.add('active');
        
        // Set current values
        document.getElementById('accentColorPicker').value = localStorage.getItem('accentColor') || '#B6884B';
        
        const rgbBtn = document.getElementById('rgbToggle');
        const isRgbActive = localStorage.getItem('rgbBackground') === 'true';
        rgbBtn.classList.toggle('active', isRgbActive);
        rgbBtn.querySelector('span').textContent = isRgbActive ? 'Deactivate RGB Background' : 'Activate RGB Background';
    }

    closeThemeModal() {
        document.getElementById('themeModal').classList.remove('active');
    }

    openEditorModal(isDuplicate = false) {
        const modal = document.getElementById('editorModal');
        const title = document.getElementById('editorTitle');
        
        title.textContent = isDuplicate ? 'Duplicate Template' : 'Edit Template';
        modal.classList.add('active');
        
        this.populateEditorForm();
    }

    closeEditorModal() {
        document.getElementById('editorModal').classList.remove('active');
    }

    populateEditorForm() {
        // Profile data
        document.getElementById('profilePreview').src = this.templateData.profilePicture;
        document.getElementById('profileName').value = this.templateData.name;
        document.getElementById('profileTagline').value = this.templateData.tagline;
        
        // Social links
        const socialContainer = document.getElementById('socialLinksContainer');
        socialContainer.innerHTML = '';
        this.templateData.socialLinks.forEach(url => {
            this.addSocialLinkField(url);
        });
        
        // Sections
        const sectionsContainer = document.getElementById('sectionsContainer');
        sectionsContainer.innerHTML = '';
        this.templateData.sections.forEach(section => {
            this.addSectionField(section.name, section.url);
        });
    }

    addSocialLinkField(value = '') {
        const container = document.getElementById('socialLinksContainer');
        const div = document.createElement('div');
        div.className = 'social-link-item';
        
        div.innerHTML = `
            <input type="url" placeholder="Enter social media URL" value="${value}">
            <button type="button" class="remove-btn"><i class="fas fa-trash"></i></button>
        `;
        
        div.querySelector('.remove-btn').addEventListener('click', () => {
            div.remove();
        });
        
        container.appendChild(div);
    }

    addSectionField(name = '', url = '') {
        const container = document.getElementById('sectionsContainer');
        const div = document.createElement('div');
        div.className = 'section-item';
        
        div.innerHTML = `
            <input type="text" placeholder="Section name" value="${name}" class="section-name">
            <input type="url" placeholder="Section URL" value="${url}" class="section-url">
            <button type="button" class="remove-btn"><i class="fas fa-trash"></i></button>
        `;
        
        div.querySelector('.remove-btn').addEventListener('click', () => {
            div.remove();
        });
        
        container.appendChild(div);
    }

    handleProfilePictureUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            document.getElementById('profilePreview').src = imageUrl;
        };
        reader.readAsDataURL(file);
    }

    saveTemplate(event) {
        event.preventDefault();
        
        // Collect form data
        const formData = new FormData(event.target);
        
        // Update template data
        this.templateData.name = document.getElementById('profileName').value;
        this.templateData.tagline = document.getElementById('profileTagline').value;
        
        // Profile picture
        const profilePreview = document.getElementById('profilePreview');
        this.templateData.profilePicture = profilePreview.src;
        
        // Social links
        const socialInputs = document.querySelectorAll('#socialLinksContainer input[type="url"]');
        this.templateData.socialLinks = Array.from(socialInputs)
            .map(input => input.value.trim())
            .filter(url => url);
        
        // Sections
        const sectionItems = document.querySelectorAll('#sectionsContainer .section-item');
        this.templateData.sections = Array.from(sectionItems).map(item => ({
            name: item.querySelector('.section-name').value.trim(),
            url: item.querySelector('.section-url').value.trim()
        })).filter(section => section.name && section.url);
        
        // Re-render template
        this.renderTemplate();
        
        // Close modal
        this.closeEditorModal();
        
        // Show success notification
        this.showNotification('Template updated successfully!');
    }

    duplicateTemplate() {
        // Clear user-specific data but keep structure
        const duplicateData = {
            profilePicture: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400',
            name: '',
            tagline: '',
            socialLinks: [''],
            sections: [
                { name: 'Visit My Website', url: '' },
                { name: 'Read My Blog', url: '' },
                { name: 'Shop My Products', url: '' },
                { name: 'Contact Me', url: '' }
            ]
        };
        
        // Temporarily store current data
        const originalData = { ...this.templateData };
        this.templateData = duplicateData;
        
        // Open editor with duplicate data
        this.openEditorModal(true);
        
        // Restore original data (in case user cancels)
        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.templateData = originalData;
        }, { once: true });
    }

    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('#themeToggle i');
        const themeText = document.querySelector('#themeToggle span');
        
        if (body.classList.contains('light-theme')) {
            this.setTheme('dark');
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Mode';
        } else {
            this.setTheme('light');
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
        }
    }

    setTheme(theme) {
        const body = document.body;
        
        if (theme === 'light') {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    }

    setAccentColor(color) {
        const root = document.documentElement;
        
        // Generate color variations
        const rgb = this.hexToRgb(color);
        const darker = this.adjustBrightness(rgb, -30);
        const darkest = this.adjustBrightness(rgb, -60);
        
        root.style.setProperty('--accent-primary', color);
        root.style.setProperty('--accent-secondary', this.rgbToHex(darker.r, darker.g, darker.b));
        root.style.setProperty('--accent-tertiary', this.rgbToHex(darkest.r, darkest.g, darkest.b));
        root.style.setProperty('--shadow-color', `${color}4D`);
        
        localStorage.setItem('accentColor', color);
    }

    toggleRGBBackground(force = null) {
        const rgbBackground = document.querySelector('.rgb-background');
        const rgbBtn = document.getElementById('rgbToggle');
        
        const isActive = force !== null ? force : !rgbBackground.classList.contains('active');
        
        rgbBackground.classList.toggle('active', isActive);
        rgbBtn.classList.toggle('active', isActive);
        
        if (rgbBtn.querySelector('span')) {
            rgbBtn.querySelector('span').textContent = isActive ? 'Deactivate RGB Background' : 'Activate RGB Background';
        }
        
        localStorage.setItem('rgbBackground', isActive.toString());
    }

    handleBackgroundUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            this.setCustomBackground(imageUrl);
        };
        reader.readAsDataURL(file);
    }

    setCustomBackground(imageUrl) {
        const backgroundOverlay = document.querySelector('.background-overlay');
        backgroundOverlay.style.backgroundImage = `url(${imageUrl})`;
        backgroundOverlay.classList.add('active');
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    adjustBrightness(rgb, amount) {
        return {
            r: Math.max(0, Math.min(255, rgb.r + amount)),
            g: Math.max(0, Math.min(255, rgb.g + amount)),
            b: Math.max(0, Math.min(255, rgb.b + amount))
        };
    }

    rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 12px 20px;
            border-radius: 25px;
            border: 2px solid var(--accent-primary);
            font-size: 14px;
            font-weight: 600;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.style.opacity = '1', 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    addClickEffects() {
        const buttons = document.querySelectorAll('.link-button, .social-icon');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, var(--accent-primary) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    z-index: 1;
                `;

                if (!document.getElementById('ripple-style')) {
                    const style = document.createElement('style');
                    style.id = 'ripple-style';
                    style.textContent = `
                        @keyframes ripple {
                            to {
                                transform: scale(4);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }

                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);

                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LinkInBioPage();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        
        // Close settings dropdown
        document.getElementById('settingsDropdown').classList.remove('active');
        
        // Reset background
        const backgroundOverlay = document.querySelector('.background-overlay');
        backgroundOverlay.classList.remove('active');
        backgroundOverlay.style.backgroundImage = '';
    }
});