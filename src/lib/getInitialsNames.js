export const getInitialsLetters = (fullName) => {
  if (!fullName) return ''; 
  
  const nameParts = fullName.split(' ');  
  const firstInitial = nameParts[0]?.charAt(0).toUpperCase();  
  const lastInitial = nameParts[1]?.charAt(0).toUpperCase();  

  return firstInitial + (lastInitial || ''); 
};