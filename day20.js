window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// 判斷使否有SpeechRecognition物件

const recognition = new SpeechRecognition();
recognition.interimResults = true; //邊輸入邊出現結果
// recognition.lang = 'en-US';//原始設定
recognition.lang = 'zh-TW'; //輸入中文

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

// 辨識成功就出現結果
recognition.addEventListener('result', e => {
    // console.log(e);//每次輸入聲音都會出現
    // 產出文字
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    // 把這些發音套換成shit圖示，注意要使用 recognition.lang = 'en-US';才能正確輸入
    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '😏');

    // 輸出文字
    p.textContent = poopScript;

    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
});

//測試-聲音停止時觸發
recognition.addEventListener('soundend', e => {
    console.log(e);
});

recognition.addEventListener('end', recognition.start);

recognition.start();
