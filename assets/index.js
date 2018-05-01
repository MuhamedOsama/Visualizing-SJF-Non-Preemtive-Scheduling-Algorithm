let processes = [], WaitingProcesses = [],clock = 0,totalbt =0,processNumber=0
let burstTimeField = document.querySelector('#burst_time'),
  arrivedTimeField = document.querySelector('#arrived_time'),
  addbtn = document.querySelector('#addbtn')
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
  let current
  const burstTime = burstTimeField.value,
    arrivedTime = arrivedTimeField.value
  if (!(burstTime.at < 0 || arrivedTime < 0)) {
    totalbt+=parseInt(burstTime)
    current = {
      name: `p${++processNumber}`,
      bt: parseInt(burstTime),
      at: parseInt(arrivedTime),
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



StartSimulation = () => {
  console.log('clicked')
  startbtn = document.querySelector('#startbtn').disabled = true
  addbtn = document.querySelector('#addbtn').disabled = true

  let processCounter = 0
  let dp = processes[0], running = processes[0]
  let prepare = ()=>{
    processes.forEach((process)=>{
      if(process.at < running.at)
      dp = process
      running = dp
    })
    WaitingProcesses.push(running)
    processes.splice(processes.findIndex(p => p.name == running.name), 1)
  }
    let ProcessScan =  setInterval (()=>{
  
       processes.forEach((process)=>{
          if(process.at == clock){
            WaitingProcesses.push(process)

          }
        })
  
  
        if(running.progress == running.bt){
          running.done = true
          processCounter ++
          dp = WaitingProcesses.shift()
          WaitingProcesses.sort((p1,p2) => p1.bt-p2.bt)
          running = WaitingProcesses[0]
          let processBox = document.createElement('div')
          
          processBox.classList.add('col')
          let unit = (100-(processes.length))/totalbt
          console.log(unit)
          let width = dp.bt*unit
          processBox.setAttribute("style", "width:" + width + "%")
          processBox.classList.add('z-depth-3')
         processBox.style.margin="0.5%"
          processBox.style.background = RandomColor()
          processBox.style.transform = `translateX(100%)`
          processBox.style.opacity = `0`
          
          let processNameBox = document.createElement('h5')   
          processNameBox.textContent = dp.name
          processBox.appendChild(processNameBox)
            timeline.appendChild(processBox)
            let x = 200
            let y = 0
          let scaler = setInterval(() => {
            processBox.style.transform = `translateX(${--x}%)`
            if(y<1){
              processBox.style.opacity = `${y+=0.004}`
            }
            x ==0 ? clearInterval(scaler) : ""
          }, 1)
        }else{
          running.progress++
      }
        clock++
        WaitingProcesses.length>0?'':clearInterval(ProcessScan)
      },1000)

}


RandomColor = () => {
  let color = ''
  let hexa = '0123456789abcdef'
  for (let i = 0; i < 6; i++) {
    color += hexa[Math.floor(Math.random() * hexa.length)]
  }
  return `#${color}`
}






/*
 let processBox = document.createElement('div')
    processBox.style.backgroundColor = RandomColor()
    processBox.classList.add('col')
    processBox.classList.add('s1')
    processBox.classList.add('z-depth-3')
    processBox.style.marginRight = "5px"
    let processNameBox = document.createElement('h5')
    let processWaitTime = document.createElement('h6')
    processNameBox.textContent = currentprocess.name
    console.log(currentprocess)
    processBox.appendChild(processNameBox)
    processBox.appendChild(processWaitTime)
    timeline.appendChild(processBox)
    */