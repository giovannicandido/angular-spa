import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core'
import { AuthService } from '../auth.service'
import { hideFromDom, showHidden } from '../../dom/dom.service'

@Directive({ selector: '[hasRole]' })
export class HasRole {
  @Input() role: string
  @Input() resource: string

  constructor(
    private element: ElementRef,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.applyDirective()
  }

  applyDirective() {
    let show
    if (this.resource) {
      show = this.auth.hasRole(this.role, this.resource)
    } else {
      show = this.auth.hasRole(this.role)
    }
    if (show) {
      showHidden(this.element)
    } else {
      hideFromDom(this.element)
    }
  }
}