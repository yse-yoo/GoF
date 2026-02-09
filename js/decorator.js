// --- 1. コンポーネントのインターフェース ---
class TextComponent {
    constructor(text) { this.text = text; }
    render() { return this.text; }
}

// --- 2. デコレーターのベース ---
class TextDecorator {
    constructor(component) { this.component = component; }
    render() { return this.component.render(); }
}

// --- 3. 具体的なデコレーター ---
class BoldDecorator extends TextDecorator {
    render() { return `<strong>${super.render()}</strong>`; }
}

class ItalicDecorator extends TextDecorator {
    render() { return `<em>${super.render()}</em>`; }
}

class BorderDecorator extends TextDecorator {
    render() { return `<span class="border-2 border-blue-500 p-1 rounded">${super.render()}</span>`; }
}

// --- 4. 実行ロジック ---
function updatePreview() {
    const textValue = document.getElementById('text-input').value;
    const preview = document.getElementById('preview-container');
    
    // 基本のオブジェクト
    let content = new TextComponent(textValue);

    // チェック状態に応じてラップ（デコレート）していく
    if (document.getElementById('check-bold').checked) {
        content = new BoldDecorator(content);
    }
    if (document.getElementById('check-italic').checked) {
        content = new ItalicDecorator(content);
    }
    if (document.getElementById('check-border').checked) {
        content = new BorderDecorator(content);
    }

    // 最終的にレンダリング
    preview.innerHTML = content.render();
}

// 初期実行
document.getElementById('text-input').addEventListener('input', updatePreview);
updatePreview();