export class ValidateFields {
  data = [];
  constructor(params: any) {
    this.data = params;
  }
  checkEmptyFields() {
    return Object.values(this.data).every(v => v);
  }
}
