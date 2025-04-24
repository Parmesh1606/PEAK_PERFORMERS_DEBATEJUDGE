function scoreArgument(text) {
  const logicWords = ["because", "therefore", "hence", "thus", "however"];
  const emotionWords = ["love", "hate", "angry", "amazing", "terrible", "happy"];

  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
  const avgLength = text.length / (sentences.length || 1);
  const clarityScore = 100 - avgLength;

  let logicScore = 0;
  logicWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    const matches = text.match(regex);
    logicScore += matches ? matches.length : 0;
  });

  let emotionScore = 0;
  emotionWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    const matches = text.match(regex);
    emotionScore += matches ? matches.length : 0;
  });

  const total = (clarityScore * 0.4) + (logicScore * 10 * 0.3) + (emotionScore * 10 * 0.3);
  return Math.round(total);
}

function judgeDebate() {
  const arg1Elem = document.getElementById("arg1");
  const arg2Elem = document.getElementById("arg2");
  const resultElem = document.getElementById("result");

  if (!arg1Elem || !arg2Elem || !resultElem) {
    alert("Missing HTML elements.");
    return;
  }

  const arg1 = arg1Elem.value.trim();
  const arg2 = arg2Elem.value.trim();

  const score1 = scoreArgument(arg1);
  const score2 = scoreArgument(arg2);

  let result = `<p>Debater 1 Score: <strong>${score1}</strong></p>`;
  result += `<p>Debater 2 Score: <strong>${score2}</strong></p>`;

  if (score1 > score2) {
    result += `<h3>🏆 Debater 1 wins!</h3>`;
  } else if (score2 > score1) {
    result += `<h3>🏆 Debater 2 wins!</h3>`;
  } else {
    result += `<h3>🤝 It's a tie!</h3>`;
  }

  resultElem.innerHTML = result;
}
