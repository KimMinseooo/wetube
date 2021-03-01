const recorderContainer =document.getElementById("jsRecordContainer");
const recordBtn =document.getElementById("jsRecordBtn");
const videoPreview =document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = event => {
    const { data : videoFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download ="recorded.webm";
    document.body.appendChild(link);
    link.click();
};

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start recording";
};

const startRecording = (stream) => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable",handleVideoData);
    recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
    try {
        // await 하는 이유 : user가 우리한테 대답할때까지 기다리기 위함.
        // media에 접근 할 수 있게 해줄지 아닐지 기다리는 중!
        const stream = await navigator.mediaDevices.getUserMedia({
                audio : true, 
                video : { width : 1280 , height : 720 }
            });
            videoPreview.srcObject = stream;
            videoPreview.muted = true;
            videoPreview.play();
            recordBtn.innerHTML = "Stop recording";
            streamObject = stream;
            startRecording();
    }catch(error) {
        recordBtn.innerHTML ="🙁 Cant record";
    } finally {
        recordBtn.removeEventListener("click",getVideo);
    }
}

function init() {
    recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
    init();
}