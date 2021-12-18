export const formatTime = (time) => {
  if (!time || isNaN(time) || time <= 0){
    return null;
  } else {
    const hours = (Math.floor(time / 3600 ) + '').padStart(2, '0');
    const minutes = (Math.floor((time / 60) % 60) + '').padStart(2, '0');
    const seconds = (Math.floor(time % 60 ) + '').padStart(2 , '0');
    
    return (hours + ':' + minutes + ':' + seconds );
  }
};