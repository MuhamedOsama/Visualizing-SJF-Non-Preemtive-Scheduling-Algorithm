let processes = [],
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
    e.srcElement.value && isNaN(e.srcElement.value) ? message.textContent = "Not a Number" : message.textContent =
      ''
    if (isNaN(e.srcElement.value)) {
      message.textContent = "Not a Number"
      addbtn.disabled = true
    } else {
      message.textContent = ''
      addbtn.disabled = false
    }
    e.srcElement.value ? '' : addbtn.disabled = true;
  })
  AddProcess = () => {
    const burstTime = burstTimeField.value,
      arrivedTime = arrivedTimeField.value
    processes.push({
      name: ++processNumber,
      bt: burstTime,
      at: arrivedTime
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
  }
  ClearProcess = () => {
    processes = []
    var myNode = document.querySelector('tbody');
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }