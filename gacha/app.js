const result = document.getElementById('result');
const pullbutton = document.getElementById('pull');
const sharebutton = document.getElementById('share');
const select = document.getElementById('limit');

function extractRand(obj) {
    const keys = Object.keys(obj);
    if (!keys.length) return null;
    const randIdx = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIdx];
    const randVal = obj[randKey];
    delete obj[randKey];
    return { key: randKey, value: randVal };
}

const plans = {
    "オンラインゼミ 高校受験コース": 23100,
    "ロボットプログラミング レギュラーコース": 7580,
    "Axisオンライン 通年授業": 13464,
    "個別指導 マンツーマン型 月4回": 13464,
    "AxisPLUS 英数": 18370,
    "在宅 英検対策": 2640
};
let result_list = [];
let totalValue = 0;

pullbutton.addEventListener('click', () => {
    const limit = parseInt(select.value); // 選択された上限値を数値に変換
    result_list = [];
    let plansCopy = { ...plans }; // オブジェクトのコピーを作成
    totalValue = 0;
    while (result_list.length < 3 && Object.keys(plansCopy).length > 0) {
        let { key, value } = extractRand(plansCopy);
        if (totalValue + value <= limit) {
            result_list.push({ key, value });
            totalValue += value;
        }
    }
    let tableContent = `<table><tr><th>プラン名</th><th>価格</th></tr>`;
    result_list.forEach(item => {
        tableContent += `<tr><td>${item.key}</td><td>¥${item.value}</td></tr>`;
    });
    tableContent += `</table><br><b>合計:¥${totalValue}</b>`;
    result.innerHTML = tableContent;
});
sharebutton.addEventListener('click', async () => {
    const shareData = {
        title: 'Axisプランガチャの結果',
        text: result.innerText,
    };

    try {
        await navigator.share(shareData);
        console.log('Shared successfully');
    } catch (err) {
        console.error('Error sharing:', err);
    }
});

select.onchange = function() {
    pullbutton.click();
};

window.onload = function() {
    pullbutton.click();
};
