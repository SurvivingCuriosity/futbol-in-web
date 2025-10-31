export const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} años`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} meses`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} días`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} horas`;
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutos`;
  }

  return `${Math.floor(seconds)} segundos`;
};