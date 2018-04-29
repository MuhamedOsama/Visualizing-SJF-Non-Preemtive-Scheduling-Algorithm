let processes = [],
arrivedProcesses,
  processNumber = 0
const burstTimeField = document.querySelector('#burst_time'),
  arrivedTimeField = document.querySelector('#arrived_time'),
  addbtn = document.getElementById('addbtn')
burstTimeField.addEventListener('input', (e) => {
  const message = document.querySelector('#burst_time_message')

  if (isNaN(e.srcElement.value)) {
    message.textContent = "Not a Number"
    addbtn.disabled = true
  } else {
    message.textContent = ''
    addbtn.disabled = false
  }
  e.srcElement.value ? '' : addbtn.disabled = true;
})
arrivedTimeField.addEventListener('input', (e) => {
  const message = document.querySelector('#arrived_time_message')
  e.srcElement.value && isNaN(e.srcElement.value) ? message.textContent = "Not a Number" : message.textContent = ''
  if (isNaN(e.srcElement.value)) {
    message.textContent = "Not a Number"
    addbtn.disabled = true
  } else {
    message.textContent = ''
    addbtn.disabled = false
  }
  e.srcElement.value ? '' : addbtn.disabled = true
})
AddProcess = () => {
  const burstTime = burstTimeField.value,
    arrivedTime = arrivedTimeField.value
  processes.push({
    name: `p${++processNumber}`,
    bt: parseInt(burstTime)*1000,
    at: parseInt(arrivedTime),
    progress: 1
  })
  let row = document.createElement('tr'),
    processName = document.createElement('td'),
    processBurstTime = document.createElement('td'),
    processArrivedTime = document.createElement('td'),
    progressBar = document.createElement('div'),
    processProgress = document.createElement('td')

  processName.textContent = `p${processNumber}`
  processBurstTime.textContent = burstTime
  processArrivedTime.textContent = arrivedTime
  progressBar.style.width = "0%"
  processProgress.classList.add('progress')
  progressBar.classList.add('determinate')

  processProgress.appendChild(progressBar)
  row.appendChild(processName)
  row.appendChild(processBurstTime)
  row.appendChild(processArrivedTime)
  row.appendChild(processProgress)
  document.querySelector('tbody').appendChild(row)
  row.style.opacity = `0`
  let x = 0
  let scaler = setInterval(() => {
    row.style.opacity = `${x+=0.004}`
    x >= 1 ? clearInterval(scaler) : ""
  }, 1)

}
ClearProcess = () => {
  processes = []
  var myNode = document.querySelector('tbody');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}
let currentProcesses = []
StartSimulation = () => {
    let timeline = document.querySelector('#timeline')
    
    arrivedProcesses  = [...processes].sort((p1,p2)=>p1.at - p2.at);
    processes.sort((p1, p2) => p1.bt - p2.bt)
    let clock = 0
    let run = setInterval(()=>{
      arrivedProcesses.forEach((process)=>{
        if(process.at==clock){
          currentProcesses.push(process)
          currentProcesses.sort((p1,p2) =>p1.bt-p2.bt )
          let processBox = document.createElement('div')
          processBox.style.backgroundColor = RandomColor()
          processBox.classList.add('col')
          processBox.classList.add('s1')
          processBox.classList.add('z-depth-3')
          processBox.style.marginRight = "5px"
          let processNameBox = document.createElement('h5')
          let processWaitTime = document.createElement('h6')
          processNameBox.textContent = process.name
          processWaitTime.textContent = `A7A`
          processBox.appendChild(processNameBox)
          processBox.appendChild(processWaitTime)
          timeline.appendChild(processBox)
        }
      })
      clock++
      currentProcesses.forEach((process)=>{
        if(process.progress!=process.bt/1000)
        process.progress++
      })
    },1000)
  }
  RandomColor = () =>{
    let color = ''
    let hexa = '0123456789abcdef'
    for(let i = 0 ; i < 6 ; i ++){
      color += hexa[Math.floor(Math.random()*hexa.length)]
    }
    return `#${color}`
  }

  


         
      