// --- 1. 各状態の定義 (State) ---
class DraftState {
    constructor(doc) { this.doc = doc; }
    handle() {
        console.log("下書きを保存し、承認待ちへ...");
        this.doc.setState(new ModerationState(this.doc));
    }
    getLabel() { return "DRAFT (下書き)"; }
    getButtonText() { return "承認申請を出す"; }
}

class ModerationState {
    constructor(doc) { this.doc = doc; }
    handle() {
        console.log("承認されました。公開します。");
        this.doc.setState(new PublishedState(this.doc));
    }
    getLabel() { return "MODERATION (承認待ち)"; }
    getButtonText() { return "承認して公開する"; }
}

class PublishedState {
    constructor(doc) { this.doc = doc; }
    handle() {
        console.log("すでに公開済みです。");
        // 公開済みの場合は何もしない、または非公開に戻すなどの処理
    }
    getLabel() { return "PUBLISHED (公開済み)"; }
    getButtonText() { return "公開済み (操作不可)"; }
}

// --- 2. コンテキスト（利用側） ---
class DocumentContext {
    constructor() {
        this.state = new DraftState(this); // 初期状態
    }

    setState(state) {
        this.state = state;
        this.updateUI();
    }

    process() {
        this.state.handle();
    }

    updateUI() {
        const badge = document.getElementById('status-badge');
        const btn = document.getElementById('action-btn');
        
        badge.innerText = this.state.getLabel();
        btn.innerText = this.state.getButtonText();

        // 公開済みならボタンを無効化
        if (this.state instanceof PublishedState) {
            btn.classList.replace('bg-indigo-600', 'bg-gray-400');
            btn.disabled = true;
        } else {
            btn.classList.add('bg-indigo-600');
            btn.disabled = false;
        }
    }
}

// --- 3. 実行 ---
const myDoc = new DocumentContext();

document.getElementById('action-btn').addEventListener('click', () => {
    myDoc.process();
});

document.getElementById('reset-btn').addEventListener('click', () => {
    location.reload();
});

// 初期表示の反映
myDoc.updateUI();