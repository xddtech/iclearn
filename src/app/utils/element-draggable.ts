export class ElementDraggable {
   static dragElements = {};
   static mpos1 = {x: 0, y: 0};
   static mpos2 = {x: 0, y: 0};
   static isDragging = false;
   static targetElem: any;

   static register(elementId: string, targetElementId: string, config: any) {
      var elem = document.getElementById(elementId);
      var targetElem = document.getElementById(targetElementId)
      if (!elem) {
         console.error('not able to find drag elements ' + elementId);
         return;
      } 
      if (!targetElem) {
         console.error('not able to find drag target elements ' + targetElementId);
         return;
      }

      elem.onmousedown = ElementDraggable.dragMouseDown
      ElementDraggable.dragElements[elementId] = targetElem;
   }

   static getTargetElement(mevent: MouseEvent): HTMLElement {
      const target = mevent.currentTarget as any;
      var key = target.id;
      var elem = ElementDraggable.dragElements[key];
      if ( !elem ) {
        console.warn('cannot find drag target at ' + key);
        return null;
      }
      return elem;
   }

   static dragMouseDown(mevent: MouseEvent) {
      //mevent = mevent || window.event;
      mevent.preventDefault();
      mevent.stopPropagation();
      var elem = ElementDraggable.getTargetElement(mevent);
      if ( !elem ) {
         return;
      }
      ElementDraggable.targetElem = elem;
      
      var mpos2 = ElementDraggable.mpos2;
      mpos2.x = mevent.clientX;
      mpos2.y = mevent.clientY;
      elem.onmouseup = ElementDraggable.closeDragElement;
      elem.onmouseout = ElementDraggable.closeDragElement;
      elem.onmousemove = ElementDraggable.elementDrag;
      ElementDraggable.isDragging = true;
   }

   static elementDrag(mevent: MouseEvent) {
      if (!ElementDraggable.isDragging || !ElementDraggable.targetElem) {
         return;
      }
      //e = e || window.event;
      mevent.preventDefault();
      mevent.stopPropagation();
      //var elem = ElementDraggable.getTargetElement(mevent);
      //if ( !elem ) {
      //   return;
      //}
      var elem = ElementDraggable.targetElem;
      // calculate the new cursor position:
      var mpos1 = ElementDraggable.mpos1;
      var mpos2 = ElementDraggable.mpos2;
      mpos1.x = mpos2.x - mevent.clientX;
      mpos1.y = mpos2.y - mevent.clientY;
      mpos2.x = mevent.clientX;
      mpos2.y = mevent.clientY;
      // set the element's new position:
      elem.style.top = (elem.offsetTop - mpos1.y) + "px";
      elem.style.left = (elem.offsetLeft - mpos1.x) + "px";
   }

   static closeDragElement(mevent: MouseEvent) {
      ElementDraggable.isDragging = false;
      //mevent = mevent || window.event;
      mevent.preventDefault();
      mevent.stopPropagation();
      //var elem = ElementDraggable.getTargetElement(mevent);
      var elem = ElementDraggable.targetElem;
      if ( !elem ) {
         return;
      }
      // stop moving when mouse button is released:
      elem.onmouseup = null;
      elem.onmousemove = null;
      ElementDraggable.targetElem = null;
   }
}