import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'apenas_convidados'})
export class ApenasConvidadosPipe implements PipeTransform {
  transform(items: any[], args: any[]): any {
    return items.filter(item => item.convidado_pai == null);
  }

}
