// 主体（通知を送る側）
class Subject {
    constructor() {
        // 監視者のリスト
        this.observers = []; 
    }
    subscribe(observer) {
        // 監視者を追加
        this.observers.push(observer);
    }
    notify(data) {
        // 全ての監視者に通知
        this.observers.forEach(obs => obs.update(data));
    }
}

// 監視者（通知を受け取る側）
class UIObserver {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
    }
    update(data) {
        this.element.innerText = `受信: ${data}`;
        this.element.classList.add('animate-bounce');
        setTimeout(() => this.element.classList.remove('animate-bounce'), 500);
    }
}

// 初期化
const newsFeed = new Subject();
const obs1 = new UIObserver('observer-1');
const obs2 = new UIObserver('observer-2');

newsFeed.subscribe(obs1);
newsFeed.subscribe(obs2);

// イベント
document.getElementById('notify-btn').addEventListener('click', () => {
    const msg = document.getElementById('message-input').value || "こんにちは！";
    newsFeed.notify(msg);
});