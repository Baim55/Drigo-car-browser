import carsData from "../data/cars.json";

export function getCars() {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 400 + 800;

    setTimeout(() => {
        const shouldFail = Math.random() < 0.2; 

        if (shouldFail) {
            reject(new Error('Failed to fetch cars'));
        } else {
            resolve(carsData);
        }
    }, delay);
  });
}
