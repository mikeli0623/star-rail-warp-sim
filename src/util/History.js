class History {
  constructor(warp) {
    this.warp = warp;
    this.date = new Date();
  }

  getTime = () => {
    return this.date;
  };

  getHistory = () => {
    let history = [];
    this.warp.map((item) => {
      history.push({
        id: item,
        time: this.date,
      });
      return item;
    });
    return history;
  };
}

export default History;
