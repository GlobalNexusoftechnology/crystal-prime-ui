export const getInitials = (name: string) => {
  if (!name) return '';
  
  const words = name.trim().split(' ').filter(word => word && word.length > 0);
  if (!words.length) return '';
  
  const firstWord = words[0];
  if (!firstWord) return '';
  
  if (words.length === 1) {
    return firstWord[0]?.toUpperCase() || '';
  }
  
  const secondWord = words[1];
  if (!secondWord) return firstWord[0]?.toUpperCase() || '';
  
  return (firstWord[0] + secondWord[0]).toUpperCase();
};
