
  let processes = [{
      name: 'p1',
      arriveTime: 0,
      burstTime: 5,
      progress: 0,
      done: false
    },
    {
      name: 'p2',
      arriveTime: 2,
      burstTime: 3,
      progress: 0,
      done: false
    },
    {
      name: 'p3',
      arriveTime: 4,
      burstTime: 2,
      progress: 0,
      done: false
    },
    {
      name: 'p4',
      arriveTime: 6,
      burstTime: 4,
      progress: 0,
      done: false
    },
    {
      name: 'p5',
      arriveTime: 7,
      burstTime: 1,
      progress: 0,
      done: false
    }
  ]
  let WaitingProcesses = []
  let clock = 0
  let doneProcess
  let ProcessScan =()=> {

    processes.forEach( (process)  =>  process.arriveTime == clock ? WaitingProcesses.push(process) : '' )

    WaitingProcesses.length ?  Runner() : '' //is there any processes arrived and waiting for execution ? if so runner will run the "arrived first with shortest burst"
    clock++

    WaitingProcesses.length > 0 ? console.log('still runnin') : clearInterval(StartSimulation)

  }
  let Runner = () => {
    if(WaitingProcesses.length)
    if (WaitingProcesses[0].progress == WaitingProcesses[0].burstTime){ 
          WaitingProcesses[0].done = true
          doneProcess = WaitingProcesses.shift()
          console.log(doneProcess)
          WaitingProcesses.sort((p1, p2) => p1.burstTime - p2.burstTime)
    }
      else WaitingProcesses[0].progress++
  }
  let StartSimulation =() => setInterval(ProcessScan,1000)