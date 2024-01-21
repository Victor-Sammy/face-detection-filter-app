const video = document.getElementById('video')
const videoBackground = document.getElementById('videoBackground')
const overlayImage = document.getElementById('overlayImage')
const clickableImages = document.querySelectorAll('.clickable-image')
const toggleButton = document.getElementById('toggleButton')
const toggleCanvasButton = document.getElementById('toggleDrawBoxButton')
const downloadButton = document.getElementById('downloadButton')

const imagePaths = [
  'images/flowers.gif',
  'images/stars.gif',
  'images/bat-mask.gif',
]
let origin = 'http://127.0.0.1:5500'
let currentImageIndex = 0
let canvasVisible = true
//let currentDetection
let overlayX
let overlayY
let noseLandMark
// Calculate the width and height of the face bounding box
let faceWidth
let faceHeight
let downloadInProgress = false // Flag to prevent multiple downloads

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  faceapi.nets.ageGenderNet.loadFromUri('/models'),
]).then(webCam)

function webCam() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream
    })
    .catch((error) => {
      console.log(error)
    })
}

// Attach click event listeners to clickable images
clickableImages.forEach((image, index) => {
  image.addEventListener('click', () => changeOverlayImage(imagePaths[index]))
})

toggleButton.addEventListener('click', toggleOverlayImage)

function toggleOverlayImage() {
  showOverlay()

  toggleButton.textContent =
    overlayImage.style.display === 'none' ? 'ON' : 'OFF'

  toggleButton.style.color =
    overlayImage.style.display === 'none' ? 'gray' : 'red'

  //console.log(overlayImage.style.display)
}

