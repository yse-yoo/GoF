// --- 1. 製品 (Product) ---
class NotificationCard {
    constructor() {
        this.color = '';
        this.icon = '';
        this.title = '';
        this.message = '';
    }
    render() {
        return `
            <div class="flex items-center p-4 w-full rounded-lg border ${this.color} shadow-sm animate-fade-in">
                <div class="mr-3 text-xl">${this.icon}</div>
                <div class="text-left">
                    <div class="font-bold text-sm">${this.title}</div>
                    <div class="text-xs opacity-80">${this.message}</div>
                </div>
            </div>`;
    }
}

// --- 2. ビルダー (Builder) ---
class NotificationBuilder {
    constructor() {
        this.card = new NotificationCard();
    }
    reset() { this.card = new NotificationCard(); return this; }
    setColor(color) { this.card.color = color; return this; }
    setIcon(icon) { this.card.icon = icon; return this; }
    setTitle(title) { this.card.title = title; return this; }
    setMessage(msg) { this.card.message = msg; return this; }
    build() { return this.card; }
}

// --- 3. 監督者 (Director) ---
// 特定の「型」に合わせてビルド手順を指示する
class NotificationDirector {
    constructSuccess(builder, message) {
        return builder.reset()
            .setColor('bg-green-50 border-green-200 text-green-800')
            .setIcon('✅')
            .setTitle('Success')
            .setMessage(message)
            .build();
    }
    constructError(builder, message) {
        return builder.reset()
            .setColor('bg-red-50 border-red-200 text-red-800')
            .setIcon('❌')
            .setTitle('Error')
            .setMessage(message)
            .build();
    }
}

// --- 4. 実行 ---
const builder = new NotificationBuilder();
const director = new NotificationDirector();
const preview = document.getElementById('preview-area');

document.getElementById('build-btn').addEventListener('click', () => {
    const type = document.getElementById('build-type').value;
    const msg = document.getElementById('build-msg').value || "処理が完了しました";
    
    let product;
    if (type === 'success') {
        product = director.constructSuccess(builder, msg);
    } else {
        product = director.constructError(builder, msg);
    }
    
    preview.innerHTML = product.render();
});