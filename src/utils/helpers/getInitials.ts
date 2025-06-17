export const getInitials = (name: string) => {
  if (!name) return '';
  
  const words = name.trim().split(' ').filter(word => word.length > 0);
  if (words.length === 0) return '';
  
  if (words.length === 1) {
    return words[0][0]?.toUpperCase() || '';
  }
  
  const firstInitial = words[0][0]?.toUpperCase() || '';
  const secondInitial = words[1][0]?.toUpperCase() || '';
  return firstInitial + secondInitial;
};
