import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [ "start" ]

    initialize() {
        this.generateWord()
        this.startTarget.focus()
        this.guesses = [
            [],
            [],
            [],
            [],
            [],
            []
        ]
        this.row = 1
    }

    generateWord() {
        // Generate a random 5-letter word
        const words = ["apple", "grape", "lemon"]
        this.word = words[Math.floor(Math.random() * words.length)]
        console.log(this.word)
        this.wordLetters = this.word.split("")
    }

    handleInput(event) {
        const key = event.key
        if (/^[a-zA-Z]$/.test(key)) {
            event.target.classList.add("visited")
            this.guesses[this.row - 1].push(key)

            const nextInput = event.target.nextElementSibling
            if (nextInput) {
                nextInput.focus()
            }
        } else if(event.key === "Backspace") {
            const prevInput = event.target.previousElementSibling
            if (prevInput) {
                prevInput.focus()
                prevInput.value = ""
            }
        } else if(event.key === "Enter") {
            this.guess()
        }
    }

    flipTile() {
        const tileRowChildren = document.getElementById(`row-${this.row}`).children

        this.guesses[this.row - 1].forEach((guess, index) => {
            setTimeout(() => {
                let overlayColor = 'grey-overlay'

                if(this.wordLetters.includes(guess)) {
                    overlayColor = 'yellow-overlay'
                }

                if(guess === this.wordLetters[index]) {
                    overlayColor = 'green-overlay'
                }

                tileRowChildren[index].classList.add('flip')
                tileRowChildren[index].classList.add(overlayColor)
            }, 500 * index)
        })

        // won
        if(this.guesses[this.row - 1].join("") === this.word) {
            setTimeout(() => {
                alert("Correct")
                this.reset()
            }, 3000)
            return
        }

        // game ends
        if(this.row === 6) {
            setTimeout(() => {
                alert(this.word)
                this.reset()
            }, 3000)
            return
        }
    }

    guess() {
        if(this.guesses[this.row - 1].length < 5 ) {
            alert("Not enough letters")
            return
        }

        this.flipTile()

        // next round
        this.row += 1

        if(document.getElementById(`row-${this.row}`)) {
            document.getElementById(`row-${this.row}`).children[0].focus()
        }
    }

    reset() {
        location.reload()
    }
}
