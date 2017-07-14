import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Directive({
  selector: '[modal-trigger]'   // if is in square brackets like [modal-trigger] => means it's an attribute
})
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement;
  // this is how it reads the matching attribute 'modal-trigger' value from the HTML
  @Input('modal-trigger') public modalId: string; 

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = ref.nativeElement;
  }

  public ngOnInit() {
    this.el.addEventListener('click', (e) => {
      this.$(`#${this.modalId}`).modal({});
    });
  }
}
