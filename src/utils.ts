// This file adds a function to mix the correct answer so it doesn't show up in the same place all the time.


export const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);