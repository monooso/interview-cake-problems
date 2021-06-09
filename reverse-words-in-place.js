function reverseWords(message) {
  let startIndex = 0

  reverseSlice(message, 0, message.length - 1)

  for (let i = 0; i <= message.length; i++) {
    if (i === message.length || message[i] === ' ') {
      reverseSlice(message, startIndex, i - 1)
      startIndex = i + 1
    }
  }
}

function reverseSlice(message, startIndex, endIndex) {
  for (let s = startIndex, e = endIndex; s < e; s++, e--) {
    const temp = message[e]
    message[e] = message[s]
    message[s] = temp
  }
  return message
}

const words = [
  'c', 'a', 'k', 'e', ' ',
  'p', 'o', 'u', 'n', 'd', ' ',
  's', 't', 'e', 'a', 'l'
]

reverseWords(words)
console.log(words)