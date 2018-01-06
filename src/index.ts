const styles = require('./styles/test.scss')

const app = document.createElement('div')

app.innerHTML = `
    <h1>Welcome to the cosmo demo app</h1>
    <p class="test">This line of text was generated from a typescript file</p>
`

const mountNode = document.getElementById('mount')

if (mountNode) {
    mountNode.appendChild(app)
}