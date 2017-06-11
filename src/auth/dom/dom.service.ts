import { ElementRef, ViewContainerRef, EmbeddedViewRef, TemplateRef, Injectable } from '@angular/core'
import { RoleContext } from '../directives/interfaces'

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

  performAction(element: ViewContainerRef, templateRef: TemplateRef<any>, context: RoleContext,
    show: boolean) {
    // If context has config propertys like action apply then, otherwise use default
    this.mergeConfig(context)
    switch (context.$action) {
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
          this.removeClass(viewRef.rootNodes, context.$cssClass)
        } else {
          this.addClass(viewRef.rootNodes, context.$cssClass)
        }
      }
        break
    }
  }

  mergeConfig(context: RoleContext) {
    context.$action = context.$action ? context.$action : this.config.action
    context.$cssClass = context.$cssClass ? context.$cssClass : this.config.defaultClass
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
    if (element.constructor === Array) {
      for (let e of element) {
        e.classList.remove(cssClass)
      }
    } else {
      element.classList.remove(cssClass)
    }
  }
}

