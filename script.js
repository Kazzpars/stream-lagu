// Ambil elemen dari HTML
const player = document.getElementById('radioPlayer');
const uploadInput = document.getElementById('upload');
const canvasWave = document.getElementById('waveform');
const ctxWave = canvasWave.getContext('2d');
const canvasWaterfall = document.getElementById('waterfall');
const ctxWaterfall = canvasWaterfall.getContext('2d');

// Inisialisasi Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source = null;
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048; // Resolusi frekuensi lebih tinggi
const bufferLength = analyser.frequencyBinCount;
const dataArrayFreq = new Uint8Array(bufferLength);
const dataArrayTime = new Uint8Array(bufferLength);


// Event listener untuk upload file
uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        //Henntikan player lama jadinya gak perlu refresh website ketika upload lagu baru
        player.src = '';

        if (source) {
            source.disconnect();
        }

        //set src baru
        player.src = url;

        // Hubungkan elemen audio ke Web Audio API
        source = audioCtx.createMediaElementSource(player);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        
        //Memastikan audiocontext berjalan
        audioCtx.resume();

        // Mulai menggambar visualisasi
        draw();
    }
});

function playAudio() {
    audioCtx.resume().then(() => player.play());
}

function pauseAudio() {
    player.pause();
}

function draw() {
    requestAnimationFrame(draw);
    if (!source) return; 

    drawWaveform();
    drawWaterfall();
}

// Fungsi untuk menggambar waveform
function drawWaveform() {
    analyser.getByteTimeDomainData(dataArrayTime);

    ctxWave.fillStyle = "#111";
    ctxWave.fillRect(0, 0, canvasWave.width, canvasWave.height);

    ctxWave.lineWidth = 2;
    ctxWave.strokeStyle = "#4CAF50"; // Warna hijau
    ctxWave.beginPath();

    const sliceWidth = canvasWave.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const v = dataArrayTime[i] / 128.0;
        const y = v * canvasWave.height / 2;

        if (i === 0) {
            ctxWave.moveTo(x, y);
        } else {
            ctxWave.lineTo(x, y);
        }
        x += sliceWidth;
    }

    ctxWave.lineTo(canvasWave.width, canvasWave.height / 2);
    ctxWave.stroke();
}

// Fungsi untuk menggambar waterfall/spektogram
function drawWaterfall() {
    const existingImageData = ctxWaterfall.getImageData(0, 0, canvasWaterfall.width, canvasWaterfall.height - 1);
    ctxWaterfall.putImageData(existingImageData, 0, 1);
    analyser.getByteFrequencyData(dataArrayFreq);
    for (let i = 0; i < canvasWaterfall.width; i++) {
        const freqIndex = Math.floor(i * bufferLength / canvasWaterfall.width);
        const intensity = dataArrayFreq[freqIndex];
        const blue = Math.max(0, 255 - intensity * 2);
        const green = Math.max(0, intensity > 128 ? 255 - (intensity - 128) * 2 : intensity * 2);
        const red = Math.max(0, (intensity - 128) * 2);
        ctxWaterfall.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctxWaterfall.fillRect(i, 0, 1, 1);
    }
}