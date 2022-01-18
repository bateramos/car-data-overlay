console.log("preload")
const lineReader = require('line-reader');
const path = require('path')

const division = 1000
const dataFilePath = path.join(process.cwd(), 'data.csv');

const data = [];
let header
console.log('Loading files from:', dataFilePath)
lineReader.eachLine(dataFilePath, function(line, last) {
        if (!header) {
                header = line
                console.log(header)
        } else {
                const attr = line.split(';')
                const time = attr[0]
                const speed = attr[5]
                const rpm = attr[1]

                data.push({ time, speed, rpm })
        }
        if (last) {
                console.log(data.length, header, data[0].attr)
        }
});

function showSpeed(index, speedElement, timeElement, rpmElement) {
        //console.log(index, data[index])
        //console.log('debug time:', data[index].time - (data[index - 1] || {time:0}).time)
        setTimeout(() => {
                speedElement.innerText = data[index].speed
                timeElement.innerText = data[index].time / division
                rpmElement.innerText = data[index].rpm
                showSpeed(index + 1, showSpeed, timeElement, rpm)
        }, (data[index].time - (data[index - 1] || {time:0}).time)/division)
}

window.addEventListener('DOMContentLoaded', () => {
        const speedElement = document.getElementById('speed')
        const timeElement = document.getElementById('time')
        const rpmElement = document.getElementById('rpm')
        setTimeout(() => {
                showSpeed(0, speedElement, timeElement, rpmElement)
        }, 1500)
})
