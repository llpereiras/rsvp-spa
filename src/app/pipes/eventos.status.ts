import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'eventos_status'})
export class EventosStatusPipe implements PipeTransform {
  transform(value: string): any {
    if (value == 'ativo') return 'btn-xs list-group-item list-group-item-success';
    return 'btn-xs list-group-item list-group-item-warning';

  }
}
