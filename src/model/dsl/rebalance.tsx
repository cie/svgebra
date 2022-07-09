export function rebalance(s: string) {
  const brackets: string[] = []
  const re = /([([{])|([\])}])/g
  let m
  while ((m = re.exec(s))) {
    const [, open, close] = m
    if (open) brackets.unshift(PAIR[open] ?? "")
    if (close) if (close !== brackets.shift()) return s
  }
  return s + brackets.join("")
}
const PAIR: { [s: string]: string } = {
  "(": ")",
  "{": "}",
  "[": "]",
}
