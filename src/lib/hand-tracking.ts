export interface HandState {
  /** Normalized cursor position (0-1), x mirrored for webcam */
  cursorX: number;
  cursorY: number;
  /** Screen-space cursor position */
  screenX: number;
  screenY: number;
  /** Thumb-index pinch active */
  isPinching: boolean;
  /** All fingertips above their MCP joints */
  isOpenPalm: boolean;
  /** Wrist Y velocity (positive = moving down) averaged over frames */
  wristVelocityY: number;
  /** Raw landmarks for preview drawing */
  landmarks: { x: number; y: number }[] | null;
  /** Whether a hand is detected */
  detected: boolean;
}

const PINCH_THRESHOLD_ON = 0.045;
const PINCH_THRESHOLD_OFF = 0.065;
const WRIST_HISTORY_SIZE = 8;

type HandStateCallback = (state: HandState) => void;

let handLandmarker: import("@mediapipe/tasks-vision").HandLandmarker | null = null;
let videoElement: HTMLVideoElement | null = null;
let stream: MediaStream | null = null;
let rafId = 0;
let running = false;
let callback: HandStateCallback | null = null;

// Pinch hysteresis state
let wasPinching = false;

// Wrist Y velocity buffer
const wristHistory: number[] = [];

function computeGestures(
  landmarks: { x: number; y: number; z: number }[]
): Omit<HandState, "screenX" | "screenY" | "landmarks" | "detected"> {
  // Index tip (8) as cursor — mirror X for webcam flip
  const cursorX = 1 - landmarks[8].x;
  const cursorY = landmarks[8].y;

  // Pinch: distance between thumb tip (4) and index tip (8)
  const dx = landmarks[4].x - landmarks[8].x;
  const dy = landmarks[4].y - landmarks[8].y;
  const dz = landmarks[4].z - landmarks[8].z;
  const pinchDist = Math.sqrt(dx * dx + dy * dy + dz * dz);

  let isPinching: boolean;
  if (wasPinching) {
    isPinching = pinchDist < PINCH_THRESHOLD_OFF;
  } else {
    isPinching = pinchDist < PINCH_THRESHOLD_ON;
  }
  wasPinching = isPinching;

  // Open palm: all 5 fingertips (4,8,12,16,20) above their MCP joints (2,5,9,13,17)
  const tipIndices = [4, 8, 12, 16, 20];
  const mcpIndices = [2, 5, 9, 13, 17];
  const isOpenPalm = tipIndices.every(
    (tip, i) => landmarks[tip].y < landmarks[mcpIndices[i]].y
  );

  // Wrist velocity: rolling average of wrist(0) Y movement
  wristHistory.push(landmarks[0].y);
  if (wristHistory.length > WRIST_HISTORY_SIZE) {
    wristHistory.shift();
  }
  let wristVelocityY = 0;
  if (wristHistory.length >= 2) {
    wristVelocityY =
      (wristHistory[wristHistory.length - 1] - wristHistory[0]) /
      (wristHistory.length - 1);
  }

  return { cursorX, cursorY, isPinching, isOpenPalm, wristVelocityY };
}

async function detectionLoop(
  landmarker: import("@mediapipe/tasks-vision").HandLandmarker,
  video: HTMLVideoElement
) {
  if (!running) return;

  if (video.readyState >= 2) {
    const result = landmarker.detectForVideo(video, performance.now());
    if (result.landmarks && result.landmarks.length > 0) {
      const lm = result.landmarks[0];
      const gestures = computeGestures(lm);

      const screenX = gestures.cursorX * window.innerWidth;
      const screenY = gestures.cursorY * window.innerHeight;

      callback?.({
        ...gestures,
        screenX,
        screenY,
        landmarks: lm.map((l) => ({ x: l.x, y: l.y })),
        detected: true,
      });
    } else {
      callback?.({
        cursorX: 0,
        cursorY: 0,
        screenX: 0,
        screenY: 0,
        isPinching: false,
        isOpenPalm: false,
        wristVelocityY: 0,
        landmarks: null,
        detected: false,
      });
    }
  }

  rafId = requestAnimationFrame(() => detectionLoop(landmarker, video));
}

export async function startHandTracking(
  onState: HandStateCallback
): Promise<HTMLVideoElement> {
  callback = onState;

  // Lazy-load MediaPipe
  const { HandLandmarker, FilesetResolver } = await import(
    "@mediapipe/tasks-vision"
  );

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numHands: 1,
  });

  // Get camera
  stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 320, height: 240, facingMode: "user" },
  });

  videoElement = document.createElement("video");
  videoElement.srcObject = stream;
  videoElement.setAttribute("playsinline", "true");
  videoElement.muted = true;
  await videoElement.play();

  // Reset state
  wasPinching = false;
  wristHistory.length = 0;

  running = true;
  detectionLoop(handLandmarker, videoElement);

  return videoElement;
}

export function stopHandTracking() {
  running = false;
  cancelAnimationFrame(rafId);

  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
  }

  if (videoElement) {
    videoElement.srcObject = null;
    videoElement = null;
  }

  if (handLandmarker) {
    handLandmarker.close();
    handLandmarker = null;
  }

  callback = null;
  wasPinching = false;
  wristHistory.length = 0;
}
