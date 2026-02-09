// --- 1. 戦略（Strategy）の定義 ---
class RegularPrice {
    calculate(price) { return price; }
}

class PercentDiscount {
    calculate(price) { return price * 0.8; }
}

class FixedDiscount {
    calculate(price) { return Math.max(0, price - 1000); }
}

// --- 2. コンテキスト（利用側） ---
class Checkout {
    constructor() {
        this.strategy = new RegularPrice(); // デフォルト
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    calculateTotal(price) {
        return this.strategy.calculate(price);
    }
}

// --- 3. UI操作ロジック ---
const checkout = new Checkout();
const priceInput = document.getElementById('price-input');
const totalDisplay = document.getElementById('total-price');

function updatePrice() {
    const originalPrice = Number(priceInput.id === '' ? 0 : priceInput.value);
    totalDisplay.innerText = checkout.calculateTotal(originalPrice).toLocaleString();
}

function setDiscount(type) {
    // 戦略の切り替え
    if (type === 'regular') checkout.setStrategy(new RegularPrice());
    if (type === 'percent') checkout.setStrategy(new PercentDiscount());
    if (type === 'fixed')   checkout.setStrategy(new FixedDiscount());
    updatePrice();
}

// 入力変更時に自動計算
priceInput.addEventListener('input', updatePrice);