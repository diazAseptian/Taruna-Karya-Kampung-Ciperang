class AuthManager {
    constructor() {
        this.checkAuth();
    }

    // Check if user is authenticated
    isAuthenticated() {
        const loggedIn = sessionStorage.getItem('adminLoggedIn');
        const loginTime = sessionStorage.getItem('loginTime');
        
        if (!loggedIn || !loginTime) {
            return false;
        }
        
        // Session expires after 2 hours
        const sessionDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
        const currentTime = Date.now();
        
        if (currentTime - parseInt(loginTime) > sessionDuration) {
            this.logout();
            return false;
        }
        
        return true;
    }

    // Check authentication and redirect if needed
    checkAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/login';
        }
    }

    // Logout user
    logout() {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('loginTime');
        window.location.href = '/login';
    }

    // Add logout button to page
    addLogoutButton() {
        const nav = document.querySelector('nav .max-w-7xl .flex');
        if (nav) {
            const logoutBtn = document.createElement('button');
            logoutBtn.innerHTML = 'Logout';
            logoutBtn.className = 'text-white hover:text-mint-green transition-colors ml-4';
            logoutBtn.onclick = () => this.logout();
            nav.appendChild(logoutBtn);
        }
    }
}

// Initialize auth manager
const authManager = new AuthManager();