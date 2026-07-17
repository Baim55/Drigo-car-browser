export function simulateNetwork({
  minDelay = 600,
  maxDelay = 1200,
  failureRate = 0.15,
} = {}) {
  return new Promise((resolve, reject) => {
    const delay = minDelay + Math.random() * (maxDelay - minDelay);
    setTimeout(() => {
      if (Math.random() < failureRate) {
        reject(new Error("Network request failed. Please try again."));
      } else {
        resolve();
      }
    }, delay);
  });
}
