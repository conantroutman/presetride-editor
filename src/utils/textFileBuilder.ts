export class TextFileBuilder {
  private lines: string[] = [];

  constructor() {}

  addLine(text: string) {
    this.lines.push(text);
    return this;
  }

  addEmptyLine() {
    this.lines.push('\n');
    return this;
  }

  end() {
    return this.lines.join('\n');
  }
}
