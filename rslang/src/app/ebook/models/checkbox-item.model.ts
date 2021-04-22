export class CheckboxItem {
  value: string;
  label: string;
  checked: boolean;

  constructor(value: string, label: string, checked?: boolean) {
    this.value = value;
    this.label = label;
    this.checked = checked || false;
  }
}
