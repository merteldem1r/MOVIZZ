export const pageGenerate = totalPage => {
  return Array.from({ length: totalPage }, (_, i) => {
    return i + 1;
  });
}