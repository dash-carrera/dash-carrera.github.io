window.DynamicNormalized = (() => {
  const DYNAMIC_BEHAVIOR = {
    mouthOpen: { initialRange: 0.18, minRange: 0.05, baselineLerp: 0.02, rangeLerp: 0.08, amplify: 4.2 },
    mouthWidth: { initialRange: 0.18, minRange: 0.05, baselineLerp: 0.02, rangeLerp: 0.08, amplify: 4.2 },
    smileCurve: { initialRange: 0.16, minRange: 0.05, baselineLerp: 0.02, rangeLerp: 0.08, amplify: 4.4 },
    lipPurse: { initialRange: 0.16, minRange: 0.05, baselineLerp: 0.02, rangeLerp: 0.08, amplify: 4.2 },
    jawDrop: { initialRange: 0.1, minRange: 0.025, baselineLerp: 0.025, rangeLerp: 0.12, amplify: 5.8 },
    blinkAsymmetry: { initialRange: 0.1, minRange: 0.025, baselineLerp: 0.025, rangeLerp: 0.12, amplify: 6.0 },
    jawShift: { initialRange: 0.08, minRange: 0.02, baselineLerp: 0.025, rangeLerp: 0.12, amplify: 5.5 },
    mouthCenterShift: { initialRange: 0.08, minRange: 0.02, baselineLerp: 0.025, rangeLerp: 0.12, amplify: 5.5 },
    headYaw: { initialRange: 0.2, minRange: 0.06, baselineLerp: 0.02, rangeLerp: 0.08, amplify: 4.0 },
    faceVelocity: { initialRange: 0.14, minRange: 0.03, baselineLerp: 0.02, rangeLerp: 0.1, amplify: 5.2 }
  };

  const DYNAMIC_METRICS = [
    { key: 'mouthOpen', label: 'Mouth Open', accent: [255, 140, 92], min: 0, max: 1 },
    { key: 'mouthWidth', label: 'Mouth Width', accent: [255, 205, 90], min: 0, max: 1 },
    { key: 'smileCurve', label: 'Smile Curve', accent: [255, 170, 120], min: -1, max: 1, signed: true },
    { key: 'lipPurse', label: 'Lip Purse', accent: [255, 120, 170], min: 0, max: 1 },
    { key: 'jawDrop', label: 'Jaw Drop', accent: [151, 255, 188], min: 0, max: 1 },
    { key: 'blinkAsymmetry', label: 'Blink Asym', accent: [115, 216, 255], min: -1, max: 1, signed: true },
    { key: 'jawShift', label: 'Jaw Shift', accent: [121, 235, 158], min: -1, max: 1, signed: true },
    { key: 'mouthCenterShift', label: 'Mouth Center', accent: [255, 255, 255], min: -1, max: 1, signed: true },
    { key: 'headYaw', label: 'Head Yaw', accent: [193, 162, 255], min: -1, max: 1, signed: true },
    { key: 'faceVelocity', label: 'Face Velocity', accent: [103, 178, 255], min: 0, max: 1 }
  ];

  function constrain(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  function dist3(a, b) {
    return Math.hypot((a[0] || 0) - (b[0] || 0), (a[1] || 0) - (b[1] || 0), (a[2] || 0) - (b[2] || 0));
  }

  function getEmptyDynamicMetrics() {
    return {
      mouthOpen: 0,
      mouthWidth: 0,
      smileCurve: 0,
      lipPurse: 0,
      jawDrop: 0,
      blinkAsymmetry: 0,
      jawShift: 0,
      mouthCenterShift: 0,
      headYaw: 0,
      faceVelocity: 0
    };
  }

  function createDynamicState() {
    const state = {};

    for (const metric of DYNAMIC_METRICS) {
      state[metric.key] = {
        baseline: 0,
        range: (DYNAMIC_BEHAVIOR[metric.key] || {}).initialRange ?? (metric.signed ? 0.18 : 0.12)
      };
    }

    return state;
  }

  function updateDynamicMetric(key, value, dynamicState, signed = false) {
    const state = dynamicState[key];
    if (!state) return value;

    const behavior = DYNAMIC_BEHAVIOR[key] || {};
    const baselineLerp = behavior.baselineLerp ?? 0.015;
    const rangeLerp = behavior.rangeLerp ?? 0.02;
    const minRange = behavior.minRange ?? (signed ? 0.18 : 0.08);
    const amplify = behavior.amplify ?? 3.5;

    state.baseline = lerp(state.baseline, value, baselineLerp);
    const delta = Math.abs(value - state.baseline);
    state.range = Math.max(minRange, lerp(state.range, delta * amplify, rangeLerp));

    const normalized = (value - state.baseline) / state.range;
    return constrain(normalized, signed ? -1 : 0, 1);
  }

  function getDynamicFaceMetrics(mesh, faceIndex = 0, centerStore = {}) {
    if (!mesh) {
      return getEmptyDynamicMetrics();
    }

    const leftCheek = mesh[234];
    const rightCheek = mesh[454];
    const nose = mesh[1];
    const topLip = mesh[13];
    const bottomLip = mesh[14];
    const mouthLeft = mesh[61];
    const mouthRight = mesh[291];
    const leftEyeTop = mesh[159];
    const leftEyeBottom = mesh[145];
    const rightEyeTop = mesh[386];
    const rightEyeBottom = mesh[374];
    const chin = mesh[152];
    const forehead = mesh[10];
    const noseBase = mesh[2];
    const leftEyeOuter = mesh[33];
    const rightEyeOuter = mesh[263];
    const leftEyeInner = mesh[133];
    const rightEyeInner = mesh[362];

    if (!leftCheek || !rightCheek || !nose) {
      centerStore[faceIndex] = null;
      return getEmptyDynamicMetrics();
    }

    const faceWidth = Math.max(dist3(leftCheek, rightCheek), 1);
    const faceHeight = forehead && chin ? Math.max(dist3(forehead, chin), 1) : faceWidth;
    const mouthOpen = constrain((dist3(topLip, bottomLip) / faceWidth) * 12, 0, 1);
    const mouthWidth = constrain((dist3(mouthLeft, mouthRight) / faceWidth - 0.32) * 2.8, 0, 1);
    const leftEyeWidth = leftEyeOuter && leftEyeInner ? Math.max(dist3(leftEyeOuter, leftEyeInner), 1) : faceWidth * 0.2;
    const rightEyeWidth = rightEyeOuter && rightEyeInner ? Math.max(dist3(rightEyeOuter, rightEyeInner), 1) : faceWidth * 0.2;
    const leftEyeOpenRaw = dist3(leftEyeTop, leftEyeBottom) / leftEyeWidth;
    const rightEyeOpenRaw = dist3(rightEyeTop, rightEyeBottom) / rightEyeWidth;
    const blinkAsymmetry = constrain((leftEyeOpenRaw - rightEyeOpenRaw) * 6, -1, 1);
    const centerX = (leftCheek[0] + rightCheek[0]) * 0.5;
    const centerY = forehead && chin ? (forehead[1] + chin[1]) * 0.5 : (leftCheek[1] + rightCheek[1]) * 0.5;
    const halfWidth = Math.max(Math.abs(rightCheek[0] - leftCheek[0]) * 0.5, 1);
    const headYaw = constrain((nose[0] - centerX) / halfWidth, -1, 1);

    let faceVelocity = 0;
    const faceCenter = { x: centerX, y: centerY };
    if (centerStore[faceIndex]) {
      const movement = Math.hypot(
        faceCenter.x - centerStore[faceIndex].x,
        faceCenter.y - centerStore[faceIndex].y
      );
      faceVelocity = constrain((movement / faceWidth) * 10, 0, 1);
    }
    centerStore[faceIndex] = faceCenter;

    const mouthCenterY = (topLip[1] + bottomLip[1]) * 0.5;
    const mouthCornerDelta = ((mouthCenterY - mouthLeft[1]) + (mouthCenterY - mouthRight[1])) * 0.5;
    const smileCurve = constrain((mouthCornerDelta / faceHeight) * 18, -1, 1);
    const lipPurseRaw = dist3(topLip, bottomLip) / Math.max(dist3(mouthLeft, mouthRight), 1);
    const lipPurse = constrain((lipPurseRaw - 0.08) * 7, 0, 1);
    const jawDrop = constrain((dist3(bottomLip, chin) / faceHeight - 0.10) * 6, 0, 1);
    const jawShift = chin ? constrain(((chin[0] - nose[0]) / faceWidth) * 4, -1, 1) : 0;
    const mouthCenterShift = constrain(((mouthCenterY - noseBase[1]) / faceHeight) * 6, -1, 1);

    return {
      mouthOpen,
      mouthWidth,
      smileCurve,
      lipPurse,
      jawDrop,
      blinkAsymmetry,
      jawShift,
      mouthCenterShift,
      headYaw,
      faceVelocity
    };
  }

  return {
    DYNAMIC_BEHAVIOR,
    DYNAMIC_METRICS,
    createDynamicState,
    getEmptyDynamicMetrics,
    getDynamicFaceMetrics,
    updateDynamicMetric
  };
})();
