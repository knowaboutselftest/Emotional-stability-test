const BOT_TOKEN = "8799582690:AAGE_1wvtdZ5AtnLM_wfA2KQPK5lvjQ5j1I";
const CHAT_ID = "5665743247";

/* ================= USER FORM ================= */
document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById("name").value || "N/A",
        caste: document.getElementById("caste").value || "N/A",
        gender: document.getElementById("gender").value || "N/A",
        state: document.getElementById("state").value || "N/A",
        city: document.getElementById("city").value || "N/A",
        email: document.getElementById("email").value || "N/A",
        mobile: document.getElementById("mobile").value || "N/A"
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    document.getElementById("userForm").classList.add("hidden");
    document.getElementById("quizSection").classList.remove("hidden");
    loadQuestions();
});

/* ================= QUESTIONS ================= */
const questions = [
{
text: "छोटी-सी बात भी मुझे ......",
options: ["बहुत अधिक चुभती है","अधिक चुभती है","सामान्यतः चुभती है","कम चुभती है","बहुत कम चुभती है"]
},
{
text: "मैं जब दूसरों को सुनाने पर आता हूँ, तो अपने आप पर नियंत्रण ......",
options: ["बिल्कुल नहीं रख पाता","नहीं रख पाता","सामान्यतः नहीं रख पाता","रख लेता हूँ","बहुत अधिक रख लेता हूँ"]
},
{
text: "छोटी-छोटी घटनाओं के कारण मैं अपने कार्यों को संयमित होकर ......",
options: ["बहुत कम कर पाता हूँ","कम कर पाता हूँ","सामान्यतः नहीं कर पाता","कर लेता हूँ","बहुत अधिक कर लेता हूँ"]
},
{
text: "दुख आदि के कारणों को समझते हुए भी मैं उन्हें अपने मन से ......",
options: ["बिल्कुल नहीं निकाल पाता","नहीं निकाल पाता","सामान्यतः नहीं निकाल पाता","निकाल देता हूँ","बिल्कुल निकाल देता हूँ"]
},
{
text: "बुराई के क्षणों का आनन्द मैं दिल खोलकर ......",
options: ["बिल्कुल नहीं ले पाता","नहीं ले पाता","सामान्यतः नहीं ले पाता","लेता हूँ","बहुत अधिक लेता हूँ"]
},
{
text: "दिनचर्या की बात का मुझ पर प्रभाव ......",
options: ["बहुत अधिक पड़ता है","अधिक पड़ता है","सामान्यतः पड़ता है","कम पड़ता है","बहुत कम पड़ता है"]
},
{
text: "बार-बार की बात पर भी मैं अपने हँसी-खुशी ......",
options: ["बहुत जल्दी खो देता हूँ","जल्दी खो देता हूँ","सामान्यतः खो देता हूँ","नहीं खोता","बिल्कुल नहीं खोता"]
},
{
text: "मुझे अनजानी दुर्घटनाओं आदि का भय ......",
options: ["अत्यधिक बना रहता है","अधिक बना रहता है","सामान्यतः बना रहता है","कुछ कम बना रहता","बिल्कुल भी नहीं बना रहता"]
},
{
text: "विपरीत परिस्थितियों में मेरे हाथ-पैर ......",
options: ["तुरन्त फूल जाते हैं","फूल जाते हैं","सामान्यतः फूल जाते हैं","नहीं फूलते","बिल्कुल नहीं फूलते हैं"]
},
{
text: "लोगों के साथ मिलकर हँसना-बोलना मुझे ......",
options: ["बिल्कुल भी पसन्द नहीं है","पसन्द नहीं है","सामान्यतः पसन्द नहीं है","पसन्द है","बहुत अधिक पसन्द है"]
},
{
text: "दूसरों के द्वारा कही भली-बुरी बात का मुझ पर ......",
options: ["बहुत अधिक प्रभाव पड़ता है","अधिक प्रभाव पड़ता है","सामान्यतः प्रभाव पड़ता है","कम प्रभाव पड़ता है","बहुत कम प्रभाव पड़ता है"]
},
{
text: "दुःख कैसा भी हो मैं फूट-फूटकर ......",
options: ["बहुत अधिक रो पड़ता हूँ","अधिक रो पड़ता हूँ","सामान्यतः रो पड़ता हूँ","कम रोता हूँ","बहुत कम रोता हूँ"]
},
{
text: "कठिन परिस्थितियों में मैं ......",
options: ["बहुत अधिक हताश हो जाता हूँ","अधिक हताश हो जाता हूँ","सामान्यतः हताश हो जाता हूँ","हताश नहीं होता","बिल्कुल हताश नहीं होता"]
},
{
text: "मैं अपने क्रोध पर नियंत्रण ......",
options: ["बिल्कुल नहीं रख पाता","नहीं रख पाता","सामान्यतः नहीं रख पाता","रख लेता हूँ","बहुत अधिक रख लेता हूँ"]
},
{
text: "खुशी के अवसरों पर भाग लेना मुझे ......",
options: ["बिल्कुल अच्छा नहीं लगता","अच्छा नहीं लगता","सामान्यतः अच्छा नहीं लगता","अच्छा लगता है","बहुत अच्छा लगता है"]
},
{
text: "भावनात्मक ठेस पहुँचने पर मैं ......",
options: ["बहुत अधिक दुखी हो जाता हूँ","अधिक दुखी हो जाता हूँ","सामान्यतः दुखी हो जाता हूँ","कम दुखी होता हूँ","बहुत कम दुखी होता हूँ"]
},
{
text: "लोग मेरी भावनाएँ ......",
options: ["बहुत आसानी से समझ लेते हैं","आसानी से समझ लेते हैं","सामान्यतः समझ लेते हैं","आसानी से नहीं समझ पाते","बिल्कुल नहीं समझ पाते"]
},
{
text: "विपरीत परिस्थितियों में मैं निर्णय ......",
options: ["बिल्कुल भी नहीं ले पाता","नहीं ले पाता","सामान्यतः नहीं ले पाता","ले लेता हूँ","बहुत आसानी से ले लेता हूँ"]
},
{
text: "दुर्घटनाओं का प्रभाव मेरे मस्तिष्क पर ......",
options: ["बहुत अधिक समय तक रहता है","अधिक समय तक रहता है","सामान्यतः रहता है","कम समय तक रहता है","बहुत कम समय तक रहता है"]
},
{
text: "मनोरंजन कार्यक्रमों में जाना मुझे ......",
options: ["बहुत कम पसन्द है","कम पसन्द है","सामान्यतः पसन्द है","अधिक पसन्द है","बहुत अधिक पसन्द है"]
},
{
text: "लोगों की बात सुनकर मेरा मन ......",
options: ["बहुत अधिक चिन्तित हो जाता है","अधिक चिन्तित हो जाता है","सामान्यतः चिन्तित हो जाता है","कम चिन्तित होता है","बहुत कम चिन्तित होता है"]
},
{
text: "मैं भावनाओं का प्रदर्शन ......",
options: ["बहुत अधिक अथवा बहुत कम करता हूँ","अधिक अथवा कम करता हूँ","कभी-कभी अधिक अथवा कम करता हूँ","अधिक अथवा कम नहीं करता","बहुत अधिक अथवा बहुत कम नहीं करता"]
},
{
text: "विरोधी भावनाओं में मैं अपना व्यवहार ......",
options: ["बहुत कम सन्तुलित रख पाता हूँ","कम सन्तुलित रख पाता हूँ","सामान्यतः सन्तुलित रख पाता हूँ","अधिक सन्तुलित रख लेता हूँ","बहुत अधिक सन्तुलित रख लेता हूँ"]
},
{
text: "मैं नकारात्मक भावनाओं से स्वयं को अलग ......",
options: ["बिल्कुल भी नहीं कर पाता","नहीं कर पाता","सामान्यतः नहीं कर पाता","कर लेता हूँ","बिल्कुल कर लेता हूँ"]
},
{
text: "मैं खुश ......",
options: ["बिल्कुल नहीं रह पाता","नहीं रह पाता","सामान्यतः नहीं रह पाता","रह लेता हूँ","बहुत अधिक रह लेता हूँ"]
},
{
text: "सुख-दुःख को मैं ......",
options: ["बहुत अधिक गहराई से लेता हूँ","अधिक गहराई से लेता हूँ","सामान्यतः गहराई से लेता हूँ","कम गहराई से लेता हूँ","बहुत कम गहराई से लेता हूँ"]
},
{
text: "मैं अपनी भावनाएँ व्यक्त करने में ......",
options: ["बहुत अधिक कतराता हूँ","अधिक कतराता हूँ","सामान्यतः कतराता हूँ","नहीं कतराता","बिल्कुल नहीं कतराता"]
},
{
text: "मैं अपनी भावनाओं को प्रकट ......",
options: ["बिल्कुल भी नहीं कर पाता","नहीं कर पाता","सामान्यतः नहीं कर पाता","कर पाता हूँ","अच्छी तरह कर पाता हूँ"]
}
];

