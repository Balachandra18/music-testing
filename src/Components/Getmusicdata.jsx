import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Upladsong from './Uploadsong';

function Getmusicdata() {
  let [updatedata,setupdatedata]=useState({name:"",movie_name:"",actor_name:"",actress_name:"",music_director:""})
  let [getdata,setgetdata]=useState([]);
  let [editmode,seteditmode]=useState(false);
  let [editsong,seteditsong]=useState({});
  let [filterdata,setfilterdata]=useState([...getdata])





    useEffect(()=>{
      let fetchdata=async ()=>{
       try {
         let response=await fetch('https://music-api-project-t259.onrender.com/music/getdata');
        let data=await response.json()
        console.log(data.data)
        setgetdata([...data.data])
        setfilterdata([...data.data])
        console.log("filter"+filterdata)
       } catch (error) {
        console.log(error)
       }
      }
      fetchdata()
    },[])

    let editsongdata=(item)=>{
      // seteditmode(true);
      seteditsong({...item});
      setupdatedata({movie_name:item.movie_name,actor_name:item.actor_name,actress_name:item.actress_name,music_director:item.music_director});
      
      let songcontainer=document.getElementById('songcontainer');
      let postform=document.getElementById('postform');
      songcontainer.classList.add('hidden');
      postform.classList.remove('hidden')
      // console.log(Upladsong)

    }


   let deletesongfromdatabase=async (item)=>{
    let url=`https://music-api-project-t259.onrender.com/music/delete/${item.name}`;
    
    
    try {
      let response=await fetch(url,{method:'DELETE'})
      let data=await response.json()
      if(data.message=='Deleted Successfully'){
        alert(data.message)
        setfilterdata(prev => prev.filter(value => value.id !== item.id))
        console.log(seteditsong)

      }
      
    
    } catch (error) {
      alert('server error')
    }

   }

   let updatefrominput=(e)=>{
    setupdatedata({...updatedata,[e.target.name]:e.target.value})
    console.log(updatedata)
   }

   let submitdata=async(e)=>{
    e.preventDefault();
    let formdata=new FormData()
    formdata.append('movie_name',updatedata.movie_name);
    formdata.append('actor_name',updatedata.actor_name);
    formdata.append('music_director',updatedata.music_director);
    formdata.append('actress_name',updatedata.actress_name);
    console.log(formdata)
    console.log(editsong)
    let url=`https://music-api-project-t259.onrender.com/music/update/${editsong.id}`
    try {
      let response=await fetch(url,{method:"PUT",body:formdata})
      let data=await response.json()
      console.log(data)
      alert(data.message)
      let songcontainer=document.getElementById('songcontainer');
      let postform=document.getElementById('postform');
      songcontainer.classList.remove('hidden');
      postform.classList.add('hidden')
      
      
    } catch (error) {
      alert(error)
      console.log(error)
    }

   }

   return (
    <>
       
            <h1 className='text-3xl text-center font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent'>Songs</h1>
             {/* <div className=' h-dvh  w-dvw flex justify-around '> */}

             
              <form  className='border m-auto  w-1/2 hidden ' id='postform' onSubmit={submitdata}>
            {
              ["movie_name","actor_name","actress_name","music_director"].map((item)=>{
                return <div className='flex items-center m-2 gap-5  justify-center' key={item}>
                  <label  htmlFor={item}>{item}</label>
                  <input  id={item}  className='border border-2 w-3/4 ' type='text' placeholder={item}  value={updatedata[item]} name={item}  onChange={updatefrominput}/>
                </div>
              })    
            }
            <button className='btn btn-primary  flex   m-auto' type='submit'>Submit</button>
            </form> 

            






          
           <div className='' id='songcontainer'>
            {
              filterdata.length>0 ? (filterdata.map((item)=>(<div>
                <p>{item.song_name}</p>
              <div className='flex items-center justify-around'>
                
               <audio controls={true} >
                <source src={item.song_url}/>
               </audio>

              <video src={item. song_video_url} className='w-30' controls={true}/>
              <button className='btn btn-error' onClick={()=>{deletesongfromdatabase(item)}}>Delete</button>
               <button className='btn btn-primary' onClick={()=>{editsongdata(item)}}>Edit</button>
               <a href={item.song_url} download={item.song_name.mp3}>
                        <button className='btn btn-success btn-sm mt-2'>
                          Download Audio ⬇️
                        </button>
                    </a>
              </div>
               </div>
               )
             
              )):(<div className='flex justify-center items-center h-dvh w-dvw'><span className="loading loading-ball loading-xl scale-200 text-red-300"></span></div>)
            }
           </div>

        {/* </div> */}
    </>
 ) 
          





}

export default Getmusicdata