import { ElementRef, ViewContainerRef, EmbeddedViewRef, TemplateRef, Injectable } from '@angular/core'

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
        let viewRef = this.addToDom(element, templateRef, context)
        if (show) {
          this.removeClass(viewRef.rootNodes)
        } else {
          this.addClass(viewRef.rootNodes)
        }
      }
        break
    }
  }

  removeFromDom(element: ViewContainerRef) {
    element.clear()
  }

  addToDom(element: ViewContainerRef, templateRef: TemplateRef<any>, context: any): EmbeddedViewRef<any> {
    return element.createEmbeddedView(templateRef, context)
  }

  addClass(element: any | any[], cssClass: string = this.config.defaultClass) {
    if (element.constructor === Array) {
      for (let e of element) {
        e.classList.add(cssClass)
      }
    } else {
      element.classList.add(cssClass)
    }
  }

  removeClass(element: any | any[], cssClass: string = this.config.defaultClass) {
    if (element.construct === Array) {
      for (let e of element) {
        e.classList.remove(cssClass)
      }
    } else {
      element.classList.remove(cssClass)
    }
  }
}

