import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className="p-5 rounded-md shadow-md bg-[#e1e6d5] border border-[#d1d5db] cursor-pointer transition hover:shadow-lg"
        >
            <div>
                <h1 className="font-medium text-lg text-[#2d2d2d]">{job?.company?.name}</h1>
                <p className="text-sm text-[#4b5563]">India</p>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2 text-[#1e1e1e]">{job?.title}</h1>
                <p className="text-sm text-[#2d2d2d]">{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className="text-[#2d2d2d] font-bold border border-[#7a9c4f]" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#65843f] font-bold border border-[#65843f]" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7a9c4f] font-bold border border-[#7a9c4f]" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
