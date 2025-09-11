import React, { useEffect, useRef } from "react";

export default function VoiceWaves() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array<ArrayBuffer>;
    let rafId: number;

    async function setupAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioCtx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(stream);

        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;

        const bufferLength = analyser.fftSize;
        dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);

        draw();
      } catch (err) {
        console.error("Microphone access denied:", err);
      }
    }

    function draw() {
      if (!canvasRef.current || !analyser) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "#272928b7";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#00ff37ff"; // neon green wave
      ctx.beginPath();

      const sliceWidth = canvas.width / dataArray.length;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      rafId = requestAnimationFrame(draw);
    }

    setupAudio();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (audioCtx) audioCtx.close();
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        className="rounded-2xl shadow-lg bg-black"
      />
    </div>
  );
}
