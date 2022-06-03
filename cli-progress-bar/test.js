const ProgressBar = require('./index.js');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const downloadImage = async (current) => {
  await sleep(200);
  const message = `Downloaded ${`https://picsum.photos/id/${current}/200/300`}`;
  return message;
};

const test = async () => {
  const bar = new ProgressBar(50);
  bar.start();

  for (let i = 0; i < 50; i++) {
    const response = await downloadImage(i);
    bar.log(response);
    bar.update();
  }

  bar.stop();
};

test().then();
