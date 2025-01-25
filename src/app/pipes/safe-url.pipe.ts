import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: true, // Habilita el pipe como standalone
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    // Indica que esta URL es segura para usarse en un iframe o similar
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
