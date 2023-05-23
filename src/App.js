import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {

  let [index, setIndex] = useState(0)
  const [data, setData] = useState({
    title: "",
    startDateTime: "",
    signTerms: false,
    file: null,
    fileName: ""
  })

  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const snapImage = (video, url) => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL();
    const success = image.length > 100000;

    if (success) {
      const img = document.createElement("img");
      img.src = image;
      document.getElementsByTagName("div")[0].appendChild(img);
      URL.revokeObjectURL(url);
    }
    return success;
  }

  const handleChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    const fileReader = new FileReader();
    setData({...data, file: file})
    setData({...data, fileName: file.name})
    fileReader.onload = function () {
      const blob = new Blob([fileReader.result], { type: file.type });
      const url = URL.createObjectURL(blob);
      // const video = document.createElement("video");

      // const timeupdate = function () {
      //   if (snapImage(video, url)) {
      //     video.removeEventListener("timeupdate", timeupdate);
      //     video.pause();
      //   }
      // };

      // video.addEventListener("loadeddata", function () {
      //   if (snapImage(video, url)) {
      //     video.removeEventListener("timeupdate", timeupdate);
      //   }
      // });

      // video.addEventListener("timeupdate", timeupdate);
      // video.preload = "metadata";
      // video.src = url;
      // video.muted = true;
      // video.playsInline = true;
      // video.play();



      // react way
      let loadData = () => {
        if (snapImage(videoRef.current, url)) {
          videoRef.current.removeAttribute("timeupdate", timeupdate);
        }
      }
      const timeupdate = function () {
        if (snapImage(videoRef.current, url)) {
          videoRef.current.removeAttribute("timeupdate", timeupdate);
          // video.pause();
        }
      };
      videoRef.current.setAttribute('timeupdate', timeupdate)
      videoRef.current.setAttribute('loadeddata', loadData)
      videoRef.current.setAttribute('preload', "metadata")
      videoRef.current.setAttribute('src', url)
    };

    fileReader.readAsArrayBuffer(file);
  }

  const onChangeInput = (e, key) => {
    data[key] = e.target.value
  }

  const changeIndex = (e) => {
    e.preventDefault();
    setIndex(prev => prev + 1)
  }

  const reduceIndex = (e) => {
    e.preventDefault();
    setIndex(prev => prev - 1)
  }

  
  return (
    <div className="App">
        <div className='form-container'>
          <p>Step {index + 1}</p>
          <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {
              index === 0 ? (
                <>
                  <h1>Select video</h1>
                  <input ref={inputRef} type="file" accept=".mp4" onChange={handleChange} />
                  <video ref={videoRef}/>
                  <div ref={videoContainerRef}/>
                  <input type="text" onChange={(e) => onChangeInput(e, "title")} placeholder='title' required/>
                  <input type="datetime-local" onChange={(e) => onChangeInput(e, "startDateTime")} required/>
                </>
              ): index === 1 ? (
                <>
                  <h1>Terms & Conditions Agreement</h1>
                  <div style={{ maxWidth: '50%', textAlign: 'center', marginBottom: '100px'}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </div>
                  <div style={{display: 'flex'}}>
                    <input type="checkbox" id="t&c" name="t&c" onChange={e => setData({...data, signTerms: e.target.checked})}  />
                    <label htmlFor="t&c">I agree to the above terms</label>
                  </div>
                </>
              ) : index === 2 ? (
                <>
                  <div>Last Step</div>

                </>
              ): null
            }
            <div style={{display: 'flex', marginTop: '50px'}}>
              <button onClick={reduceIndex}>Back</button>
              <button onClick={changeIndex} disabled={data.signTerms === false ? true : false}>Next</button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default App;
