"use client";
import { Mic, Square, Volume2 } from "lucide-react";
import { useState } from "react";
import updateVoiceSettings, {
  voiceConverter,
} from "@/component/voice/voiceConverter";
import { startRecognition } from "@/component/text/textConverter";
import VoiceWaves from "@/component/VoiceWaves/VoiceWaves";

export default function Home() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("en-US");
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [recognition, setRecognition] = useState<any>(null);
  const [speaking, setSpeaking] = useState(false);

  const handleStart = () => {
    if (recognition) return; // Already recognizing
    const rec = startRecognition(
      setText,
      () => setRecognition(null),
      lang,
      (speaking) => setSpeaking(speaking)
    );
    setRecognition(rec);
  };

  const handleStop = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
  };

  const handleSpeak = () => {
    voiceConverter(text, { lang, pitch, rate, volume }, (speaking) =>
      setSpeaking(speaking)
    );
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-[#111] bg-[url('https://static.tumblr.com/maopbtg/a5emgtoju/inflicted.png')] bg-center
    "
    >
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex items-center justify-center mb-10">
          {speaking && <VoiceWaves />}
        </div>
        <h1 className="text-3xl font-extrabold mb-6 text-white tracking-wide">
          Voice Recorder
        </h1>

        {/* Textarea */}
        <textarea
          placeholder="Enter something"
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full max-w-md h-full overflow-hidden bg-white text-gray-900 font-mono text-lg sm:text-xl leading-[30px] sm:leading-[40px] resize-none px-6 sm:px-[100px] pt-[30px] sm:pt-[45px] pb-[24px] sm:pb-[34px] rounded-xl shadow-lg border-t border-white/30 border-b border-white/30 bg-[url('https://static.tumblr.com/maopbtg/E9Bmgtoht/lines.png'),url('https://static.tumblr.com/maopbtg/nBUmgtogx/paper.png')] bg-repeat-y bg-repeat"
        />

        {/* Controls */}
        <div className="flex flex-col gap-6 mt-8 w-full max-w-md bg-black/25 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-800 font-sans">
          {/* Language */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold mb-3 text-gray-200 uppercase tracking-wide">
              Language
            </label>
            <select
              value={lang}
              onChange={(e) => {
                setLang(e.target.value);
                updateVoiceSettings(
                  text,
                  {
                    lang: e.target.value,
                    pitch,
                    rate,
                    volume,
                  },
                  (speaking) => setSpeaking(speaking)
                );
              }}
              className="p-3 rounded-lg px-4 border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="ja-JP">Japanese</option>
              <option value="zh-CN">Chinese (Mandarin)</option>
              <option value="it-IT">Italian</option>
              <option value="ru-RU">Russian</option>
              <option value="ko-KR">Korean</option>
              <option value="pt-BR">Portuguese (Brazil)</option>
              <option value="ar-SA">Arabic</option>
              <option value="hi-IN">Hindi</option>
              <option value="nl-NL">Dutch</option>
              <option value="sv-SE">Swedish</option>
              <option value="tr-TR">Turkish</option>
              <option value="pl-PL">Polish</option>
              <option value="he-IL">Hebrew</option>
              <option value="vi-VN">Vietnamese</option>
              <option value="th-TH">Thai</option>
              <option value="id-ID">Indonesian</option>
              <option value="ro-RO">Romanian</option>
              <option value="cs-CZ">Czech</option>
              <option value="el-GR">Greek</option>
              <option value="hu-HU">Hungarian</option>
              <option value="da-DK">Danish</option>
              <option value="fi-FI">Finnish</option>
              <option value="no-NO">Norwegian</option>
              <option value="uk-UA">Ukrainian</option>
              <option value="ca-ES">Catalan</option>
              <option value="hr-HR">Croatian</option>
              <option value="sr-RS">Serbian</option>
              <option value="bg-BG">Bulgarian</option>
              <option value="lt-LT">Lithuanian</option>
              <option value="lv-LV">Latvian</option>
              <option value="et-EE">Estonian</option>
              <option value="sl-SI">Slovenian</option>
              <option value="sk-SK">Slovak</option>
              <option value="ms-MY">Malay</option>
              <option value="fa-IR">Persian</option>
              <option value="sw-KE">Swahili</option>
              <option value="af-ZA">Afrikaans</option>
              <option value="sq-AL">Albanian</option>
              <option value="am-ET">Amharic</option>
            </select>
          </div>

          {/* Pitch */}
          <div className="flex flex-col gap-3 font-sans">
            <label className="text-sm font-semibold mb-2 text-gray-200 uppercase tracking-wide">
              Pitch ({pitch})
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => {
                setPitch(Number(e.target.value));
                updateVoiceSettings(
                  text,
                  {
                    lang,
                    pitch: Number(e.target.value),
                    rate,
                    volume,
                  },
                  (speaking) => setSpeaking(speaking)
                );
              }}
              className="accent-blue-500 px-2"
            />
          </div>

          {/* Rate */}
          <div className="flex flex-col gap-3 font-sans">
            <label className="text-sm font-semibold mb-2 text-gray-200 uppercase tracking-wide">
              Rate ({rate})
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={rate}
              onChange={(e) => {
                setRate(Number(e.target.value));
                updateVoiceSettings(
                  text,
                  {
                    lang,
                    pitch,
                    rate: Number(e.target.value),
                    volume,
                  },
                  (speaking) => setSpeaking(speaking)
                );
              }}
              className="accent-green-500 px-2"
            />
          </div>

          {/* Volume */}
          <div className="flex flex-col gap-3 font-sans">
            <label className="text-sm font-semibold mb-2 text-gray-200 uppercase tracking-wide">
              Volume ({volume})
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                updateVoiceSettings(
                  text,
                  {
                    lang,
                    pitch,
                    rate,
                    volume: Number(e.target.value),
                  },
                  (speaking) => setSpeaking(speaking)
                );
              }}
              className="accent-red-500 px-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-6 sm:gap-10 mt-10 flex-wrap">
          {/* Start */}
          <button
            className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 active:scale-95 transition-all"
            onClick={handleStart}
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Stop */}
          <button
            className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 active:scale-95 transition-all"
            onClick={handleStop}
          >
            <Square className="w-6 h-6" />
          </button>

          {/* Read */}
          <button
            className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 active:scale-95 transition-all"
            onClick={handleSpeak}
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>

        {/* <div className="flex items-center gap-2 mt-4">
          <div
            className={`w-4 h-4 rounded-full ${
              speaking ? "bg-green-500 animate-pulse" : "bg-gray-600"
            }`}
          ></div>
          <span className="text-gray-200">
            {speaking ? "Speaking..." : "Idle"}
          </span>
        </div> */}
      </div>
    </div>
  );
}
