let currentCharIndex = 0;
let currentUtterance: SpeechSynthesisUtterance | null = null;

function highlightText(charIndex: number, nextCharIndex: number) {
    const textArea = document.getElementById("text") as HTMLTextAreaElement;
    if (!textArea) return;
    textArea.focus();
    textArea.setSelectionRange(charIndex, nextCharIndex);
    // Scroll to the highlighted character
    const lineHeight = parseInt(window.getComputedStyle(textArea).lineHeight || "20", 10);
    const lines = textArea.value.substr(0, charIndex).split("\n");
    const currentLine = lines.length;
    textArea.scrollTop = (currentLine - 1) * lineHeight;
}

export default function updateVoiceSettings(
    text: string,
    opts: { lang: string; pitch?: number; rate?: number; volume?: number }
) {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        voiceConverter(text, opts);
    }
}

export function voiceConverter(
    text: string,
    opts: { lang: string; pitch?: number; rate?: number; volume?: number },
    onSpeaking: (speaking: boolean) => void = () => { }
) {
    if (!("speechSynthesis" in window)) {
        alert("Your browser does not support speech synthesis.");
        return;
    }

    if (!text) return;

    // Cancel ongoing speech before speaking again
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = opts.lang || "en-US";
    utterance.pitch = opts.pitch ? opts.pitch : 1;
    utterance.rate = opts.rate ? opts.rate : 1;
    utterance.volume = opts.volume ? opts.volume : 1;

    utterance.onboundary = (event) => {
        if (event.name === "word" || event.name === "sentence") {
            currentCharIndex = event.charIndex;
            let nextCharIndex = currentCharIndex + (event.charLength || 0);
            highlightText(currentCharIndex, nextCharIndex);
        }
    }

    utterance.onend = () => {
        currentCharIndex = 0;
        currentUtterance = null;
    };

    // Pick a matching voice if available
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find((voice) => voice.lang === opts.lang);
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.onstart = () => onSpeaking(true);
    utterance.onend = () => onSpeaking(false);

    // Handle voices loaded later (Chrome issue)
    if (!voices.length) {
        speechSynthesis.onvoiceschanged = () => {
            const newVoices = speechSynthesis.getVoices();
            const matchingVoice = newVoices.find((voice) => voice.lang === opts.lang);
            if (matchingVoice) {
                utterance.voice = matchingVoice;
            }
            currentUtterance = utterance;
            speechSynthesis.speak(utterance);
        };
    } else {
        speechSynthesis.speak(utterance);
    }
}
