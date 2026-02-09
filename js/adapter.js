// --- 1. 旧システム (Legacy API) ---
// データを [タイトル, 日付] という配列形式で返す（扱いにくい）
class LegacyBookAPI {
    getData() {
        return ["GoF Design Patterns", "2026-02-09"];
    }
}

// --- 2. 現代的なUIが求める形式 ---
// { title: string, date: string } というオブジェクトを期待している

// --- 3. アダプター (Adapter) ---
class BookDataAdapter {
    constructor(legacyAPI) {
        this.legacyAPI = legacyAPI;
    }

    // 新しいUIが使いやすい形式に変換して提供する
    getFormattedData() {
        // 旧APIからデータを取得
        const [title, date] = this.legacyAPI.getData();
        // オブジェクト形式に変換
        return {
            title: `📘 ${title}`,
            date: `投稿日: ${date}`
        };
    }
}

// --- 4. 実行ロジック ---
const legacy = new LegacyBookAPI();
const adapter = new BookDataAdapter(legacy);

document.getElementById('adapter-btn').addEventListener('click', () => {
    // アダプターのおかげで、UI側は古い形式を気にしなくて済む
    const data = adapter.getFormattedData();
    
    document.getElementById('modern-ui').classList.remove('hidden');
    document.getElementById('ui-title').innerText = data.title;
    document.getElementById('ui-date').innerText = data.date;
});