import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 font-sans">
           <h1 className="text-4xl font-bold text-[#2d2d2d]">
              <span className="text-[#7a9c4f]">Latest & Top </span>Job Openings
          </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {allJobs.length <= 0 ? (
          <span className="text-[#1e1e1e]">No Job Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
