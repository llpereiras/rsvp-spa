import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'apenas_acompanhantes'})
export class ApenasAcompanhantesPipe implements PipeTransform {
  transform(acompanhantes: any[], convidado_pai: any[]): any {
    return acompanhantes.filter(item => item.convidado_pai == convidado_pai);
  }

}
