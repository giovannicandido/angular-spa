import { ElementRef, ViewContainerRef, TemplateRef, Injectable } from '@angular/core'

export type SecAction = 'hide' | 'remove'
export type HideStrategy = 'display' | 'visibility'

@Injectable()
export class SecDirectiveConfig {
  action: SecAction = 'hide'
  hideStrategy: HideStrategy = 'display'
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
      case 'hide': {
        if (show) {
          this.addToDom(element, templateRef, context)
          this.showFromDom(element.element)
        }else {
          this.addToDom(element, templateRef, context)
          this.hideFromDom(element.element)
        }
        break
      }
      case 'remove': {
        if (show) {
          this.addToDom(element, templateRef, context)
        }else {
          this.removeFromDom(element)
        }
        break
      }
    }
  }

  removeFromDom(element: ViewContainerRef) {
    element.clear()
  }

  addToDom(element: ViewContainerRef, templateRef: TemplateRef<any>, context: any) {
    element.createEmbeddedView(templateRef, context)
  }

  hideFromDom(element: ElementRef, hideStrategy: HideStrategy = this.config.hideStrategy) {
    switch (hideStrategy) {
      case 'display': {
        element.nativeElement.style.display = 'none'
        break
      }
      case 'visibility': {
        element.nativeElement.style.visibility = 'hidden'
        break
      }
    }

  }

  showFromDom(element: ElementRef) {
    element.nativeElement.style.display = 'inherit'
    element.nativeElement.style.display = 'inherit'
  }

  addClass(element: ElementRef, cssClass: string = this.config.defaultClass) {
    element.nativeElement.classList.add(cssClass)
  }
}

