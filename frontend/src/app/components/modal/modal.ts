import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Input({ required: true }) isOpen!: boolean;
  @Input() cancelText = 'cancel';
  @Input() okText = 'ok';
  @Input() title = 'Title';
  @Input() okDisabled = false;
  @Input() loading = false;

  @Output() closeEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  @Output() okEvent = new EventEmitter();

  close() {
    this.closeEvent.emit();
  }

  cancel() {
    this.cancelEvent.emit();
  }

  ok() {
    this.okEvent.emit();
  }

  stopDivCloseModal(e: PointerEvent) {
    e.stopPropagation();
  }
}
