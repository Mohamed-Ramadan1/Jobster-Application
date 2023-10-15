import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../features/allJobs/allJobsSlice";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./Loading";

const JobsContainer = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading } = useSelector((state) => state.allJobs);

  //Fetch all jobs
  useEffect(() => {
    dispatch(getAllJobs());
  }, []);
  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
