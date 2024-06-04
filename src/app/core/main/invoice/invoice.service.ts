import { Injectable, computed, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private total = signal(10)

  _total = computed(this.total)

  public increase(): void {
    this.total.update(value => value + 1)
  }

  public decrease(): void {
    this.total.update(value => value - 1)
  }
}
