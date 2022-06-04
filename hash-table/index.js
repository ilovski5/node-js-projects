const tableSize = 100; // initial table size

function hashStringToInt(string, tableSize) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (i = 0; i < string.length; i++) {
    ch = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash = Math.abs(hash & hash);
  }

  return hash % tableSize;
}

module.exports = class HashTable {
  constructor() {
    this.table = new Array(tableSize);
    this.itemsNumber = 0;
  }

  resize () {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach((item) => {
      if (!item) return; // skip

      item.forEach(([key, value]) => {
        const index = hashStringToInt(key, newTable.length);

        if (newTable[index]) {
          newTable[index].push([key, value]);
        } else {
          newTable[index] = [[key, value]];
        }
      });
    });

    this.table = newTable;
  }

  setItem(key, value) {
    this.itemsNumber += 1;
    const loadFactor = this.itemsNumber / this.table.length;
    if (loadFactor > 0.8) {
      // Resize table
      this.resize();
    }

    const index = hashStringToInt(key, this.table.length);

    if (this.table[index]) {
      this.table[index].push([key, value]);
    } else {
      this.table[index] = [[key, value]];
    }
  }

  getItem(key) {
    const index = hashStringToInt(key, this.table.length);

    if (!this.table[index]) return null;

    return this.table[index].find((item) => item[0] === key)[1];
  }
}
