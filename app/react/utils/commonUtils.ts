export const showError = (error: string) => {
  alert(error);
}

export const parseStarNumber = (stars: number) => {
  return parseFloat(String(stars)).toFixed(2);
}