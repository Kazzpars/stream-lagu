# Audio Visualizer Web

A simple **web-based audio visualizer** using **Web Audio API** that displays **waveform** and **waterfall/spectrogram** in real-time. Supports file uploads and plays audio while continuously updating the visualizations, even when the audio is paused.

---

## Features

- Upload your own audio file and visualize it instantly.
- Real-time waveform visualization.
- Real-time waterfall/spectrogram visualization.
- Continuous rendering of visualizations, even if audio is paused.
- Responsive and lightweight, runs entirely in the browser.
- Built with plain **HTML**, **CSS**, and **JavaScript** (no external libraries).

---
## How to Use

1. Clone or download this repository.
2. Open `index.html` in a modern browser (Chrome, Firefox, Edge).
3. Click **Upload Audio** to choose a local audio file (`.mp3`, `.wav`, etc.).
4. Click **Play** to start the audio.  
   - The waveform and waterfall will update in real-time.
5. Pause the audio to see the visualizations continue rendering.

---

# Struktur Folder Project

```
audio-visualizer/
├─ index.html        # Main HTML file
├─ style.css         # CSS styling
├─ script.js         # JS untuk audio visualizer
├─ README.md         # Dokumentasi project
├─ assets/           # Folder untuk gambar, ikon, GIF
│   └─ demo.gif
└─ audio/            # Folder untuk menyimpan file audio
    └─ example.mp3
```
---
## Browser Compatibility

- Chrome ✅  
- Firefox ✅  
- Edge ✅  
- Safari ⚠️ (AudioContext auto-play policies may require user interaction)

---

## Technical Details

- Uses **Web Audio API** for audio processing.
- **AnalyserNode** is used to extract:
  - `getByteTimeDomainData` → waveform data
  - `getByteFrequencyData` → frequency spectrum for waterfall
- **Canvas API** is used to draw:
  - Waveform: green line
  - Waterfall: intensity color map (blue → green → red)
- Animation runs continuously with `requestAnimationFrame`.

---
## Notes

- Make sure your browser allows **audio autoplay/resume**.
- Uploading a new audio file replaces the current one without refreshing the page.
- If you like this project, please give it a ⭐!
- If you want to contribute or have any suggestions, feel free to open an issue or submit a pull request. Your feedback is always welcome! (*^‿^*)
