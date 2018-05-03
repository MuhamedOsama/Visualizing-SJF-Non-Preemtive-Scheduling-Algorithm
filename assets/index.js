let processes = [],
  WaitingProcesses = [],
  clock = 0,
  totalbt = 0,
  processNumber = 0
let burstTimeField = document.querySelector('#burst_time'),
  arrivedTimeField = document.querySelector('#arrived_time')
  const warningmessage = document.querySelector('#burst_time_message'),
   message = document.querySelector('#arrived_time_message')
  addbtn = document.querySelector('#addbtn'),
  startbtn = document.querySelector('#startbtn')
burstTimeField.addEventListener('input', (e) => {
  if(!arrivedTimeField.value || !burstTimeField.value){
    addbtn.disabled = true
    startbtn.disabled=true
  }else if (isNaN(e.srcElement.value)) {
    warningmessage.textContent = "Not a Number"
    addbtn.disabled = true
    startbtn.disabled=true
  } else {
    warningmessage.textContent = ''
    addbtn.disabled = false
    startbtn.disabled=false
  }
})
arrivedTimeField.addEventListener('input', (e) => {
    if(!arrivedTimeField.value || !burstTimeField.value){
      addbtn.disabled = true
      startbtn.disabled=true
    }else if (isNaN(e.srcElement.value)) {
      warningmessage.textContent = "Not a Number"
      addbtn.disabled = true
      startbtn.disabled=true
    } else {
      warningmessage.textContent = ''
      addbtn.disabled = false
      startbtn.disabled=false
    }
})
AddProcess = () => {
  let current
  const burstTime = burstTimeField.value,
    arrivedTime = arrivedTimeField.value
  if (!(burstTime.burstTime < 0 || arrivedTime < 0)) {
    totalbt += parseInt(burstTime)
    current = {
      name: `p${++processNumber}`,
      burstTime: parseInt(burstTime),
      arriveTime: parseInt(arrivedTime),
      progress: 0,
      done: false
    }
    processes.push(current)
  }

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
    progressBar.setAttribute('id', `${current.name}`)
    processProgress.classList.add('progress')
    progressBar.classList.add('dynamicProgress')
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
  processes = [];
  var myNode = document.querySelector('tbody');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild)
  }
}

  
  let processCounter = 0, doneProcess
  
  let ProcessScan = () => {
      processes.forEach((process) => {
        if(process.arriveTime == clock){
        WaitingProcesses.push(process)
        let processBox = document.createElement('div')
        processBox.classList.add('col')
        let unit = (100 - (processes.length)) / totalbt
        let width = WaitingProcesses[0].burstTime * unit
        processBox.setAttribute("style", "width:" + width + "%")
        processBox.id = process.name
        processBox.classList.add('z-depth-3')
        processBox.classList.add('processBox')
        processBox.style.margin = "0.5%"
        processBox.style.background = RandomColor()
        processBox.style.transform = `translateX(100%)`
        processBox.style.opacity = `0`
        processBox.style.textAlign = 'center'
        let processNameBox = document.createElement('h5')
        processNameBox.textContent = process.name
        processBox.appendChild(processNameBox)
        timeline.appendChild(processBox)
        let x = 200
        let y = 0
        let scaler = setInterval(() => {
          processBox.style.transform = `translateX(${--x}%)`
          y < 1 ?  processBox.style.opacity = `${y+=0.004}` : ''
          x == 0 ? clearInterval(scaler) : ''
        }, 1)
      }
    })
      clock++
      WaitingProcesses.length ?  Runner() : '' //is there any processes arrived and waiting for execution ? if so runner will run the "arrived first with shortest burst"
  }

  
      
  
      
      let Runner = () =>{
          if (WaitingProcesses[0].progress == WaitingProcesses[0].burstTime) {
                WaitingProcesses[0].done = true
                doneProcess = WaitingProcesses.shift()
                WaitingProcesses.sort((p1, p2) => p1.burstTime - p2.burstTime)
                let processesBoxes = document.querySelectorAll('.processBox')
                let DoneBox
                processesBoxes.forEach((process) => {
                  if (doneProcess.name == process.id) {
                    DoneBox = process
                  }
                })
                let x = 0 , y = 1
                let scaler = setInterval(() => {
                  DoneBox.style.transform = `translateY(${x++}%)`
                  if (y > 0) {
                    DoneBox.style.opacity = `${y-=0.004}`
                  }
                  if(x > 200 && y < 0){
                    DoneBox.parentNode.removeChild(DoneBox)
                    clearInterval(scaler)
                  } 
                }, 1)
              }
            else {
              WaitingProcesses[0].progress++
              let bars = document.querySelectorAll('.dynamicProgress')
      bars.forEach((bar)=>{
        if(bar.id == WaitingProcesses[0].name){
          bar.style.width = `${(WaitingProcesses[0].progress/WaitingProcesses[0].burstTime)*100}%`
          if(WaitingProcesses[0].progress==WaitingProcesses[0].burstTime){
            bar.style.color = "white"
            bar.textContent = "Done"
          }
        }
      })
    }
    WaitingProcesses.length ? '' : clearInterval(ProcessScan)
}
let StartSimulation  = ()=>{
  startbtn.disabled = true
  addbtn.disabled = true
  setInterval(ProcessScan,1000)
} 

RandomColor = () => {
  let color = ''
  let hexa = '0123456789abcdef'
  for (let i = 0; i < 6; i++) {
    color += hexa[Math.floor(Math.random() * hexa.length)]
  }
  return `#${color}`
}