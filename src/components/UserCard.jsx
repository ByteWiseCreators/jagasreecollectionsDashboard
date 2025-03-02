import PropTypes from "prop-types";
import userIcon from "../assets/userIcon.svg";

const UserCard = ({ user }) => {
  const formateTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date
      .toISOString()
      .replace("T", " ")
      .split(".")[0]
      .split(" ")[0];
    return formattedDate;
  };
  return (
    <div className="flex items-center rounded-md overflow-hidden w-full sm:max-w-[450px] border border-neutral-200 bg-primary-50 hover-elavate">
      <div className="w-1/4 hidden sx:block p-2">
        <img src={userIcon} alt="User" className="bg-white rounded-full" />
      </div>
      <div className="w-full sx:w-3/4">
        <div className="flex font-body font-semibold text-base p-2">
          <div className="min-w-24 text-neutral-700 space-y-1">
            <p>Name: </p>
            <p>E-Mail: </p>
            <p>Phone No: </p>
            <p>User since: </p>
          </div>
          <div className="text-neutral-500 space-y-1">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{formateTime(user.id)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;