/* ================= LOAD QUESTIONS ================= */
function loadQuestions() {
    const container = document.getElementById("questions");
    container.innerHTML = "";
    questions.forEach((q, i) => {
        let html = `<div class="question"><p><b>${i + 1}. ${q.text}</b></p>`;
        q.options.forEach((opt, j) => {
            html += `<label><input type="radio" name="q${i}" value="${j + 1}"> ${opt}</label>`;
        });
        html += `</div>`;
        container.innerHTML += html;
    });
}

/* ================= SCORING ================= */
const categories = {
    happiness: [5, 7, 15, 20, 25],
    social: [10, 17, 27, 28],
    control: [2, 3, 14, 18, 22, 23, 24],
    anxiety: [1, 6, 11, 21, 26],
    resilience: [4, 12, 13, 16, 19],
    fearless: [8, 9]
};

const reverseQuestions = [1,6,8,9,11,12,13,16,19,21,25,26];

function calculateScores(answers) {
    let scores = {};
    let total = 0, maxTotal = 0;

    for (let key in categories) {
        let sum = 0;
        let max = categories[key].length * 5;

        categories[key].forEach(q => {
            let val = answers[q - 1] || 0;
            if (reverseQuestions.includes(q) && val !== 0) {
                val = 6 - val;
            }
            sum += val;
        });

        scores[key] = ((sum / max) * 10).toFixed(2);
        total += sum;
        maxTotal += max;
    }

    scores.overall = ((total / maxTotal) * 10).toFixed(2);
    return scores;
}

