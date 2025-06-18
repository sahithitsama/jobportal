import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className='text-center bg-[#f4f1ea] text-[#2d2d2d] py-16 px-4 font-sans'>
      <div className='flex flex-col gap-5 max-w-4xl mx-auto'>
        <span className='mx-auto px-4 py-1.5 rounded-full bg-[#e1e6d5] text-[#7a9c4f] font-medium text-sm tracking-wide'>
          No. 1 Job Hunt Website
        </span>
        <h1 className='text-4xl md:text-5xl font-extrabold leading-tight'>
          Search, Apply & <br />
          Get Your <span className='text-[#7a9c4f]'>Dream Jobs</span>
        </h1>
        <p className='text-[#2d2d2d] max-w-xl mx-auto text-base'>
          Explore thousands of jobs and opportunities. Your career journey begins here.
        </p>
        <div className='flex w-full max-w-2xl border border-[#d1d5db] bg-[#e1e6d5] px-3 py-2 rounded-full items-center gap-4 mx-auto shadow-md'>
          <input
            type="text"
            placeholder='Find your dream jobs'
            onChange={(e) => setQuery(e.target.value)}
            className='bg-transparent text-[#1e1e1e] placeholder-[#2d2d2d] outline-none border-none w-full px-2'
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-[#7a9c4f] hover:bg-[#65843f] px-4"
          >
            <Search className='h-5 w-5 text-white' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
