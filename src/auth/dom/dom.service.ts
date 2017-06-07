import { ElementRef, Injectable } from '@angular/core'

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

  performAction(element: ElementRef, action: SecAction = this.config.action) {
    switch (action) {
      case 'hide': {
        this.hideFromDom(element)
        break
      }
      case 'remove': {
        this.removeFromDom(element)
        break
      }
    }
  }

  removeFromDom(element: ElementRef) {
    element.nativeElement.remove()
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

