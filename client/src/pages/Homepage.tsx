import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import notesImg from '../assets/creation-process_uvp6.png';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Homepage = () => {
    const navigate = useNavigate()
  return (
    <div>
      <Navbar/>
      <main className=' flex items-center justify-between py-10 px-7'>
        <div className=' w-1/2'>
            <h1 className=' text-5xl md:text-6xl font-bold text-black  mb-4'>
                <span className=' 
                text-transparent 
                bg-clip-text bg-gradient-to-r
              from-gray-300 via-gray-600 to-gray-900'>Welcome to iNote, you can; </span>
              <br />
                <TypeAnimation
                  sequence={[
                    'Create Notes 📝',
                    2000,
                    'Edit Notes 📚 🖊',
                    2000,
                    'Delete Notes 🗑',
                    2000,
                    'Access notes from anywhere in the World🌍',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  // style={{ fontSize: '2em', display: 'inline-block' }}
                  repeat={Infinity}
                />
            </h1>
        </div>
        <div className=' w-1/2'>
            <img src={notesImg} alt=" notes banner" />
        </div>
      </main>
    
      <div className=' text-center my-10'>
        <h3 className=' text-5xl font-semibold mb-3'>About us</h3>
        <p className=' w-3/4 mx-auto text-lg'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Deserunt, reiciendis maiores error obcaecati totam voluptate voluptates, 
            quaerat quas suscipit libero, dolores voluptas beatae repudiandae facere. 
            Earum minima porro nulla autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Placeat excepturi id ex quia, harum nulla tempora aspernatur distinctio! Tenetur, maiores?
        </p>
      </div>
      <section className=' bg-black px-7 py-14'>

      </section>
    </div>
  )
}

export default Homepage
