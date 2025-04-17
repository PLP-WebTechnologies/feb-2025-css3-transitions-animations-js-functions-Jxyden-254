document.addEventListener('DOMContentLoaded', function() {
    // Theme Switching
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const htmlElement = document.documentElement;
    const samuraiContainer = document.getElementById('samurai-container');
    const samuraiCharacter = document.querySelector('.samurai-character');
    const slashEffect = document.querySelector('.slash-effect');
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      htmlElement.classList.add('dark');
    }
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
    });
    
    // Theme toggle function
    function toggleTheme() {
      const isDark = htmlElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // Trigger samurai animation
      triggerSamuraiAnimation({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }, 'horizontal');
    }
    
    // Add event listeners to theme toggles
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      if (email) {
        // Store email in localStorage
        localStorage.setItem('userEmail', email);
        
        // Show success message
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.backgroundColor = '#10b981'; // Green color
        
        // Reset form
        emailInput.value = '';
        
        // Reset button after 3 seconds
        setTimeout(() => {
          button.textContent = originalText;
          button.style.backgroundColor = '';
        }, 3000);
      }
    });
    
    // Samurai Animation
    function triggerSamuraiAnimation(position, direction) {
      // Show container
      samuraiContainer.style.display = 'block';
      
      // Position samurai
      samuraiCharacter.style.left = `${position.x - 75}px`;
      samuraiCharacter.style.top = `${position.y - 75}px`;
      
      // Set rotation based on direction
      let rotation = 0;
      if (direction === 'vertical') {
        rotation = 90;
      } else if (direction === 'diagonal') {
        rotation = 45;
      }
      
      // Apply rotation
      const samuraiBody = document.querySelector('.samurai-body');
      samuraiBody.style.transform = `rotate(${rotation}deg)`;
      
      // Set slash direction
      slashEffect.className = 'slash-effect';
      slashEffect.classList.add(direction);
      
      // Set slash gradient
      const isDark = htmlElement.classList.contains('dark');
      slashEffect.style.background = `linear-gradient(to ${
        direction === 'horizontal' ? 'right' : 
        direction === 'vertical' ? 'bottom' : 'bottom right'
      }, transparent, ${
        isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'
      }, transparent)`;
      
      // Trigger animations
      samuraiCharacter.classList.add('animate');
      slashEffect.classList.add('animate');
      
      // Hide after animation completes
      setTimeout(() => {
        samuraiCharacter.classList.remove('animate');
        slashEffect.classList.remove('animate');
        samuraiContainer.style.display = 'none';
      }, 1000);
    }
    
    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .interactive');
    
    interactiveElements.forEach(element => {
      element.addEventListener('click', function(e) {
        // Don't trigger for theme toggles (they already trigger the animation)
        if (this === themeToggle || this === themeToggleMobile) return;
        
        const rect = this.getBoundingClientRect();
        const position = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
        
        // Determine slash direction based on element shape
        let direction = 'horizontal';
        if (rect.width > rect.height * 1.5) {
          direction = 'horizontal';
        } else if (rect.height > rect.width * 1.5) {
          direction = 'vertical';
        } else {
          direction = Math.random() > 0.5 ? 'horizontal' : 'diagonal';
        }
        
        triggerSamuraiAnimation(position, direction);
      });
    });
    
    // Trigger initial animation on page load
    window.addEventListener('load', function() {
      setTimeout(() => {
        triggerSamuraiAnimation({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        }, 'horizontal');
      }, 500);
    });
  });