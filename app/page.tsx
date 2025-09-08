import { Mic, Square, Volume2 } from "lucide-react";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#333] bg-[url('https://static.tumblr.com/maopbtg/a5emgtoju/inflicted.png')]">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-bold mb-4 text-white">Voice Recorder</h1>

        {/* Textarea */}
        <textarea
          placeholder="Enter something"
          id="text"
          name="text"
          rows={4}
          className="w-[500px] h-full overflow-hidden bg-white text-gray-800 font-mono text-2xl leading-[40px] resize-none px-[100px] pt-[45px] pb-[34px] rounded-xl shadow-lg border-t border-white border-b border-white bg-[url('https://static.tumblr.com/maopbtg/E9Bmgtoht/lines.png'),url('https://static.tumblr.com/maopbtg/nBUmgtogx/paper.png')] bg-repeat-y bg-repeat"
        />

        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-10 mt-10">
          {/* Start */}
          <button className="flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 active:scale-95 transition-all">
            <Mic className="w-5 h-5" />
          </button>

          {/* Stop */}
          <button className="flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 active:scale-95 transition-all">
            <Square className="w-6 h-6" />
          </button>

          {/* Read */}
          <button className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 active:scale-95 transition-all">
            <Volume2 className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