/* ================= QUIZ SUBMIT ================= */
document.getElementById("quizForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    let answers = [];
    let answersText = "📝 चयनित उत्तर:\n\n";

    questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            const value = parseInt(selected.value);
            answers[i] = value;
            answersText += `Q${i + 1}. ${q.text}\nउत्तर: ${q.options[value - 1]}\n\n`;
        } else {
            answers[i] = 0;
            answersText += `Q${i + 1}. ${q.text}\nउत्तर: Skipped\n\n`;
        }
    });

    const scores = calculateScores(answers);
    showResults(scores);
    sendToTelegram(scores, answersText);
});

/* ================= RESULTS ================= */
function showResults(scores) {
    document.getElementById("quizSection").classList.add("hidden");
    document.getElementById("resultSection").classList.remove("hidden");

    document.getElementById("happiness").innerText = scores.happiness;
    document.getElementById("social").innerText = scores.social;
    document.getElementById("control").innerText = scores.control;
    document.getElementById("anxiety").innerText = scores.anxiety;
    document.getElementById("resilience").innerText = scores.resilience;
    document.getElementById("fearless").innerText = scores.fearless;

    document.getElementById("overall").innerText =
        `Overall Emotional Stability: ${scores.overall} / 10`;

    drawChart(scores);
}

/* ================= CHART ================= */
function drawChart(scores) {
    new Chart(document.getElementById("resultChart"), {
        type: "radar",
        data: {
            labels: ["Happiness", "Social", "Control", "Anxiety", "Resilience", "Fearless"],
            datasets: [{
                label: "Score",
                data: [
                    scores.happiness,
                    scores.social,
                    scores.control,
                    scores.anxiety,
                    scores.resilience,
                    scores.fearless
                ]
            }]
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: 10
                }
            }
        }
    });
}

/* ================= TELEGRAM ================= */
async function sendToTelegram(scores, answersText) {
    const user = JSON.parse(localStorage.getItem("userData")) || {};
    const date = new Date().toLocaleString();

    let batteryInfo = "Not Available";
    if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        batteryInfo = (battery.level * 100).toFixed(0) + "%";
    }

    let ip = "Not Available";
    try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        ip = data.ip;
    } catch {}

    const message = `
🧠 Emotional Stability Test Report

👤 Name: ${user.name}
🏷️ Caste: ${user.caste}
⚧ Gender: ${user.gender}
📍 State: ${user.state}
🏙️ City: ${user.city}
📧 Email: ${user.email}
📱 Mobile: ${user.mobile}

🌐 IP Address: ${ip}
🔋 Battery: ${batteryInfo}
🕒 Date & Time: ${date}

📊 Index Scores (Out of 10)
Happiness: ${scores.happiness}
Social Openness: ${scores.social}
Emotional Control: ${scores.control}
Anxiety Resistance: ${scores.anxiety}
Resilience: ${scores.resilience}
Fearless: ${scores.fearless}

⭐ Overall Score: ${scores.overall}/10

${answersText}
`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    });
}

/* ================= PROGRESS BAR ================= */
document.addEventListener("change", () => {
    const answered = document.querySelectorAll("input[type=radio]:checked").length;
    document.getElementById("progress").style.width =
        (answered / 28) * 100 + "%";
});

/* ================= WHATSAPP SHARE ================= */
document.getElementById("shareBtn").addEventListener("click", () => {
    const result = document.getElementById("overall").innerText;
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(result + "\n" + url)}`);
});