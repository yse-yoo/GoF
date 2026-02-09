// --- 1. 複雑なサブシステム群 ---
class Lights {
    on() { this._update('ON', 'text-amber-500 border-amber-500'); }
    off() { this._update('OFF', 'text-gray-400 border-gray-200'); }
    _update(txt, cls) {
        const el = document.getElementById('status-light');
        el.innerText = `Lights: ${txt}`;
        el.className = `p-2 border rounded bg-gray-50 dark:bg-slate-900 ${cls}`;
    }
}

class Music {
    play() { this._update('PLAYING', 'text-blue-500 border-blue-500 animate-pulse'); }
    stop() { this._update('OFF', 'text-gray-400 border-gray-200'); }
    _update(txt, cls) {
        const el = document.getElementById('status-music');
        el.innerText = `Music: ${txt}`;
        el.className = `p-2 border rounded bg-gray-50 dark:bg-slate-900 ${cls}`;
    }
}

class Screen {
    show() { this._update('VISIBLE', 'text-green-500 border-green-500'); }
    hide() { this._update('OFF', 'text-gray-400 border-gray-200'); }
    _update(txt, cls) {
        const el = document.getElementById('status-screen');
        el.innerText = `Screen: ${txt}`;
        el.className = `p-2 border rounded bg-gray-50 dark:bg-slate-900 ${cls}`;
    }
}

// --- 2. ファサード (Facade) ---
// 複雑な手順をまとめて、使いやすい「窓口」を提供する
class HomeCinemaFacade {
    constructor() {
        this.lights = new Lights();
        this.music = new Music();
        this.screen = new Screen();
    }

    // シアターモードを開始する一連の手順をカプセル化
    watchMovie() {
        console.log("準備を開始します...");
        this.lights.off();
        this.screen.show();
        this.music.play();
    }

    endMovie() {
        console.log("片付けを開始します...");
        this.lights.on();
        this.screen.hide();
        this.music.stop();
    }
}

// --- 3. 実行 ---
const cinema = new HomeCinemaFacade();

document.getElementById('theater-on-btn').addEventListener('click', () => {
    cinema.watchMovie();
});

document.getElementById('theater-off-btn').addEventListener('click', () => {
    cinema.endMovie();
});