class ThemeManager {
    constructor() {
        if (ThemeManager.instance) {
            return ThemeManager.instance; 
        }
        this.theme = 'light';
        ThemeManager.instance = this;
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
    }

    applyTheme() {
        const body = document.getElementById('app-body');
        const text = document.getElementById('status-text');
        const card = document.getElementById('info-card');
        
        if (this.theme === 'dark') {
            // Bodyの変更
            body.classList.replace('bg-white', 'bg-slate-900');
            body.classList.replace('text-black', 'text-white');
            // 解説カードの変更
            card.classList.replace('bg-gray-100', 'bg-slate-800');
            card.classList.replace('border-gray-200', 'border-slate-700');
        } else {
            // Bodyの戻し
            body.classList.replace('bg-slate-900', 'bg-white');
            body.classList.replace('text-white', 'text-black');
            // 解説カードの戻し
            card.classList.replace('bg-slate-800', 'bg-gray-100');
            card.classList.replace('border-slate-700', 'border-gray-200');
        }
        text.innerText = `現在のモード: ${this.theme.toUpperCase()}`;
    }
}

const themeManager = new ThemeManager();
document.getElementById('toggle-btn').addEventListener('click', () => {
    themeManager.toggleTheme();
});