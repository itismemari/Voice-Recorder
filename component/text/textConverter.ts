export function startRecognition(
    onResult: (text: string) => void,
    onEnd?: () => void,
    lang: string = "en-US",
    onSpeaking: (speaking: boolean) => void = () => { }
) {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Your browser does not support Speech Recognition.");
        return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        onResult(transcript.trim());
    };

    recognition.onerror = (event: ErrorEvent) => {
        console.error("Recognition error:", event.error);
    };

    recognition.onend = () => {
        onSpeaking(false);
        if (onEnd) onEnd();
    };

    recognition.onstart = () => onSpeaking(true);
    recognition.start();
    return recognition;
}
