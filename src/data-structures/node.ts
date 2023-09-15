export class Nodee {
  public data: string;
  public children: Nodee[];

  constructor(data: string) {
    this.data = data;
    this.children = [];
  }

  add(data: string) {
    this.children.push(new Nodee(data));
  }

  remove(data: string) {
    this.children = this.children.filter(node => node.data !== data);
  }
}
