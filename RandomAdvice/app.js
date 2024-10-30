const adviceButton = document.getElementById("advice-button");
const adviceText = document.getElementById("advice-text");
const adviceId = document.getElementById("advice-id");

function showAdvice(advice, adviceNumber) {
    adviceText.textContent = advice;
    adviceId.textContent = `ADVICE  #${adviceNumber}`;
}

async function getAdvice() {
    const url = "https://api.adviceslip.com/advice";
    let advice = '';
    let adviceNumber = '';

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.slip) {
            advice = data.slip.advice;
            adviceNumber = data.slip.id;
        }
    } catch (error) {
        console.log(error);
        advice = 'Nu mai avem sfaturi ✌(ツ)';
        adviceNumber = "";
    }
    showAdvice(advice, adviceNumber);
}

adviceButton.addEventListener("click", getAdvice);