import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {
  transform(value: string): string {
    // Remove brackets and double quotes from the array string
    const cleanedString = value.replace(/[\[\]"]/g, '');
    // Split the cleaned string into an array of values
    const arrayValues = cleanedString.split(',').map(val => val.trim());
    // Join the array values with " |" separator
    return arrayValues.join(' , ');
  }
}
