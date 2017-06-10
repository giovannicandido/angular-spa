import { ElementRef, ViewContainerRef, TemplateRef, Injectable } from '@angular/core'

export type SecAction = 'addClass' | 'remove'

@Injectable()
export class SecDirectiveConfig {
  action: SecAction = 'remove'
  defaultClass = 'disabled'
}

export function hideFromDom(element: ElementRef) {
  element.nativeElement.style.display = 'none'
}
export function showHidden(element: ElementRef) {
  element.nativeElement.style.display = 'inherit'
}

@Injectable()
export class DomService {
  constructor(private config: SecDirectiveConfig) { }

  performAction(element: ViewContainerRef, templateRef: TemplateRef<any>, context: any,
    show: boolean, action: SecAction = this.config.action) {

    switch (action) {
      case 'remove': {
        if (show) {
          this.addToDom(element, templateRef, context)
        } else {
          this.removeFromDom(element)
        }
        break
      }
      case 'addClass': {
        if (show) {
          this.removeClass(element.element)
        } else {
          this.addClass(element.element)
        }
      }
    }
  }

  removeFromDom(element: ViewContainerRef) {
    element.clear()
  }

  addToDom(element: ViewContainerRef, templateRef: TemplateRef<any>, context: any) {
    element.createEmbeddedView(templateRef, context)
  }

  addClass(element: ElementRef, cssClass: string = this.config.defaultClass) {
    element.nativeElement.classList.add(cssClass)
  }

  removeClass(element: ElementRef, cssClass: string = this.config.defaultClass) {
    element.nativeElement.classList.remove(cssClass)
  }
}

