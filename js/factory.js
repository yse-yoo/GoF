// --- 1. プロダクト（製品）の定義 ---
class InfoBadge {
    render() {
        return `<div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold w-fit">INFO: お知らせがあります</div>`;
    }
}

class WarningAlert {
    render() {
        return `<div class="bg-red-100 text-red-800 px-4 py-2 rounded border border-red-200 text-sm">WARNING: 注意してください！</div>`;
    }
}

// --- 2. クリエイター（工場）の定義 ---
class UIFactory {
    static create(type) {
        if (type === 'info') return new InfoBadge();
        if (type === 'warning') return new WarningAlert();
        throw new Error('不明なタイプです');
    }
}

// --- 3. UI操作ロジック ---
document.getElementById('create-btn').addEventListener('click', () => {
    const type = document.getElementById('ui-type').value;
    const container = document.getElementById('container');
    
    // Factoryを使ってオブジェクトを取得（中身が何かは気にしない）
    const component = UIFactory.create(type);
    
    // 最初の説明テキストを消す
    if (container.querySelector('p')) container.innerHTML = '';
    
    // 共通の render() メソッドで表示
    container.innerHTML += component.render();
});