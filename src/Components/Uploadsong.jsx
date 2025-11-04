import React from 'react'
import { useState } from 'react';
import { useEffect,useRef} from 'react';
function Upladsong() {
  let [data,setData]=useState({song:null,song_video:null,song_name:"",movie_name:"",music_director:"", actor_name:"", actress_name:"",artist:"",producer:""})
  // let url="http://localhost:5000/music/upload"
  let url="https://music-api-project-t259.onrender.com/music/upload";
  let [responsefromserver,setresponsefromserver]=useState({})
  let [isloading,setloading]=useState(null)
  let songref=useRef()
  let videoref=useRef()



  async function senddata() {
    const formData = new FormData();
    formData.append("song", data.song);
    formData.append('song_video',data.song_video);
    formData.append('song_name',data.song_name);
    formData.append("movie_name", data.movie_name);
    formData.append("music_director", data.music_director);
    formData.append("actor_name", data.actor_name);
    formData.append("actress_name", data.actress_name);
    formData.append("artist", data.artist);
    formData.append('producer',data.producer)

    

    

    try {
      setloading(true)
      let response=await fetch(url,{method:"POST",body:formData});
      let fetchdata=await response.json()
      setresponsefromserver({...fetchdata})
      console.log(fetchdata) 
      if(fetchdata){
        alert(fetchdata.message)
      }

      setloading(false)
    } catch (error) {
      console.log(error)
      alert('Not Submitted')
    }
  }


  function uploadaudio(e){
     if (e.target.name === "song") {
      setData({...data,song:e.target.files[0]})
  }
  else if(e.target.name=="song_video"){
    setData({...data,song_video:e.target.files[0]})
  } 
  else {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  }

  function submitdata(e){
    e.preventDefault();
     senddata()
    // console.log(data)
    setData({song:null,song_video:null,song_name:"",movie_name:"",music_director:"", actor_name:"", actress_name:"",artist:"",producer:""});
    songref.current.value=null;
    videoref.current.value=null;

  }
  return (
   <div className='w-full h-dvh border-2 flex flex-col bg-gradient-to-tr from-40% bg-red-500 to-60% to-blue-400'>
    <h1 className='text-5xl text-center'>Upload Song</h1>
   <form  onSubmit={submitdata} className='border-2 m-auto flex flex-col' id='form' >

    <div className='flex flex-col m-2'>


     <div  className='flex m-2 items-center gap-3' >
      <label htmlFor='songname' className=''>SongName</label>   
      <input type='text' id='songname' name='song_name' value={data.song_name} className='border-2 rounded-l-md rounded-e-md  text-white' placeholder='Enter Movie Name' onChange={uploadaudio}/>
    </div>



    <div  className='flex m-2 items-center gap-3' >
      <label htmlFor='moviename' className=''>MovieName</label>
      
      <input type='text' id='moviename' name='movie_name' value={data.movie_name} className='border-2 rounded-l-md rounded-e-md  text-white' placeholder='Enter Movie Name' onChange={uploadaudio}/>
    </div>


     <div className='flex m-2 gap-3 items-center' >
      <label htmlFor='musicdirector' className=''>Music director</label>
      {/* <br/> */}
      <input type='text' id='musicdirector' value={data.music_director} className='border-2 rounded-l-md rounded-e-md  text-white' name='music_director' placeholder='Enter Movie Director' onChange={uploadaudio}/>
    </div>



    <div className='flex m-2 gap-3 items-center' >
      <label htmlFor='hero' className=''>Movie Hero</label>
      {/* <br/> */}
      <input type='text' id='hero' value={data.actor_name} className='border-2 rounded-l-md rounded-e-md  text-white ' name='actor_name' placeholder='Enter Movie Hero' onChange={uploadaudio}/>
    </div>



     <div  className='flex m-2 gap-3 items-center'>
      <label htmlFor='heroine' className=''>Movie Heroine</label>
      {/* <br/> */}
      <input type='text' id='heroine'  value={data.actress_name} className='border-2 rounded-l-md rounded-e-md  text-white' name='actress_name' placeholder='Enter Movie Heroine' onChange={uploadaudio}/>
    </div>


    <div  className='flex m-2 gap-3 items-center'>
      <label htmlFor='artist' className=''>Singer Name</label>
      {/* <br/> */}
      <input type='text' id='artist' value={data.artist} className='border-2 rounded-l-md rounded-e-md  text-white' name='artist' placeholder='Enter singer Name' onChange={uploadaudio}/>
    </div>


    <div  className='flex m-2 gap-3 items-center'>
      <label htmlFor='movieproducer' className=''>Producername</label>
      {/* <br/> */}
      <input type='text' id='movieproducer' value={data.producer} className='border-2 rounded-l-md rounded-e-md  text-white' name='producer' placeholder='Enter Producer Name' onChange={uploadaudio}/>
    </div>



    <div className='flex m-2 gap-3 items-center'>
    <label htmlFor='song'>Upload Song</label>
     {/* <br/> */}
    <input type="file" name="song" id="song" accept='audio/*' ref={songref}  onChange={uploadaudio}  className='border-2 rounded-l-md rounded-e-md w-1/2 text-white' placeholder='upload audio files only' />
    </div>

      <div className='flex m-2 gap-3 items-center'>
    <label htmlFor='song_video'>Upload Song video</label>
    <input type="file" name="song_video" id="song_video" accept='video/*' ref={videoref}  onChange={uploadaudio}  className='border-2 rounded-l-md rounded-e-md w-1/2 text-white' placeholder='upload audio files only' />
    </div> 



    </div>
    <button className='btn btn-primary'  type='submit '>Submit</button>
   </form>
   </div>
  )
}

export default Upladsong;