function showOverlay() {
  overlayImage.src = imagePaths[currentImageIndex]
  // Toggle visibility of the overlayImage
  overlayImage.style.display =
    overlayImage.style.display === 'none' ? 'block' : 'none'
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)

  faceapi.matchDimensions(canvas, { height: video.height, width: video.width })

  // Dynamically create and append the image element
  document.body.appendChild(overlayImage)

  // Initial face detection and setup
  performFaceDetection()

  // Listen for window resize events
  window.addEventListener('resize', () => {
    // Recalculate noseLandmark on window resize
    performFaceDetection()
    //console.log('resized')
  })

  async function performFaceDetection() {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()

      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

      const resizedWindow = faceapi.resizeResults(detections, {
        height: video.height,
        width: video.width,
      })

      faceapi.draw.drawDetections(canvas, resizedWindow)
      faceapi.draw.drawFaceLandmarks(canvas, resizedWindow)
      faceapi.draw.drawFaceExpressions(canvas, resizedWindow)

      resizedWindow.forEach((detection) => {
        const box = detection.detection.box
        //currentDetection = detection

        const noseLandmark = detection.landmarks.getNose()[0]
        noseLandMark = noseLandmark
        // const leftEyeLandmarks = detection.landmarks.getLeftEye()
        // const leftEyeLandmark = detection.landmarks.getLeftEye()[0]
        // const leftEyeHeight = leftEyeLandmarks[5].y - leftEyeLandmarks[1].y

        if (noseLandmark) {
          try {
            if (window.innerWidth > 290 && window.innerWidth < 600) {
              overlayImage.style.left = `${noseLandmark.x / 8.19}%`
              overlayImage.style.top = `${noseLandmark.y + 20}px`
              overlayX = overlayImage.style.left
              overlayY = overlayImage.style.top

              faceWidth = box.width / 2
              faceHeight = box.height / 2
              // Set the width and height of the overlay image
              overlayImage.width = faceWidth
              overlayImage.height = faceHeight
            } else if (window.innerWidth > 700 && window.innerWidth < 850) {
              //overlayImage.style.display = 'block'
              overlayImage.style.left = `${noseLandmark.x}px`
              overlayImage.style.top = `${noseLandmark.y + 20}px`
              overlayX = overlayImage.style.left
              overlayY = overlayImage.style.top

              faceWidth = box.width
              faceHeight = box.height
              // Set the width and height of the overlay image
              overlayImage.width = faceWidth
              overlayImage.height = faceHeight
            } else if (window.innerWidth > 900 && window.innerWidth < 990) {
              overlayImage.style.left = `${noseLandmark.x / 7.7}%`
              overlayImage.style.top = `${noseLandmark.y + 50}px`
              overlayX = overlayImage.style.left
              overlayY = overlayImage.style.top

              faceWidth = box.width
              faceHeight = box.height
              // Set the width and height of the overlay image
              overlayImage.width = faceWidth
              overlayImage.height = faceHeight
            } else if (window.innerWidth > 1000 && window.innerWidth < 1200) {
              overlayImage.style.left = `${noseLandmark.x / 7.3}%`
              overlayImage.style.top = `${noseLandmark.y - 80}px`
              overlayX = overlayImage.style.left
              overlayY = overlayImage.style.top

              faceWidth = box.width
              faceHeight = box.height
              // Set the width and height of the overlay image
              overlayImage.width = faceWidth
              overlayImage.height = faceHeight
            } else if (window.innerWidth > 1270 && window.innerWidth < 1300) {
              overlayImage.style.left = `${noseLandmark.x + 210}px`
              overlayImage.style.top = `${noseLandmark.y - 65}px`
              overlayX = overlayImage.style.left
              overlayY = overlayImage.style.top

              faceWidth = box.width
              faceHeight = box.height
              // Set the width and height of the overlay image
              overlayImage.width = faceWidth
              overlayImage.height = faceHeight
            } else if (window.innerWidth > 1368 && window.innerWidth < 1441) {
              //overlayImage.style.display = 'block'
              overlayImage.style.left = `${noseLandmark.x + 300}px`
              overlayImage.style.top = `${noseLandmark.y - 10}px`
              overlayX = overlayImage.style.left
              overlayY = overlayImage.style.top

              faceWidth = box.width
              faceHeight = box.height
              // Set the width and height of the overlay image
              overlayImage.width = faceWidth
              overlayImage.height = faceHeight
            } else if (window.innerWidth > 1590 && window.innerWidth === 1600) {
              overlayImage.style.left = `${noseLandmark.x * 2.19}px`
              overlayImage.style.top = `${noseLandmark.y * 1.1}px`
              overlayX = overlayImage.style.left
              overlayY = overlayImage.style.top

              faceWidth = box.width
              faceHeight = box.height
              // Set the width and height of the overlay image
              overlayImage.width = faceWidth
              overlayImage.height = faceHeight
            } else if (window.innerWidth > 1800 && window.innerWidth < 1990) {
              overlayImage.style.left = `${noseLandmark.x / 7.3}%`
              overlayImage.style.top = `${noseLandmark.y}px`
              overlayX = overlayImage.style.left
              overlayY = overlayImage.style.top

              faceWidth = box.width
              faceHeight = box.height
              // Set the width and height of the overlay image
              overlayImage.width = faceWidth
              overlayImage.height = faceHeight
            } else {
              overlayImage.style.left = `${noseLandmark.x}px`
              overlayImage.style.top = `${noseLandmark.y * 1.2}px`
              overlayX = overlayImage.style.left
              overlayY = overlayImage.style.top

              faceWidth = box.width
              faceHeight = box.height
              // Set the width and height of the overlay image
              overlayImage.width = faceWidth
              overlayImage.height = faceHeight
            }
          } catch (error) {
            console.log(error)
          }
        }

        //console.log('overlay-image src', overlayImage.src)

        console.log('nose landmark', noseLandmark)
        // console.log('eye landmarks', leftEyeLandmarks)
        // console.log('eye landmark', leftEyeLandmark)
        // console.log('eye height', leftEyeHeight)
        //console.log('overlay position', overlayImage.style.left)

        // console.log('face width', faceWidth)
        // console.log('face height', faceHeight)

        let drawBox = new faceapi.draw.DrawBox(box, {
          label: Math.round(detection.age) + ' year old ' + detection.gender,
        })
        drawBox.draw(canvas)

        toggleCanvasButton.addEventListener('click', () => {
          canvasVisible = !canvasVisible
          // Set the visibility of drawBox based on drawBoxVisible
          canvas.style.display = canvasVisible ? 'block' : 'none'
          toggleCanvasButton.textContent = canvasVisible
            ? 'Off face detect'
            : 'On face detect'
        })
      })

      console.log(detections)
    }, 100)
    //console.log('face detected!')
  }

  downloadButton.addEventListener('click', async () => {
    // Check if a download is already in progress
    if (downloadInProgress) {
      return
    }
    // Set the flag to indicate that a download is in progress
    downloadInProgress = true

    // get the current frame from the video
    const videoWidth = video.videoWidth
    const videoHeight = video.videoHeight
    canvas.width = videoWidth
    canvas.height = videoHeight
    const context = canvas.getContext('2d')

    // Create a new canvas for the background color
    const backgroundCanvas = document.createElement('canvas')
    backgroundCanvas.width = videoWidth
    backgroundCanvas.height = videoHeight
    const backgroundContext = backgroundCanvas.getContext('2d')

    let backgroundColor
    let backgroundOpacity = 0.4

    // Set the background color based on the overlay image source
    backgroundColor =
      overlayImage.src === `${origin}/${imagePaths[0]}`
        ? `rgba(146, 19, 19, ${backgroundOpacity})`
        : `rgba(69,103,137, ${backgroundOpacity})`

    // Draw the background color
    backgroundContext.fillStyle = backgroundColor

    // Draw the background color
    backgroundContext.fillRect(0, 0, videoWidth, videoHeight)

    // Draw the video frame on the canvas
    context.drawImage(video, 0, 0, videoWidth, videoHeight)

    // Draw the overlay image on the canvas
    //let detection = currentDetection
    //const noseLandmark = detection.landmarks.getNose()[0]

    let overlayPositionX = parseFloat(overlayX)
    let overlayPositionY = parseFloat(overlayY)
    let newX
    let newY

    if (noseLandMark) {
      try {
        if (window.innerWidth > 290 && window.innerWidth < 600) {
          switch (overlayImage.src) {
            case `${origin}/${imagePaths[0]}`:
              newX = overlayPositionX + 160
              newY = overlayPositionY - 200
              break

            case `${origin}/${imagePaths[1]}`:
              newX = overlayPositionX + 180
              newY = overlayPositionY - 100
              break
            case `${origin}/${imagePaths[2]}`:
              newX = overlayPositionX + 160
              newY = overlayPositionY - 150
              break

            default:
              break
          }

          overlayImage.width = faceWidth * 2
          overlayImage.height = faceHeight * 2
        } else if (window.innerWidth > 700 && window.innerWidth < 850) {
          switch (overlayImage.src) {
            case `${origin}/${imagePaths[0]}`:
              newX = overlayPositionX - 90
              newY = overlayPositionY - 200
              break
            case `${origin}/${imagePaths[1]}`:
              newX = overlayPositionX - 90
              newY = overlayPositionY - 70
              break
            case `${origin}/${imagePaths[2]}`:
              newX = overlayPositionX - 90
              newY = overlayPositionY - 135
              break

            default:
              break
          }
        } else if (window.innerWidth > 1000 && window.innerWidth < 1200) {
          switch (overlayImage.src) {
            case `${origin}/${imagePaths[0]}`:
              newX = overlayPositionX + 130
              newY = overlayPositionY - 160
              break
            case `${origin}/${imagePaths[1]}`:
              newX = overlayPositionX + 130
              newY = overlayPositionY - 20
              break
            case `${origin}/${imagePaths[2]}`:
              newX = overlayPositionX + 120
              newY = overlayPositionY - 40
              break

            default:
              break
          }
        } else if (window.innerWidth > 1270 && window.innerWidth < 1300) {
          switch (overlayImage.src) {
            case `${origin}/${imagePaths[0]}`:
              newX = overlayPositionX - 310
              newY = overlayPositionY - 170
              break
            case `${origin}/${imagePaths[1]}`:
              newX = overlayPositionX - 310
              newY = overlayPositionY - 20
              break
            case `${origin}/${imagePaths[2]}`:
              newX = overlayPositionX - 310
              newY = overlayPositionY - 70
              break

            default:
              break
          }
        } else if (window.innerWidth > 1368 && window.innerWidth < 1441) {
          switch (overlayImage.src) {
            case `${origin}/${imagePaths[0]}`:
              newX = overlayPositionX - 400
              newY = overlayPositionY - 170
              break
            case `${origin}/${imagePaths[1]}`:
              newX = overlayPositionX - 400
              newY = overlayPositionY - 45
              break
            case `${origin}/${imagePaths[2]}`:
              newX = overlayPositionX - 390
              newY = overlayPositionY - 115
              break

            default:
              break
          }
        } else if (window.innerWidth > 1590 && window.innerWidth === 1600) {
          switch (overlayImage.src) {
            case `${origin}/${imagePaths[0]}`:
              newX = overlayPositionX - 500
              newY = overlayPositionY - 170
              break
            case `${origin}/${imagePaths[1]}`:
              newX = overlayPositionX - 500
              newY = overlayPositionY - 45
              break
            case `${origin}/${imagePaths[2]}`:
              newX = overlayPositionX - 490
              newY = overlayPositionY - 115
              break

            default:
              break
          }
        } else if (window.innerWidth > 1800 && window.innerWidth < 1990) {
          switch (overlayImage.src) {
            case `${origin}/${imagePaths[0]}`:
              newX = overlayPositionX + 150
              newY = overlayPositionY - 170
              break
            case `${origin}/${imagePaths[1]}`:
              newX = overlayPositionX + 155
              newY = overlayPositionY - 70
              break
            case `${origin}/${imagePaths[2]}`:
              if (window.innerWidth === 1920) {
                newX = overlayPositionX + 165
                newY = overlayPositionY - 140
              } else {
                newX = overlayPositionX + 170
                newY = overlayPositionY - 140
              }
              break

            default:
              break
          }
        } else {
          newX = overlayPositionX - 150
          newY = overlayPositionY - 200
        }
      } catch (error) {
        console.log(error)
      }

      context.drawImage(backgroundCanvas, 0, 0, videoWidth, videoHeight)

      context.drawImage(
        overlayImage,
        newX,
        newY,
        overlayImage.width,
        overlayImage.height
      )
    }

    // Convert the canvas content to a data URL
    const dataUrl = canvas.toDataURL('image/png')

    // Create a download link and trigger the download
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'snapshot.png'
    link.click()

    // Reset the flag once the download is complete
    downloadInProgress = false
    console.log('download button clicked')
    console.log(newX, newY)
  })
})

