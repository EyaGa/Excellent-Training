import { Pipe, PipeTransform } from '@angular/core';
export interface Time {
  hours: number;
  minutes: number;
  seconds?: number;
}
@Pipe({
  name: 'timeformat',

})
export class TimeformatPipe implements PipeTransform {
  transform(timeString: string): string {
    // Diviser la chaîne de caractères pour obtenir les heures, les minutes, et les secondes
    const [hours, minutes, seconds = '00'] = timeString.split(':').map(Number);

    // Assurer que seconds est toujours un nombre
    const formattedSeconds = Number(seconds);

    // Créer un nouvel objet Date avec les valeurs d'heure, de minute, et de seconde
    const formattedTime = new Date(Date.now());
    formattedTime.setHours(hours);
    formattedTime.setMinutes(minutes);
    formattedTime.setSeconds(formattedSeconds);

    // Formater la chaîne de temps et la retourner
    return formattedTime.toTimeString().slice(0, 5);
  }
}
