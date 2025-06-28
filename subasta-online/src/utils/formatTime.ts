export const formatearTiempo = (segundos: number) => {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const secs = segundos % 60;

  return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};