function changeOverlayImage(imagePath) {
  // Change the overlay image source based on the clicked image
  overlayImage.src = imagePath
  //console.log(overlayImage.src)

  // Update the current image index
  currentImageIndex = imagePaths.indexOf(imagePath)

  switch (currentImageIndex) {
    case 0:
      if (window.innerWidth > 290 && window.innerWidth < 600) {
        overlayImage.style.transform = 'translateY(-70px)'
        overlayImage.style.borderRadius = '0'
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else if (window.innerWidth > 700 && window.innerWidth < 850) {
        overlayImage.style.transform = 'translateY(-100px)'
        overlayImage.style.borderRadius = '0'
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else if (window.innerWidth > 1000 && window.innerWidth < 1200) {
        overlayImage.style.transform = 'translateY(-80px)'
        overlayImage.style.borderRadius = '0'
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else if (window.innerWidth > 1270 && window.innerWidth < 1300) {
        overlayImage.style.transform = 'translateY(-100px)'
        overlayImage.style.borderRadius = '0'
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else if (window.innerWidth > 1800 && window.innerWidth < 1990) {
        overlayImage.style.transform = 'translateY(-120px)'
        overlayImage.style.borderRadius = '0'
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else {
        overlayImage.style.transform = 'translateY(-100px)'
        overlayImage.style.borderRadius = '0'
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      }
      videoBackground.style.backgroundColor = '#921313'
      break
    case 1:
      if (window.innerWidth > 290 && window.innerWidth < 600) {
        overlayImage.style.transform = 'translateY(0)'
        overlayImage.style.borderRadius = '25%'
        overlayImage.style.backgroundColor = '#456789'
        overlayImage.style.opacity = '40%'
      } else if (window.innerWidth > 700 && window.innerWidth < 850) {
        overlayImage.style.transform = 'translateY(-30px)'
        overlayImage.style.borderRadius = '25%'
        overlayImage.style.backgroundColor = '#456789'
        overlayImage.style.opacity = '40%'
      } else if (window.innerWidth > 1000 && window.innerWidth < 1200) {
        overlayImage.style.transform = 'translateY(-15px)'
        overlayImage.style.borderRadius = '25%'
        overlayImage.style.backgroundColor = '#456789'
        overlayImage.style.opacity = '40%'
      } else if (window.innerWidth > 1270 && window.innerWidth < 1300) {
        overlayImage.style.transform = 'translateY(-20px)'
        overlayImage.style.borderRadius = '25%'
        overlayImage.style.backgroundColor = '#456789'
        overlayImage.style.opacity = '40%'
      } else {
        overlayImage.style.transform = 'translateY(-30px)'
        overlayImage.style.borderRadius = '25%'
        overlayImage.style.backgroundColor = '#456789'
        overlayImage.style.opacity = '40%'
      }
      videoBackground.style.backgroundColor = '#135f92'
      break
    case 2:
      if (window.innerWidth > 290 && window.innerWidth < 600) {
        overlayImage.style.transform = 'translateY(-65px)'
        overlayImage.style.borderRadius = ''
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else if (window.innerWidth > 700 && window.innerWidth < 850) {
        overlayImage.style.transform = 'translateY(-60px)'
        overlayImage.style.borderRadius = ''
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else if (window.innerWidth > 900 && window.innerWidth < 990) {
        overlayImage.style.transform = 'translateY(-70px)'
        overlayImage.style.borderRadius = ''
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else if (window.innerWidth > 1000 && window.innerWidth < 1200) {
        overlayImage.style.transform = 'translateY(-39px)'
        overlayImage.style.borderRadius = ''
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else if (window.innerWidth > 1270 && window.innerWidth < 1300) {
        overlayImage.style.transform = 'translateY(-35px)'
        overlayImage.style.borderRadius = ''
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else if (window.innerWidth > 1368 && window.innerWidth < 1441) {
        overlayImage.style.transform = 'translateY(-65px)'
        overlayImage.style.borderRadius = ''
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else if (window.innerWidth > 1590 && window.innerWidth === 1600) {
        overlayImage.style.transform = 'translateY(-102px)'
        overlayImage.style.borderRadius = ''
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else if (window.innerWidth > 1800 && window.innerWidth < 1990) {
        overlayImage.style.transform = 'translateY(-90px)'
        overlayImage.style.borderRadius = ''
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      } else {
        overlayImage.style.transform = 'translateY(-100px)'
        overlayImage.style.borderRadius = ''
        overlayImage.style.backgroundColor = ''
        overlayImage.style.opacity = ''
      }
      videoBackground.style.backgroundColor = '#135f92'
      break

    default:
      break
  }
  console.log(overlayImage.src)
}
