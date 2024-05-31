import { Job } from "../utils/types";

const JobCard = (props: Job) => {
  const { title, company, description, location, url, createdAt } = props;
  const date = new Date(createdAt);
  return (
    <a href={url} target="_blank">
      <div
        className="flex 
      flex-row hover:cursor-pointer my-8 p-2 
      justify-between rounded shadow-md hover:shadow-xl 
      bg-gray-400 transition duration-400
      hover:bg-gray-300"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium">{title}</h2>
          <h5 className="text-sm font-medium ">{company}</h5>
          <p className="max-w-prose">{description}</p>
        </div>
        <div className="flex justify-end flex-col gap-2 items-end">
          <p>{`${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`}</p>
          <p>{location || ""}</p>
        </div>
      </div>
    </a>
  );
};

export default JobCard;
