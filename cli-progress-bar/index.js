const emptyChar = '\u2591';  /* ░ */
const filledChar = '\u2588'; /* █ */
const barLength = process.stdout.columns - 50;

const disableCursor = () => process.stdout.write('\x1B[?25l');
const enableCursor = () => process.stdout.write('\x1B[?25h');
const clearLastLine = () => process.stdout.write('\r\x1b[K');
const logMessage = (message) => process.stdout.write(message);

module.exports = class ProgressBar {
  constructor(total) {
    this.current = 0;
    this.total = total;
    this.barLength = barLength;
    this.output = '';
  }

  start() {
    disableCursor();
  }

  stop() {
    enableCursor();
    if (this.current === this.total) logMessage('\nFinished!\n');
  }

  update() {
    this.current += 1;
    const currentProgress = (this.current) / this.total;
    const percentageProgress = (currentProgress * 100).toFixed(2);

    const bar = this.getBar(currentProgress, this.barLength);
    this.output = `${this.current}/${this.total} ${bar} ${percentageProgress}%`;

    clearLastLine();
    logMessage(this.output);
  }

  getBar(currentProgress, barLength) {
    let str = '';
    const currentBarPosition = (currentProgress * barLength).toFixed(0);
    for (let i = 0; i < barLength; i++) {
      (i < currentBarPosition)
        ? str += filledChar
        : str += emptyChar;
    }
    return str;
  }

  log(message) {
    clearLastLine();
    logMessage(`\n${message}\n`);
    logMessage(this.output);
  }
}
