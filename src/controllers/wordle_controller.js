import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [ "letters", "letter", "guessInput", "feedbackList" ]

    initialize() {
        this.generateWord()
    }

    generateWord() {
        // Generate a random 5-letter word
        const words = ["apple", "banana", "cherry", "orange", "grape", "lemon"]
        this.word = words[Math.floor(Math.random() * words.length)]
        this.wordLetters = this.word.split("")
        this.guesses = []
        this.renderWord()
    }

    handleEvent(event) {
        const key = event.key
        if (/^[a-zA-Z]$/.test(key)) {
            console.log(key)
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
            alert("Check for answer")
        }
    }

    renderWord() {

    }

    guess() {

    }

    reset() {
    }
}
